'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Dry Fruits', href: '/categories/dry-fruits' },
        { name: 'Dates', href: '/categories/dates' },
        { name: 'Nuts', href: '/categories/nuts' },
        { name: 'Honey', href: '/categories/honey' },
        { name: 'Saffron', href: '/categories/saffron' },
        { name: 'Spices', href: '/categories/spices' },
      ],
    },
    {
      title: 'Information',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping & Returns', href: '/shipping-returns' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms & Conditions', href: '/terms-conditions' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'My Account', href: '/login' },
        { name: 'Order Tracking', href: '/orders' },
        { name: 'Returns', href: '/shipping-returns' },
        { name: 'Support', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0D2B3A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <img
              src="/Manpasand-Logo.png"
              alt="Manpasand Store"
              className="h-12 w-auto mb-4"
              width={120}
              height={48}
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Manpasand Store - Your trusted source for premium quality dry fruits, dates, nuts, and spices. 
              Serving customers for over 25 years with excellence.
            </p>
            <div className="flex space-x-4 pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1A73A8] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#DFF3EA] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#1A73A8] mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Bahadurabad, Karachi, Pakistan
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1A73A8] flex-shrink-0" />
                <a
                  href="tel:+923423344040"
                  className="text-gray-300 hover:text-[#DFF3EA] transition-colors text-sm"
                >
                  0342 3344040
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#1A73A8] flex-shrink-0" />
                <a
                  href="mailto:info@manpasandstore.com"
                  className="text-gray-300 hover:text-[#DFF3EA] transition-colors text-sm"
                >
                  info@manpasandstore.com
                </a>
              </div>
            </div>
          </motion.div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Manpasand Store. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
