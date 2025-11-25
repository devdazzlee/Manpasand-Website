'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import Link from 'next/link';

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
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-8 h-8 fill-white" />
              <h1 className="text-4xl md:text-5xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-xl text-white/90">Save your favorite items</p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {items.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={`/products/${item.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-[#F8F2DE]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      {!item.inStock && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Out of Stock
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-[#0D2B3A] mb-2 hover:text-[#1A73A8] transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-[#0D2B3A]">
                        Rs. {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-[#6B7280] line-through">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!item.inStock}
                        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-full font-semibold transition-colors ${
                          item.inStock
                            ? 'bg-[#1A73A8] hover:bg-[#0D2B3A] text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="w-12 h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#0D2B3A] mb-4">Your wishlist is empty</h2>
              <p className="text-[#6B7280] mb-8">Start adding items to your wishlist!</p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-full font-semibold transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </Link>
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

