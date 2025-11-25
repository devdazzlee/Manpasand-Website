'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { ChefHat, Clock, Users } from 'lucide-react';
import Link from 'next/link';

const recipes = [
  {
    id: '1',
    title: 'Almond Date Smoothie',
    image: '/Almonds-Banner-1.jpg',
    time: '10 min',
    servings: '2',
    description: 'A healthy and delicious smoothie using our premium almonds and dates.',
  },
  {
    id: '2',
    title: 'Spiced Biryani',
    image: '/Biryani-Masala-Banner.jpg',
    time: '60 min',
    servings: '4',
    description: 'Traditional biryani recipe using our authentic biryani masala.',
  },
];

export default function RecipesPage() {
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
            <ChefHat className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Recipes & How to Use</h1>
            <p className="text-xl text-white/90">
              Discover delicious recipes using our premium products
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden bg-[#F8F2DE]">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0D2B3A] mb-3">{recipe.title}</h3>
                  <p className="text-[#6B7280] mb-4">{recipe.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-[#6B7280] mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-[#1A73A8] hover:text-[#0D2B3A] font-semibold"
                  >
                    View Recipe →
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

