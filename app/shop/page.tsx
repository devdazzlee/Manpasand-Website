'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import { Filter, Grid, List, X, Star, Gift, TrendingUp, Zap, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Loader from '../components/Loader';
import Link from 'next/link';
import { productApi, Product } from '../../lib/api/productApi';
import { categoryApi, Category } from '../../lib/api/categoryApi';
import { useProductStore } from '../../lib/store/productStore';

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and categories
        // Use empty search to get all products from public endpoint
        const [productsResult, categoriesData] = await Promise.all([
          productApi.listProducts({ fetch_all: true, search: '' }),
          categoryApi.getCategories(),
        ]);
        
        // Map products to include image URL and normalize price fields
        const mappedProducts = productsResult.data.map((product: Product) => {
          // Get price from API response (sales_rate_inc_dis_and_tax is the selling price)
          const priceValue = product.sales_rate_inc_dis_and_tax 
            ? parseFloat(String(product.sales_rate_inc_dis_and_tax))
            : product.sales_rate_exc_dis_and_tax
            ? parseFloat(String(product.sales_rate_exc_dis_and_tax))
            : product.selling_price || product.price || 0;
          
          // Calculate original price if discount exists
          const discountAmount = product.discount_amount 
            ? parseFloat(String(product.discount_amount))
            : 0;
          const originalPrice = discountAmount > 0 && priceValue > 0
            ? priceValue + discountAmount
            : undefined;
          
          // Extract image from ProductImage array or use fallback
          const productImage = product.ProductImage && Array.isArray(product.ProductImage) && product.ProductImage.length > 0
            ? product.ProductImage[0].image
            : product.image || '/Banner-01.jpg';
          
          // Debug: log if image is missing
          if (process.env.NODE_ENV === 'development' && !productImage || productImage === '/Banner-01.jpg') {
            console.log('Product missing image:', {
              productId: product.id,
              productName: product.name,
              hasProductImage: !!(product.ProductImage && product.ProductImage.length > 0),
              ProductImageLength: product.ProductImage?.length || 0,
              productImageValue: productImage,
            });
          }
          
          return {
            ...product,
            price: priceValue,
            selling_price: priceValue,
            image: productImage,
            originalPrice,
            // Keep category as object, not string
            category: product.category || undefined,
          };
        });
        
        setAllProducts(mappedProducts);
        
        // Map categories
        const mappedCategories = categoriesData.map((cat: Category) => ({
          ...cat,
          name: cat.name,
        }));
        setCategories(mappedCategories);
        
        // Update price range based on products
        if (mappedProducts.length > 0) {
          const prices = mappedProducts.map(p => p.price || 0).filter(p => p > 0);
          if (prices.length > 0) {
            const maxPrice = Math.max(...prices);
            // Set price range to include all products (add 10% buffer)
            const maxRange = Math.ceil(maxPrice * 1.1);
            setPriceRange([0, maxRange]);
          } else {
            // If all prices are 0, set a reasonable default range
            setPriceRange([0, 50000]);
          }
        } else {
          // If no products, set default range
          setPriceRange([0, 50000]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const productPrice = product.price || product.selling_price || 0;
    const categoryMatch = selectedCategory === 'All' || product.category?.name === selectedCategory;
    const priceMatch = productPrice >= priceRange[0] && productPrice <= priceRange[1];
    const searchMatch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && priceMatch && searchMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Debug logging (after currentProducts is defined)
  console.log('All products:', allProducts.length);
  console.log('Filtered products:', filteredProducts.length);
  console.log('Selected category:', selectedCategory);
  console.log('Price range:', priceRange);
  console.log('Current page:', currentPage);
  console.log('Current products:', currentProducts.length);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, priceRange]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="relative bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-8 sm:py-10 md:py-14 overflow-hidden">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Shop</h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90">Discover our premium collection</p>
          </motion.div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-3 sm:py-4 md:py-5 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-3">
            {/* Top Row: Categories - Compact Pill Style */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-widest">Categories</h2>
                <span className="text-[10px] sm:text-xs text-gray-400">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="relative">
                <div className="flex-1 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 snap-x snap-mandatory">
                  <div className="flex gap-1.5 sm:gap-2 min-w-max">
                    <button
                      key="All"
                      onClick={() => {
                        setSelectedCategory('All');
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium transition-all duration-200 text-[11px] sm:text-xs whitespace-nowrap snap-start ${
                        selectedCategory === 'All'
                          ? 'bg-[#0D2B3A] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id || cat.name}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setCurrentPage(1);
                        }}
                        className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium transition-all duration-200 text-[11px] sm:text-xs whitespace-nowrap snap-start ${
                          selectedCategory === cat.name
                            ? 'bg-[#0D2B3A] text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-1 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bottom Row: Filters and View Toggle */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-all duration-200 text-[11px] sm:text-xs ${
                  showFilters
                    ? 'bg-[#0D2B3A] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Filters</span>
                {filteredProducts.length < allProducts.length && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    showFilters ? 'bg-white/20 text-white' : 'bg-[#1A73A8]/10 text-[#1A73A8]'
                  }`}>
                    {allProducts.length - filteredProducts.length}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#0D2B3A] shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-[#0D2B3A] shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
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
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-3 sm:mt-4 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#0D2B3A] uppercase tracking-wider">Refine Results</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Price Range
                      </label>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 bg-white rounded-lg border border-gray-200 px-3 py-2 text-center">
                          <span className="text-[10px] text-gray-400 block">Min</span>
                          <span className="text-sm font-bold text-[#0D2B3A]">Rs. {priceRange[0].toLocaleString()}</span>
                        </div>
                        <div className="w-4 h-px bg-gray-300"></div>
                        <div className="flex-1 bg-white rounded-lg border border-gray-200 px-3 py-2 text-center">
                          <span className="text-[10px] text-gray-400 block">Max</span>
                          <span className="text-sm font-bold text-[#0D2B3A]">Rs. {priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2 px-1">
                        <input
                          type="range"
                          min="0"
                          max={priceRange[1] || 50000}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1A73A8] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A73A8] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                        <input
                          type="range"
                          min="0"
                          max={priceRange[1] || 50000}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1A73A8] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A73A8] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Minimum Rating
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: 0, label: 'Any' },
                          { value: 3, label: '3+' },
                          { value: 4, label: '4+' },
                          { value: 4.5, label: '4.5+' },
                        ].map((rating) => (
                          <button
                            key={rating.value}
                            onClick={() => setMinRating(rating.value)}
                            className={`flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium ${
                              minRating === rating.value
                                ? 'bg-[#0D2B3A] text-white shadow-sm'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1A73A8]/30 hover:bg-[#F8F2DE]/50'
                            }`}
                          >
                            {rating.value > 0 && <Star className={`w-3 h-3 ${minRating === rating.value ? 'text-yellow-300 fill-yellow-300' : 'text-yellow-400 fill-yellow-400'}`} />}
                            {rating.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => {
                        setPriceRange([0, priceRange[1] || 50000]);
                        setMinRating(0);
                      }}
                      className="text-xs text-gray-400 hover:text-[#1A73A8] font-medium transition-colors flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Clear all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-4 sm:py-6 bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-5"
          >
            <div className="flex items-center space-x-3">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Special Offer!</h3>
                <p className="text-white/90 text-xs sm:text-sm">Get Rs. 500 off on orders above Rs. 2000</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#0D2B3A] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#DFF3EA] transition-colors shadow-xl w-full md:w-auto"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-3 sm:mb-5 flex items-center justify-between">
            <p className="text-[#6B7280] text-xs sm:text-sm">
              Showing <span className="font-bold text-[#0D2B3A]">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of <span className="font-bold text-[#0D2B3A]">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            {filteredProducts.length === 0 && (
              <p className="text-[#F97316] font-medium">No products match your filters</p>
            )}
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch'
                : 'space-y-3 sm:space-y-4'
            }
          >
            {loading ? (
              <div className="col-span-full">
                <Loader size="lg" text="Loading products..." />
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-[#6B7280]">No products found matching your criteria.</p>
              </div>
            ) : (
              currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={viewMode === 'grid' ? 'h-full' : ''}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price || product.selling_price || 0}
                    originalPrice={product.originalPrice}
                    image={product.image || '/Banner-01.jpg'}
                    category={product.category?.name || (product.category as any)}
                    viewMode={viewMode}
                    sales_rate_inc_dis_and_tax={product.sales_rate_inc_dis_and_tax}
                    sales_rate_exc_dis_and_tax={product.sales_rate_exc_dis_and_tax}
                    selling_price={product.selling_price}
                  />
              </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[#6B7280] text-xs sm:text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1A73A8] text-white hover:bg-[#0D2B3A]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
                          currentPage === pageNum
                            ? 'bg-[#1A73A8] text-white'
                            : 'bg-gray-100 text-[#0D2B3A] hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1A73A8] text-white hover:bg-[#0D2B3A]'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-[#F8F2DE] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingUp className="w-6 h-6 text-[#F97316]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A]">Top Sellers</h2>
            </div>
            <p className="text-[#6B7280] text-sm sm:text-base">Our most popular products this month</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {allProducts
              .slice(0, 4)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price || product.selling_price || 0}
                    originalPrice={product.originalPrice}
                    image={product.image || '/Banner-01.jpg'}
                    category={product.category?.name || (product.category as any)}
                    sales_rate_inc_dis_and_tax={product.sales_rate_inc_dis_and_tax}
                    sales_rate_exc_dis_and_tax={product.sales_rate_exc_dis_and_tax}
                    selling_price={product.selling_price}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-[#F97316] mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-3">Why Shop With Us?</h2>
            <p className="text-[#6B7280] text-sm sm:text-base max-w-2xl mx-auto">
              Experience the difference with our premium service
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
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
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#F8F2DE] to-white p-5 sm:p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D2B3A] mb-2">{item.title}</h3>
                  <p className="text-[#6B7280] text-xs sm:text-sm">{item.desc}</p>
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
