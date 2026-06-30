'use client';

import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import CategoriesSection from './components/CategoriesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import FeaturedProductsSection from './components/FeaturedProductsSection';
import BenefitsSection from './components/BenefitsSection';
import HerbsSection from './components/HerbsSection';
import TestimonialsSection from './components/TestimonialsSection';
import { useWebHomeStore } from '../lib/store/webHomeStore';
import { useWebCategoryStore } from '../lib/store/webCategoryStore';
import { useProductMetaStore } from '../lib/store/productMetaStore';

export default function Home() {
  const data = useWebHomeStore((s) => s.data);
  const loading = useWebHomeStore((s) => s.loading);
  const error = useWebHomeStore((s) => s.error);
  const fetch = useWebHomeStore((s) => s.fetch);

  // One bundled /web/home request — categories + product count seed shared stores
  // so Header, Footer, and Stats don't fire separate heavy API calls.
  useEffect(() => {
    fetch().catch(() => {});
  }, [fetch]);

  useEffect(() => {
    if (!data) return;
    if (data.product_count > 0) {
      useProductMetaStore.getState().seedProductCount(data.product_count);
    }
    if (data.categories.length > 0) {
      useWebCategoryStore.getState().seedFromHome(data.categories);
    }
  }, [data]);

  const featured = data?.featuredProducts ?? [];
  const categories = data?.categories ?? [];
  const categoriesTotal = data?.categories_total ?? categories.length;
  const featuredTotal = data?.featured_total ?? featured.length;
  const productCount = data?.product_count;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection initialProductCount={productCount} />
      <CategoriesSection
        initialCategories={categories}
        initialTotal={categoriesTotal}
        initialLoading={loading && !data}
        error={error}
      />
      <WhyChooseUsSection />
      <FeaturedProductsSection
        initialProducts={featured}
        initialTotal={featuredTotal}
        initialLoading={loading && !data}
      />
      <BenefitsSection />
      <HerbsSection categories={categories} />
      <TestimonialsSection />
      <Newsletter />
      <Footer />

      {/* The initial loading skeleton is intentionally inside CategoriesSection /
          FeaturedProductsSection so the rest of the page (hero, banners, footer)
          renders immediately without waiting on data. */}
      {loading && !data && null}
    </div>
  );
}
