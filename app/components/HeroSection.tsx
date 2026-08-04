import Link from 'next/link';

const BANNER_ALT =
  'Manpasand - Curated Delights Since 2000. Dry fruits, honey, and spices.';

/**
 * Full-bleed LCP hero. Width always edge-to-edge; height capped to the
 * remaining viewport so the banner fits on first paint without side gutters.
 */
export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0D2B3A] aspect-[1600/889] max-h-[calc(100svh-4rem)] md:max-h-[calc(100svh-7.25rem)]"
    >
      <h1 className="sr-only">
        Manpasand Store — Premium Dry Fruits, Dates, Nuts & Spices in Pakistan
      </h1>
      <Link
        href="/shop"
        className="absolute inset-0 block"
        aria-label="Shop Manpasand collection"
      >
        <img
          src="/banners/New-Banner-750.webp"
          srcSet="/banners/New-Banner-750.webp 750w, /banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w"
          sizes="100vw"
          alt={BANNER_ALT}
          width={1600}
          height={889}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </Link>
    </section>
  );
}
