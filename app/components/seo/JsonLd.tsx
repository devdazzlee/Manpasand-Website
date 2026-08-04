type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Server JSON-LD for the document body (not &lt;head&gt;).
 * Escapes &lt; so &lt;/script&gt; inside JSON cannot break out of the tag.
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
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
