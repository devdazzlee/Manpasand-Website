'use client';

import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import Services from './components/Services';
import ProductCard from './components/ProductCard';
import { ArrowRight, Star, TrendingUp, Users, Award, Sparkles, Heart, ShoppingBag, CheckCircle, Zap, Gift, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Dry Fruits', image: '/Almonds-Banner-1.jpg', href: '/categories/dry-fruits' },
  { name: 'Dates', image: '/Ajwa-Dates-Banner-1.jpg', href: '/categories/dates' },
  { name: 'Nuts', image: '/Cashew-kaju-Banner-1.jpg', href: '/categories/nuts' },
  { name: 'Honey', image: '/Banner-01.jpg', href: '/categories/honey' },
  { name: 'Saffron', image: '/Banner-01.jpg', href: '/categories/saffron' },
  { name: 'Spices', image: '/Biryani-Masala-Banner.jpg', href: '/categories/spices' },
];

const featuredProducts = [
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
  {
    id: '4',
    name: 'Pistachio',
    price: 4500,
    originalPrice: 5200,
    image: '/Pistachio-Banner.jpg',
    category: 'Nuts',
  },
  {
    id: '5',
    name: 'Biryani Masala',
    price: 450,
    originalPrice: 550,
    image: '/Biryani-Masala-Banner.jpg',
    category: 'Spices',
  },
  {
    id: '6',
    name: 'Chicken Masala',
    price: 420,
    originalPrice: 500,
    image: '/Chicken-Masala-Banner.jpg',
    category: 'Spices',
  },
];

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

const stats = [
  { icon: Users, number: '10K+', label: 'Happy Customers', color: 'from-[#1A73A8] to-[#0D2B3A]' },
  { icon: Award, number: '25+', label: 'Years Experience', color: 'from-[#F97316] to-[#1A73A8]' },
  { icon: ShoppingBag, number: '700+', label: 'Products Available', color: 'from-[#DFF3EA] to-[#1A73A8]' },
  { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: 'from-[#1A73A8] to-[#F97316]' },
];

const features = [
  { icon: CheckCircle, title: 'Premium Quality', description: 'Handpicked from trusted sources' },
  { icon: CheckCircle, title: 'Fresh Products', description: 'Always fresh and authentic' },
  { icon: CheckCircle, title: 'Best Prices', description: 'Competitive pricing guaranteed' },
  { icon: CheckCircle, title: 'Fast Delivery', description: 'Quick and secure shipping' },
];

const benefits = [
  { icon: Shield, title: '100% Authentic', description: 'All products are verified authentic' },
  { icon: Truck, title: 'Free Shipping', description: 'On orders over Rs. 2000' },
  { icon: Gift, title: 'Special Offers', description: 'Regular discounts and promotions' },
  { icon: Clock, title: '24/7 Support', description: 'Always here to help you' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0D2B3A] via-[#1A73A8] to-[#0D2B3A] text-white overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-[#DFF3EA] rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-48 h-48 md:w-96 md:h-96 bg-[#F97316] rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 text-center md:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                  🏆 25+ Years of Excellence
                </span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Premium Quality
                <span className="block text-[#DFF3EA] mt-1 sm:mt-2">Dry Fruits & Spices</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-2 sm:px-0">
                Discover 700+ herbs, remedies, and premium quality products. 
                25+ years of excellence in Bahadurabad, Karachi.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/shop"
                    className="inline-flex items-center space-x-2 bg-[#1A73A8] hover:bg-[#DFF3EA] text-white hover:text-[#0D2B3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-xl text-sm sm:text-base md:text-lg"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 border border-white/30 text-sm sm:text-base md:text-lg"
                  >
                    <span>Learn More</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full flex items-center justify-center mt-8 md:mt-0"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-full md:max-w-2xl"
              >
                <img
                  src="/Manpasand-Banner-design-01-min.jpg"
                  alt="Manpasand Store"
                  className="w-full h-auto rounded-2xl md:rounded-3xl shadow-2xl block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B3A]/30 to-transparent rounded-2xl md:rounded-3xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#F8F2DE] to-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-1 sm:mb-2">{stat.number}</h3>
                  <p className="text-[#6B7280] font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
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
                <p className="text-white/90 text-sm sm:text-base">Get Rs. 500 off on your first order</p>
              </div>
            </div>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0D2B3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#DFF3EA] transition-colors shadow-xl w-full sm:w-auto"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block mb-3 sm:mb-4"
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F97316] mx-auto" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">
              Shop by Category
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0">
              Explore our wide range of premium products
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <Link href={category.href}>
                  <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group">
                    <div className="aspect-square relative overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover object-center"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B3A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-3 sm:p-4 md:p-5 text-center">
                      <h3 className="font-bold text-[#0D2B3A] text-sm sm:text-base md:text-lg group-hover:text-[#1A73A8] transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">
              Why Choose Manpasand?
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 sm:px-0">
              We are committed to providing the best quality products and exceptional service
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-[#F8F2DE] to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-[#6B7280] text-sm sm:text-base">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F8F2DE] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#F97316]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A]">
                Featured Products
              </h2>
            </div>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0">
              Handpicked premium selections for you
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-[#1A73A8] hover:text-[#0D2B3A] font-semibold text-lg group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Experience the difference with our premium service and quality products
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotate: [0, -5, 5, 0] }}
                  className="bg-gradient-to-br from-[#DFF3EA] to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-2 sm:mb-3">{benefit.title}</h3>
                  <p className="text-[#6B7280] text-sm sm:text-base">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 700+ Herbs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block"
              >
                <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#DFF3EA] mx-auto mb-4 sm:mb-6" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-4 sm:px-0">
                700+ Herbs & Remedies
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-4 sm:px-6 md:px-0">
                Explore our extensive collection of traditional herbs, natural remedies, 
                and premium quality products. From ancient remedies to modern wellness, 
                we have everything you need for a healthy lifestyle.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-2 sm:pt-4"
              >
                <Link
                  href="/herbal-remedies"
                  className="inline-flex items-center space-x-2 bg-[#DFF3EA] hover:bg-white text-[#0D2B3A] px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl"
                >
                  <span>Explore Herbs</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
                  "{testimonial.comment}"
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

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
