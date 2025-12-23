'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const features = [
  { icon: CheckCircle, title: 'Premium Quality', description: 'Handpicked from trusted sources' },
  { icon: CheckCircle, title: 'Fresh Products', description: 'Always fresh and authentic' },
  { icon: CheckCircle, title: 'Best Prices', description: 'Competitive pricing guaranteed' },
  { icon: CheckCircle, title: 'Fast Delivery', description: 'Quick and secure shipping' },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">
            Why Choose Manpasand?
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 sm:px-0">
            We are committed to providing the best quality products and exceptional service
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-[#F8F2DE] to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-[#6B7280] text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

