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
import { productApi } from '../../lib/api/productApi';
import { mapApiProducts, DisplayProduct } from '../../lib/utils/productHelpers';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
    if (urlQuery.trim()) {
      performSearch(urlQuery.trim());
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      setSearched(true);
      const results = await productApi.searchProducts(searchQuery);
      setProducts(mapApiProducts(results));
    } catch (err) {
      console.error('Error searching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <Loader size="lg" text="Searching products..." />
          ) : (
            <>
              <p className="text-[#6B7280] mb-6">
                {!searched
                  ? 'Enter a search term above'
                  : products.length > 0
                  ? `${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`}
              </p>
              {products.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
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
              )}
            </>
          )}
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
