'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Loader from './Loader';
import { Category } from '../../lib/api/categoryApi';

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export default function CategoriesSection({ categories, loading, error }: CategoriesSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-[#F8F2DE]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F97316] mx-auto" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0">
            Explore our wide range of premium products
          </p>
        </motion.div>
        {loading ? (
          <Loader size="lg" text="Loading categories..." />
        ) : error && categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch">
            {categories.map((category, index) => (
              <motion.div
                key={category.id || category.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="h-full flex"
              >
                <Link href={`/categories/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`} className="w-full flex flex-col">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col h-full border border-gray-100 hover:border-[#1A73A8]/30">
                    <div className="relative aspect-square overflow-hidden flex-shrink-0 bg-gray-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${category.image || '/Banner-01.jpg'})`,
                        }}
                      />
                      {/* Hidden img for accessibility and error detection */}
                      <img
                        src={category.image || '/Banner-01.jpg'}
                        alt={category.name}
                        className="absolute opacity-0 w-0 h-0"
                        aria-hidden="true"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          const bgDiv = parent?.querySelector('div[style*="backgroundImage"]') as HTMLElement;
                          if (bgDiv && target.src !== window.location.origin + '/Banner-01.jpg') {
                            console.warn(`Category image failed to load: ${category.name} - ${target.src}`);
                            bgDiv.style.backgroundImage = `url('/Banner-01.jpg')`;
                          }
                        }}
                        onLoad={() => {
                          // Image loaded successfully
                          if (category.image && !category.image.includes('Banner-01')) {
                            console.log(`Category image loaded: ${category.name} - ${category.image}`);
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B3A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <div className="p-4 sm:p-5 text-center flex items-center justify-center min-h-[70px] sm:min-h-[80px] flex-grow bg-gradient-to-b from-white to-gray-50/50">
                      <h3 className="font-bold text-[#0D2B3A] text-sm sm:text-base md:text-lg group-hover:text-[#1A73A8] transition-colors line-clamp-2 leading-tight">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

