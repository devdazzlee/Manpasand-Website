import type { MetadataRoute } from 'next';
import { SITE_URL, SITEMAP_PATHS } from '../lib/seo/config';
import { API_URL } from '../config/config';

type CategoryRow = { slug: string; is_active?: boolean; updated_at?: string };
type ProductRow = { id: string; updated_at?: string; is_active?: boolean };
type Envelope<T> = { success?: boolean; data?: T; meta?: { totalPages?: number; total?: number } };

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = SITEMAP_PATHS.map((path) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency:
      path === '/' ? 'daily' : path.startsWith('/account') || path === '/cart' || path === '/checkout'
        ? 'monthly'
        : 'weekly',
    priority:
      path === '/'
        ? 1
        : path === '/shop'
          ? 0.95
          : path === '/about' || path === '/contact'
            ? 0.85
            : 0.7,
  }));

  const categoriesPayload = await fetchJson<Envelope<CategoryRow[]>>('/web/categories/all');
  const categoryEntries: MetadataRoute.Sitemap = (categoriesPayload?.data || [])
    .filter((c) => c.slug && c.is_active !== false)
    .map((c) => ({
      url: `${SITE_URL}/categories/${c.slug}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

  // Crawl as many product pages as the API returns (cap pages for build time).
  const productEntries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  const maxPages = 40;
  for (let page = 1; page <= maxPages; page++) {
    const productsPayload = await fetchJson<Envelope<ProductRow[]>>(
      `/web/products?page=${page}&limit=100&sort=newest`
    );
    const rows = productsPayload?.data || [];
    if (rows.length === 0) break;

    for (const p of rows) {
      if (!p.id || p.is_active === false || seen.has(p.id)) continue;
      seen.add(p.id);
      productEntries.push({
        url: `${SITE_URL}/products/${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: 'weekly',
        priority: 0.65,
      });
    }

    const totalPages = productsPayload?.meta?.totalPages;
    if (totalPages && page >= totalPages) break;
    if (rows.length < 100) break;
  }

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
