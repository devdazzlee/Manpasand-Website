'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Search as SearchIcon } from 'lucide-react';

const searchResults = [
  {
    id: '1',
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    image: '/Almonds-Banner-1.jpg',
    category: 'Dry Fruits',
  },
  {
    id: '2',
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    image: '/Ajwa-Dates-Banner-1.jpg',
    category: 'Dates',
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Search Products</h1>
            <form onSubmit={handleSearchSubmit} className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#6B7280]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-14 pr-4 py-4 rounded-xl text-[#0D2B3A] focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-[#6B7280] mb-6">
            {query ? `Search results for "${query}"` : 'Enter a search term above'}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={
        <Loader size="xl" text="Loading search results..." fullScreen />
      }>
        <SearchContent />
      </Suspense>
      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}

