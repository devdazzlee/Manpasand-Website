'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Award, Users, Heart, MapPin, Clock, TrendingUp, Shield, Sparkles, Star, Gift, CheckCircle, Zap, Target, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { icon: Award, number: '25+', label: 'Years of Excellence', color: 'bg-[#F97316]' },
    { icon: Users, number: '10K+', label: 'Happy Customers', color: 'bg-[#1A73A8]' },
    { icon: Heart, number: '700+', label: 'Herbs & Remedies', color: 'bg-[#0D2B3A]' },
    { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: 'bg-[#1A73A8]' },
  ];

  const milestones = [
    { year: '1999', title: 'Founded', description: 'Started as a small family business in Bahadurabad' },
    { year: '2005', title: 'Expansion', description: 'Expanded product range to 200+ items' },
    { year: '2015', title: 'Online Launch', description: 'Launched online store for nationwide delivery' },
    { year: '2024', title: 'Today', description: '700+ products, 10K+ happy customers' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product is carefully selected and tested to ensure it meets our high standards.',
      bgColor: 'bg-[#1A73A8]',
    },
    {
      icon: Heart,
      title: 'Customer Trust',
      description: 'Building long-term relationships with our customers through honesty, transparency, and exceptional service.',
      bgColor: 'bg-[#F97316]',
    },
    {
      icon: Award,
      title: 'Authenticity',
      description: 'We source authentic products from trusted suppliers, ensuring you get the real deal every time.',
      bgColor: 'bg-[#0D2B3A]',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0D2B3A] via-[#1A73A8] to-[#0D2B3A] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFF3EA] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-[#DFF3EA]" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Manpasand Store</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Your trusted source for premium quality dry fruits, dates, nuts, and spices for over 25 years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                  className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-20 h-20 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md hover:shadow-lg transition-shadow`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-[#0D2B3A] mb-2">{stat.number}</h3>
                  <p className="text-[#6B7280] font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Our Story</h2>
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-12 h-1 bg-[#1A73A8] rounded-full"></div>
                <div className="w-16 h-1 bg-[#F97316] rounded-full"></div>
              </div>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 order-2 lg:order-1"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <p className="text-lg md:text-xl text-[#6B7280] leading-relaxed mb-6">
                    Manpasand Store was established over <span className="font-bold text-[#1A73A8]">25 years ago</span> in the heart of Bahadurabad, Karachi. 
                    What started as a small family business has grown into one of the most trusted names 
                    in premium dry fruits, dates, nuts, and spices.
                  </p>
                  <p className="text-lg md:text-xl text-[#6B7280] leading-relaxed">
                    Our commitment to <span className="font-semibold text-[#0D2B3A]">quality, authenticity, and customer satisfaction</span> has been the cornerstone 
                    of our success. We carefully source our products from the finest suppliers, ensuring that 
                    every item meets our high standards of freshness and quality.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex-1 h-1 bg-gradient-to-r from-[#1A73A8] to-[#F97316] rounded-full"></div>
                  <Award className="w-8 h-8 text-[#F97316]" />
                  <div className="flex-1 h-1 bg-gradient-to-r from-[#F97316] to-[#1A73A8] rounded-full"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative order-1 lg:order-2"
              >
                {/* Container with padding to accommodate badge */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 pb-20">
                  {/* Image container - no overflow hidden, allows full image display */}
                  <div className="relative w-full rounded-2xl bg-gray-50 flex items-center justify-center overflow-visible">
                    <img
                      src="/Manpasand-Banner-design-01-min.jpg"
                      alt="Manpasand Store - Premium Quality Products"
                      className="w-full h-auto object-contain rounded-2xl"
                      style={{ maxHeight: 'none' }}
                    />
                  </div>
                  
                  {/* Floating badge - positioned relative to container, not cut off */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute bottom-4 right-4 bg-white rounded-2xl p-5 shadow-xl border-2 border-[#DFF3EA] z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-2xl font-bold text-[#0D2B3A] leading-tight">25+</p>
                        <p className="text-sm text-[#6B7280] leading-tight">Years</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Our Journey</h2>
            <p className="text-lg text-[#6B7280] mb-6">Milestones that shaped our success</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-[#1A73A8] rounded-full"></div>
              <div className="w-16 h-1 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Year Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-2xl flex flex-col items-center justify-center shadow-md">
                            <span className="text-2xl font-bold text-white">{milestone.year}</span>
                            <div className="w-12 h-0.5 bg-white/30 mt-1"></div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-lg text-[#6B7280] leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                        
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-[#F8F2DE] rounded-xl flex items-center justify-center">
                            <Award className="w-8 h-8 text-[#F97316]" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Connecting line (except for last item) */}
                      {index < milestones.length - 1 && (
                        <div className="absolute left-12 top-full w-0.5 h-8 bg-gradient-to-b from-[#1A73A8] to-[#F97316] mt-4"></div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Our Values</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-6">
              The principles that guide everything we do
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-[#1A73A8] rounded-full"></div>
              <div className="w-16 h-1 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-20 h-20 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D2B3A] mb-4">{value.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Mission & Vision</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-1 bg-[#1A73A8] rounded-full"></div>
              <div className="w-16 h-1 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#1A73A8] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-4">Our Mission</h3>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                To enrich lives by providing access to the highest quality natural products, fostering health 
                and well-being in every community we serve. We are committed to excellence, authenticity, 
                and making premium products accessible to everyone.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#F97316] rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-4">Our Vision</h3>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                To be the leading provider of premium natural foods, recognized for our unwavering commitment 
                to quality, customer satisfaction, and community health. We envision a future where everyone 
                has access to authentic, high-quality natural products.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Why Trust Us?</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              We've earned the trust of thousands of customers through our commitment to excellence
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Authentic Products', desc: '100% genuine, verified sources' },
              { icon: Star, title: 'Premium Quality', desc: 'Handpicked and tested products' },
              { icon: Gift, title: 'Best Prices', desc: 'Competitive pricing guaranteed' },
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

      {/* Location Section */}
      <section className="py-20 bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFF3EA] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <MapPin className="w-16 h-16 text-[#DFF3EA]" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Visit Our Store</h2>
            <p className="text-xl text-white/90 mb-8">
              Located in the heart of Bahadurabad, Karachi, our store welcomes you to experience 
              our premium products in person.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-[#DFF3EA]" />
                <p className="text-2xl font-semibold">Bahadurabad, Karachi</p>
              </div>
              <p className="text-white/80">Pakistan</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
