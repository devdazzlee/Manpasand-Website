'use client';

import { useState, useEffect } from 'react';
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
import { Category } from '../lib/api/categoryApi';
import { productApi, Product } from '../lib/api/productApi';
import { useProductStore } from '../lib/store/productStore';
import { interleaveProductsByCategory, getProductCategoryName } from '../lib/utils/productHelpers';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch home data (categories and featured products)
        const homeData = await productApi.getHomeData();
        
        // Map categories — use API-provided images only
        const mappedCategories = (homeData.categories || []).map((category: Category & { CategoryImages?: Array<{ image: string }> }) => {
          const apiImage = category.CategoryImages && category.CategoryImages.length > 0
            ? category.CategoryImages[0].image
            : null;
          
          return {
            ...category,
            image: apiImage || category.image || '/Banner-01.jpg',
          };
        });
        setCategories(mappedCategories);
        const categoryNameById = new Map(mappedCategories.map((category) => [String(category.id), category.name]));
        
        // Cache categories
        const { cacheProductList, cacheProduct } = useProductStore.getState();
        
        const mapHomeProduct = (product: Product): Product => {
          // Cache each product individually
          cacheProduct(product);
          // Get price from API response
          const priceValue = product.sales_rate_inc_dis_and_tax 
            ? parseFloat(String(product.sales_rate_inc_dis_and_tax))
            : product.sales_rate_exc_dis_and_tax
            ? parseFloat(String(product.sales_rate_exc_dis_and_tax))
            : product.selling_price || product.price || 0;
          
          // Calculate original price if discount exists
          const discountAmount = product.discount_amount 
            ? parseFloat(String(product.discount_amount))
            : 0;
          const originalPrice = discountAmount > 0 && priceValue > 0
            ? priceValue + discountAmount
            : undefined;
          
          // Extract image from ProductImage array or use fallback
          const productImage = product.ProductImage && Array.isArray(product.ProductImage) && product.ProductImage.length > 0
            ? product.ProductImage[0].image
            : product.image || '/Banner-01.jpg';
          
          const resolvedCategoryName =
            product.category?.name ||
            categoryNameById.get(String(product.category_id || '')) ||
            undefined;

          return {
            ...product,
            price: priceValue,
            selling_price: priceValue,
            image: productImage,
            originalPrice,
            category: product.category || (resolvedCategoryName
              ? { id: String(product.category_id || ''), name: resolvedCategoryName }
              : undefined),
          };
        };

        const featuredMapped = (homeData.featuredProducts || []).map(mapHomeProduct);
        const featuredCategoryCount = new Set(featuredMapped.map((p) => getProductCategoryName(p))).size;

        // If backend sends single-category featured products, build a diversified pool
        // from best-sellers and, if needed, from full catalog.
        let favoritesPool: Product[] = [...featuredMapped];
        if (featuredCategoryCount < 2 || featuredMapped.length < 8) {
          const bestSellingMapped = (homeData.bestSellingProducts || []).map(mapHomeProduct);
          const mergedHomePool = [...featuredMapped, ...bestSellingMapped];
          const dedupedHomePool = Array.from(new Map(mergedHomePool.map((p) => [p.id, p])).values());
          const homePoolCategoryCount = new Set(dedupedHomePool.map((p) => getProductCategoryName(p))).size;

          if (homePoolCategoryCount < 2 || dedupedHomePool.length < 8) {
            const catalogResult = await productApi.listProducts({ fetch_all: true, search: '' });
            const catalogMapped = catalogResult.data.map(mapHomeProduct);
            const mergedCatalogPool = [...dedupedHomePool, ...catalogMapped];
            favoritesPool = Array.from(new Map(mergedCatalogPool.map((p) => [p.id, p])).values());
          } else {
            favoritesPool = dedupedHomePool;
          }
        }

        const mixedFeaturedProducts = interleaveProductsByCategory(favoritesPool).slice(0, 8);
        setFeaturedProducts(mixedFeaturedProducts);
        // Cache featured products list
        cacheProductList('featured', mixedFeaturedProducts);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        // No fallback – show error state, categories/products stay empty
        setCategories([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <CategoriesSection categories={categories} loading={loading} error={error} />
      <WhyChooseUsSection />
      <FeaturedProductsSection featuredProducts={featuredProducts} loading={loading} />
      <BenefitsSection />
      <HerbsSection categories={categories} />
      <TestimonialsSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
