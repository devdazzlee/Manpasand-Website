'use client';

import { use, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import ProductCard from '../../components/ProductCard';
import { ShoppingCart, Heart, Minus, Plus, Star, Truck, Shield, RotateCcw, CheckCircle, TrendingUp, Award, Gift, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

const productData: Record<string, any> = {
  '1': {
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    images: ['/Almonds-Banner-1.jpg', '/Almonds-Banner-1.jpg', '/Almonds-Banner-1.jpg', '/Almonds-Banner-1.jpg'],
    category: 'Dry Fruits',
    description:
      'Premium quality almonds, carefully selected and packed fresh. Rich in protein, fiber, and essential nutrients. Perfect for snacking or adding to your favorite recipes.',
    longDescription:
      'Our Premium Almonds are sourced from the finest orchards and carefully selected to ensure the highest quality. Each almond is packed with essential nutrients including protein, healthy fats, fiber, and vitamin E. These almonds are perfect for snacking, baking, or adding to your morning cereal. They are naturally gluten-free and make an excellent addition to any healthy diet.',
    features: [
      '100% Natural & Fresh',
      'Rich in Protein & Fiber',
      'Premium Quality',
      'Carefully Selected',
      'Gluten Free',
      'No Preservatives',
    ],
    nutrition: [
      { label: 'Protein', value: '21g per 100g' },
      { label: 'Fiber', value: '12g per 100g' },
      { label: 'Vitamin E', value: '37% DV' },
      { label: 'Calcium', value: '26% DV' },
    ],
    rating: 4.8,
    reviews: 124,
    stock: 50,
    weight: '500g',
    origin: 'California, USA',
  },
  '2': {
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    images: ['/Ajwa-Dates-Banner-1.jpg', '/Ajwa-Dates-Banner-1.jpg', '/Ajwa-Dates-Banner-1.jpg', '/Ajwa-Dates-Banner-1.jpg'],
    category: 'Dates',
    description:
      'Authentic Ajwa dates from Madinah. Known for their rich flavor and numerous health benefits. A perfect natural sweetener and energy source.',
    longDescription:
      'Ajwa dates are one of the most prized varieties of dates, originating from Madinah, Saudi Arabia. These dates are known for their unique taste, soft texture, and numerous health benefits. Rich in natural sugars, fiber, and essential minerals, Ajwa dates are perfect for breaking fasts, snacking, or as a natural sweetener in recipes.',
    features: [
      'Authentic Ajwa Dates',
      'From Madinah',
      'Rich in Nutrients',
      'Natural Energy Source',
      'Premium Quality',
      'Handpicked Selection',
    ],
    nutrition: [
      { label: 'Natural Sugar', value: '66g per 100g' },
      { label: 'Fiber', value: '7g per 100g' },
      { label: 'Potassium', value: '20% DV' },
      { label: 'Iron', value: '15% DV' },
    ],
    rating: 4.9,
    reviews: 89,
    stock: 30,
    weight: '500g',
    origin: 'Madinah, Saudi Arabia',
  },
};

const relatedProducts = [
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
  {
    id: '4',
    name: 'Pistachio',
    price: 4500,
    originalPrice: 5200,
    image: '/Pistachio-Banner.jpg',
    category: 'Nuts',
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = productData[id] || productData['1'];
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Check if product is in wishlist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.some((item: { id: string }) => item.id === id));
    }
  }, [id]);

  const toggleWishlist = () => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const productItem = { 
        id, 
        name: product.name, 
        price: product.price, 
        originalPrice: product.originalPrice, 
        image: product.images[0],
        category: product.category
      };
      
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter((item: { id: string }) => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      } else {
        wishlist.push(productItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
      }
      
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Product Details */}
      <section className="py-6 sm:py-8 md:py-12 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {discount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white px-3 sm:px-6 py-1.5 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-xl"
                  >
                    -{discount}% OFF
                  </motion.div>
                )}
              </motion.div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {product.images.map((img: string, index: number) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#1A73A8] shadow-md sm:shadow-lg scale-105'
                        : 'border-transparent hover:border-[#DFF3EA]'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover object-center" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <Link href={`/categories/${product.category.toLowerCase().replace(' ', '-')}`}>
                  <span className="inline-block text-[#1A73A8] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 sm:mb-3 hover:text-[#0D2B3A] transition-colors">
                    {product.category}
                  </span>
                </Link>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4 leading-tight">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#F97316] text-[#F97316]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#6B7280] font-semibold text-sm sm:text-base">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-[#F8F2DE] to-white rounded-xl sm:rounded-2xl">
                <div className="flex-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D2B3A]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="block text-lg sm:text-xl md:text-2xl text-[#6B7280] line-through mt-1">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base md:text-lg text-[#6B7280] leading-relaxed">{product.description}</p>

              {/* Key Features */}
              <div className="bg-[#F8F2DE] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="font-bold text-[#0D2B3A] mb-3 sm:mb-4 text-base sm:text-lg">Key Features:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#1A73A8] flex-shrink-0" />
                      <span className="text-[#6B7280]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 space-y-3 p-4 sm:p-6 bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl">
                <span className="font-bold text-[#0D2B3A] text-base sm:text-lg">Quantity:</span>
                <div className="flex items-center space-x-3 bg-[#F8F2DE] rounded-full px-3 sm:px-4 py-2 sm:py-3">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D2B3A]" />
                  </motion.button>
                  <span className="font-bold text-[#0D2B3A] w-10 sm:w-12 text-center text-base sm:text-lg">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D2B3A]" />
                  </motion.button>
                </div>
                <span className="text-[#6B7280] text-sm sm:text-base">({product.stock} in stock)</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-[#1A73A8] to-[#0D2B3A] hover:from-[#0D2B3A] hover:to-[#1A73A8] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  onClick={toggleWishlist}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-full sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isInWishlist
                      ? 'bg-red-100 hover:bg-red-200 text-red-600'
                      : 'bg-[#DFF3EA] hover:bg-[#1A73A8] text-[#0D2B3A] hover:text-white'
                  }`}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-6 h-6 sm:w-7 sm:h-7 ${isInWishlist ? 'fill-red-600' : ''}`} />
                </motion.button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 hover:border-[#1A73A8] transition-all"
                >
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A73A8]" />
                  <span className="text-xs sm:text-sm text-[#6B7280] font-medium text-center leading-tight">Free Shipping</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 hover:border-[#1A73A8] transition-all"
                >
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A73A8]" />
                  <span className="text-xs sm:text-sm text-[#6B7280] font-medium text-center leading-tight">Secure Payment</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center space-y-1 sm:space-y-2 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 hover:border-[#1A73A8] transition-all"
                >
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A73A8]" />
                  <span className="text-xs sm:text-sm text-[#6B7280] font-medium text-center leading-tight">Easy Returns</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-[#F8F2DE] overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex space-x-2 sm:space-x-4 mb-6 sm:mb-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
              {['description', 'nutrition', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold capitalize transition-all text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-[#1A73A8] border-b-2 border-[#1A73A8]'
                      : 'text-[#6B7280] hover:text-[#0D2B3A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden"
            >
              {activeTab === 'description' && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">Product Description</h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm sm:text-base md:text-lg">{product.longDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <div className="flex items-center space-x-3 p-4 bg-[#F8F2DE] rounded-xl">
                      <Award className="w-6 h-6 text-[#1A73A8]" />
                      <div>
                        <p className="font-semibold text-[#0D2B3A]">Weight</p>
                        <p className="text-[#6B7280]">{product.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#F8F2DE] rounded-xl">
                      <TrendingUp className="w-6 h-6 text-[#1A73A8]" />
                      <div>
                        <p className="font-semibold text-[#0D2B3A]">Origin</p>
                        <p className="text-[#6B7280]">{product.origin}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-4 sm:mb-6">Nutritional Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {product.nutrition.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-[#F8F2DE] rounded-xl">
                        <span className="font-semibold text-[#0D2B3A]">{item.label}</span>
                        <span className="text-[#6B7280]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-4 sm:mb-6">Customer Reviews</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="p-6 bg-[#F8F2DE] rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-[#1A73A8] rounded-full flex items-center justify-center text-white font-bold">
                              {review}
                            </div>
                            <span className="font-semibold text-[#0D2B3A]">Customer {review}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#F97316] text-[#F97316]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[#6B7280]">Great product! Highly recommended.</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Buy This Product */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-[#F8F2DE] overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#F97316] mx-auto mb-3 sm:mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">Why Choose This Product?</h2>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Discover what makes this product special
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Handpicked and tested for excellence' },
              { icon: CheckCircle, title: '100% Authentic', desc: 'Genuine products guaranteed' },
              { icon: Gift, title: 'Best Value', desc: 'Great quality at competitive prices' },
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
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
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

      {/* Special Offer Banner */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-[#F97316] to-[#1A73A8] text-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Limited Time Offer!</h3>
                <p className="text-white/90 text-sm sm:text-base">Buy 2 Get 1 Free on selected items</p>
              </div>
            </div>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0D2B3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#DFF3EA] transition-colors shadow-xl w-full md:w-auto"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-8 sm:py-12 md:py-16 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#F97316]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A]">You May Also Like</h2>
            </div>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg px-4 sm:px-0">Related products you might be interested in</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
