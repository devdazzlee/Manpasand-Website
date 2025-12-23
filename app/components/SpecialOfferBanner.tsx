'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function SpecialOfferBanner() {
  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Special Offer!</h3>
              <p className="text-white/90 text-sm sm:text-base">Get Rs. 500 off on your first order</p>
            </div>
          </div>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#0D2B3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#DFF3EA] transition-colors shadow-xl w-full sm:w-auto"
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

