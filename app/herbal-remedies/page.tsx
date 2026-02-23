'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Search, Leaf } from 'lucide-react';
import { productApi } from '../../lib/api/productApi';
import { mapApiProducts, DisplayProduct } from '../../lib/utils/productHelpers';

export default function HerbalRemediesPage() {
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productApi.listProducts({ fetch_all: true });
        const mapped = mapApiProducts(result.data);
        const herbs = mapped.filter(
          (p) =>
            p.category?.toLowerCase().includes('herb') ||
            p.name.toLowerCase().includes('herb') ||
            p.name.toLowerCase().includes('turmeric') ||
            p.name.toLowerCase().includes('ginger') ||
            p.name.toLowerCase().includes('cinnamon') ||
            p.name.toLowerCase().includes('fenugreek') ||
            p.name.toLowerCase().includes('black seed') ||
            p.name.toLowerCase().includes('remedy')
        );
        const finalProducts = herbs.length > 0 ? herbs : mapped.slice(0, 18);
        setProducts(finalProducts);
        setFilteredProducts(finalProducts);
      } catch (err) {
        console.error('Error fetching herbal remedies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Leaf className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">700+ Herbs & Remedies</h1>
            </div>
            <p className="text-xl text-white/90">
              Explore our extensive collection of traditional herbs and natural remedies for
              wellness and health
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search herbs and remedies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
              />
            </div>
          </div>

          {loading ? (
            <Loader size="lg" text="Loading herbs & remedies..." />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#6B7280] text-lg">No herbal products found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
