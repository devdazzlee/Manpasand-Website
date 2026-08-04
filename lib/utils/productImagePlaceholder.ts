/** Detects missing / generic fallback product images. */
export function isMissingProductImage(src?: string | null): boolean {
  if (!src || !src.trim()) return true;
  const s = src.trim().toLowerCase();
  if (s === '/banner-01.jpg' || s.endsWith('/banner-01.jpg')) return true;
  if (s.includes('placeholder') || s.includes('no-image')) return true;
  return false;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapName(name: string, maxChars = 18, maxLines = 3): string[] {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return ['Product'];
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word.length > maxChars ? `${word.slice(0, maxChars - 1)}…` : word;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines.slice(0, maxLines);
}

/** Branded SVG for cart / toast — keeps tiny thumbs logo-only (full text doesn't fit). */
export function getProductPlaceholderSrc(name: string, size = 480): string {
  const displayName = (name || 'Product').trim() || 'Product';
  const pad = Math.round(size * 0.08);
  const tiny = size <= 200;

  // Small embeds (search/cart): wordmark only — product name is shown beside the thumb
  if (tiny) {
    const wordSize = Math.max(9, Math.round(size * 0.11));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="100%" stop-color="#EAF3F8"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" fill="none" stroke="#0D2B3A" stroke-opacity="0.12" stroke-width="1"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#1A73A8" font-family="system-ui,sans-serif" font-size="${wordSize}" font-weight="700" letter-spacing="1.5">MANPASAND</text>
</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  const lines = wrapName(displayName, size >= 360 ? 18 : 12, 3);
  const fontSize = size >= 360 ? 22 : 14;
  const lineHeight = fontSize + 8;
  const blockH = lines.length * lineHeight;
  const startY = size * 0.52 - blockH / 2 + fontSize * 0.8;

  const textNodes = lines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="50%" y="${y}" text-anchor="middle" fill="#0D2B3A" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="600">${escapeXml(line)}</text>`;
    })
    .join('');

  const pad2 = Math.round(size * 0.1);
  const logoY = size * 0.26;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="100%" stop-color="#EAF3F8"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" fill="none" stroke="#0D2B3A" stroke-opacity="0.12" stroke-width="1"/>
  <rect x="${pad2}" y="${pad2}" width="${size - pad2 * 2}" height="${size - pad2 * 2}" fill="none" stroke="#1A73A8" stroke-opacity="0.16" stroke-width="1"/>
  <text x="50%" y="${logoY}" text-anchor="middle" fill="#1A73A8" font-family="system-ui,sans-serif" font-size="${Math.max(11, Math.round(size * 0.036))}" font-weight="600" letter-spacing="3">MANPASAND</text>
  <line x1="${size * 0.38}" y1="${size * 0.34}" x2="${size * 0.46}" y2="${size * 0.34}" stroke="#1A73A8" stroke-opacity="0.35" stroke-width="1"/>
  <circle cx="${size / 2}" cy="${size * 0.34}" r="2" fill="#1A73A8" fill-opacity="0.45"/>
  <line x1="${size * 0.54}" y1="${size * 0.34}" x2="${size * 0.62}" y2="${size * 0.34}" stroke="#1A73A8" stroke-opacity="0.35" stroke-width="1"/>
  ${textNodes}
  <text x="50%" y="${size * 0.88}" text-anchor="middle" fill="#1A73A8" fill-opacity="0.8" font-family="system-ui,sans-serif" font-size="${Math.max(9, Math.round(size * 0.028))}" font-weight="500" letter-spacing="2">PREMIUM QUALITY</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Prefer real image; otherwise return name-based placeholder data URI. */
export function resolveProductImage(
  src: string | null | undefined,
  name: string,
  size = 480
): string {
  if (!isMissingProductImage(src)) return src!.trim();
  return getProductPlaceholderSrc(name, size);
}
