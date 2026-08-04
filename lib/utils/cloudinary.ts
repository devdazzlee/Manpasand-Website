/**
 * Rewrite Cloudinary delivery URLs for responsive, modern formats.
 * Non-Cloudinary URLs are returned unchanged.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!url) return '';
  const { width = 600, height, quality = 'auto' } = opts;

  const marker = '/image/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  // Already transformed — leave as-is
  const after = url.slice(idx + marker.length);
  if (/^(f_|q_|w_|c_|h_|fl_)/.test(after)) return url;

  const transforms = [
    'f_auto',
    `q_${quality}`,
    `w_${width}`,
    'c_limit',
    height ? `h_${height}` : null,
  ]
    .filter(Boolean)
    .join(',');

  return `${url.slice(0, idx + marker.length)}${transforms}/${after}`;
}
