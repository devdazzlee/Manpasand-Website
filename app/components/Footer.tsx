'use client';

import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0D2B3A] text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">

        {/* Top: Logo + Description + Social */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-8 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-white/10">
          <div className="max-w-lg">
            <img
              src="/Manpasand-Logo.png"
              alt="Manpasand Store"
              className="h-12 sm:h-16 w-auto mb-3"
              width={120}
              height={48}
            />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">
              Your One-Stop Shop for Premium Dry Fruits, Spices &amp; Herbs. Proudly serving Karachi with excellence since 2000.
            </p>
            <div className="flex items-center gap-4">
              <a href="tel:+923423344040" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                <Phone className="w-3.5 h-3.5" />
                <span>+92 342 3344040</span>
              </a>
              <a href="mailto:Contact@manpasandstore.com" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact@manpasandstore.com</span>
              </a>
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <span className="text-gray-500 text-xs mr-1 hidden sm:inline">Follow us</span>
            <a
              href="https://www.facebook.com/manpasandstore/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/manpasandstoreofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links: 3 columns on mobile (compact), 4 columns on lg with contact */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Shop */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">Shop</h3>
            <ul className="space-y-1 sm:space-y-1.5">
              {[
                { name: 'Dry Fruits', href: '/categories/dry-fruits' },
                { name: 'Dates', href: '/categories/dates' },
                { name: 'Nuts', href: '/categories/nuts' },
                { name: 'Honey', href: '/categories/honey' },
                { name: 'Saffron', href: '/categories/saffron' },
                { name: 'Spices', href: '/categories/spices' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#DFF3EA] transition-colors text-[11px] sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">Info</h3>
            <ul className="space-y-1 sm:space-y-1.5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Shipping', href: '/shipping-returns' },
                { name: 'Privacy', href: '/privacy-policy' },
                { name: 'Terms', href: '/terms-conditions' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#DFF3EA] transition-colors text-[11px] sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">Account</h3>
            <ul className="space-y-1 sm:space-y-1.5">
              {[
                { name: 'My Account', href: '/login' },
                { name: 'Orders', href: '/orders' },
                { name: 'Returns', href: '/shipping-returns' },
                { name: 'Support', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#DFF3EA] transition-colors text-[11px] sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — desktop only full column */}
          <div className="hidden lg:block">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Our Stores</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1A73A8] mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <a href="https://www.google.com/maps/place/Manpasand+Store+Bahadurabad/@24.8827589,67.069352,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33ff52d5284f9:0x9a310ddf5383b6c2!8m2!3d24.8827589!4d67.069352!16s%2Fg%2F11ynv90wxj" target="_blank" rel="noopener noreferrer" className="hover:text-[#DFF3EA] transition-colors">Bahadurabad, Karachi</a>
                  <br />
                  <a href="tel:02134892110" className="hover:text-[#DFF3EA] transition-colors">021-34892110</a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1A73A8] mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <a href="https://www.google.com/maps/place/Manpasand+dry+fruit/@24.8237151,67.0618563,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33c44fa4896dd:0x7151d4b8979aea1a!8m2!3d24.8237151!4d67.0618563!16s%2Fg%2F11cs69j876" target="_blank" rel="noopener noreferrer" className="hover:text-[#DFF3EA] transition-colors">Phase 4, DHA, Karachi</a>
                  <br />
                  <a href="tel:02135384433" className="hover:text-[#DFF3EA] transition-colors">021-35384433</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1A73A8] flex-shrink-0" />
                <a href="mailto:Contact@manpasandstore.com" className="text-gray-400 hover:text-[#DFF3EA] transition-colors text-sm">
                  Contact@manpasandstore.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only contact row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 lg:hidden text-[11px] sm:text-xs text-gray-400">
          <a href="mailto:Contact@manpasandstore.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#1A73A8]" />
            Contact@manpasandstore.com
          </a>
          <a href="https://www.google.com/maps/place/Manpasand+Store+Bahadurabad/@24.8827589,67.069352,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33ff52d5284f9:0x9a310ddf5383b6c2!8m2!3d24.8827589!4d67.069352!16s%2Fg%2F11ynv90wxj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#1A73A8]" />
            Bahadurabad &amp; DHA, Karachi
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <p className="text-gray-500 text-[10px] sm:text-xs">
              © {new Date().getFullYear()} Manpasand Store. All rights reserved.
            </p>
            <div className="flex gap-4 text-[10px] sm:text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
