'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Newsletter from '../../../components/Newsletter';
import Services from '../../../components/Services';
import Link from 'next/link';
import { Package, Truck, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

const orderDetails: Record<string, any> = {
  'MP-001': {
    id: 'MP-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 6800,
    subtotal: 6800,
    shipping: 0,
    items: [
      { name: 'Premium Almonds', quantity: 2, price: 2500, image: '/Almonds-Banner-1.jpg' },
      { name: 'Ajwa Dates', quantity: 1, price: 1800, image: '/Ajwa-Dates-Banner-1.jpg' },
    ],
    shippingAddress: {
      name: 'Ahmed Khan',
      address: '123 Main Street',
      city: 'Karachi',
      postalCode: '75500',
      phone: '+92 342 3344040',
    },
    tracking: 'TRK123456789',
  },
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = orderDetails[id] || orderDetails['MP-001'];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/account/orders" className="inline-flex items-center space-x-2 mb-6 text-white/90 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Orders</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Details</h1>
            <p className="text-xl text-white/90">Order #{order.id}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-[#F8F2DE] rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0D2B3A]">{item.name}</h3>
                        <p className="text-sm text-[#6B7280]">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[#0D2B3A]">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#F8F2DE] rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Subtotal</span>
                    <span>Rs. {order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-[#0D2B3A]">
                      <span>Total</span>
                      <span>Rs. {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Shipping Address</h2>
                <div className="space-y-3 text-[#6B7280]">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#1A73A8] mt-1" />
                    <div>
                      <p className="font-semibold text-[#0D2B3A]">{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#1A73A8]" />
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
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

