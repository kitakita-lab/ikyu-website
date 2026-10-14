<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ikyu-website の作業ルール

ikyu（ハンドメイドアクセサリーブランド）の公式サイト。`main` への push は Cloudflare Pages の本番に自動反映される。

## 進め方

- ファイルを変更する依頼は `docs/harness.md` の手順に従う。依頼に「ハーネスなしで」とある場合だけ省略してよい。
- `main` へ直接 push しない。PR をマージしない（マージと本番反映の判断は人間だけ）。
- `AGENTS.md`・`docs/harness.md`・`.claude/settings.json` は、人間が明示的に指示した場合だけ変更する。

## 人間が判断すること（AI は提案まで）

- 見た目・文言・コピー・ブランド表記（ブランド名は小文字の `ikyu`）
- 写真の選定・差し替え（`docs/brand-photo-guidelines.md`）
- 購入導線（minne 等の外部リンク先）
- 本番反映（マージ）

## チェック

- `npm run lint` / `npx tsc --noEmit` / `npm run build`
- 静的書き出し（`output: "export"`）前提。API Route・middleware・ISR・画像最適化サーバーなど、サーバー機能は追加しない。

## Review guidelines

レビューでは次を優先して確認する。文体や好みの問題より、事実・動作・ブランドへの影響を優先する。

- PR 本文の「受け入れ条件」を満たしているか
- 静的書き出しで動かない機能を追加していないか
- サイト内の URL（canonical・OGP・sitemap・構造化データ）を `src/content/site.ts` の `site.url` から組み立てているか
- 依頼の範囲外で、文言・ブランド表記・購入リンク・写真を変えていないか
- イベント写真の来場者のプライバシー処理（顔の処理）を外していないか

## ルール（人間が承認したものだけを追記する）

- （まだなし）
