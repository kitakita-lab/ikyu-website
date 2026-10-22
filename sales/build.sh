#!/usr/bin/env bash
# 営業資料の HTML を PDF に書き出す。
#   ./build.sh          … 確認用（未許諾写真に「仮配置」表示あり）
#   ./build.sh final    … 提出用（「仮配置」表示を消す。写真の利用許諾を確認してから使う）
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-$(ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1)}"
CHROME="${CHROME:-chromium}"

# フォント（Google Fonts・OFL）。リポジトリには入れず、無ければ取得する
mkdir -p fonts
if [ ! -f fonts/ZenOldMincho-400.ttf ]; then
  css=$(curl -sS -A curl "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;600&family=Zen+Kaku+Gothic+New:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400")
  python3 - "$css" <<'PY'
import re, subprocess, sys
for fam, style, w, url in re.findall(r"font-family: '([^']+)';\s*font-style: (\w+);\s*font-weight: (\d+);\s*src: url\(([^)]+)\)", sys.argv[1]):
    name = f"fonts/{fam.replace(' ', '')}-{w}{'i' if style == 'italic' else ''}.ttf"
    subprocess.run(["curl", "-sS", "-o", name, url], check=True)
PY
fi

mode="${1:-draft}"; q=""; suffix="_確認用"
if [ "$mode" = final ]; then q="?final"; suffix=""; fi
mkdir -p dist
render() { "$CHROME" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="dist/$2" "file://$PWD/src/$1$q" 2>/dev/null; echo "dist/$2"; }
render common.html  "ikyu_ワークショップのご案内${suffix}.pdf"
render housing.html "ikyu_企画書_飾る場所から作る${suffix}.pdf"
