'use client';

import { use, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import { productApi, Product } from '../../../lib/api/productApi';
import { categoryApi, Category } from '../../../lib/api/categoryApi';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all categories to find the one matching the slug
        const categories = await categoryApi.getCategories();
        const foundCategory = categories.find(
          (cat) => cat.slug === slug || cat.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (foundCategory) {
          setCategory(foundCategory);
          
          // Fetch products for this category
          // Get all products and filter by category client-side
          const allProducts = await productApi.listProducts({
            fetch_all: true,
            search: '',
          });
          const productsResult = {
            data: allProducts.data.filter(p => p.category_id === foundCategory.id),
            meta: allProducts.meta,
          };
          
          // Map products to include image URL and normalize price fields
          const mappedProducts = productsResult.data.map((product: Product) => {
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
              // Keep category as object, not string
              category: product.category || undefined,
            };
          });
          
          setCategoryProducts(mappedProducts);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Failed to load category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Category Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category?.name || 'Category'}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{category?.description || 'Explore our premium products in this category.'}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <Loader size="lg" text="Loading category products..." />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500">{error}</p>
            </div>
          ) : categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {categoryProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price || product.selling_price || 0}
                    originalPrice={product.originalPrice}
                    image={product.image || '/Banner-01.jpg'}
                    category={product.category?.name || (product.category as any)}
                    sales_rate_inc_dis_and_tax={product.sales_rate_inc_dis_and_tax}
                    sales_rate_exc_dis_and_tax={product.sales_rate_exc_dis_and_tax}
                    selling_price={product.selling_price}
                  />
                </motion.div>
              ))}
            </div>
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

