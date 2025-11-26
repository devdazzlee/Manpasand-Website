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
    { icon: Award, number: '25+', label: 'Years of Excellence', color: 'from-[#F97316] to-[#1A73A8]' },
    { icon: Users, number: '10K+', label: 'Happy Customers', color: 'from-[#1A73A8] to-[#0D2B3A]' },
    { icon: Heart, number: '700+', label: 'Herbs & Remedies', color: 'from-[#DFF3EA] to-[#1A73A8]' },
    { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: 'from-[#1A73A8] to-[#F97316]' },
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
      color: 'from-[#1A73A8] to-[#0D2B3A]',
    },
    {
      icon: Heart,
      title: 'Customer Trust',
      description: 'Building long-term relationships with our customers through honesty, transparency, and exceptional service.',
      color: 'from-[#F97316] to-[#1A73A8]',
    },
    {
      icon: Award,
      title: 'Authenticity',
      description: 'We source authentic products from trusted suppliers, ensuring you get the real deal every time.',
      color: 'from-[#DFF3EA] to-[#1A73A8]',
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
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#1A73A8] to-[#F97316] mx-auto mb-8"></div>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="text-lg text-[#6B7280] leading-relaxed">
                  Manpasand Store was established over 25 years ago in the heart of Bahadurabad, Karachi. 
                  What started as a small family business has grown into one of the most trusted names 
                  in premium dry fruits, dates, nuts, and spices.
                </p>
                <p className="text-lg text-[#6B7280] leading-relaxed">
                  Our commitment to quality, authenticity, and customer satisfaction has been the cornerstone 
                  of our success. We carefully source our products from the finest suppliers, ensuring that 
                  every item meets our high standards of freshness and quality.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/Manpasand-Banner-design-01-min.jpg"
                    alt="Manpasand Store"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F8F2DE] via-white to-[#F8F2DE] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#1A73A8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#F97316] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#F97316] mx-auto" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-3 sm:mb-4">
              Our Journey
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base md:text-lg">
              Milestones that shaped our success
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1A73A8] to-[#F97316] mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-[#1A73A8] via-[#F97316] to-[#1A73A8] hidden sm:block"></div>
              
              <div className="space-y-8 sm:space-y-12">
                {milestones.map((milestone, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                          className="relative"
                        >
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1A73A8] to-[#F97316] rounded-full shadow-xl flex items-center justify-center border-4 border-white">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                          </div>
                          {/* Pulse animation */}
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            className="absolute inset-0 bg-[#1A73A8] rounded-full"
                          ></motion.div>
                        </motion.div>
                      </div>

                      {/* Content Card */}
                      <div className={`ml-12 sm:ml-0 sm:w-5/12 ${isEven ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="relative group"
                        >
                          {/* Card */}
                          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1A73A8]/0 to-[#F97316]/0 group-hover:from-[#1A73A8]/5 group-hover:to-[#F97316]/5 transition-all duration-300 rounded-2xl sm:rounded-3xl"></div>
                            
                            <div className="relative z-10">
                              {/* Year Badge */}
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
                                className="inline-block mb-4"
                              >
                                <div className="bg-gradient-to-br from-[#1A73A8] to-[#F97316] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-lg">
                                  <span className="font-bold text-sm sm:text-base md:text-lg">{milestone.year}</span>
                                </div>
                              </motion.div>
                              
                              {/* Title */}
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-3 sm:mb-4 flex items-center gap-3">
                                <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-[#1A73A8] to-[#F97316] rounded-full"></div>
                                {milestone.title}
                              </h3>
                              
                              {/* Description */}
                              <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
                                {milestone.description}
                              </p>
                              
                              {/* Decorative corner */}
                              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#1A73A8]/10 to-transparent rounded-bl-3xl"></div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D2B3A] mb-4">Our Values</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
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
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-[#F8F2DE] to-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
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
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#1A73A8] to-[#0D2B3A] rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#0D2B3A] mb-4">Our Mission</h3>
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
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-[#1A73A8] rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#0D2B3A] mb-4">Our Vision</h3>
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
