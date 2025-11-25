'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import { Filter, Grid, List, X, Star } from 'lucide-react';

const allProducts = [
  {
    id: '1',
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    image: '/Almonds-Banner-1.jpg',
    category: 'Dry Fruits',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    image: '/Ajwa-Dates-Banner-1.jpg',
    category: 'Dates',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Cashew Nuts',
    price: 3200,
    originalPrice: 3800,
    image: '/Cashew-kaju-Banner-1.jpg',
    category: 'Nuts',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Pistachio',
    price: 4500,
    originalPrice: 5200,
    image: '/Pistachio-Banner.jpg',
    category: 'Nuts',
    rating: 5.0,
  },
  {
    id: '5',
    name: 'Biryani Masala',
    price: 450,
    originalPrice: 550,
    image: '/Biryani-Masala-Banner.jpg',
    category: 'Spices',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Chicken Masala',
    price: 420,
    originalPrice: 500,
    image: '/Chicken-Masala-Banner.jpg',
    category: 'Spices',
    rating: 4.5,
  },
  {
    id: '7',
    name: 'Premium Walnuts',
    price: 2800,
    originalPrice: 3300,
    image: '/Almonds-Banner-1.jpg',
    category: 'Nuts',
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Medjool Dates',
    price: 2200,
    originalPrice: 2600,
    image: '/Ajwa-Dates-Banner-1.jpg',
    category: 'Dates',
    rating: 4.9,
  },
];

const categories = ['All', 'Dry Fruits', 'Dates', 'Nuts', 'Honey', 'Spices', 'Herbs'];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const ratingMatch = product.rating >= minRating;
    return categoryMatch && priceMatch && ratingMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="relative bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFF3EA] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Shop</h1>
            <p className="text-xl text-white/90">Discover our premium collection</p>
          </motion.div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-8 bg-[#F8F2DE] sticky top-24 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#1A73A8] text-white shadow-lg scale-105'
                      : 'bg-white text-[#0D2B3A] hover:bg-[#DFF3EA]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-5 py-2.5 bg-white rounded-full hover:bg-[#DFF3EA] transition-colors shadow-md"
              >
                <Filter className="w-5 h-5 text-[#0D2B3A]" />
                <span className="text-[#0D2B3A] font-medium">Filters</span>
              </motion.button>
              <div className="flex items-center bg-white rounded-full p-1 shadow-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-full transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-[#1A73A8] text-white shadow-md'
                      : 'text-[#0D2B3A] hover:bg-[#DFF3EA]'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-full transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-[#1A73A8] text-white shadow-md'
                      : 'text-[#0D2B3A] hover:bg-[#DFF3EA]'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-white rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#0D2B3A] flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Advanced Filters</span>
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-[#6B7280]" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#0D2B3A] font-semibold mb-3">
                      Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#0D2B3A] font-semibold mb-3">
                      Minimum Rating: {minRating > 0 ? `${minRating}+` : 'Any'}
                    </label>
                    <div className="flex items-center space-x-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            minRating === rating
                              ? 'bg-[#1A73A8] text-white'
                              : 'bg-gray-100 text-[#0D2B3A] hover:bg-[#DFF3EA]'
                          }`}
                        >
                          {rating === 0 ? 'Any' : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setPriceRange([0, 5000]);
                      setMinRating(0);
                    }}
                    className="px-6 py-2 text-[#6B7280] hover:text-[#0D2B3A] font-medium transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[#6B7280] text-lg">
              Showing <span className="font-bold text-[#0D2B3A]">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            {filteredProducts.length === 0 && (
              <p className="text-[#F97316] font-medium">No products match your filters</p>
            )}
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product, index) => (
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
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
