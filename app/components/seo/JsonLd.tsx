type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * JSON-LD in the document body. suppressHydrationWarning: browsers/React treat
 * <script> nodes specially; without it, production can throw #418 (HTML vs empty).
 */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  const json = JSON.stringify(payload.length === 1 ? payload[0] : payload).replace(
    /</g,
    '\\u003c'
  );

  return (
    <script
      type="application/ld+json"
      // Prevent React from reconciling script children during hydrate
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
