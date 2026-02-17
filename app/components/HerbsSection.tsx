'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HerbsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#DFF3EA] mx-auto" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Authentic Herbs & Traditional Remedies
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
              Discover 700+ premium-grade natural products. From rare medicinal herbs to everyday wellness staples, find everything you need for a healthier you at Manpasand.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="pt-2"
            >
              <Link
                href="/herbal-remedies"
                className="inline-flex items-center space-x-2 bg-[#DFF3EA] hover:bg-white text-[#0D2B3A] px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg"
              >
                <span>Explore Herbs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
