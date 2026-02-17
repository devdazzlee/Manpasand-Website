'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Loader from './Loader';
import { Category } from '../../lib/api/categoryApi';

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export default function CategoriesSection({ categories, loading, error }: CategoriesSectionProps) {
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-white to-[#F8F2DE]/60">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-2">
            Shop by Category
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm">
            Explore our wide range of premium products
          </p>
        </motion.div>
        {loading ? (
          <Loader size="lg" text="Loading categories..." />
        ) : error && categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
            {categories.map((category, index) => (
              <motion.div
                key={category.id || category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="h-full flex"
              >
                <Link href={`/categories/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`} className="w-full flex flex-col">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col h-full border border-gray-100 hover:border-[#1A73A8]/30">
                    <div className="relative aspect-square overflow-hidden flex-shrink-0 bg-gray-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${category.image || '/Banner-01.jpg'})`,
                        }}
                      />
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
                            bgDiv.style.backgroundImage = `url('/Banner-01.jpg')`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B3A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <div className="p-2.5 sm:p-3 text-center flex items-center justify-center min-h-[48px] sm:min-h-[52px] flex-grow">
                      <h3 className="font-semibold text-[#0D2B3A] text-xs sm:text-sm group-hover:text-[#1A73A8] transition-colors line-clamp-2 leading-tight">
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
