'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, ShoppingBag } from 'lucide-react';

const stats = [
  { icon: Users, number: '10K+', label: 'Happy Customers', color: 'bg-[#1A73A8]' },
  { icon: Award, number: '25+', label: 'Years Experience', color: 'bg-[#F97316]' },
  { icon: ShoppingBag, number: '700+', label: 'Products Available', color: 'bg-[#0D2B3A]' },
  { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: 'bg-[#1A73A8]' },
];

export default function StatsSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#F8F2DE] to-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md hover:shadow-lg transition-shadow`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-1 sm:mb-2">{stat.number}</h3>
                <p className="text-[#6B7280] font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

