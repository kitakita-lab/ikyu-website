<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ikyu-website の作業ルール

ikyu（ハンドメイドアクセサリーブランド）の公式サイト。`main` への push は Cloudflare Pages の本番に自動反映される。

## 進め方

- ファイルを変更する依頼は `docs/harness.md` の手順に従う。依頼に「ハーネスなしで」とある場合だけ省略してよい。
- `main` への変更・PR のマージ・本番反映につながる操作は、方法や理由を問わず人間だけが行う。Claude Code は実行しない。`.claude/settings.json` の禁止設定は補助であり、設定で止められない方法でも実行しない。
- `AGENTS.md`・`docs/harness.md`・`.claude/settings.json` は、人間が明示的に指示した場合だけ変更する。

## 人間が判断すること（AI は提案まで）

- 見た目・文言・コピー・ブランド表記（ブランド名は小文字の `ikyu`）
- 写真の選定・差し替え（`docs/brand-photo-guidelines.md`）
- 購入導線（minne 等の外部リンク先）
- 本番反映（マージ）

## チェック

- `npm run verify`（lint・型チェック・テスト・ビルド・`out/` のサイト検査）。CI の `Quality Checks` も同じ内容を実行する。
- 何を機械で確認し、何を人が確認するかは `docs/brand-review.md`。美しさ・上品さを機械で合否判定するテストは作らない。
- テストは、データや生成 HTML の実際に起こりうる不具合を検出するものだけを足す。テストや検査の条件を緩めて通さない。
- 静的書き出し（`output: "export"`）前提。API Route・middleware・ISR・画像最適化サーバーなど、サーバー機能は追加しない。
- サイトと販促物で共通に使うブランド情報の所在は `docs/brand-system.md`。

## Review guidelines

レビューでは次を優先して確認する。文体や好みの問題より、事実・動作・ブランドへの影響を優先する。

- PR 本文の「受け入れ条件」を満たしているか
- 静的書き出しで動かない機能を追加していないか
- サイト内の URL（canonical・OGP・sitemap・構造化データ）を `src/content/site.ts` の `site.url` から組み立てているか
- 依頼の範囲外で、文言・ブランド表記・購入リンク・写真を変えていないか
- イベント写真の来場者のプライバシー処理（顔の処理）を外していないか
- `tests/`・`scripts/check-site.mjs` の条件を緩めて、検査を通るようにしていないか

## ルール（人間が承認したものだけを追記する）

- （まだなし）
