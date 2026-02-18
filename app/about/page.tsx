'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { Award, Users, Heart, MapPin, TrendingUp, Shield, Sparkles, Star, Gift, CheckCircle, Target, Eye, Sprout, Globe, Package, Leaf, Clock, Phone, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { icon: Award, number: '25+', label: 'Years of Excellence', color: 'bg-[#F97316]' },
    { icon: Users, number: '10K+', label: 'Happy Customers', color: 'bg-[#1A73A8]' },
    { icon: Heart, number: '1400+', label: 'Products Available', color: 'bg-[#0D2B3A]' },
    { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: 'bg-[#1A73A8]' },
  ];

  const milestones = [
    {
      year: '2000',
      badge: 'The First Seed',
      title: 'Our Humble Beginnings',
      description: 'Manpasand Store opened its doors as a small, family-run apothecary in the heart of Bahadurabad, Karachi. Our mission was simple: to provide the community with unadulterated spices and the freshest dry fruits available.',
      icon: Sprout,
      iconBg: 'linear-gradient(135deg, #22c55e, #059669)',
      badgeBg: 'linear-gradient(90deg, #22c55e, #059669)',
    },
    {
      year: '2005',
      badge: 'Building the Collection',
      title: 'Expanding to 200+ Items',
      description: 'As word of our quality spread across Karachi, we expanded our inventory to include rare medicinal herbs and traditional remedies. We became a trusted destination for those seeking authentic "Pansar" expertise.',
      icon: Package,
      iconBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      badgeBg: 'linear-gradient(90deg, #3b82f6, #2563eb)',
    },
    {
      year: '2012',
      badge: 'Mastery of Sourcing',
      title: 'Direct from the Origin',
      description: 'To ensure the "Manpasand Standard," we began sourcing directly from the finest farms—bringing premium Saffron from Iran and organic Honey from the northern valleys of Pakistan straight to our shelves.',
      icon: Globe,
      iconBg: 'linear-gradient(135deg, #a855f7, #9333ea)',
      badgeBg: 'linear-gradient(90deg, #a855f7, #9333ea)',
    },
    {
      year: '2018',
      badge: 'A Household Name',
      title: 'Serving 500+ Varieties',
      description: 'By 2018, our catalog grew to over 500 products. We refined our cleaning and grading processes, ensuring that every walnut, date, and spice grain met our strict "Zero Compromise" quality policy.',
      icon: Star,
      iconBg: 'linear-gradient(135deg, #F97316, #ea580c)',
      badgeBg: 'linear-gradient(90deg, #F97316, #ea580c)',
    },
    {
      year: '2020',
      badge: 'The Digital Transition',
      title: 'Beyond Bahadurabad',
      description: 'Recognizing the demand from our loyal customers moving abroad or to other cities, we launched our digital storefront. We brought 25 years of local trust to a nationwide audience with secure packaging and reliable delivery.',
      icon: TrendingUp,
      iconBg: 'linear-gradient(135deg, #1A73A8, #1d4ed8)',
      badgeBg: 'linear-gradient(90deg, #1A73A8, #1d4ed8)',
    },
    {
      year: '2026',
      badge: 'Today & Tomorrow',
      title: '1400+ Products & Counting',
      description: 'Today, Manpasand Store stands as a leader in premium natural wellness. With over 1400 products and a quarter-century of history, we remain committed to the same purity that started it all back in 2000.',
      icon: Leaf,
      iconBg: 'linear-gradient(135deg, #0D2B3A, #1A73A8)',
      badgeBg: 'linear-gradient(90deg, #0D2B3A, #1A73A8)',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise. Every product is carefully selected and tested to ensure it meets the rigorous Manpasand standards.',
      bgColor: 'bg-[#1A73A8]',
    },
    {
      icon: Heart,
      title: 'Customer Trust',
      description: 'Building long-term relationships through honesty and transparency is the foundation of our 25-year history in Karachi.',
      bgColor: 'bg-[#F97316]',
    },
    {
      icon: Award,
      title: 'Authenticity',
      description: 'We source exclusively from trusted suppliers, ensuring you get the "real deal"—from farm-fresh nuts to unadulterated spices—every time.',
      bgColor: 'bg-[#0D2B3A]',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0D2B3A] via-[#1A73A8] to-[#0D2B3A] text-white py-14 sm:py-18 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-[#DFF3EA] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-56 sm:w-72 h-56 sm:h-72 bg-[#F97316] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#DFF3EA] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">About Manpasand Store</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Your trusted source for premium quality dry fruits, dates, nuts, and spices for over 25 years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-b from-white to-[#F8F2DE]/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-5 sm:p-7 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-1">{stat.number}</h3>
                  <p className="text-[#6B7280] font-medium text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 sm:py-18 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A73A8]/20 to-transparent"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 sm:mb-14"
            >
              <span className="inline-block text-[#F97316] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
                Since 2000
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-4">
                Our Story
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-0.5 bg-[#1A73A8] rounded-full"></div>
                <div className="w-12 h-0.5 bg-[#F97316] rounded-full"></div>
              </div>
            </motion.div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
              {/* Left — Large year visual */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-2 relative"
              >
                <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D2B3A, #1A73A8)' }}>
                  <div className="p-8 sm:p-10 text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <p className="text-7xl sm:text-8xl font-bold text-white/10 leading-none select-none">25</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white -mt-4 relative z-10">25+ Years</p>
                      <div className="w-10 h-0.5 bg-[#F97316] rounded-full mx-auto mt-4 mb-4"></div>
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                        Of excellence, trust &amp; heritage in Karachi
                      </p>
                    </motion.div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-[#F97316]">1400+</p>
                        <p className="text-white/60 text-xs sm:text-sm mt-0.5">Products</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-[#DFF3EA]">2</p>
                        <p className="text-white/60 text-xs sm:text-sm mt-0.5">Branches</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right — Story text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-3 space-y-5"
              >
                {/* Quote */}
                <div className="relative pl-5 border-l-3 border-[#F97316]">
                  <p className="text-lg sm:text-xl md:text-2xl text-[#0D2B3A] font-medium italic leading-relaxed">
                    &ldquo;What started as a small family apothecary has grown into Karachi&apos;s most trusted name in premium natural products.&rdquo;
                  </p>
                </div>

                {/* Main paragraphs */}
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                  Manpasand Store was established in <span className="font-semibold text-[#0D2B3A]">2000</span> in the heart of Bahadurabad, Karachi.
                  What began as a humble mission to provide the community with pure, unadulterated spices
                  has blossomed into a legacy spanning over two decades.
                </p>

                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                  Our unwavering commitment to <span className="font-semibold text-[#0D2B3A]">quality, authenticity, and customer satisfaction</span> has
                  been the cornerstone of our growth. We carefully source every product — from rare Iranian Saffron
                  to organic Northern Honey — directly from the finest farms and trusted suppliers.
                </p>

                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                  Today, with <span className="font-semibold text-[#0D2B3A]">1400+ products</span> and <span className="font-semibold text-[#0D2B3A]">2 branches</span> across
                  Karachi, we continue to serve our community with the same passion and &ldquo;Zero Compromise&rdquo; approach to
                  freshness that we started with.
                </p>

                {/* Highlight cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="flex items-center gap-3 bg-[#F8F2DE]/50 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0D2B3A, #1A73A8)' }}>
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D2B3A] text-sm">Zero Compromise</p>
                      <p className="text-xs text-[#6B7280]">On purity & quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#DFF3EA]/40 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #059669, #0D9488)' }}>
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D2B3A] text-sm">Family Values</p>
                      <p className="text-xs text-[#6B7280]">Built on trust</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F97316]/5 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F97316, #ea580c)' }}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D2B3A] text-sm">Heritage Brand</p>
                      <p className="text-xs text-[#6B7280]">Since 2000</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey / Timeline Section */}
      <section className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-[#F8F2DE]/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3">
              A Legacy of Purity: Our Journey
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-xl mx-auto mb-4">
              Milestones that define 25 years of trust in Karachi
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-0.5 bg-[#1A73A8] rounded-full"></div>
              <div className="w-12 h-0.5 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>

          {/* Clean Grid Timeline */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    {/* Top row: Icon + Year + Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300"
                        style={{ background: milestone.iconBg }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <span
                          className="inline-block text-xs font-bold text-white px-2.5 py-0.5 rounded-full"
                          style={{ background: milestone.badgeBg }}
                        >
                          {milestone.year}
                        </span>
                        <p className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium mt-1 uppercase tracking-wide">
                          {milestone.badge}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0D2B3A] mb-2">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-[15px] text-[#6B7280] leading-relaxed flex-grow">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-white to-[#F8F2DE]/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3">Our Values</h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-lg mx-auto mb-4">
              The principles that guide our product selections.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-0.5 bg-[#1A73A8] rounded-full"></div>
              <div className="w-12 h-0.5 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${value.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-2">{value.title}</h3>
                  <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-14 sm:py-18 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3">Mission & Vision</h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-lg mx-auto mb-4">
              Aligning your goals with community health and premium standards.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-0.5 bg-[#1A73A8] rounded-full"></div>
              <div className="w-12 h-0.5 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #1A73A8, #0D2B3A)' }}>
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-3">Our Mission</h3>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                To enrich lives by providing access to the highest quality natural products, fostering health 
                and well-being in every home we serve. We are committed to making authentic, premium wellness 
                accessible to everyone through excellence and transparency.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #F97316, #ea580c)' }}>
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-3">Our Vision</h3>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                To be Pakistan&apos;s leading provider of premium natural foods, recognized for our unwavering 
                commitment to quality and community health. We envision a future where every household has 
                access to authentic, high-quality natural remedies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-[#F8F2DE]/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3">Why Trust Us?</h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-lg mx-auto">
              We have earned the trust of thousands of customers through our commitment to excellence.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Authentic Products', desc: '100% genuine items from verified, trusted sources.' },
              { icon: Star, title: 'Premium Quality', desc: 'Every item in our 700+ catalog is handpicked and thoroughly tested.' },
              { icon: Gift, title: 'Best Prices', desc: 'Competitive pricing guaranteed for the highest grade of natural wellness.' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-gray-100"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #1A73A8, #0D2B3A)' }}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section id="branches" className="py-14 sm:py-18 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D2B3A] mb-3">
              Visit Our Stores
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-lg mx-auto mb-4">
              Experience our premium products in person at our two Karachi locations.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-0.5 bg-[#1A73A8] rounded-full"></div>
              <div className="w-12 h-0.5 bg-[#F97316] rounded-full"></div>
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Bahadurabad Branch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <a
                href="https://www.google.com/maps/place/Manpasand+Store+Bahadurabad/@24.8827589,67.069352,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33ff52d5284f9:0x9a310ddf5383b6c2!8m2!3d24.8827589!4d67.069352!16s%2Fg%2F11ynv90wxj"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col cursor-pointer group-hover:-translate-y-1">
                  <div className="px-5 py-3 text-center" style={{ background: 'linear-gradient(to right, #F97316, #ea580c)' }}>
                    <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                      ★ Bahadurabad Branch
                    </span>
                  </div>
                  <div className="p-5 sm:p-7 flex flex-col flex-grow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #F97316, #ea580c)' }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-3">Bahadurabad Branch</h3>

                    <div className="space-y-2.5 text-sm mb-4 flex-grow">
                      <div className="flex items-start gap-2.5 text-[#6B7280]">
                        <MapPin className="w-4 h-4 text-[#1A73A8] flex-shrink-0 mt-0.5" />
                        <span>The Heart of Bahadurabad, Karachi, Pakistan.</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#6B7280]">
                        <Phone className="w-4 h-4 text-[#1A73A8] flex-shrink-0" />
                        <span
                          onClick={(e) => e.stopPropagation()}
                          className="contents"
                        >
                          <a href="tel:02134892110" className="hover:text-[#1A73A8] transition-colors font-medium">021-34892110</a>
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4 border-l-2 border-[#F97316] pl-3 italic">
                      Our original flagship store, home to our full range of products.
                    </p>

                    <div className="inline-flex items-center justify-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-semibold w-full" style={{ background: 'linear-gradient(to right, #0D2B3A, #1A73A8)' }}>
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* DHA Branch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group"
            >
              <a
                href="https://www.google.com/maps/place/Manpasand+dry+fruit/@24.8237151,67.0618563,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33c44fa4896dd:0x7151d4b8979aea1a!8m2!3d24.8237151!4d67.0618563!16s%2Fg%2F11cs69j876"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col cursor-pointer group-hover:-translate-y-1">
                  <div className="px-5 py-3 text-center" style={{ background: 'linear-gradient(to right, #1A73A8, #0D2B3A)' }}>
                    <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                      ★ DHA Branch
                    </span>
                  </div>
                  <div className="p-5 sm:p-7 flex flex-col flex-grow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #1A73A8, #0D2B3A)' }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D2B3A] mb-3">DHA Branch</h3>

                    <div className="space-y-2.5 text-sm mb-4 flex-grow">
                      <div className="flex items-start gap-2.5 text-[#6B7280]">
                        <MapPin className="w-4 h-4 text-[#1A73A8] flex-shrink-0 mt-0.5" />
                        <span>Phase 4, DHA, Karachi, Pakistan.</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#6B7280]">
                        <Phone className="w-4 h-4 text-[#1A73A8] flex-shrink-0" />
                        <span
                          onClick={(e) => e.stopPropagation()}
                          className="contents"
                        >
                          <a href="tel:02135384433" className="hover:text-[#1A73A8] transition-colors font-medium">021-35384433</a>
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4 border-l-2 border-[#1A73A8] pl-3 italic">
                      Our DHA neighbourhood outlet, designed for a modern, convenient shopping experience.
                    </p>

                    <div className="inline-flex items-center justify-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-semibold w-full" style={{ background: 'linear-gradient(to right, #0D2B3A, #1A73A8)' }}>
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Call-to-action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-sm sm:text-base text-[#6B7280] mb-4">Can&apos;t visit in person? We deliver across Pakistan!</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-orange-500 text-white px-7 py-3 rounded-full font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity shadow-md"
            >
              Shop Online Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
