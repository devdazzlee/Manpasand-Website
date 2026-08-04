'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useWebCategoryStore } from '../../lib/store/webCategoryStore';

const STORES = [
  {
    name: 'Bahadurabad, Karachi',
    phone: '021-34892110',
    tel: 'tel:02134892110',
    maps: 'https://www.google.com/maps/place/Manpasand+Store+Bahadurabad/@24.8827589,67.069352,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33ff52d5284f9:0x9a310ddf5383b6c2!8m2!3d24.8827589!4d67.069352!16s%2Fg%2F11ynv90wxj',
  },
  {
    name: 'Phase 4, DHA, Karachi',
    phone: '021-35384433',
    tel: 'tel:02135384433',
    maps: 'https://www.google.com/maps/place/Manpasand+dry+fruit/@24.8237151,67.0618563,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33c44fa4896dd:0x7151d4b8979aea1a!8m2!3d24.8237151!4d67.0618563!16s%2Fg%2F11cs69j876',
  },
  {
    name: 'AQ Supermarket, Bahria Town',
    phone: '+92 342 3344040',
    tel: 'tel:+923423344040',
    maps: 'https://www.google.com/maps/search/?api=1&query=Shop+No+209%2C+AQ+Supermarket%2C+Bahria+Town+Karachi',
  },
];

const INFO_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Shipping', href: '/shipping-returns' },
  { name: 'Privacy', href: '/privacy-policy' },
  { name: 'Terms', href: '/terms-conditions' },
];

const ACCOUNT_LINKS = [
  { name: 'My Account', href: '/login' },
  { name: 'Orders', href: '/account/orders' },
  { name: 'Returns', href: '/shipping-returns' },
  { name: 'Support', href: '/contact' },
];

const linkClass =
  'block py-1.5 text-sm text-gray-300 hover:text-white transition-colors leading-snug';

export default function Footer() {
  const allFromStore = useWebCategoryStore((s) => s.all);

  const categories = useMemo(
    () => (allFromStore ?? []).filter((c) => c.is_active).slice(0, 8),
    [allFromStore]
  );

  return (
    <footer className="bg-[#0D2B3A] text-white">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        {/* Brand row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-8 border-b border-white/10">
          <div className="max-w-md">
            <picture>
              <source srcSet="/Manpasand-Logo.webp" type="image/webp" />
              <img
                src="/Manpasand-Logo.png"
                alt="Manpasand Store"
                className="h-11 sm:h-14 w-auto mb-3"
                width={94}
                height={84}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your One-Stop Shop for Premium Dry Fruits, Spices &amp; Herbs. Proudly serving Karachi with excellence since 2000.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
              <a href="tel:+923423344040" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#5BA3D0] shrink-0" aria-hidden="true" />
                +92 342 3344040
              </a>
              <a href="mailto:Contact@manpasandstore.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#5BA3D0] shrink-0" aria-hidden="true" />
                Contact@manpasandstore.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 md:pt-1">
            <span className="text-gray-300 text-sm">Follow us</span>
            <a
              href="https://www.facebook.com/manpasandstore/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/manpasandstoreofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10 py-8">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Shop</h3>
            <ul className="space-y-0">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/categories/${cat.slug}`} className={linkClass}>
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/shop" className={linkClass}>
                    All Products
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Info</h3>
            <ul className="space-y-0">
              {INFO_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Account</h3>
            <ul className="space-y-0">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Our Stores</h3>
            <ul className="space-y-4">
              {STORES.map((store) => (
                <li key={store.name} className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-[#5BA3D0] mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <a
                      href={store.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-300 hover:text-white transition-colors leading-snug"
                    >
                      {store.name}
                    </a>
                    <a
                      href={store.tel}
                      className="block text-sm text-gray-300 hover:text-white transition-colors mt-0.5"
                    >
                      {store.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-gray-300 text-xs sm:text-sm">
            © {new Date().getFullYear()} Manpasand Store. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs sm:text-sm text-gray-300">
            <Link href="/privacy-policy" className="hover:text-white transition-colors py-1">
              Privacy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors py-1">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
