"""ikyu Instagram プロフィールアイコンの制作スクリプト。

レイヤー構成（下から）:
  1. src/background.png   採用済みの背景（無加工。縮小・拡大のリサンプルのみ）
  2. 陰影                  ロゴのアルファを Gaussian ぼかし（色・強さは VARIANTS）
  3. ロゴ                  src/logo-mark.png のアルファを白で塗ったもの

ロゴの形は正式ロゴ public/images/logo.png のアルファをそのまま使う（描き直しなし）。

使い方:
  python3 build.py mark                   # 正式ロゴからサブテキストを除いた src/logo-mark.png を作る
  python3 build.py preview                # 1024px の確認画像・円形・小サイズプレビュー
  python3 build.py final --variant B      # 承認後: 4096px の完成 PNG
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
OFFICIAL_LOGO = REPO / "public/images/logo.png"
BG = HERE / "src/background.png"
MARK = HERE / "src/logo-mark.png"
PREVIEW = HERE / "preview"
FINAL = HERE / "final"

# 正式ロゴ（900x166）のうち「handmade accessories」が入っている矩形。
# 連結成分を調べ、この矩形にはサブテキスト以外の画素が無いことを確認済み（README 参照）。
SUBTEXT_BOX = (340, 98)  # x >= 340 かつ y >= 98 を透明にする

# レイアウト（キャンバス幅に対する比率）
LOGO_WIDTH = 0.78  # ロゴの横幅
OFFSET_Y = 0.0  # ロゴ外接矩形の中心を、キャンバス中心からずらす量（下が正）
# 正式ロゴは右上がりに傾いている（サブテキストと並べる前提の角度）。アイコンでは単独で使うため、
# 時計回りに回して水平にする。値は筆跡の主軸（画素の重み付き主成分）の実測値。形は変えず回転だけ。
ROTATE_DEG = 3.7

# 陰影の比較案。opacity は陰影レイヤーの最大不透明度、blur/offset はキャンバス幅に対する比率。
SHADOW_COLOR = (69, 54, 47)  # 正式ロゴの文字色（ブランドの濃茶）
VARIANTS = {
    "A": dict(opacity=0.0, blur=0.0, offset=0.0),  # 陰影なし
    "B": dict(opacity=0.28, blur=0.006, offset=0.002),  # ごく控えめ（推奨）
    "C": dict(opacity=0.42, blur=0.008, offset=0.003),  # やや強め
}


def make_mark() -> None:
    logo = Image.open(OFFICIAL_LOGO).convert("RGBA")
    a = np.array(logo)
    x0, y0 = SUBTEXT_BOX
    a[y0:, x0:, 3] = 0
    alpha = a[..., 3]
    ys, xs = np.where(alpha > 0)
    crop = a[: ys.max() + 1, : xs.max() + 1]
    Image.fromarray(crop).save(MARK, optimize=True)
    print(f"{MARK.relative_to(REPO)}: {crop.shape[1]}x{crop.shape[0]}")


def tilt_deg(alpha: Image.Image) -> float:
    """筆跡の主軸の角度（右上がりが正）。画素の不透明度で重み付けした主成分で測る。"""
    a = np.asarray(alpha, float) / 255
    ys, xs = np.nonzero(a)
    w = a[ys, xs]
    c = np.cov(np.vstack([xs, ys]), aweights=w)
    vx, vy = np.linalg.eigh(c)[1][:, 1]
    if vx < 0:
        vx, vy = -vx, -vy
    return float(np.degrees(np.arctan2(-vy, vx)))


def logo_layer(size: int, rotate: float | None = None) -> Image.Image:
    """白ロゴのアルファ（キャンバスと同じ大きさ）。拡大 → 回転 → 外接矩形の中心をキャンバス中心へ。"""
    rotate = ROTATE_DEG if rotate is None else rotate
    mark_alpha = Image.open(MARK).getchannel("A")
    w = round(size * LOGO_WIDTH)  # 回転前のロゴ幅で大きさを決める（回転で大きさは変えない）
    h = round(w * mark_alpha.height / mark_alpha.width)
    alpha = mark_alpha.resize((w, h), Image.LANCZOS)
    if rotate:
        alpha = alpha.rotate(-rotate, resample=Image.BICUBIC, expand=True)
        alpha = alpha.crop(alpha.getbbox())
    x = (size - alpha.width) // 2
    y = (size - alpha.height) // 2 + round(size * OFFSET_Y)
    layer = Image.new("L", (size, size), 0)
    layer.paste(alpha, (x, y))
    return layer


def compose(size: int, variant: str, rotate: float | None = None) -> Image.Image:
    v = VARIANTS[variant]
    bg = Image.open(BG).convert("RGB")
    bg = bg.resize((size, size), Image.LANCZOS) if bg.size != (size, size) else bg

    layer = logo_layer(size, rotate)

    out = bg.convert("RGBA")
    if v["opacity"] > 0:
        shadow_a = layer.filter(ImageFilter.GaussianBlur(size * v["blur"]))
        dy = round(size * v["offset"])
        shadow_a = shadow_a.transform(shadow_a.size, Image.AFFINE, (1, 0, 0, 0, 1, -dy))
        shadow_a = shadow_a.point(lambda p: round(p * v["opacity"]))
        shadow = Image.new("RGBA", (size, size), SHADOW_COLOR + (0,))
        shadow.putalpha(shadow_a)
        out = Image.alpha_composite(out, shadow)
    white = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    white.putalpha(layer)
    out = Image.alpha_composite(out, white)
    return out.convert("RGB")


def circle(img: Image.Image, size: int, ring: tuple | None = None) -> Image.Image:
    """Instagram の円形表示を再現（正方形の内接円で切り抜き）。"""
    ss = 4
    im = img.resize((size, size), Image.LANCZOS)
    m = Image.new("L", (size * ss, size * ss), 0)
    ImageDraw.Draw(m).ellipse((0, 0, size * ss - 1, size * ss - 1), fill=255)
    m = m.resize((size, size), Image.LANCZOS)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), m)
    return out


def font(px: int):
    try:
        return ImageFont.truetype("DejaVuSans.ttf", px)
    except OSError:
        return ImageFont.load_default()


def sheet_small(img: Image.Image, title: str) -> Image.Image:
    """ライト／ダークの画面上で、実際の表示サイズの円形アイコンを並べる。"""
    sizes = [150, 110, 77, 56, 44, 32]  # PC プロフィール / アプリのプロフィール / 投稿・ストーリーズ・コメント等
    pad = 24
    row_h = max(sizes) + 2 * pad + 20
    width = sum(sizes) + pad * (len(sizes) + 1)
    sheet = Image.new("RGB", (width, row_h * 2 + 40), "white")
    d = ImageDraw.Draw(sheet)
    d.text((pad, 10), title, fill=(40, 40, 40), font=font(16))
    for r, (bgc, fg) in enumerate([((255, 255, 255), (60, 60, 60)), ((0, 0, 0), (200, 200, 200))]):
        top = 40 + r * row_h
        d.rectangle((0, top, width, top + row_h), fill=bgc)
        x = pad
        for s in sizes:
            c = circle(img, s)
            sheet.paste(c, (x, top + pad + (max(sizes) - s)), c)
            d.text((x, top + pad + max(sizes) + 4), f"{s}px", fill=fg, font=font(12))
            x += s + pad
    return sheet


def circle_view(img: Image.Image) -> Image.Image:
    """1024px の円形表示。円の外はアプリ画面（白）に見立てる。"""
    c = circle(img, 1024)
    out = Image.new("RGB", (1024, 1024), "white")
    out.paste(c, (0, 0), c)
    return out


def preview() -> None:
    PREVIEW.mkdir(exist_ok=True)
    imgs = {}
    for k in VARIANTS:
        im = compose(1024, k)
        imgs[k] = im
        im.save(PREVIEW / f"icon-1024-{k}.png", optimize=True)
        circle_view(im).save(PREVIEW / f"circle-1024-{k}.png", optimize=True)
        sheet_small(im, f"variant {k}  (actual display sizes)").save(PREVIEW / f"small-{k}.png", optimize=True)

    # 比較資料: 同じ縮尺で A/B/C の円形表示と 77px 表示を並べる
    cell, pad = 420, 30
    cmp_ = Image.new("RGB", (pad + 3 * (cell + pad), cell + 200), "white")
    d = ImageDraw.Draw(cmp_)
    for i, k in enumerate(VARIANTS):
        x = pad + i * (cell + pad)
        c = circle(imgs[k], cell)
        cmp_.paste(c, (x, pad), c)
        s = circle(imgs[k], 77)
        cmp_.paste(s, (x, cell + pad + 20), s)
        s = circle(imgs[k], 44)
        cmp_.paste(s, (x + 100, cell + pad + 20 + 33), s)
        v = VARIANTS[k]
        d.text((x + 170, cell + pad + 40), f"{k}: shadow opacity {v['opacity']:.2f}", fill=(40, 40, 40), font=font(16))
    cmp_.save(PREVIEW / "compare-ABC.png", optimize=True)

    # 角度の比較: 回転なし（正式ロゴのまま）／3.0°／実測の ROTATE_DEG。水平の補助線つき
    angles = [0.0, 3.0, ROTATE_DEG]
    cell, pad = 420, 30
    tilt = Image.new("RGB", (pad + len(angles) * (cell + pad), cell + 2 * pad + 30), "white")
    d = ImageDraw.Draw(tilt)
    for i, ang in enumerate(angles):
        x = pad + i * (cell + pad)
        im = compose(1024, "B", ang).resize((cell, cell), Image.LANCZOS)
        tilt.paste(im, (x, pad))
        lay = logo_layer(cell, ang)
        _, top, _, bot = lay.getbbox()
        for yy in (top + (bot - top) * 0.28, top + (bot - top) * 0.62):  # x ハイトの上下あたり
            d.line((x, pad + yy, x + cell, pad + yy), fill=(220, 60, 60), width=1)
        t = tilt_deg(lay)
        d.text((x, pad + cell + 8), f"rotate {ang:.1f} deg  ->  axis tilt {t:+.1f} deg", fill=(40, 40, 40), font=font(15))
    tilt.save(PREVIEW / "compare-angle.png", optimize=True)

    # 検査値
    report = check(imgs)
    (PREVIEW / "checks.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


def check(imgs: dict) -> dict:
    """機械で確かめられる項目の検査。"""
    mark = Image.open(MARK)
    official = np.array(Image.open(OFFICIAL_LOGO).convert("RGBA"))
    m = np.array(mark)
    h, w = m.shape[:2]
    x0, y0 = SUBTEXT_BOX
    # 1. ロゴ部分の画素が正式ロゴと完全一致（サブテキスト領域以外は無加工）
    keep = np.ones((h, w), bool)
    keep[y0:, x0:] = False
    identical = bool((official[:h, :w][keep] == m[keep]).all())
    # 2. サブテキスト領域が透明
    subtext_removed = bool((m[y0:, x0:, 3] == 0).all())
    # 3. 円形トリミングに収まるか（1024px で、ロゴの画素のうち中心から最も遠いものの距離）
    lw = LOGO_WIDTH
    layer = logo_layer(1024)
    la = np.asarray(layer)
    yy, xx = np.nonzero(la)
    far = float(np.hypot(xx + 0.5 - 512, yy + 0.5 - 512).max()) / 512
    bx0, by0, bx1, by1 = layer.getbbox()
    # 傾き（右上がりが正）: 正式ロゴのまま／回転後
    tilt_before = tilt_deg(mark.getchannel("A"))
    tilt_after = tilt_deg(layer)
    # 4. 背景と白の輝度コントラスト（WCAG の式。背景はロゴ周辺の平均）
    bg = np.array(Image.open(BG).convert("RGB")).astype(float)

    def lum(c):
        c = c / 255
        c = np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
        return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]

    k = bg.shape[0] / 1024
    region = bg[int(by0 * k) : int(by1 * k), int(bx0 * k) : int(bx1 * k)]
    lb = lum(region.reshape(-1, 3).mean(0))
    return {
        "official_logo": str(OFFICIAL_LOGO.relative_to(REPO)),
        "official_logo_sha256": hashlib.sha256(OFFICIAL_LOGO.read_bytes()).hexdigest(),
        "mark_size_px": [w, h],
        "mark_pixels_identical_to_official_outside_subtext_box": identical,
        "subtext_box_transparent": subtext_removed,
        "logo_width_ratio": lw,
        "rotate_deg_clockwise": ROTATE_DEG,
        "tilt_deg_official_mark": round(tilt_before, 2),
        "tilt_deg_after_rotation": round(tilt_after, 2),
        "farthest_logo_pixel_ratio_to_circle_radius": round(far, 3),
        "fits_in_circle": bool(far < 1),
        "contrast_white_vs_background_mean": round((1.05) / (lb + 0.05), 2),
        "logo_scale_at_1024": round(1024 * lw / w, 2),
        "logo_scale_at_4096": round(4096 * lw / w, 2),
        "background_scale_at_4096": round(4096 / Image.open(BG).width, 2),
    }


def final(variant: str) -> None:
    FINAL.mkdir(exist_ok=True)
    im = compose(4096, variant)
    p = FINAL / f"ikyu-instagram-icon-4096-{variant}.png"
    im.save(p, optimize=True)
    print(p.relative_to(REPO), im.size)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["mark", "preview", "final"])
    ap.add_argument("--variant", default="B", choices=list(VARIANTS))
    a = ap.parse_args()
    {"mark": make_mark, "preview": preview, "final": lambda: final(a.variant)}[a.cmd]()
