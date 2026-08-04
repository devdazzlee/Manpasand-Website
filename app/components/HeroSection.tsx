import Link from 'next/link';

const BANNER_ALT =
  'Manpasand - Curated Delights Since 2000. Dry fruits, honey, and spices.';

/**
 * LCP element — keep as a server component with no JS.
 * Use <img srcSet> (not <picture>) so discovery matches the preload hint.
 * decoding="sync" avoids LCP render delay from async decode.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#0D2B3A]">
      <Link href="/shop" className="block w-full" aria-label="Shop Manpasand collection">
        <img
          src="/banners/New-Banner-750.webp"
          srcSet="/banners/New-Banner-750.webp 750w, /banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w"
          sizes="100vw"
          alt={BANNER_ALT}
          width={1600}
          height={889}
          className="w-full h-auto block object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </Link>
    </section>
  );
}
