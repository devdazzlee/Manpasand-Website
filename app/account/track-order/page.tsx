'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const trackingSteps = [
  { status: 'Order Placed', date: '2024-01-15', time: '10:00 AM', completed: true },
  { status: 'Processing', date: '2024-01-15', time: '11:30 AM', completed: true },
  { status: 'Shipped', date: '2024-01-16', time: '02:00 PM', completed: true },
  { status: 'Out for Delivery', date: '2024-01-17', time: '09:00 AM', completed: true },
  { status: 'Delivered', date: '2024-01-17', time: '03:30 PM', completed: true },
];

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTracking, setShowTracking] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTracking(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-xl text-white/90">Enter your tracking number to see order status</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F8F2DE] rounded-2xl p-8 mb-8"
          >
            <form onSubmit={handleTrack} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., TRK123456789)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Track Order
              </motion.button>
            </form>
          </motion.div>

          {/* Tracking Timeline */}
          {showTracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Package className="w-6 h-6 text-[#1A73A8]" />
                <div>
                  <h2 className="text-2xl font-bold text-[#0D2B3A]">Tracking: TRK123456789</h2>
                  <p className="text-[#6B7280]">Order #MP-001</p>
                </div>
              </div>

              <div className="space-y-6">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-[#1A73A8] text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`w-1 h-16 ${
                            step.completed ? 'bg-[#1A73A8]' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-semibold text-[#0D2B3A] mb-1">{step.status}</h3>
                      <p className="text-sm text-[#6B7280]">
                        {step.date} at {step.time}
                      </p>
                    </div>
                  </div>
                ))}
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

