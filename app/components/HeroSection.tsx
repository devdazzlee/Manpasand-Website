import Link from 'next/link';

const BANNER_ALT =
  'Manpasand - Curated Delights Since 2000. Dry fruits, honey, and spices.';

/**
 * Full-bleed LCP hero.
 * Stable aspect-ratio sizing (no svh) — mobile browser chrome / svh changes caused CLS.
 * Mobile forces 750.webp via <picture> to avoid DPR upscale to 1200.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0D2B3A] aspect-[16/9] max-h-[70vh]">
      <h1 className="sr-only">
        Manpasand Store — Premium Dry Fruits, Dates, Nuts & Spices in Pakistan
      </h1>
      <Link
        href="/shop"
        className="absolute inset-0 block"
        aria-label="Shop Manpasand collection"
      >
        <picture>
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
            height={900}
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
