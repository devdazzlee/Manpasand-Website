'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Globe, CheckCircle } from 'lucide-react';

const sourcingInfo = [
  {
    title: 'Direct from Growers',
    description: 'We source directly from trusted growers and farmers to ensure quality.',
  },
  {
    title: 'Authentic Origins',
    description: 'Our products come from their authentic regions - dates from Madinah, saffron from Kashmir.',
  },
  {
    title: 'Quality Assurance',
    description: 'Every batch is tested for quality, freshness, and authenticity.',
  },
  {
    title: 'Sustainable Practices',
    description: 'We support sustainable farming practices and fair trade.',
  },
];

export default function IngredientSourcingPage() {
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
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ingredient Sourcing Transparency</h1>
            <p className="text-xl text-white/90">
              Learn about where our products come from and how we ensure quality
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {sourcingInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F8F2DE] rounded-2xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[#1A73A8] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-[#0D2B3A] mb-2">{info.title}</h3>
                    <p className="text-[#6B7280]">{info.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Our Commitment</h2>
            <p className="text-[#6B7280] leading-relaxed">
              At Manpasand Store, we believe in complete transparency about where our products come
              from. We work directly with growers and suppliers who share our commitment to quality,
              authenticity, and ethical practices. Every product in our store is carefully selected
              and verified to meet our high standards.
            </p>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

