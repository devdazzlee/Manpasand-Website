'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import { Sparkles } from 'lucide-react';

const newProducts = [
  {
    id: 'new-1',
    name: 'Premium Walnuts',
    price: 2800,
    originalPrice: 3300,
    image: '/Almonds-Banner-1.jpg',
    category: 'Nuts',
  },
  {
    id: 'new-2',
    name: 'Medjool Dates',
    price: 2200,
    originalPrice: 2600,
    image: '/Ajwa-Dates-Banner-1.jpg',
    category: 'Dates',
  },
];

export default function NewArrivalsPage() {
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
              <Sparkles className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">New Arrivals</h1>
            </div>
            <p className="text-xl text-white/90">Check out our latest products</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
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

