'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cartUtils, CartItem } from '../../lib/utils/cart';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      setItems(cartUtils.getCart());
    };

    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const updateQuantity = (id: string, change: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      cartUtils.updateQuantity(id, newQuantity);
      setItems(cartUtils.getCart());
    }
  };

  const removeItem = (id: string) => {
    cartUtils.removeFromCart(id);
    setItems(cartUtils.getCart());
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-xl text-white/90">Review your items</p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6"
                  >
                    <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden bg-[#F8F2DE] flex-shrink-0">
                      <img
                        src={item.image || '/Banner-01.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#0D2B3A] mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-[#1A73A8] mb-4">
                        Rs. {item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 bg-[#F8F2DE] rounded-full px-4 py-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-[#0D2B3A] w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-lg font-semibold text-[#0D2B3A] mt-4">
                        Total: Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-[#F8F2DE] rounded-2xl p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-semibold">Free</span>
                        ) : (
                          `Rs. ${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {subtotal < 5000 && (
                      <p className="text-sm text-[#6B7280]">
                        Add Rs. {(5000 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between text-xl font-bold text-[#0D2B3A]">
                        <span>Total</span>
                        <span>Rs. {total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-4 bg-white hover:bg-[#DFF3EA] text-[#0D2B3A] px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2 border-2 border-[#0D2B3A]"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Continue Shopping</span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#0D2B3A] mb-4">Your cart is empty</h2>
              <p className="text-[#6B7280] mb-8">Start adding items to your cart!</p>
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
