'use client';

import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import { CheckCircle, Package, Mail, Home } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Success Section */}
      <section className="py-20 bg-gradient-to-b from-[#F8F2DE] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="w-24 h-24 bg-[#DFF3EA] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-16 h-16 text-[#1A73A8]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0D2B3A]">
                Order Confirmed!
              </h1>
              <p className="text-xl text-[#6B7280]">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 mt-8 space-y-6"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Package className="w-6 h-6 text-[#1A73A8]" />
                <h2 className="text-2xl font-bold text-[#0D2B3A]">Order Details</h2>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Order Number:</span>
                  <span className="font-semibold text-[#0D2B3A]">#MP-2024-001234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Order Date:</span>
                  <span className="font-semibold text-[#0D2B3A]">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Total Amount:</span>
                  <span className="font-semibold text-[#1A73A8] text-xl">Rs. 6,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Payment Method:</span>
                  <span className="font-semibold text-[#0D2B3A]">Cash on Delivery</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-[#6B7280]">
                  <Mail className="w-5 h-5" />
                  <p className="text-sm">
                    A confirmation email has been sent to your email address.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Link href="/account/orders">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Package className="w-5 h-5" />
                  <span>View Orders</span>
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white hover:bg-[#DFF3EA] text-[#0D2B3A] px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2 border-2 border-[#0D2B3A]"
                >
                  <Home className="w-5 h-5" />
                  <span>Continue Shopping</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

