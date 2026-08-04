import Link from 'next/link';

const BANNER_ALT =
  'Manpasand - Curated Delights Since 2000. Dry fruits, honey, and spices.';

/**
 * Full-bleed LCP hero.
 * Mobile uses a single 750w WebP (no DPR upscale to 1200) — Moto G / Slow 4G LCP path.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0D2B3A] aspect-[1600/889] max-h-[calc(100svh-4rem)] md:max-h-[calc(100svh-7.25rem)]">
      <h1 className="sr-only">
        Manpasand Store — Premium Dry Fruits, Dates, Nuts & Spices in Pakistan
      </h1>
      <Link
        href="/shop"
        className="absolute inset-0 block"
        aria-label="Shop Manpasand collection"
      >
        <picture>
          {/* Viewport-based: ignore devicePixelRatio so mobile stays on ~30KB asset */}
          <source
            media="(max-width: 768px)"
            srcSet="/banners/New-Banner-750.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 769px)"
            srcSet="/banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/banners/New-Banner-750.webp"
            alt={BANNER_ALT}
            width={1600}
            height={889}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </Link>
    </section>
  );
}
