import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo/config';

/**
 * Fully open crawl policy — Google, Bing, and AI crawlers may index the entire site.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: '/' as const,
    disallow: [] as string[],
  };

  return {
    rules: [
      { userAgent: '*', ...allowAll },
      { userAgent: 'Googlebot', ...allowAll },
      { userAgent: 'Googlebot-Image', ...allowAll },
      { userAgent: 'Bingbot', ...allowAll },
      { userAgent: 'Slurp', ...allowAll },
      { userAgent: 'DuckDuckBot', ...allowAll },
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'ChatGPT-User', ...allowAll },
      { userAgent: 'Google-Extended', ...allowAll },
      { userAgent: 'anthropic-ai', ...allowAll },
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'Claude-Web', ...allowAll },
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Applebot', ...allowAll },
      { userAgent: 'Applebot-Extended', ...allowAll },
      { userAgent: 'Bytespider', ...allowAll },
      { userAgent: 'meta-externalagent', ...allowAll },
      { userAgent: 'FacebookBot', ...allowAll },
      { userAgent: 'CCBot', ...allowAll },
      { userAgent: 'cohere-ai', ...allowAll },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
