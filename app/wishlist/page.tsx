'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Heart, ShoppingCart, Trash2, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cartUtils } from '../../lib/utils/cart';

const wishlistItems = [
  {
    id: '1',
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    image: '/Almonds-Banner-1.jpg',
    inStock: true,
  },
  {
    id: '2',
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    image: '/Ajwa-Dates-Banner-1.jpg',
    inStock: true,
  },
  {
    id: '3',
    name: 'Pistachio',
    price: 4500,
    originalPrice: 5200,
    image: '/Pistachio-Banner.jpg',
    inStock: false,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const router = useRouter();

  // Load wishlist from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setItems(wishlist);
    }

    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setItems(wishlist);
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  const removeItem = (id: string) => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updatedWishlist = wishlist.filter((item: any) => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setItems(updatedWishlist);
      
      // Dispatch event to update header count
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  const handleAddToCart = (item: any) => {
    cartUtils.addToCart({
      id: item.id,
      name: item.name,
      price: item.price || 0,
      image: item.image || '/Banner-01.jpg',
      productId: item.id,
    });
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleBuyNow = (item: any) => {
    cartUtils.addToCart({
      id: item.id,
      name: item.name,
      price: item.price || 0,
      image: item.image || '/Banner-01.jpg',
      productId: item.id,
    });
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-2 md:mb-3">
              <Heart className="w-6 h-6 md:w-8 md:h-8 fill-white" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-white/90">Save your favorite items for later</p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          {items.length > 0 ? (
            <>
              {/* Wishlist Summary */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  <span className="font-semibold text-[#0D2B3A]">{items.length}</span> {items.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
                {items.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your wishlist?')) {
                        localStorage.setItem('wishlist', '[]');
                        setItems([]);
                        window.dispatchEvent(new Event('wishlistUpdated'));
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Grid Layout - Same as Product Card */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    className="h-full"
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/products/${item.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={item.image || '/Banner-01.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/Banner-01.jpg';
                          }}
                        />
                        {item.inStock === false && (
                          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                            Out of Stock
                          </div>
                        )}
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                      {item.category && (
                        <p className="text-[#6B7280] text-[10px] sm:text-xs mb-1 sm:mb-2 uppercase tracking-wide">
                          {item.category}
                        </p>
                      )}
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-[#0D2B3A] mb-2 sm:mb-3 hover:text-[#1A73A8] transition-colors line-clamp-2 text-xs sm:text-sm md:text-base leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                        <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#0D2B3A]">
                            Rs. {(item.price || 0).toLocaleString()}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] line-through">
                              Rs. {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(item)}
                          disabled={item.inStock === false}
                          className={`flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-[#1A73A8] text-white rounded-full flex items-center justify-center hover:bg-[#0D2B3A] transition-colors font-semibold text-[10px] sm:text-xs md:text-sm ${
                            addedToCart === item.id ? 'bg-green-500 hover:bg-green-600' : ''
                          }`}
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                          <span className="truncate">{addedToCart === item.id ? 'Added!' : 'Add to Cart'}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBuyNow(item)}
                          disabled={item.inStock === false}
                          className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white rounded-full flex items-center justify-center hover:from-[#FF6B35] hover:to-[#F97316] transition-all font-semibold text-[10px] sm:text-xs md:text-sm shadow-md hover:shadow-lg"
                          aria-label="Buy now"
                        >
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                          <span className="truncate">Buy Now</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 md:py-16"
            >
              <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md mx-auto shadow-lg">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Heart className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-3">Your wishlist is empty</h2>
                <p className="text-[#6B7280] mb-6 text-sm md:text-base">Start adding your favorite items to your wishlist!</p>
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-colors text-sm md:text-base"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

