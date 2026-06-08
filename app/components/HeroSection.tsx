'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#0D2B3A]">
      <Link href="/shop" className="block w-full" aria-label="Shop Manpasand collection">
        <img
          src="/banners/New-Banner.jpg"
          alt="Manpasand - Curated Delights Since 2000. Dry fruits, honey, and spices."
          className="w-full h-auto block object-cover"
        />
      </Link>
    </section>
  );
}
