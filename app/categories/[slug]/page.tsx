'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import ProductCard from '../../components/ProductCard';

const categoryData: Record<string, { name: string; description: string }> = {
  'dry-fruits': {
    name: 'Dry Fruits',
    description: 'Premium quality dry fruits, carefully selected for freshness and taste.',
  },
  dates: {
    name: 'Dates',
    description: 'Authentic dates from the finest sources, including Ajwa and Medjool varieties.',
  },
  nuts: {
    name: 'Nuts',
    description: 'Fresh, crunchy nuts packed with nutrition and flavor.',
  },
  honey: {
    name: 'Honey',
    description: 'Pure, natural honey with authentic taste and health benefits.',
  },
  saffron: {
    name: 'Saffron',
    description: 'Premium quality saffron threads, the world\'s most expensive spice.',
  },
  herbs: {
    name: 'Herbs',
    description: 'Traditional herbs and natural remedies for wellness and health.',
  },
  spices: {
    name: 'Spices',
    description: 'Aromatic spices to enhance the flavor of your dishes.',
  },
  'pulses-rice': {
    name: 'Pulses & Rice',
    description: 'High-quality pulses and rice for your daily nutrition needs.',
  },
  oil: {
    name: 'Oil',
    description: 'Pure cooking oils for healthy and delicious meals.',
  },
};

const allProducts = [
  {
    id: '1',
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    image: '/Almonds-Banner-1.jpg',
    category: 'Dry Fruits',
  },
  {
    id: '2',
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    image: '/Ajwa-Dates-Banner-1.jpg',
    category: 'Dates',
  },
  {
    id: '3',
    name: 'Cashew Nuts',
    price: 3200,
    originalPrice: 3800,
    image: '/Cashew-kaju-Banner-1.jpg',
    category: 'Nuts',
  },
];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categoryData[slug] || {
    name: 'Category',
    description: 'Explore our premium products in this category.',
  };

  // Filter products by category (simplified)
  const categoryProducts = allProducts.filter((p) =>
    p.category.toLowerCase().includes(slug.replace('-', ' '))
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Category Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6B7280] text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

