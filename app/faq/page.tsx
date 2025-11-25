'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash on delivery, credit/debit cards, and bank transfers. All online payments are processed securely.',
  },
  {
    question: 'Do you offer free shipping?',
    answer:
      'Yes! We offer free shipping on orders over Rs. 2,000. For orders below this amount, a shipping fee of Rs. 200 applies.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Standard delivery within Karachi takes 2-3 business days. For other cities, delivery may take 5-7 business days.',
  },
  {
    question: 'Can I visit your physical store?',
    answer:
      'Absolutely! Our store is located in Bahadurabad, Karachi. You can visit us during our business hours or call us at 0342 3344040.',
  },
  {
    question: 'Are your products fresh?',
    answer:
      'Yes, we ensure all our products are fresh and of premium quality. We source directly from trusted suppliers and maintain strict quality control.',
  },
  {
    question: 'Do you have a return policy?',
    answer:
      'Yes, we offer returns within 7 days of purchase if the product is unopened and in its original packaging. Please contact us for return instructions.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer:
      'Yes, we offer special pricing for bulk orders. Please contact us directly at 0342 3344040 or email us for bulk order inquiries.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order is shipped, you will receive a tracking number via email or SMS. You can also contact us directly for order updates.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our products and services
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F8F2DE] transition-colors"
                >
                  <span className="font-semibold text-[#0D2B3A] pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#1A73A8] flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-[#6B7280] leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#F8F2DE]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#0D2B3A] mb-4">Still have questions?</h2>
            <p className="text-lg text-[#6B7280] mb-8">
              Can't find the answer you're looking for? Please contact our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-full font-semibold transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

