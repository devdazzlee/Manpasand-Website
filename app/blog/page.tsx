'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: '1',
    title: 'Health Benefits of Dates',
    excerpt: 'Discover the amazing health benefits of dates and why they are considered a superfood.',
    image: '/Ajwa-Dates-Banner-1.jpg',
    date: '2024-01-15',
    author: 'Dr. Ahmed',
    category: 'Health',
  },
  {
    id: '2',
    title: 'Best Ways to Store Dry Fruits',
    excerpt: 'Learn how to properly store your dry fruits to maintain freshness and nutritional value.',
    image: '/Almonds-Banner-1.jpg',
    date: '2024-01-10',
    author: 'Nutrition Expert',
    category: 'Tips',
  },
  {
    id: '3',
    title: 'Traditional Herbal Remedies',
    excerpt: 'Explore traditional herbal remedies that have been used for centuries.',
    image: '/Banner-01.jpg',
    date: '2024-01-05',
    author: 'Herbalist',
    category: 'Herbs',
  },
];

export default function BlogPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Health & Wellness Blog</h1>
            <p className="text-xl text-white/90">
              Discover articles about health benefits, recipes, and wellness tips
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden bg-[#F8F2DE]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#1A73A8] font-semibold uppercase">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#0D2B3A] mt-2 mb-3">{post.title}</h3>
                  <p className="text-[#6B7280] mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-[#6B7280] mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-[#1A73A8] hover:text-[#0D2B3A] font-semibold flex items-center space-x-2"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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

