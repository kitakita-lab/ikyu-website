type Props = {
  data: Record<string, unknown>;
};

/** 構造化データ(JSON-LD)を安全に埋め込む */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
