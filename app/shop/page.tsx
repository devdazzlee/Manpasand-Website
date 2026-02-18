'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import { Grid, List, X, Star, Gift, TrendingUp, Zap, Sparkles, ChevronLeft, ChevronRight, Search, SlidersHorizontal, ChevronDown, ArrowUpDown, LayoutGrid } from 'lucide-react';
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
  const [selectedPriceTag, setSelectedPriceTag] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showMobilePrice, setShowMobilePrice] = useState(false);
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
        
        // Products loaded successfully
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Price tag presets
  const priceTags = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: 'under500', label: 'Under Rs. 500', min: 0, max: 500 },
    { id: '500-1000', label: 'Rs. 500 – 1,000', min: 500, max: 1000 },
    { id: '1000-2500', label: 'Rs. 1,000 – 2,500', min: 1000, max: 2500 },
    { id: '2500-5000', label: 'Rs. 2,500 – 5,000', min: 2500, max: 5000 },
    { id: 'above5000', label: 'Above Rs. 5,000', min: 5000, max: Infinity },
  ];

  const sortOptions = [
    { id: 'default', label: 'Relevance' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'name-az', label: 'Name: A to Z' },
    { id: 'name-za', label: 'Name: Z to A' },
    { id: 'newest', label: 'Newest First' },
  ];

  const activeTag = priceTags.find(t => t.id === selectedPriceTag) || priceTags[0];

  const filteredProducts = allProducts
    .filter((product) => {
      const productPrice = product.price || product.selling_price || 0;
      const categoryMatch = selectedCategory === 'All' || product.category?.name === selectedCategory;
      const priceMatch = productPrice >= activeTag.min && productPrice <= activeTag.max;
      const searchMatch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    })
    .sort((a, b) => {
      const priceA = a.price || a.selling_price || 0;
      const priceB = b.price || b.selling_price || 0;
      switch (sortBy) {
        case 'price-low': return priceA - priceB;
        case 'price-high': return priceB - priceA;
        case 'name-az': return a.name.localeCompare(b.name);
        case 'name-za': return b.name.localeCompare(a.name);
        case 'newest': return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        default: return 0;
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Close sort menu when clicking outside
  useEffect(() => {
    const handleClick = () => setShowSortMenu(false);
    if (showSortMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showSortMenu]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedPriceTag, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="relative bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-8 sm:py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#DFF3EA] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Shop</h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90">Discover our premium collection</p>
          </div>
        </div>
      </section>

      {/* Shop Toolbar — NOT sticky, scrolls normally */}
      <section className="py-4 sm:py-5 md:py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Search + Sort + View */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0D2B3A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A73A8]/30 focus:border-[#1A73A8] transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowSortMenu(!showSortMenu); }}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0D2B3A] hover:border-[#1A73A8]/40 transition-all whitespace-nowrap"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden sm:inline text-xs sm:text-sm font-medium">
                  {sortOptions.find(s => s.id === sortBy)?.label || 'Sort'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showSortMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-40"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => { setSortBy(option.id); setShowSortMenu(false); }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm transition-colors ${
                          sortBy === option.id
                            ? 'bg-[#1A73A8]/10 text-[#1A73A8] font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white text-[#0D2B3A] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white text-[#0D2B3A] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Browse by Category ── */}
          <div className="mb-4 sm:mb-5">
            {/* Header — tappable dropdown on mobile, static on desktop */}
            <button
              onClick={() => setShowMobileCategories(!showMobileCategories)}
              className="flex items-center gap-2 mb-0 sm:mb-2.5 w-full sm:pointer-events-none"
            >
              <LayoutGrid className="w-4 h-4 text-[#1A73A8] flex-shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0D2B3A] uppercase tracking-wider">Browse by Category</h3>
              {selectedCategory !== 'All' && (
                <span className="text-[10px] bg-[#1A73A8] text-white px-1.5 py-0.5 rounded-full font-semibold">{selectedCategory}</span>
              )}
              <div className="flex-1 h-px bg-gray-200" />
              {selectedCategory !== 'All' && (
                <span
                  onClick={(e) => { e.stopPropagation(); setSelectedCategory('All'); setCurrentPage(1); }}
                  className="text-[11px] sm:text-xs text-[#1A73A8] hover:text-[#0D2B3A] font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                >
                  <X className="w-3 h-3" /> Reset
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-gray-400 sm:hidden transition-transform duration-200 flex-shrink-0 ${showMobileCategories ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop: always visible horizontal scroll */}
            <div className="hidden sm:block relative mt-2.5">
              <div className="overflow-x-auto scrollbar-hide pb-1">
                <div className="flex gap-2 min-w-max">
                  <button
                    onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap border ${
                      selectedCategory === 'All'
                        ? 'bg-[#0D2B3A] text-white border-[#0D2B3A] shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#1A73A8] hover:text-[#1A73A8]'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id || cat.name}
                      onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap border ${
                        selectedCategory === cat.name
                          ? 'bg-[#0D2B3A] text-white border-[#0D2B3A] shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#1A73A8] hover:text-[#1A73A8]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-1 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>

            {/* Mobile: collapsible dropdown */}
            <AnimatePresence>
              {showMobileCategories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden sm:hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-2.5">
                    <button
                      onClick={() => { setSelectedCategory('All'); setCurrentPage(1); setShowMobileCategories(false); }}
                      className={`px-3 py-1.5 rounded-full font-medium transition-all text-xs border ${
                        selectedCategory === 'All'
                          ? 'bg-[#0D2B3A] text-white border-[#0D2B3A] shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 active:border-[#1A73A8] active:text-[#1A73A8]'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id || cat.name}
                        onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); setShowMobileCategories(false); }}
                        className={`px-3 py-1.5 rounded-full font-medium transition-all text-xs border ${
                          selectedCategory === cat.name
                            ? 'bg-[#0D2B3A] text-white border-[#0D2B3A] shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 active:border-[#1A73A8] active:text-[#1A73A8]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Filter by Price ── */}
          <div className="mb-3">
            {/* Header — tappable dropdown on mobile, static on desktop */}
            <button
              onClick={() => setShowMobilePrice(!showMobilePrice)}
              className="flex items-center gap-2 mb-0 sm:mb-2.5 w-full sm:pointer-events-none"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#F97316] flex-shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-[#0D2B3A] uppercase tracking-wider">Filter by Price</h3>
              {selectedPriceTag !== 'all' && (
                <span className="text-[10px] bg-[#F97316] text-white px-1.5 py-0.5 rounded-full font-semibold">{activeTag.label}</span>
              )}
              <div className="flex-1 h-px bg-gray-200" />
              {selectedPriceTag !== 'all' && (
                <span
                  onClick={(e) => { e.stopPropagation(); setSelectedPriceTag('all'); }}
                  className="text-[11px] sm:text-xs text-[#1A73A8] hover:text-[#0D2B3A] font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                >
                  <X className="w-3 h-3" /> Reset
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-gray-400 sm:hidden transition-transform duration-200 flex-shrink-0 ${showMobilePrice ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop: always visible */}
            <div className="hidden sm:flex flex-wrap gap-2 mt-2.5">
              {priceTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedPriceTag(tag.id)}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-all duration-200 text-xs whitespace-nowrap border ${
                    selectedPriceTag === tag.id
                      ? 'bg-[#1A73A8] text-white border-[#1A73A8] shadow-md'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A73A8]/50 hover:text-[#1A73A8]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Mobile: collapsible dropdown */}
            <AnimatePresence>
              {showMobilePrice && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden sm:hidden"
                >
                  <div className="flex flex-wrap gap-1.5 pt-2.5">
                    {priceTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => { setSelectedPriceTag(tag.id); setShowMobilePrice(false); }}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 text-[11px] whitespace-nowrap border ${
                          selectedPriceTag === tag.id
                            ? 'bg-[#1A73A8] text-white border-[#1A73A8] shadow-md'
                            : 'bg-white text-gray-500 border-gray-200 active:border-[#1A73A8] active:text-[#1A73A8]'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results summary + Clear All */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <p className="text-gray-400 text-[11px] sm:text-xs">
              <span className="font-semibold text-[#0D2B3A]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
              {selectedCategory !== 'All' && <span> in <span className="text-[#0D2B3A] font-medium">{selectedCategory}</span></span>}
              {selectedPriceTag !== 'all' && <span> · <span className="text-[#1A73A8] font-medium">{activeTag.label}</span></span>}
              {searchQuery && <span> · &ldquo;<span className="text-[#0D2B3A] font-medium">{searchQuery}</span>&rdquo;</span>}
            </p>
            {(selectedCategory !== 'All' || selectedPriceTag !== 'all' || searchQuery || sortBy !== 'default') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceTag('all');
                  setSearchQuery('');
                  setSortBy('default');
                  setCurrentPage(1);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs text-red-500 hover:text-red-700 font-medium whitespace-nowrap transition-colors"
              >
                <X className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-4 sm:py-6 bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-5">
            <div className="flex items-center space-x-3">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Special Offer!</h3>
                <p className="text-white/90 text-xs sm:text-sm">Get Rs. 500 off on orders above Rs. 2000</p>
              </div>
            </div>
            <button
              className="bg-white text-[#0D2B3A] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#DFF3EA] transition-colors shadow-xl w-full md:w-auto hover:scale-[1.05] active:scale-[0.95]"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          {filteredProducts.length > 0 && (
            <p className="text-gray-400 text-xs mb-3">
              Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length}
            </p>
          )}
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
              currentProducts.map((product) => (
              <div
                key={product.id}
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
              </div>
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
          <div
            className="text-center mb-8 sm:mb-10"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingUp className="w-6 h-6 text-[#F97316]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A]">Top Sellers</h2>
            </div>
            <p className="text-[#6B7280] text-sm sm:text-base">Our most popular products this month</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {allProducts
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
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
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-8 sm:mb-10"
          >
            <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-[#F97316] mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-3">Why Shop With Us?</h2>
            <p className="text-[#6B7280] text-sm sm:text-base max-w-2xl mx-auto">
              Experience the difference with our premium service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: 'Fast Delivery', desc: 'Quick and reliable shipping' },
              { icon: Star, title: 'Premium Quality', desc: 'Handpicked products' },
              { icon: Gift, title: 'Best Prices', desc: 'Competitive pricing' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-[#F8F2DE] to-white p-5 sm:p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0D2B3A] mb-2">{item.title}</h3>
                  <p className="text-[#6B7280] text-xs sm:text-sm">{item.desc}</p>
                </div>
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
