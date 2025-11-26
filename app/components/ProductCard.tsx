'use client';

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  viewMode = 'grid',
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex"
      >
        <Link href={`/products/${id}`} className="flex-shrink-0">
          <div className="relative w-48 h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{discount}%
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {category && (
              <p className="text-[#6B7280] text-xs mb-2 uppercase tracking-wide">
                {category}
              </p>
            )}
            <Link href={`/products/${id}`}>
              <h3 className="font-semibold text-xl text-[#0D2B3A] mb-3 hover:text-[#1A73A8] transition-colors">
                {name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-[#0D2B3A]">
                Rs. {price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-lg text-[#6B7280] line-through">
                  Rs. {originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white border-2 border-[#DFF3EA] rounded-full flex items-center justify-center hover:bg-[#DFF3EA] transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5 text-[#0D2B3A]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#1A73A8] text-white rounded-full flex items-center justify-center hover:bg-[#0D2B3A] transition-colors font-semibold"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#DFF3EA] transition-colors">
              <Heart className="w-5 h-5 text-[#0D2B3A]" />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-5">
        {category && (
          <p className="text-[#6B7280] text-xs mb-2 uppercase tracking-wide">
            {category}
          </p>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-[#0D2B3A] mb-3 hover:text-[#1A73A8] transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#0D2B3A]">
              Rs. {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-[#6B7280] line-through">
                Rs. {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-[#1A73A8] text-white rounded-full flex items-center justify-center hover:bg-[#0D2B3A] transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

