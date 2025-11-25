'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#1A73A8] text-white py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Newsletter Text */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Sign up to Newsletter</h3>
              <p className="text-white/90 text-sm">
                ...and receive Rs. 500 coupon for first shopping
              </p>
            </div>
          </div>

          {/* Right: WhatsApp Button */}
          <motion.a
            href="https://wa.me/923423344040"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">0342 3344040</span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}

