'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { Product } from '../../lib/api/productApi';
import { useProductStore } from '../../lib/store/productStore';

interface FeaturedProductsSectionProps {
  featuredProducts: Product[];
  loading: boolean;
}

export default function FeaturedProductsSection({ featuredProducts, loading }: FeaturedProductsSectionProps) {
  const { cacheProductList } = useProductStore();
  
  // Cache featured products when they load
  useEffect(() => {
    if (featuredProducts.length > 0) {
      cacheProductList('featured', featuredProducts);
      featuredProducts.forEach(product => {
        // Cache each product individually
        const { cacheProduct } = useProductStore.getState();
        cacheProduct(product);
      });
    }
  }, [featuredProducts, cacheProductList]);
  
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-[#F8F2DE]/60 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-2">
            The Manpasand Favorites
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            Discover the premium staples and natural remedies that have defined our legacy for 25 years.
          </p>
        </motion.div>
        {loading ? (
          <Loader size="lg" text="Loading featured products..." />
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6B7280]">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch">
            {featuredProducts.map((product, index) => {
              // Calculate original price if discount exists
              const priceValue = product.price || product.selling_price || 0;
              const discountAmount = product.discount_amount 
                ? parseFloat(String(product.discount_amount))
                : 0;
              const originalPrice = discountAmount > 0 && priceValue > 0
                ? priceValue + discountAmount
                : undefined;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={priceValue}
                    originalPrice={originalPrice}
                    image={product.image || '/Banner-01.jpg'}
                    category={product.category?.name}
                    sales_rate_inc_dis_and_tax={product.sales_rate_inc_dis_and_tax}
                    sales_rate_exc_dis_and_tax={product.sales_rate_exc_dis_and_tax}
                    selling_price={product.selling_price}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-[#1A73A8] hover:text-[#0D2B3A] font-semibold text-sm group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

