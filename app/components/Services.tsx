'use client';

import { Truck, DollarSign, Store, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over Rs. 2000',
  },
  {
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'Competitive pricing always',
  },
  {
    icon: Store,
    title: 'Free Shop Pickup',
    description: 'Collect from our store',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'We are here to help',
  },
];

export default function Services() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center space-y-2 sm:space-y-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-[#DFF3EA] rounded-full flex items-center justify-center mb-1 sm:mb-2"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0D2B3A]" />
                </motion.div>
                <h3 className="font-semibold text-[#0D2B3A] text-xs sm:text-sm md:text-base">
                  {service.title}
                </h3>
                <p className="text-[#6B7280] text-xs sm:text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

