'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Search, Leaf } from 'lucide-react';
import Link from 'next/link';

const remedies = [
  { name: 'Turmeric', category: 'Anti-inflammatory', image: '/Banner-01.jpg' },
  { name: 'Ginger', category: 'Digestive Health', image: '/Banner-01.jpg' },
  { name: 'Cinnamon', category: 'Blood Sugar', image: '/Banner-01.jpg' },
  { name: 'Fenugreek', category: 'Hormonal Balance', image: '/Banner-01.jpg' },
  { name: 'Black Seed', category: 'Immune Support', image: '/Banner-01.jpg' },
  { name: 'Honey', category: 'Natural Sweetener', image: '/Banner-01.jpg' },
];

export default function HerbalRemediesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Leaf className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">700+ Herbs & Remedies</h1>
            </div>
            <p className="text-xl text-white/90">
              Explore our extensive collection of traditional herbs and natural remedies for
              wellness and health
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search herbs and remedies..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {remedies.map((remedy, index) => (
              <motion.div
                key={remedy.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-[#F8F2DE]">
                  <img
                    src={remedy.image}
                    alt={remedy.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#1A73A8] font-semibold uppercase">
                    {remedy.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#0D2B3A] mt-2 mb-2">{remedy.name}</h3>
                  <Link
                    href={`/products/${remedy.name.toLowerCase()}`}
                    className="text-[#1A73A8] hover:text-[#0D2B3A] font-semibold"
                  >
                    Learn More →
                  </Link>
                </div>
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

