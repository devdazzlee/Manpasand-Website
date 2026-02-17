'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cartUtils } from '../../lib/utils/cart';
import { useProductStore } from '../../lib/store/productStore';

interface ProductCardProps {
  id: string;
  name: string;
  price?: number;
  originalPrice?: number;
  image: string;
  category?: string;
  viewMode?: 'grid' | 'list';
  // Additional fields for price extraction
  sales_rate_inc_dis_and_tax?: string | number;
  sales_rate_exc_dis_and_tax?: string | number;
  selling_price?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  viewMode = 'grid',
  sales_rate_inc_dis_and_tax,
  sales_rate_exc_dis_and_tax,
  selling_price,
}: ProductCardProps) {
  const { prefetchProduct } = useProductStore();
  
  // Extract price from multiple possible fields
  const displayPrice = price 
    || (sales_rate_inc_dis_and_tax ? parseFloat(String(sales_rate_inc_dis_and_tax)) : 0)
    || (sales_rate_exc_dis_and_tax ? parseFloat(String(sales_rate_exc_dis_and_tax)) : 0)
    || selling_price
    || 0;
  const discount = originalPrice && displayPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;
  
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  // Check if product is in wishlist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.some((item: { id: string }) => item.id === id));
    }
  }, [id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartUtils.addToCart({
      id,
      name,
      price: displayPrice,
      image: image || '/Banner-01.jpg',
      productId: id,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart first
    cartUtils.addToCart({
      id,
      name,
      price: displayPrice,
      image: image || '/Banner-01.jpg',
      productId: id,
    });
    // Redirect to checkout
    router.push('/checkout');
  };

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
        className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col sm:flex-row"
      >
        <Link href={`/products/${id}`} className="flex-shrink-0">
          <div className="relative w-full h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            {discount > 0 && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#F97316] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                -{discount}%
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col justify-between">
          <div>
            {category && (
              <p className="text-[#6B7280] text-[10px] sm:text-xs mb-1 sm:mb-2 uppercase tracking-wide">
                {category}
              </p>
            )}
            <Link href={`/products/${id}`}>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#0D2B3A] mb-2 sm:mb-3 hover:text-[#1A73A8] transition-colors line-clamp-2">
                {name}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-wrap">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#0D2B3A]">
                Rs. {displayPrice.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-xs sm:text-sm md:text-base lg:text-lg text-[#6B7280] line-through">
                  Rs. {originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 w-full sm:w-auto">
              <motion.button
                onClick={toggleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white border-2 border-[#DFF3EA] rounded-full flex items-center justify-center hover:bg-[#DFF3EA] transition-colors flex-shrink-0 ${
                  isInWishlist ? 'bg-red-50 border-red-200 hover:bg-red-100' : ''
                }`}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-[#0D2B3A]'}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-full flex items-center justify-center transition-colors font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base flex-1 sm:flex-initial ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#1A73A8] text-white hover:bg-[#0D2B3A]'
                }`}
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">{addedToCart ? 'Added!' : 'Add to Cart'}</span>
                <span className="sm:hidden">{addedToCart ? 'Added!' : 'Add'}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white rounded-full flex items-center justify-center hover:from-[#FF6B35] hover:to-[#F97316] transition-all font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base shadow-lg hover:shadow-xl flex-1 sm:flex-initial"
                aria-label="Buy now"
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Buy Now</span>
                <span className="sm:hidden">Buy</span>
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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col"
    >
      <Link 
        href={`/products/${id}`}
        onMouseEnter={() => prefetchProduct(id)}
        onTouchStart={() => prefetchProduct(id)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={image || '/Banner-01.jpg'}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              if ((e.target as HTMLImageElement).src !== '/Banner-01.jpg') {
                (e.target as HTMLImageElement).src = '/Banner-01.jpg';
              }
            }}
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-[#F97316] text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
              -{discount}%
            </div>
          )}
          <div className="absolute top-2 right-2 z-10">
            <motion.button
              onClick={toggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors ${
                isInWishlist ? 'bg-red-50 hover:bg-red-100' : ''
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
            </motion.button>
          </div>
        </div>
      </Link>
      <div className="p-2.5 sm:p-3 flex flex-col flex-grow">
        {category && (
          <p className="text-[#1A73A8] text-[10px] sm:text-[11px] font-medium mb-1 uppercase tracking-wider">
            {typeof category === 'string' ? category : (category as { id: string; name: string }).name}
          </p>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-[#0D2B3A] mb-1.5 sm:mb-2 hover:text-[#1A73A8] transition-colors line-clamp-2 text-xs sm:text-sm leading-snug">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
          <span className="text-sm sm:text-base font-bold text-[#0D2B3A]">
            Rs. {displayPrice.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-[10px] sm:text-xs text-[#9CA3AF] line-through">
              Rs. {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg flex items-center justify-center font-semibold text-[9px] sm:text-xs transition-colors ${
              addedToCart 
                ? 'bg-green-500 text-white' 
                : 'bg-[#0D2B3A] text-white hover:bg-[#1A73A8]'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1 flex-shrink-0" />
            <span className="truncate">{addedToCart ? 'Added!' : 'Add to Cart'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBuyNow}
            className="flex-1 py-1.5 sm:py-2 bg-[#1A73A8] text-white rounded-md sm:rounded-lg flex items-center justify-center hover:bg-[#0D2B3A] transition-colors font-semibold text-[9px] sm:text-xs"
            aria-label="Buy now"
          >
            <Zap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1 flex-shrink-0" />
            <span className="truncate">Buy Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

