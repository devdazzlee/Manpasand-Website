type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Server-only JSON-LD. suppressHydrationWarning avoids React #418 when the
 * browser/React special-case <script> nodes during hydration.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  const json = JSON.stringify(payload.length === 1 ? payload[0] : payload);

  return (
    <script
      type="application/ld+json"
      // JSON-LD must not be reconciled as interactive script during hydrate
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
