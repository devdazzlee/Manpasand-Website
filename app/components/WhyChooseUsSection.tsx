'use client';

import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Landmark, PackageCheck } from 'lucide-react';

const features = [
  { icon: Layers, title: 'Unmatched Variety', description: 'Explore a curated collection of 1400+ premium herbs, exotic dry fruits, and essential kitchen staples.' },
  { icon: ShieldCheck, title: 'Guaranteed Purity', description: 'We uphold a "Zero Compromise" policy on freshness. Our spices are pure, and our nuts are hand-graded for size and taste.' },
  { icon: Landmark, title: "Karachi's Heritage", description: 'Proudly serving our community for 25+ years with the same commitment to excellence we started with.' },
  { icon: PackageCheck, title: 'Delivered with Care', description: 'Expertly packaged to preserve aroma and crunch, delivered straight from our store to your doorstep across Pakistan.' },
];

export default function WhyChooseUsSection() {
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
            Why Choose Manpasand?
          </h2>
          <p className="text-[#F97316] text-sm sm:text-base font-semibold max-w-2xl mx-auto">
            The &ldquo;Heritage&rdquo; Choice
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#F8F2DE]/50 to-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #1A73A8, #0D2B3A)' }}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#0D2B3A] mb-1.5">{feature.title}</h3>
                <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
