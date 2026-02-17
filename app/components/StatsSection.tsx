'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, ShoppingBag } from 'lucide-react';

const stats = [
  { icon: Users, number: '10K+', label: 'Happy Customers', color: '#1A73A8' },
  { icon: Award, number: '25+', label: 'Years Experience', color: '#F97316' },
  { icon: ShoppingBag, number: '1400+', label: 'Products Available', color: '#0D2B3A' },
  { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: '#1A73A8' },
];

export default function StatsSection() {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="text-center p-5 sm:p-7 bg-gradient-to-br from-[#F8F2DE]/50 to-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm" style={{ background: stat.color }}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-1">{stat.number}</h3>
                <p className="text-[#6B7280] font-medium text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
