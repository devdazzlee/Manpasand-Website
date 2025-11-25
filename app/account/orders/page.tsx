'use client';

import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import Link from 'next/link';
import { Package, Eye, Truck } from 'lucide-react';

const orders = [
  {
    id: 'MP-001',
    date: '2024-01-15',
    total: 6800,
    status: 'Delivered',
    items: 3,
    tracking: 'TRK123456789',
  },
  {
    id: 'MP-002',
    date: '2024-01-10',
    total: 4500,
    status: 'Processing',
    items: 2,
    tracking: 'TRK987654321',
  },
  {
    id: 'MP-003',
    date: '2024-01-05',
    total: 3200,
    status: 'Delivered',
    items: 1,
    tracking: 'TRK456789123',
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Orders</h1>
            <p className="text-xl text-white/90">View and track your orders</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <Package className="w-6 h-6 text-[#1A73A8]" />
                      <div>
                        <h3 className="text-xl font-bold text-[#0D2B3A]">Order #{order.id}</h3>
                        <p className="text-sm text-[#6B7280]">Placed on {order.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-[#6B7280]">
                        <strong>Items:</strong> {order.items}
                      </span>
                      <span className="text-[#6B7280]">
                        <strong>Total:</strong> Rs. {order.total.toLocaleString()}
                      </span>
                      <span
                        className={`font-semibold ${
                          order.status === 'Delivered'
                            ? 'text-green-600'
                            : order.status === 'Processing'
                            ? 'text-[#F97316]'
                            : 'text-[#1A73A8]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link href={`/account/orders/${order.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-6 py-3 rounded-full font-semibold transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                        <span>View Details</span>
                      </motion.button>
                    </Link>
                    <Link href={`/account/track-order?tracking=${order.tracking}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-white hover:bg-[#DFF3EA] text-[#0D2B3A] px-6 py-3 rounded-full font-semibold transition-colors border-2 border-[#0D2B3A]"
                      >
                        <Truck className="w-5 h-5" />
                        <span>Track</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

