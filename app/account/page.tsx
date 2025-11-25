'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import Link from 'next/link';
import { Package, User, MapPin, Heart, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
  const stats = [
    { label: 'Total Orders', value: '12', icon: Package },
    { label: 'Pending Orders', value: '2', icon: Package },
    { label: 'Wishlist Items', value: '5', icon: Heart },
  ];

  const recentOrders = [
    { id: 'MP-001', date: '2024-01-15', total: 6800, status: 'Delivered' },
    { id: 'MP-002', date: '2024-01-10', total: 4500, status: 'Processing' },
    { id: 'MP-003', date: '2024-01-05', total: 3200, status: 'Delivered' },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Account</h1>
            <p className="text-xl text-white/90">Manage your account and orders</p>
          </motion.div>
        </div>
      </section>

      {/* Account Dashboard */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-[#F8F2DE] rounded-2xl p-6 space-y-4">
                <Link
                  href="/account"
                  className="flex items-center space-x-3 p-3 bg-[#1A73A8] text-white rounded-xl"
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center space-x-3 p-3 text-[#0D2B3A] hover:bg-white rounded-xl transition-colors"
                >
                  <Package className="w-5 h-5" />
                  <span>My Orders</span>
                </Link>
                <Link
                  href="/account/profile"
                  className="flex items-center space-x-3 p-3 text-[#0D2B3A] hover:bg-white rounded-xl transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href="/account/addresses"
                  className="flex items-center space-x-3 p-3 text-[#0D2B3A] hover:bg-white rounded-xl transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Address Book</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-3 p-3 text-[#0D2B3A] hover:bg-white rounded-xl transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center space-x-3 p-3 text-[#0D2B3A] hover:bg-white rounded-xl transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button className="flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[#F8F2DE] rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8 text-[#1A73A8]" />
                      </div>
                      <h3 className="text-3xl font-bold text-[#0D2B3A] mb-2">{stat.value}</h3>
                      <p className="text-[#6B7280]">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-[#F8F2DE] rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-[#0D2B3A]">Order #{order.id}</p>
                        <p className="text-sm text-[#6B7280]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#0D2B3A]">Rs. {order.total.toLocaleString()}</p>
                        <span
                          className={`text-sm ${
                            order.status === 'Delivered'
                              ? 'text-green-600'
                              : 'text-[#F97316]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/account/orders" className="block text-center mt-6 text-[#1A73A8] hover:text-[#0D2B3A] font-semibold">
                  View All Orders
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

