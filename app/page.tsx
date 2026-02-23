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
        
        // Cache categories
        const { cacheProductList, cacheProduct } = useProductStore.getState();
        
        // Map featured products to include image URL and normalize price fields
        const mappedProducts = (homeData.featuredProducts || []).map((product: Product) => {
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
          
          return {
            ...product,
            price: priceValue,
            selling_price: priceValue,
            image: productImage,
            originalPrice,
          };
        });
        setFeaturedProducts(mappedProducts);
        // Cache featured products list
        cacheProductList('featured', mappedProducts);
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
