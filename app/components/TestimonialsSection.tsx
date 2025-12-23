'use client';

import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khan',
    rating: 5,
    comment: 'Best quality dry fruits in Karachi! Always fresh and premium.',
    location: 'Karachi',
  },
  {
    name: 'Fatima Ali',
    rating: 5,
    comment: 'Love their dates collection. Authentic and delicious.',
    location: 'Lahore',
  },
  {
    name: 'Hassan Malik',
    rating: 5,
    comment: '25+ years of trust. Manpasand never disappoints!',
    location: 'Islamabad',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#F97316]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A]">
              What Our Customers Say
            </h2>
          </div>
          <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0">
            Trusted by thousands of satisfied customers
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-[#F8F2DE] to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F97316] text-[#F97316]" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 sm:mb-6 italic text-sm sm:text-base md:text-lg leading-relaxed">
                &quot;{testimonial.comment}&quot;
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 gap-2 sm:gap-0">
                <p className="font-bold text-[#0D2B3A] text-base sm:text-lg">— {testimonial.name}</p>
                <p className="text-xs sm:text-sm text-[#6B7280]">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

