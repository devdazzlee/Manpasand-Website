'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Gift, Heart } from 'lucide-react';
import Link from 'next/link';

const giftPacks = [
  {
    name: 'Eid Gift Pack',
    price: 5000,
    image: '/Banner-01.jpg',
    description: 'Perfect for Eid celebrations',
  },
  {
    name: 'Ramadan Special',
    price: 4500,
    image: '/Banner-01.jpg',
    description: 'Dates and dry fruits for Ramadan',
  },
  {
    name: 'Wedding Gift Set',
    price: 8000,
    image: '/Banner-01.jpg',
    description: 'Premium selection for special occasions',
  },
];

export default function GiftPacksPage() {
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
              <Gift className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Gift Packs & Bundles</h1>
            </div>
            <p className="text-xl text-white/90">
              Thoughtful gift sets for every occasion - Eid, Ramadan, Weddings, and more
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {giftPacks.map((pack, index) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-[#F8F2DE]">
                  <img
                    src={pack.image}
                    alt={pack.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0D2B3A] mb-2">{pack.name}</h3>
                  <p className="text-[#6B7280] mb-4">{pack.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1A73A8]">
                      Rs. {pack.price.toLocaleString()}
                    </span>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-6 py-2 rounded-full font-semibold transition-colors"
                      >
                        Inquire
                      </motion.button>
                    </Link>
                  </div>
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

