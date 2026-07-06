# ikyu 公式サイト

「暮らしに花が咲きますように。」——
北海道札幌のハンドメイドアクセサリーブランド **ikyu** の公式サイトです。

- フレームワーク: Next.js (App Router) + TypeScript
- スタイル: Tailwind CSS v4(デザイントークンは `src/app/globals.css` の `@theme` に集約)
- 全ページ静的生成(SSG)

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
npm run lint   # ESLint
```

## コンテンツの更新方法

コードを書かなくても、以下のファイルの編集だけで更新できます。

| 更新したいもの | ファイル |
|---|---|
| お知らせ・出店情報の追加 | `src/content/news.ts`(配列の先頭に追加) |
| Instagram / minne のURL、住所表記 | `src/content/site.ts` |
| ナビゲーションの項目 | `src/content/site.ts` の `nav` |
| 写真の差し替え | `public/images/`(同名で上書き) |

### 出店情報の書き方(構造化データ対応)

`news.ts` のエントリに `event` を付けると、検索エンジン向けの
イベント構造化データが自動で出力されます。

```ts
{
  slug: "event-2026-08",
  date: "2026-08-01",
  category: "出店情報",
  title: "○○マルシェに出店します",
  body: ["..."],
  event: {
    name: "○○マルシェ",
    startDate: "2026-08-10T10:00:00+09:00",
    endDate: "2026-08-10T17:00:00+09:00",
    venue: "会場名",
    addressLocality: "札幌市",
  },
},
```

## 本番ドメインの設定

独自ドメイン取得後、環境変数を設定してください(OGP・canonical・sitemapに反映されます)。

```
NEXT_PUBLIC_SITE_URL=https://あなたのドメイン
```

## 今後の拡張メモ

- **問い合わせフォーム**: 現在は Instagram DM 導線。フォームを設ける場合は
  `src/app/contact/page.tsx` に追加し、送信先(Resend / Formspree 等)を接続する。
- **作品ページ**: 作品ごとの写真・情報が揃ったら `src/content/` に `works.ts` を追加し、
  `/collection/[slug]` を実装する(構造は現状のまま拡張可能)。
- **CMS化**: 更新頻度が上がったら microCMS 等への移行を検討。コンテンツは
  `src/content/` に分離済みのため差し替えは容易。
