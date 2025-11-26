'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import { Filter, Grid, List, X, Star, Gift, TrendingUp, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
      <section className="relative bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#DFF3EA] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">Shop</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90">Discover our premium collection</p>
          </motion.div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-4 sm:py-6 md:py-8 bg-white sticky top-20 sm:top-24 z-40 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Top Row: Categories */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-2 sm:gap-3 min-w-max">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap relative overflow-hidden group ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-[#1A73A8] to-[#0D2B3A] text-white shadow-lg shadow-[#1A73A8]/30'
                          : 'bg-gray-50 text-[#0D2B3A] hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <span className="relative z-10">{cat}</span>
                      {selectedCategory === cat && (
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute inset-0 bg-gradient-to-r from-[#1A73A8] to-[#0D2B3A] rounded-lg"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Filters and View Toggle */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                  showFilters
                    ? 'bg-gradient-to-r from-[#1A73A8] to-[#0D2B3A] text-white shadow-md'
                    : 'bg-gray-50 text-[#0D2B3A] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Filter className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                <span>Filters</span>
              </motion.button>
              
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 sm:p-2.5 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#1A73A8] shadow-sm'
                      : 'text-gray-600 hover:text-[#1A73A8]'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 sm:p-2.5 rounded-md transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white text-[#1A73A8] shadow-sm'
                      : 'text-gray-600 hover:text-[#1A73A8]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] flex items-center space-x-2">
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Advanced Filters</span>
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[#0D2B3A] font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                      Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
                    </label>
                    <div className="flex items-center space-x-2 sm:space-x-4">
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
                    <label className="block text-[#0D2B3A] font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                      Minimum Rating: {minRating > 0 ? `${minRating}+` : 'Any'}
                    </label>
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap gap-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm ${
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

      {/* Special Offer Banner */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Special Offer!</h3>
                <p className="text-white/90 text-sm sm:text-base">Get Rs. 500 off on orders above Rs. 2000</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#0D2B3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#DFF3EA] transition-colors shadow-xl w-full md:w-auto"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg">
              Showing <span className="font-bold text-[#0D2B3A]">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            {filteredProducts.length === 0 && (
              <p className="text-[#F97316] font-medium">No products match your filters</p>
            )}
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                : 'space-y-3 sm:space-y-4'
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
                <ProductCard {...product} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-16 bg-gradient-to-b from-[#F8F2DE] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-8 h-8 text-[#F97316]" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A]">Top Sellers</h2>
            </div>
            <p className="text-[#6B7280] text-lg">Our most popular products this month</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts
              .filter((p) => p.rating >= 4.8)
              .slice(0, 4)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Why Shop With Us?</h2>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              Experience the difference with our premium service
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: 'Fast Delivery', desc: 'Quick and reliable shipping' },
              { icon: Star, title: 'Premium Quality', desc: 'Handpicked products' },
              { icon: Gift, title: 'Best Prices', desc: 'Competitive pricing' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-[#F8F2DE] to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D2B3A] mb-3">{item.title}</h3>
                  <p className="text-[#6B7280]">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
