'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#0D2B3A] via-[#1A73A8] to-[#0D2B3A] text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-[#DFF3EA] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-[#F97316] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-4 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-white/30">
                🏆 25+ Years of Excellence
              </span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight">
              Your One-Stop Shop for
              <span className="block text-[#DFF3EA] mt-1">Premium Dry Fruits, Spices & Herbs.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-[15px] lg:text-base text-white/90 leading-relaxed">
              Explore over 1000+ authentic Herbs, including Pure Saffron, Organic Honey, and Traditional Remedies. Proudly serving Karachi with excellence since 2000.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-1">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 bg-[#1A73A8] hover:bg-[#DFF3EA] text-white hover:text-[#0D2B3A] px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg text-sm"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/locations"
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 border border-white/30 text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Our Locations</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full mt-4 md:mt-0"
          >
            <div className="relative w-full">
              <img
                src="/IMG_0314.PNG"
                alt="Manpasand Store - Ramadan Kareem"
                className="w-full h-auto rounded shadow-2xl block object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B3A]/20 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
