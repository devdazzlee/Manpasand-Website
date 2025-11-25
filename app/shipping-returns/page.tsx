'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Truck, RotateCcw, Shield, Clock } from 'lucide-react';

export default function ShippingReturnsPage() {
  const shippingInfo = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over Rs. 2,000',
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: '2-3 business days within Karachi',
    },
    {
      icon: Shield,
      title: 'Secure Packaging',
      description: 'All items are carefully packaged',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '7-day return policy',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping & Returns</h1>
            <p className="text-xl text-white/90">
              Everything you need to know about shipping and returns
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {shippingInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#F8F2DE] rounded-2xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-[#DFF3EA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#0D2B3A]" />
                  </div>
                  <h3 className="font-semibold text-[#0D2B3A] mb-2">{info.title}</h3>
                  <p className="text-sm text-[#6B7280]">{info.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16 bg-[#F8F2DE]">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#0D2B3A] mb-6">Shipping Information</h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  <strong className="text-[#0D2B3A]">Free Shipping:</strong> We offer free shipping
                  on all orders over Rs. 2,000. For orders below this amount, a shipping fee of Rs.
                  200 applies.
                </p>
                <p>
                  <strong className="text-[#0D2B3A]">Delivery Time:</strong> Standard delivery
                  within Karachi takes 2-3 business days. For other cities in Pakistan, delivery
                  may take 5-7 business days.
                </p>
                <p>
                  <strong className="text-[#0D2B3A]">Order Tracking:</strong> Once your order is
                  shipped, you will receive a tracking number via email or SMS. You can use this to
                  track your order status.
                </p>
                <p>
                  <strong className="text-[#0D2B3A]">Packaging:</strong> All items are carefully
                  packaged to ensure they arrive in perfect condition. We use secure, protective
                  packaging for all shipments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Returns Policy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F8F2DE] rounded-2xl p-8 md:p-12 space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#0D2B3A] mb-6">Returns Policy</h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  <strong className="text-[#0D2B3A]">Return Period:</strong> We offer a 7-day return
                  policy from the date of delivery. Items must be unopened and in their original
                  packaging.
                </p>
                <p>
                  <strong className="text-[#0D2B3A]">Return Process:</strong> To initiate a return,
                  please contact us at 0342 3344040 or email us with your order number. We will
                  provide you with return instructions.
                </p>
                <p>
                  <strong className="text-[#0D2B3A]">Refund:</strong> Once we receive and inspect
                  the returned item, we will process your refund within 5-7 business days. Refunds
                  will be issued to the original payment method.
                </p>
                <p>
                  <strong className="text-[#0D2B3A]">Non-Returnable Items:</strong> Perishable
                  items, opened products, and items damaged by the customer are not eligible for
                  return.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

