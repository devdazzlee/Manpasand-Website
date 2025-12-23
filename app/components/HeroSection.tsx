'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
          className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-[#DFF3EA] rounded-full blur-3xl"
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
          className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-48 h-48 md:w-96 md:h-96 bg-[#F97316] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                🏆 25+ Years of Excellence
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Premium Quality
              <span className="block text-[#DFF3EA] mt-1 sm:mt-2">Dry Fruits & Spices</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-2 sm:px-0">
              Discover 700+ herbs, remedies, and premium quality products. 
              25+ years of excellence in Bahadurabad, Karachi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 bg-[#1A73A8] hover:bg-[#DFF3EA] text-white hover:text-[#0D2B3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-xl text-sm sm:text-base md:text-lg"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 border border-white/30 text-sm sm:text-base md:text-lg"
                >
                  <span>Learn More</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full flex items-center justify-center mt-6 sm:mt-8 md:mt-0 px-2 sm:px-0"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-full sm:max-w-lg md:max-w-2xl"
            >
              <img
                src="/Manpasand-Banner-design-01-min.jpg"
                alt="Manpasand Store"
                className="w-full h-auto rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl sm:shadow-2xl block"
                style={{ 
                  minHeight: '300px', 
                  height: 'auto',
                  maxHeight: 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B3A]/30 to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

