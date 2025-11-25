'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { X, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

const compareProducts = [
  {
    id: '1',
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    image: '/Almonds-Banner-1.jpg',
    rating: 4.8,
    reviews: 124,
    weight: '500g',
    origin: 'California',
    shelfLife: '12 months',
  },
  {
    id: '2',
    name: 'Cashew Nuts',
    price: 3200,
    originalPrice: 3800,
    image: '/Cashew-kaju-Banner-1.jpg',
    rating: 4.9,
    reviews: 89,
    weight: '500g',
    origin: 'Vietnam',
    shelfLife: '12 months',
  },
];

export default function ComparePage() {
  const [products, setProducts] = useState(compareProducts);

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Compare Products</h1>
            <p className="text-xl text-white/90">Compare features and prices side by side</p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F8F2DE]">
                    <th className="p-4 text-left font-semibold text-[#0D2B3A]">Features</th>
                    {products.map((product) => (
                      <th key={product.id} className="p-4 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="ml-auto text-[#6B7280] hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#F8F2DE]">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-[#0D2B3A] hover:text-[#1A73A8]">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-[#0D2B3A]">Price</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div>
                          <span className="text-xl font-bold text-[#0D2B3A]">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="block text-sm text-[#6B7280] line-through">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold text-[#0D2B3A]">Rating</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
                          <span className="font-semibold">{product.rating}</span>
                          <span className="text-[#6B7280]">({product.reviews})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-[#0D2B3A]">Weight</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center text-[#6B7280]">
                        {product.weight}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold text-[#0D2B3A]">Origin</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center text-[#6B7280]">
                        {product.origin}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold text-[#0D2B3A]">Shelf Life</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center text-[#6B7280]">
                        {product.shelfLife}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#0D2B3A]">Action</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2 mx-auto"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </motion.button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6B7280] text-lg mb-8">No products to compare</p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-full font-semibold transition-colors"
                >
                  Start Shopping
                </motion.button>
              </Link>
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

