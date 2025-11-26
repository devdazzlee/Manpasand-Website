'use client';

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
  
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.some((item: { id: string }) => item.id === id));
    }
  }, [id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const product = { id, name, price, originalPrice, image, category };
      
      if (isInWishlist) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter((item: { id: string }) => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
      }
      
      // Dispatch event to update header count
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

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
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden">
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
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            {category && (
              <p className="text-[#6B7280] text-xs mb-1 sm:mb-2 uppercase tracking-wide">
                {category}
              </p>
            )}
            <Link href={`/products/${id}`}>
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-[#0D2B3A] mb-2 sm:mb-3 hover:text-[#1A73A8] transition-colors">
                {name}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#0D2B3A]">
                Rs. {price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm sm:text-base md:text-lg text-[#6B7280] line-through">
                  Rs. {originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
              <motion.button
                onClick={toggleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-[#DFF3EA] rounded-full flex items-center justify-center hover:bg-[#DFF3EA] transition-colors flex-shrink-0 ${
                  isInWishlist ? 'bg-red-50 border-red-200 hover:bg-red-100' : ''
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-[#0D2B3A]'}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#1A73A8] text-white rounded-full flex items-center justify-center hover:bg-[#0D2B3A] transition-colors font-semibold text-sm sm:text-base flex-1 sm:flex-initial"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
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
          <div className="absolute top-4 right-4 z-10">
            <motion.button
              onClick={toggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#DFF3EA] transition-colors ${
                isInWishlist ? 'bg-red-50 hover:bg-red-100' : ''
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-[#0D2B3A]'}`} />
            </motion.button>
          </div>
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        {category && (
          <p className="text-[#6B7280] text-xs mb-1 sm:mb-2 uppercase tracking-wide">
            {category}
          </p>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-[#0D2B3A] mb-2 sm:mb-3 hover:text-[#1A73A8] transition-colors line-clamp-2 text-sm sm:text-base">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
            <span className="text-base sm:text-lg md:text-xl font-bold text-[#0D2B3A]">
              Rs. {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-[#6B7280] line-through">
                Rs. {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-[#1A73A8] text-white rounded-full flex items-center justify-center hover:bg-[#0D2B3A] transition-colors flex-shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

