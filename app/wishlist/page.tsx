'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import ConfirmDialog from '../components/ui/confirm-dialog';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WishlistItem {
  id: string;
  name: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  sales_rate_inc_dis_and_tax?: string | number;
  sales_rate_exc_dis_and_tax?: string | number;
  selling_price?: number;
  unitName?: string;
}

function loadWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  } catch {
    return [];
  }
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  useEffect(() => {
    setItems(loadWishlist());
    setMounted(true);

    const handleWishlistUpdate = () => setItems(loadWishlist());
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  const totalValue = useMemo(
    () =>
      items.reduce((sum, item) => {
        const p =
          item.price ||
          (item.sales_rate_inc_dis_and_tax
            ? parseFloat(String(item.sales_rate_inc_dis_and_tax))
            : 0) ||
          item.selling_price ||
          0;
        return sum + p;
      }, 0),
    [items]
  );

  const clearAll = () => {
    localStorage.setItem('wishlist', '[]');
    setItems([]);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const useGrid = items.length >= 4;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-8 sm:py-10 md:py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-sm sm:text-base text-white/90">Save your favorite items for later</p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 sm:py-10 bg-gradient-to-b from-white to-[#F8F2DE]/70">
        <div className="container mx-auto px-4">
          {!mounted ? null : items.length > 0 ? (
            <div className={useGrid ? 'max-w-6xl mx-auto' : 'max-w-3xl mx-auto'}>
              {/* Summary bar */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-4 mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DFF3EA] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-[#1A73A8] fill-[#1A73A8]" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-[#0D2B3A]">
                      {items.length} {items.length === 1 ? 'item' : 'items'} saved
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B7280]">
                      Total value · Rs. {totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A73A8] hover:text-[#0D2B3A] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                  <button
                    type="button"
                    onClick={() => setClearDialogOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                  </button>
                </div>
              </motion.div>

              {/* Product list — list rows for 1–3 items, grid for 4+ */}
              <div
                className={
                  useGrid
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch'
                    : 'space-y-4'
                }
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className={useGrid ? 'h-full' : ''}
                    >
                      <ProductCard
                        id={item.id}
                        name={item.name}
                        price={item.price || item.selling_price || 0}
                        originalPrice={item.originalPrice}
                        image={item.image || ''}
                        category={item.category}
                        viewMode={useGrid ? 'grid' : 'list'}
                        unitName={item.unitName}
                        sales_rate_inc_dis_and_tax={item.sales_rate_inc_dis_and_tax}
                        sales_rate_exc_dis_and_tax={item.sales_rate_exc_dis_and_tax}
                        selling_price={item.selling_price}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors shadow-md"
                >
                  <span>Explore More Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10 sm:py-16"
            >
              <div className="bg-white rounded-2xl p-8 sm:p-12 max-w-md mx-auto shadow-md border border-gray-100">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F8F2DE] flex items-center justify-center mx-auto mb-4"
                >
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A73A8]/40" />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-2">
                  Your wishlist is empty
                </h2>
                <p className="text-[#6B7280] mb-6 text-sm leading-relaxed">
                  Tap the heart on any product to save it here for easy access later.
                </p>
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-7 py-3 rounded-full font-semibold transition-colors text-sm shadow-sm"
                  >
                    Start Shopping
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />

      <ConfirmDialog
        open={clearDialogOpen}
        onOpenChange={setClearDialogOpen}
        title="Clear your wishlist?"
        description={`This will permanently remove all ${items.length} saved ${items.length === 1 ? 'item' : 'items'} from your wishlist.`}
        confirmLabel="Clear All"
        cancelLabel="Keep Items"
        variant="danger"
        onConfirm={clearAll}
      />
    </div>
  );
}
