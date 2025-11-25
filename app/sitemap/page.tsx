'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import Link from 'next/link';
import { Map as SitemapIcon } from 'lucide-react';

const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { name: 'Dry Fruits', href: '/categories/dry-fruits' },
      { name: 'Dates', href: '/categories/dates' },
      { name: 'Nuts', href: '/categories/nuts' },
      { name: 'Honey', href: '/categories/honey' },
      { name: 'Spices', href: '/categories/spices' },
      { name: 'Herbs', href: '/categories/herbs' },
    ],
  },
  {
    title: 'Account',
    links: [
      { name: 'Login', href: '/login' },
      { name: 'Register', href: '/register' },
      { name: 'My Account', href: '/account' },
      { name: 'My Orders', href: '/account/orders' },
      { name: 'Wishlist', href: '/wishlist' },
    ],
  },
  {
    title: 'Information',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping & Returns', href: '/shipping-returns' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <SitemapIcon className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Sitemap</h1>
            </div>
            <p className="text-xl text-white/90">Find all pages on our website</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sitemapSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F8F2DE] rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-[#0D2B3A] mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[#6B7280] hover:text-[#1A73A8] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

