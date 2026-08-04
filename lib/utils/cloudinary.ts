/**
 * Rewrite Cloudinary delivery URLs for responsive, modern formats.
 * Non-Cloudinary URLs are returned unchanged.
 * Always rewrites prior f_/q_/w_ transforms so callers can downsize.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  opts: {
    width?: number;
    height?: number;
    quality?: number | string;
  } = {}
): string {
  if (!url) return '';
  const { width = 600, height, quality = 'auto:eco' } = opts;

  const marker = '/image/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  let after = url.slice(idx + marker.length);
  // Strip existing transform segment (f_, q_, w_, …) so we can re-optimize
  if (/^(f_|q_|w_|c_|h_|fl_)/.test(after)) {
    const slash = after.indexOf('/');
    after = slash === -1 ? after : after.slice(slash + 1);
  }

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
