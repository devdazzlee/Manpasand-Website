'use client';

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import { webApi, WebCategory, WebProduct, WebMeta } from '../../../lib/api/webApi';
import { useWebProductListStore } from '../../../lib/store/webProductListStore';

const PAGE_SIZE = 12;

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  // Category meta is fetched once via the bundled /web/categories/:slug call.
  const [category, setCategory] = useState<WebCategory | null>(null);
  const [metaLoading, setMetaLoading] = useState(true);
  const [metaError, setMetaError] = useState<string | null>(null);

  // Products live in the shared paged list store so we get caching + dedup.
  const bucketKey = `category:${slug}`;
  const bucket = useWebProductListStore((s) => s.buckets[bucketKey]);
  const loadFirstPage = useWebProductListStore((s) => s.loadFirstPage);
  const loadNextPage = useWebProductListStore((s) => s.loadNextPage);

  // Initial load: bundled call gives us BOTH category meta AND the first page of
  // products in one request. After that, "Load More" goes through the store.
  useEffect(() => {
    let cancelled = false;
    setMetaLoading(true);
    setMetaError(null);
    webApi
      .getCategoryBySlug(slug, { page: 1, limit: PAGE_SIZE, sort: 'newest' })
      .then(({ category, products, meta }) => {
        if (cancelled) return;
        setCategory(category);
        // Seed the store bucket with what the bundled call returned so the
        // first "Load More" click hits page 2 directly.
        useWebProductListStore.setState((s) => ({
          buckets: {
            ...s.buckets,
            [bucketKey]: {
              items: products,
              page: products,
              meta: meta as WebMeta,
              params: { category: slug, sort: 'newest', limit: PAGE_SIZE },
              loading: false,
              error: null,
              fetchedAt: Date.now(),
            },
          },
        }));
      })
      .catch((err) => {
        if (cancelled) return;
        if (err?.response?.status === 404) setMetaError('Category not found');
        else setMetaError('Failed to load category');
      })
      .finally(() => {
        if (!cancelled) setMetaLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, bucketKey]);

  const products: WebProduct[] = bucket?.items ?? [];
  const total = bucket?.meta?.total ?? products.length;
  const loading = bucket?.loading ?? false;
  const hasMore = bucket?.meta ? bucket.meta.page < bucket.meta.totalPages : false;
  const productError = bucket?.error ?? null;

  const handleLoadMore = async () => {
    if (!bucket) {
      await loadFirstPage(bucketKey, { category: slug, sort: 'newest', limit: PAGE_SIZE });
    } else {
      await loadNextPage(bucketKey);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category?.name || 'Category'}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {total > 0 ? `${total} premium ${total === 1 ? 'product' : 'products'}` : 'Explore our premium products in this category.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {metaLoading && products.length === 0 ? (
            <Loader size="lg" text="Loading category products..." />
          ) : metaError ? (
            <div className="text-center py-16">
              <p className="text-red-500">{metaError}</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.original_price}
                      image={product.image || '/Banner-01.jpg'}
                      category={product.category?.name}
                      unitName={product.unit?.name}
                      sales_rate_inc_dis_and_tax={product.price}
                      sales_rate_exc_dis_and_tax={product.base_price}
                      selling_price={product.price}
                    />
                  </motion.div>
                ))}
              </div>

              {productError && (
                <div className="text-center mt-4">
                  <p className="text-red-500 text-xs">{productError}</p>
                </div>
              )}

              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A73A8] text-white font-semibold text-sm hover:bg-[#0D2B3A] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading…' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6B7280] text-lg">No products found in this category.</p>
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
