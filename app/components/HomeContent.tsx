'use client';

import { useEffect } from 'react';
import StatsSection from './StatsSection';
import CategoriesSection from './CategoriesSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import FeaturedProductsSection from './FeaturedProductsSection';
import BenefitsSection from './BenefitsSection';
import HerbsSection from './HerbsSection';
import TestimonialsSection from './TestimonialsSection';
import Newsletter from './Newsletter';
import { useWebHomeStore } from '../../lib/store/webHomeStore';
import { useWebCategoryStore } from '../../lib/store/webCategoryStore';
import { useProductMetaStore } from '../../lib/store/productMetaStore';
import type { WebHomePayload } from '../../lib/api/webApi';

interface HomeContentProps {
  initialData: WebHomePayload | null;
}

export default function HomeContent({ initialData }: HomeContentProps) {
  const storeData = useWebHomeStore((s) => s.data);
  const loading = useWebHomeStore((s) => s.loading);
  const error = useWebHomeStore((s) => s.error);
  const fetch = useWebHomeStore((s) => s.fetch);

  // Prefer SSR payload; fall back to client fetch if server failed.
  useEffect(() => {
    if (initialData) {
      useWebHomeStore.setState({
        data: initialData,
        loading: false,
        error: null,
        lastFetch: Date.now(),
        signature: 'f8:b0:c24',
      });
      return;
    }
    fetch().catch(() => {});
  }, [initialData, fetch]);

  useEffect(() => {
    const data = initialData ?? storeData;
    if (!data) return;
    if (data.product_count > 0) {
      useProductMetaStore.getState().seedProductCount(data.product_count);
    }
    if (data.categories.length > 0) {
      useWebCategoryStore.getState().seedFromHome(data.categories);
    }
  }, [initialData, storeData]);

  const data = initialData ?? storeData;
  const featured = data?.featuredProducts ?? [];
  const categories = data?.categories ?? [];
  const categoriesTotal = data?.categories_total ?? categories.length;
  const featuredTotal = data?.featured_total ?? featured.length;
  const productCount = data?.product_count;
  const isLoading = !data && loading;

  return (
    <>
      <StatsSection initialProductCount={productCount} />
      <CategoriesSection
        initialCategories={categories}
        initialTotal={categoriesTotal}
        initialLoading={isLoading}
        error={error}
      />
      <WhyChooseUsSection initialProductCount={productCount} />
      <FeaturedProductsSection
        initialProducts={featured}
        initialTotal={featuredTotal}
        initialLoading={isLoading}
      />
      <BenefitsSection />
      <HerbsSection categories={categories} />
      <TestimonialsSection />
      <Newsletter />
    </>
  );
}
