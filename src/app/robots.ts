import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// 静的書き出し(output: "export")ではビルド時に1回だけ生成する。
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
