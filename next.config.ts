import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages(静的ホスティング)向けに全ページを静的HTMLとして書き出す。
  // 出力先は out/ 。サーバー機能(API・ISR・画像最適化サーバー)は使わない前提。
  output: "export",
  images: {
    // 静的書き出しでは画像最適化サーバーが使えないため、public/ の画像をそのまま配信する。
    // 画像は事前に WebP 化済み(最大でも 500KB 未満)なので実害は小さい。
    unoptimized: true,
  },
};

export default nextConfig;
