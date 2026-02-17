'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Sparkles, HeartHandshake } from 'lucide-react';

const benefits = [
  { icon: ShieldCheck, title: 'Guaranteed Purity', description: 'Every product is rigorously sourced and verified for 100% organic authenticity.' },
  { icon: Truck, title: 'Nationwide Delivery', description: 'Enjoy complimentary shipping on all orders over Rs. 5,000 across Pakistan.' },
  { icon: Sparkles, title: 'Exclusive Rewards', description: 'Join the Manpasand community for seasonal curated deals and wellness promotions.' },
  { icon: HeartHandshake, title: 'Dedicated Care', description: 'Our expert team is available around the clock to assist with your health and pantry needs.' },
];

export default function BenefitsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-2">
            The Manpasand Standard
          </h2>
          <p className="text-[#6B7280] text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            Experience 25 years of purity with our hand-selected premium harvests and dedicated customer care.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#DFF3EA]/40 to-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #1A73A8, #0D2B3A)' }}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#0D2B3A] mb-1.5">{benefit.title}</h3>
                <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
