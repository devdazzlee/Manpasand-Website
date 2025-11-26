'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Search, User, ChevronDown, Leaf, Apple, Calendar, Droplets, UtensilsCrossed, Wheat, Sparkles, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { name: 'Dry Fruits', href: '/categories/dry-fruits', icon: Apple, description: 'Premium quality dry fruits' },
  { name: 'Dates', href: '/categories/dates', icon: Calendar, description: 'Authentic dates collection' },
  { name: 'Nuts', href: '/categories/nuts', icon: Package, description: 'Fresh crunchy nuts' },
  { name: 'Honey', href: '/categories/honey', icon: Droplets, description: 'Pure natural honey' },
  { name: 'Saffron', href: '/categories/saffron', icon: Sparkles, description: 'Premium saffron threads' },
  { name: 'Herbs', href: '/categories/herbs', icon: Leaf, description: '700+ herbs & remedies' },
  { name: 'Spices', href: '/categories/spices', icon: UtensilsCrossed, description: 'Aromatic spices' },
  { name: 'Pulses / Rice', href: '/categories/pulses-rice', icon: Wheat, description: 'High-quality pulses & rice' },
  { name: 'Oil', href: '/categories/oil', icon: Droplets, description: 'Pure cooking oils' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-[#0D2B3A] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/Manpasand-Logo.png"
                alt="Manpasand Store"
                className="h-16 md:h-20 w-auto"
                width={180}
                height={80}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => {
              // Render Shop link
              if (item.name === 'Shop') {
                return (
                  <div key={item.name} className="flex items-center space-x-6">
                    <Link
                      href={item.href}
                      className="text-white hover:text-[#DFF3EA] transition-colors duration-300 font-medium text-sm"
                    >
                      {item.name}
                    </Link>
                    {/* Products Dropdown - appears right after Shop */}
                    <div
                      className="relative"
                      onMouseEnter={() => setIsCategoriesOpen(true)}
                      onMouseLeave={() => setIsCategoriesOpen(false)}
                    >
                      <button className="flex items-center space-x-1 text-white hover:text-[#DFF3EA] transition-colors duration-300 font-medium text-sm">
                        <span>Products</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isCategoriesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
                          >
                            <div className="p-4 bg-gradient-to-r from-[#1A73A8] to-[#0D2B3A]">
                              <h3 className="text-white font-bold text-lg">Shop by Category</h3>
                              <p className="text-white/80 text-sm mt-1">Browse our premium products</p>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                              {categories.map((category, index) => {
                                const Icon = category.icon;
                                return (
                                  <Link
                                    key={category.name}
                                    href={category.href}
                                    onClick={() => setIsCategoriesOpen(false)}
                                  >
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.03 }}
                                      className="flex items-center space-x-4 p-4 hover:bg-[#F8F2DE] transition-colors border-b border-gray-100 last:border-b-0 group"
                                    >
                                      <div className="w-12 h-12 bg-[#DFF3EA] rounded-xl flex items-center justify-center group-hover:bg-[#1A73A8] transition-colors">
                                        <Icon className="w-6 h-6 text-[#0D2B3A] group-hover:text-white transition-colors" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-[#0D2B3A] group-hover:text-[#1A73A8] transition-colors">
                                          {category.name}
                                        </h4>
                                        <p className="text-sm text-[#6B7280]">{category.description}</p>
                                      </div>
                                      <ChevronDown className="w-4 h-4 text-[#6B7280] rotate-[-90deg] group-hover:text-[#1A73A8] transition-colors" />
                                    </motion.div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="p-4 bg-[#F8F2DE] border-t border-gray-200">
                              <Link
                                href="/shop"
                                className="block text-center text-[#1A73A8] hover:text-[#0D2B3A] font-semibold text-sm transition-colors"
                              >
                                View All Products →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }
              // Render other menu items normally
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#DFF3EA] transition-colors duration-300 font-medium text-sm"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 bg-[#F97316] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0D2B3A] border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {menuItems.map((item) => {
                // Render Shop link
                if (item.name === 'Shop') {
                  return (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-white hover:text-[#DFF3EA] transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                      {/* Mobile Categories - appears right after Shop */}
                      <div className="pt-2">
                        <button
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className="flex items-center justify-between w-full text-white hover:text-[#DFF3EA] transition-colors py-2"
                        >
                          <span>Products</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isCategoriesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 mt-2 space-y-2"
                            >
                              {categories.map((category) => {
                                const Icon = category.icon;
                                return (
                                  <Link
                                    key={category.name}
                                    href={category.href}
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setIsCategoriesOpen(false);
                                    }}
                                    className="flex items-center space-x-3 text-white/80 hover:text-[#DFF3EA] transition-colors py-2"
                                  >
                                    <Icon className="w-4 h-4" />
                                    <span>{category.name}</span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                }
                // Render other menu items normally
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:text-[#DFF3EA] transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white hover:text-[#DFF3EA] transition-colors py-2"
                >
                  Login / Register
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
