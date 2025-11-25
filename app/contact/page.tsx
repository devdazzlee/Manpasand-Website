'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Bahadurabad, Karachi, Pakistan',
      color: 'from-[#1A73A8] to-[#0D2B3A]',
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '0342 3344040',
      href: 'tel:+923423344040',
      color: 'from-[#F97316] to-[#1A73A8]',
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'info@manpasandstore.com',
      href: 'mailto:info@manpasandstore.com',
      color: 'from-[#1A73A8] to-[#F97316]',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      info: '0342 3344040',
      href: 'https://wa.me/923423344040',
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
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-white/90">
              We'd love to hear from you. Get in touch with us today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gradient-to-b from-white to-[#F8F2DE]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const Component = method.href ? motion.a : motion.div;
              return (
                <Component
                  key={method.title}
                  href={method.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D2B3A] mb-2">{method.title}</h3>
                  <p className="text-[#6B7280]">{method.info}</p>
                </Component>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-6">Send us a Message</h2>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[#0D2B3A] font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[#0D2B3A] font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[#0D2B3A] font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-[#0D2B3A] font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[#0D2B3A] font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-5 rounded-full font-bold text-lg transition-colors flex items-center justify-center space-x-2 shadow-xl"
                  >
                    <Send className="w-6 h-6" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#DFF3EA] rounded-3xl p-12 text-center"
                >
                  <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-[#0D2B3A] mb-2">Thank You!</h3>
                  <p className="text-[#6B7280] text-lg">We'll get back to you soon.</p>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-6">Get in Touch</h2>
                <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
                  Visit our store in Bahadurabad, Karachi, or reach out to us through any of the 
                  following channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-[#F8F2DE] to-white rounded-2xl shadow-lg"
                >
                  <div className="w-14 h-14 bg-[#DFF3EA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-[#0D2B3A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D2B3A] mb-2 text-lg">Address</h3>
                    <p className="text-[#6B7280]">
                      Bahadurabad, Karachi
                      <br />
                      Pakistan
                    </p>
                  </div>
                </motion.div>

                <motion.a
                  href="tel:+923423344040"
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-[#F8F2DE] to-white rounded-2xl shadow-lg hover:shadow-xl transition-all block"
                >
                  <div className="w-14 h-14 bg-[#DFF3EA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-[#0D2B3A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D2B3A] mb-2 text-lg">Phone</h3>
                    <p className="text-[#1A73A8] hover:text-[#0D2B3A] transition-colors font-semibold">
                      0342 3344040
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@manpasandstore.com"
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-[#F8F2DE] to-white rounded-2xl shadow-lg hover:shadow-xl transition-all block"
                >
                  <div className="w-14 h-14 bg-[#DFF3EA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-[#0D2B3A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D2B3A] mb-2 text-lg">Email</h3>
                    <p className="text-[#1A73A8] hover:text-[#0D2B3A] transition-colors font-semibold break-all">
                      info@manpasandstore.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/923423344040"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-4 bg-[#1A73A8] hover:bg-[#0D2B3A] text-white rounded-2xl p-6 transition-all shadow-xl"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-lg">WhatsApp Us</h3>
                    <p className="text-white/90">0342 3344040</p>
                  </div>
                </motion.a>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-[#F8F2DE] to-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-[#1A73A8]" />
                  <h3 className="font-bold text-[#0D2B3A] text-lg">Business Hours</h3>
                </div>
                <div className="space-y-2 text-[#6B7280]">
                  <p>Monday - Saturday: 9:00 AM - 9:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
