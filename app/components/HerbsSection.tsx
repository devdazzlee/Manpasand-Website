'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HerbsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block"
            >
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#DFF3EA] mx-auto mb-4 sm:mb-6" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-4 sm:px-0">
              700+ Herbs & Remedies
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-4 sm:px-6 md:px-0">
              Explore our extensive collection of traditional herbs, natural remedies, 
              and premium quality products. From ancient remedies to modern wellness, 
              we have everything you need for a healthy lifestyle.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-2 sm:pt-4"
            >
              <Link
                href="/herbal-remedies"
                className="inline-flex items-center space-x-2 bg-[#DFF3EA] hover:bg-white text-[#0D2B3A] px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl"
              >
                <span>Explore Herbs</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

