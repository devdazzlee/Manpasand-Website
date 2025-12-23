'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import Services from './components/Services';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import SpecialOfferBanner from './components/SpecialOfferBanner';
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
        
        // Category name to image mapping (normalized for matching)
        const getCategoryImage = (categoryName: string): string => {
          // Normalize category name for matching (remove extra spaces, handle &amp;)
          const normalizeName = (name: string) => {
            return name
              .replace(/\s+/g, ' ')
              .replace(/&amp;/g, '&')
              .trim();
          };
          
          const normalizedInput = normalizeName(categoryName);
          
          const categoryImageMap: Record<string, string> = {
            // Original category names
            'Arqiat & Juices': '/category-images/arqiat_and_juices.jpeg',
            'Dates': '/category-images/dates.jpg',
            'Dry Fruits': '/category-images/dry_fruits.jpg',
            'Flour': '/category-images/flour.jpg',
            'General Items': '/category-images/general_items.jpeg',
            'Herbs': '/category-images/herbs.jpg',
            'Honey': '/category-images/honey.jpeg',
            'Indian Items': '/category-images/indian_items.jpeg',
            'Irani Items': '/category-images/irani_items.jpg',
            'Jam': '/category-images/jam.jpeg',
            'Nimco': '/category-images/nimco.jpeg',
            'Oil': '/category-images/oil.webp',
            'Papad': '/category-images/papad.webp',
            'Pickles': '/category-images/pickles.jpg',
            'Pulses / Rice': '/category-images/pulses-rice.jpg',
            'Pulses/Rice': '/category-images/pulses-rice.jpg',
            'Scents & Perfumes': '/category-images/scents_and_perfumes.jpg',
            'Spices': '/category-images/spices.jpg',
            // API category name variations
            'General': '/category-images/general_items.jpeg',
            'SCENT & PERFUMES': '/category-images/scents_and_perfumes.jpg',
            'Scent & Perfumes': '/category-images/scents_and_perfumes.jpg',
            'Essential Oils & Shampoo': '/category-images/oil.webp',
            'Essential Oils': '/category-images/oil.webp',
            'Indian Products': '/category-images/indian_items.jpeg',
            'Irani Products': '/category-images/irani_items.jpg',
            'Pickles, Jams & Honey': '/category-images/pickles.jpg',
            'Pickles Jams & Honey': '/category-images/pickles.jpg',
            'Crackers': '/category-images/general_items.jpeg',
          };
          
          // Try exact match with normalized name
          if (categoryImageMap[normalizedInput]) {
            return categoryImageMap[normalizedInput];
          }
          
          // Try case-insensitive match with normalized keys
          const lowerInput = normalizedInput.toLowerCase();
          for (const [key, value] of Object.entries(categoryImageMap)) {
            const normalizedKey = normalizeName(key);
            if (normalizedKey.toLowerCase() === lowerInput) {
              return value;
            }
          }
          
          // Debug: log unmapped categories
          console.warn(`Category image not found for: "${categoryName}" (normalized: "${normalizedInput}")`);
          
          // Fallback to default
          return '/Banner-01.jpg';
        };

        // Map categories to include image URL - ALWAYS prioritize mapped images
        const mappedCategories = (homeData.categories || []).map((category: Category & { CategoryImages?: Array<{ image: string }> }) => {
          // Get mapped image for this category
          const mappedImage = getCategoryImage(category.name);
          
          // Always use mapped image if it exists (not the fallback), otherwise use API CategoryImages
          const finalImage = mappedImage !== '/Banner-01.jpg' 
            ? mappedImage 
            : (category.CategoryImages && category.CategoryImages.length > 0
                ? category.CategoryImages[0].image
                : '/Banner-01.jpg');
          
          return {
            ...category,
            image: finalImage,
          };
        });
        
        // Debug: log all categories and their images
        if (process.env.NODE_ENV === 'development') {
          console.log('Categories mapped:', mappedCategories.map(c => {
            const catWithImages = c as Category & { CategoryImages?: Array<{ image: string }> };
            return { 
              name: c.name, 
              image: c.image,
              hasApiImage: !!(catWithImages.CategoryImages?.length) 
            };
          }));
        }
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
        // Fallback to default data on error
        setCategories([
          { id: '1', name: 'Dry Fruits', slug: 'dry-fruits', code: 'CAT-1', is_active: true, image: '/category-images/dry_fruits.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '2', name: 'Dates', slug: 'dates', code: 'CAT-2', is_active: true, image: '/category-images/dates.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '3', name: 'Nuts', slug: 'nuts', code: 'CAT-3', is_active: true, image: '/Cashew-kaju-Banner-1.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '4', name: 'Honey', slug: 'honey', code: 'CAT-4', is_active: true, image: '/category-images/honey.jpeg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '5', name: 'Saffron', slug: 'saffron', code: 'CAT-5', is_active: true, image: '/Banner-01.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: '6', name: 'Spices', slug: 'spices', code: 'CAT-6', is_active: true, image: '/category-images/spices.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        ] as Category[]);
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
      <SpecialOfferBanner />
      <CategoriesSection categories={categories} loading={loading} error={error} />
      <WhyChooseUsSection />
      <FeaturedProductsSection featuredProducts={featuredProducts} loading={loading} />
      <BenefitsSection />
      <HerbsSection />
      <TestimonialsSection />
      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
