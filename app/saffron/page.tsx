'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import { Sparkles } from 'lucide-react';

const saffronProducts = [
  {
    id: 'saffron-1',
    name: 'Premium Kashmiri Saffron',
    price: 15000,
    originalPrice: 18000,
    image: '/Banner-01.jpg',
    category: 'Saffron',
  },
  {
    id: 'saffron-2',
    name: 'Iranian Saffron Threads',
    price: 12000,
    originalPrice: 15000,
    image: '/Banner-01.jpg',
    category: 'Saffron',
  },
];

export default function SaffronPage() {
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
              <Sparkles className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Premium Saffron Collection</h1>
            </div>
            <p className="text-xl text-white/90">
              The world's most precious spice, carefully sourced and authenticated
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0D2B3A] mb-4">Why Choose Our Saffron?</h2>
            <p className="text-lg text-[#6B7280]">
              We source only the finest saffron from trusted growers, ensuring authenticity and
              premium quality in every thread.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saffronProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
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

