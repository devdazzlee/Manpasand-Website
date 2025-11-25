'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-xl text-white/90">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 space-y-8"
          >
            <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Agreement to Terms</h2>
                <p>
                  By accessing and using Manpasand Store's website, you accept and agree to be bound
                  by the terms and provision of this agreement. If you do not agree to these terms,
                  please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Use License</h2>
                <p>
                  Permission is granted to temporarily access the materials on Manpasand Store's
                  website for personal, non-commercial transitory viewing only. This is the grant of
                  a license, not a transfer of title.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Product Information</h2>
                <p>
                  We strive to provide accurate product descriptions and images. However, we do not
                  warrant that product descriptions or other content on this site is accurate,
                  complete, reliable, current, or error-free.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Pricing</h2>
                <p>
                  All prices are listed in Pakistani Rupees (PKR) and are subject to change without
                  notice. We reserve the right to modify prices at any time. Prices do not include
                  shipping charges unless otherwise stated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Payment Terms</h2>
                <p>
                  Payment must be made at the time of order placement. We accept cash on delivery,
                  credit/debit cards, and bank transfers. All payments are processed securely.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Shipping & Delivery</h2>
                <p>
                  Shipping charges and delivery times are provided at checkout. We are not
                  responsible for delays caused by shipping carriers or customs. Risk of loss and
                  title for products pass to you upon delivery.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Returns & Refunds</h2>
                <p>
                  Returns are accepted within 7 days of delivery for unopened items in original
                  packaging. Please refer to our Returns Policy for detailed information. Refunds
                  will be processed within 5-7 business days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Limitation of Liability</h2>
                <p>
                  Manpasand Store shall not be liable for any indirect, incidental, special, or
                  consequential damages arising out of or in connection with the use of our website
                  or products.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-4">Contact Information</h2>
                <p>
                  For any questions regarding these Terms & Conditions, please contact us at:
                  <br />
                  Email: info@manpasandstore.com
                  <br />
                  Phone: 0342 3344040
                  <br />
                  Address: Bahadurabad, Karachi, Pakistan
                </p>
              </div>
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

