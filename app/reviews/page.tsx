'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Star, Verified } from 'lucide-react';

const reviews = [
  {
    id: '1',
    product: 'Premium Almonds',
    customer: 'Ahmed Khan',
    rating: 5,
    comment: 'Best quality almonds I have ever purchased. Fresh and delicious!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    product: 'Ajwa Dates',
    customer: 'Fatima Ali',
    rating: 5,
    comment: 'Authentic Ajwa dates from Madinah. Highly recommended!',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    product: 'Biryani Masala',
    customer: 'Hassan Malik',
    rating: 5,
    comment: 'Perfect blend of spices. Made the best biryani ever!',
    date: '2024-01-05',
    verified: true,
  },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Reviews</h1>
            <p className="text-xl text-white/90">See what our customers are saying</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-[#0D2B3A]">{review.product}</h3>
                      {review.verified && (
                        <Verified className="w-5 h-5 text-[#1A73A8]" />
                      )}
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      by {review.customer} on {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'fill-[#F97316] text-[#F97316]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#6B7280] leading-relaxed">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

