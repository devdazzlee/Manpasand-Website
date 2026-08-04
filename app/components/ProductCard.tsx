'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cartUtils } from '../../lib/utils/cart';
import { useProductStore } from '../../lib/store/productStore';
import { showCartToast } from './CartToast';
import { getWeightInGramsFromText } from '../../lib/utils/weight';
import ProductImageDisclaimer from './ProductImageDisclaimer';
import ProductImage from './ProductImage';
import { resolveProductImage } from '../../lib/utils/productImagePlaceholder';

interface ProductCardProps {
  id: string;
  name: string;
  price?: number;
  originalPrice?: number;
  image: string;
  category?: string;
  viewMode?: 'grid' | 'list';
  sales_rate_inc_dis_and_tax?: string | number;
  sales_rate_exc_dis_and_tax?: string | number;
  selling_price?: number;
  unitName?: string;
  weight?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  viewMode = 'grid',
  sales_rate_inc_dis_and_tax,
  sales_rate_exc_dis_and_tax,
  selling_price,
  unitName,
  weight,
}: ProductCardProps) {
  const { prefetchProduct } = useProductStore();

  const displayPrice =
    price ||
    (sales_rate_inc_dis_and_tax ? parseFloat(String(sales_rate_inc_dis_and_tax)) : 0) ||
    (sales_rate_exc_dis_and_tax ? parseFloat(String(sales_rate_exc_dis_and_tax)) : 0) ||
    selling_price ||
    0;
  const discount =
    originalPrice && displayPrice
      ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
      : 0;

  const [isInWishlist, setIsInWishlist] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.some((item: { id: string }) => item.id === id));
    }
  }, [id]);

  const inferredGramsPerUnit =
    getWeightInGramsFromText(weight) ?? getWeightInGramsFromText(name);

  const resolvedImage = resolveProductImage(image, name, 400);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartUtils.addToCart({
      id,
      name,
      price: displayPrice,
      image: resolvedImage,
      quantity: 1,
      gramsPerUnit: inferredGramsPerUnit ?? undefined,
    });
    showCartToast(name, resolvedImage);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartUtils.addToCart({
      id,
      name,
      price: displayPrice,
      image: resolvedImage,
      quantity: 1,
      gramsPerUnit: inferredGramsPerUnit ?? undefined,
    });
    router.push('/checkout');
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter((item: { id: string }) => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      } else {
        wishlist.push({
          id,
          name,
          price: displayPrice,
          originalPrice,
          image: resolvedImage,
          category,
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
      }
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex flex-col">
        <div className="flex flex-col sm:flex-row min-w-0">
          <Link href={`/products/${id}`} className="flex-shrink-0 w-full sm:w-auto">
            <div className="relative w-full h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden bg-gray-100 sm:rounded-l-xl sm:rounded-r-none rounded-t-xl sm:rounded-t-none">
              <ProductImage
                src={image}
                name={name}
                category={category}
                width={360}
                height={360}
                optimizeWidth={360}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              {discount > 0 && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#F97316] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  -{discount}%
                </div>
              )}
            </div>
          </Link>
          <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col justify-between min-w-0">
            <div>
              {category && (
                <span className="inline-block text-[10px] sm:text-xs font-medium text-[#1A73A8] bg-[#DFF3EA]/80 px-2 py-0.5 rounded-full mb-1.5 sm:mb-2">
                  {category}
                </span>
              )}
              <Link href={`/products/${id}`}>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-[#0D2B3A] mb-2 hover:text-[#1A73A8] transition-colors line-clamp-2">
                  {name}
                </h3>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#0D2B3A]">
                  Rs. {displayPrice.toLocaleString()}
                </span>
                {originalPrice && originalPrice > displayPrice && (
                  <span className="text-xs sm:text-sm text-[#6B7280] line-through" aria-hidden="true">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                )}
                {unitName && (
                  <span className="text-[10px] sm:text-xs text-[#4B5563]">/ {unitName}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={toggleWishlist}
                  className={`min-w-11 min-h-11 w-11 h-11 bg-white border-2 border-[#DFF3EA] rounded-full flex items-center justify-center hover:bg-[#DFF3EA] transition-colors flex-shrink-0 ${
                    isInWishlist ? 'bg-red-50 border-red-200 hover:bg-red-100' : ''
                  }`}
                  aria-label={isInWishlist ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
                >
                  <Heart
                    className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                      isInWishlist ? 'text-red-500 fill-red-500' : 'text-[#0D2B3A]'
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-full flex items-center justify-center transition-colors duration-200 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base flex-1 sm:flex-initial bg-[#1A73A8] text-white hover:bg-[#0D2B3A]"
                  aria-label={`Add ${name} to cart`}
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white rounded-full flex items-center justify-center hover:from-[#FF6B35] hover:to-[#F97316] transition-colors duration-200 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base shadow-lg hover:shadow-xl flex-1 sm:flex-initial"
                  aria-label={`Buy ${name} now`}
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Buy Now</span>
                  <span className="sm:hidden">Buy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProductImageDisclaimer variant="cardStrip" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group h-full flex flex-col">
      <div className="relative shrink-0">
        <Link
          href={`/products/${id}`}
          onMouseEnter={() => prefetchProduct(id)}
          onTouchStart={() => prefetchProduct(id)}
          className="block"
          aria-label={name}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
            <ProductImage
              src={image}
              name={name}
              category={category}
              width={400}
              height={300}
              optimizeWidth={400}
              sizes="(max-width: 768px) 90vw, 400px"
              className="w-full h-full"
              imgClassName="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {discount > 0 && (
              <div className="absolute top-2 left-2 bg-[#F97316] text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                -{discount}%
              </div>
            )}
          </div>
        </Link>
        <div className="absolute top-2 right-2 z-10">
          <button
            type="button"
            onClick={toggleWishlist}
            className={`min-w-11 min-h-11 w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors ${
              isInWishlist ? 'bg-red-50 hover:bg-red-100' : ''
            }`}
            aria-label={isInWishlist ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="p-2.5 sm:p-3 flex flex-col flex-grow min-h-0">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-[#0D2B3A] mb-1.5 sm:mb-2 hover:text-[#1A73A8] transition-colors line-clamp-2 text-xs sm:text-sm leading-snug">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
          <span className="text-sm sm:text-base font-bold text-[#0D2B3A]">
            Rs. {displayPrice.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-[10px] sm:text-xs text-[#6B7280] line-through" aria-hidden="true">
              Rs. {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-1.5 mt-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 min-h-11 py-2.5 sm:py-2 rounded-lg flex items-center justify-center font-semibold text-[11px] sm:text-xs transition-colors duration-200 bg-[#0D2B3A] text-white hover:bg-[#1A73A8]"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1 flex-shrink-0" aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 min-h-11 py-2.5 sm:py-2 bg-[#1A73A8] text-white rounded-lg flex items-center justify-center hover:bg-[#0D2B3A] transition-colors duration-200 font-semibold text-[11px] sm:text-xs"
            aria-label={`Buy ${name} now`}
          >
            <Zap className="w-3.5 h-3.5 mr-1 flex-shrink-0" aria-hidden="true" />
            <span>Buy Now</span>
          </button>
        </div>
        <ProductImageDisclaimer variant="card" className="mt-2.5 sm:mt-3" />
      </div>
    </div>
  );
}
