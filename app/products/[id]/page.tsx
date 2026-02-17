'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Newsletter from '../../components/Newsletter';
import Services from '../../components/Services';
import ProductCard from '../../components/ProductCard';
import { ShoppingCart, Heart, Minus, Plus, Star, Shield, RotateCcw, CheckCircle, TrendingUp, Award, Gift, Zap, Sparkles } from 'lucide-react';
import Loader from '../../components/Loader';
import Link from 'next/link';
import { productApi, Product } from '../../../lib/api/productApi';
import { unitApi } from '../../../lib/api/unitApi';
import { cartUtils } from '../../../lib/utils/cart';
import { useProductStore } from '../../../lib/store/productStore';

const productData: Record<string, any> = {
  '1': {
    name: 'Premium Almonds',
    price: 2500,
    originalPrice: 3000,
    images: ['/Almonds-Banner-1.jpg', '/Almonds-Banner-1.jpg', '/Almonds-Banner-1.jpg', '/Almonds-Banner-1.jpg'],
    category: 'Dry Fruits',
    description:
      'Premium quality almonds, carefully selected and packed fresh. Rich in protein, fiber, and essential nutrients. Perfect for snacking or adding to your favorite recipes.',
    longDescription:
      'Our Premium Almonds are sourced from the finest orchards and carefully selected to ensure the highest quality. Each almond is packed with essential nutrients including protein, healthy fats, fiber, and vitamin E. These almonds are perfect for snacking, baking, or adding to your morning cereal. They are naturally gluten-free and make an excellent addition to any healthy diet.',
    features: [
      '100% Natural & Fresh',
      'Rich in Protein & Fiber',
      'Premium Quality',
      'Carefully Selected',
      'Gluten Free',
      'No Preservatives',
    ],
    nutrition: [
      { label: 'Protein', value: '21g per 100g' },
      { label: 'Fiber', value: '12g per 100g' },
      { label: 'Vitamin E', value: '37% DV' },
      { label: 'Calcium', value: '26% DV' },
    ],
    rating: 4.8,
    reviews: 124,
    stock: 50,
    weight: '500g',
    origin: 'California, USA',
  },
  '2': {
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    images: ['/Ajwa-Dates-Banner-1.jpg', '/Ajwa-Dates-Banner-1.jpg', '/Ajwa-Dates-Banner-1.jpg', '/Ajwa-Dates-Banner-1.jpg'],
    category: 'Dates',
    description:
      'Authentic Ajwa dates from Madinah. Known for their rich flavor and numerous health benefits. A perfect natural sweetener and energy source.',
    longDescription:
      'Ajwa dates are one of the most prized varieties of dates, originating from Madinah, Saudi Arabia. These dates are known for their unique taste, soft texture, and numerous health benefits. Rich in natural sugars, fiber, and essential minerals, Ajwa dates are perfect for breaking fasts, snacking, or as a natural sweetener in recipes.',
    features: [
      'Authentic Ajwa Dates',
      'From Madinah',
      'Rich in Nutrients',
      'Natural Energy Source',
      'Premium Quality',
      'Handpicked Selection',
    ],
    nutrition: [
      { label: 'Natural Sugar', value: '66g per 100g' },
      { label: 'Fiber', value: '7g per 100g' },
      { label: 'Potassium', value: '20% DV' },
      { label: 'Iron', value: '15% DV' },
    ],
    rating: 4.9,
    reviews: 89,
    stock: 30,
    weight: '500g',
    origin: 'Madinah, Saudi Arabia',
  },
};

const relatedProducts = [
  {
    id: '2',
    name: 'Ajwa Dates',
    price: 1800,
    originalPrice: 2200,
    image: '/Ajwa-Dates-Banner-1.jpg',
    category: 'Dates',
  },
  {
    id: '3',
    name: 'Cashew Nuts',
    price: 3200,
    originalPrice: 3800,
    image: '/Cashew-kaju-Banner-1.jpg',
    category: 'Nuts',
  },
  {
    id: '4',
    name: 'Pistachio',
    price: 4500,
    originalPrice: 5200,
    image: '/Pistachio-Banner.jpg',
    category: 'Nuts',
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantityOption, setSelectedQuantityOption] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { getOrFetchProduct, cacheProduct } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use store to get cached product immediately or fetch it
        const productData = await getOrFetchProduct(id);
        
        // Map product images
        const images = productData.ProductImage && productData.ProductImage.length > 0
          ? productData.ProductImage.map(img => img.image)
          : ['/Banner-01.jpg'];
        
        // Extract price from API response
        const priceValue = productData.sales_rate_inc_dis_and_tax 
          ? parseFloat(String(productData.sales_rate_inc_dis_and_tax))
          : productData.sales_rate_exc_dis_and_tax
          ? parseFloat(String(productData.sales_rate_exc_dis_and_tax))
          : productData.selling_price || productData.price || 0;
        
        // Calculate original price if discount exists
        const discountAmount = productData.discount_amount 
          ? parseFloat(String(productData.discount_amount))
          : 0;
        const originalPrice = discountAmount > 0 && priceValue > 0
          ? priceValue + discountAmount
          : undefined;

        // Ensure unit is properly mapped (handle both unit object and unit_id)
        let unitData = productData.unit;
        if (!unitData && (productData as any).unit_id) {
          // Backend should include unit, but if missing, log warning
          console.warn('⚠️ Unit object missing from API response:', {
            productId: productData.id,
            productName: productData.name,
            unit_id: (productData as any).unit_id,
            hasUnit: !!productData.unit,
            productDataKeys: Object.keys(productData),
          });
          // Create placeholder - backend should include unit in response
          unitData = {
            id: (productData as any).unit_id,
            name: 'Unknown', // Backend should provide this
          };
        }
        
        // Debug: log unit information
        if (process.env.NODE_ENV === 'development') {
          console.log('📦 Product unit data:', {
            unit: unitData,
            unit_id: (productData as any).unit_id,
            productData_unit: productData.unit,
            productId: productData.id,
          });
        }

        const mappedProduct = {
          ...productData,
          images,
          image: images[0],
          price: priceValue,
          selling_price: priceValue,
          originalPrice,
          features: productData.features || [],
          description: productData.description || 'No description available.',
          nutrition: productData.nutrition || [],
          longDescription: productData.longDescription || productData.description || 'No description available.',
          weight: productData.weight || 'N/A',
          origin: productData.origin || 'N/A',
          unit: unitData, // Ensure unit is included
        };
        
        // Debug: log unit information
        if (process.env.NODE_ENV === 'development') {
          console.log('Product unit data:', {
            unit: mappedProduct.unit,
            unit_id: (productData as any).unit_id,
            productData_unit: productData.unit,
          });
        }
        
        setProduct(mappedProduct as any);
        
        // Fetch related products (from same category) - fetch in background after main product loads
        // This doesn't block the main product display
        if (productData.category_id) {
          // Fetch related products asynchronously without blocking
          productApi.listProducts({
            fetch_all: false,
            limit: 20, // Only fetch 20 products for related section
            category_id: productData.category_id,
          })
            .then((categoryProducts) => {
              const related = categoryProducts.data
                .filter(p => p.id !== id) // Exclude current product
                .slice(0, 3) // Take only 3 related products
                .map(p => {
                  // Calculate original price if discount exists
                  const priceValue = p.sales_rate_inc_dis_and_tax 
                    ? parseFloat(String(p.sales_rate_inc_dis_and_tax))
                    : p.sales_rate_exc_dis_and_tax
                    ? parseFloat(String(p.sales_rate_exc_dis_and_tax))
                    : p.selling_price || p.price || 0;
                  const discountAmount = p.discount_amount 
                    ? parseFloat(String(p.discount_amount))
                    : 0;
                  const originalPrice = discountAmount > 0 && priceValue > 0
                    ? priceValue + discountAmount
                    : undefined;
                  
                  return {
                    ...p,
                    image: p.ProductImage && p.ProductImage.length > 0
                      ? p.ProductImage[0].image
                      : '/Banner-01.jpg',
                    price: priceValue,
                    originalPrice,
                  };
                });
              setRelatedProducts(related);
            })
            .catch((err) => {
              console.warn('Failed to fetch related products:', err);
              setRelatedProducts([]);
            });
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const discount = product?.originalPrice && product?.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Check if unit is pieces (should show increment/decrement) or weight (should show options)
  const isPiecesUnit = useMemo(() => {
    if (!product?.unit?.name) {
      // Only log warning if product exists and is loaded
      if (process.env.NODE_ENV === 'development' && product && product.id) {
        console.warn('⚠️ No unit name found:', {
          productId: product.id,
          productName: product.name,
          unit: product.unit,
          unit_id: (product as any).unit_id,
        });
      }
      return false;
    }
    const unitName = product.unit.name.toLowerCase().trim();
    const isPieces = unitName === 'pcs' || unitName === 'pc' || unitName === 'piece' || unitName === 'pieces';
    
    // Debug: log unit detection
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Unit detection:', {
        unitName,
        isPieces,
        productId: product?.id,
      });
    }
    
    return isPieces;
  }, [product?.unit?.name, product?.id]);

  // Generate quantity options based on unit (only for weight units, not pieces)
  const quantityOptions = useMemo(() => {
    // If pieces unit, return empty array (will show increment/decrement)
    if (isPiecesUnit) return [];
    
    // Get unit name - check both unit.name and try to infer from unit_id if needed
    const unitName = product?.unit?.name 
      ? product.unit.name.toLowerCase().trim()
      : null;
    
    if (!unitName) {
      // If no unit name but we have unit_id, we can't determine unit type
      // Default to showing increment/decrement
      if (process.env.NODE_ENV === 'development') {
        console.warn('No unit name found for product:', {
          productId: product?.id,
          unitId: (product as any)?.unit_id,
          unit: product?.unit,
        });
      }
      return [];
    }
    
    // For grams (gm, g, gram, grams)
    if (unitName === 'gm' || unitName === 'g' || unitName === 'gram' || unitName === 'grams') {
      return [
        { value: '100', label: '100g' },
        { value: '200', label: '200g' },
        { value: '250', label: '250g' },
        { value: '500', label: '500g' },
        { value: '1000', label: '1kg' },
      ];
    }
    
    // For kilograms (kg, kilogram, kilograms)
    if (unitName === 'kg' || unitName === 'kilogram' || unitName === 'kilograms') {
      return [
        { value: '1', label: '1kg' },
        { value: '2', label: '2kg' },
        { value: '5', label: '5kg' },
        { value: '10', label: '10kg' },
      ];
    }
    
    // Default: return empty array (will show increment/decrement)
    return [];
  }, [product?.unit?.name, isPiecesUnit, product?.id]);

  // Initialize selected quantity option when product loads (only for weight units)
  useEffect(() => {
    if (product && quantityOptions.length > 0 && !selectedQuantityOption) {
      setSelectedQuantityOption(quantityOptions[0].value);
      setQuantity(parseFloat(quantityOptions[0].value));
    } else if (product && isPiecesUnit && quantity === 1) {
      // For pieces, start with quantity 1
      setQuantity(1);
    }
  }, [product, quantityOptions, selectedQuantityOption, isPiecesUnit]);

  // Update quantity when selected option changes
  useEffect(() => {
    if (selectedQuantityOption) {
      setQuantity(parseFloat(selectedQuantityOption));
    }
  }, [selectedQuantityOption]);

  // Check if product is in wishlist
  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.some((item: { id: string }) => item.id === id));
    }
  }, [id, product]);

  const toggleWishlist = () => {
    if (typeof window !== 'undefined' && product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const productItem = { 
        id, 
        name: product.name, 
        price: product.price || product.selling_price, 
        originalPrice: product.originalPrice, 
        image: product.image || (product.ProductImage && product.ProductImage.length > 0 ? product.ProductImage[0].image : '/Banner-01.jpg') || '/Banner-01.jpg',
        category: product.category?.name || (product as any).category
      };
      
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter((item: { id: string }) => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      } else {
        wishlist.push(productItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
      }
      
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Extract price correctly
      const cartPrice = product.price 
        || (product.sales_rate_inc_dis_and_tax ? parseFloat(String(product.sales_rate_inc_dis_and_tax)) : 0)
        || (product.sales_rate_exc_dis_and_tax ? parseFloat(String(product.sales_rate_exc_dis_and_tax)) : 0)
        || product.selling_price 
        || 0;
      
      cartUtils.addToCart({
        id: product.id,
        name: product.name,
        price: cartPrice,
        image: product.image || (product.ProductImage && product.ProductImage.length > 0 ? product.ProductImage[0].image : null) || '/Banner-01.jpg',
        productId: product.id,
        quantity: quantity,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Extract price correctly
      const cartPrice = product.price 
        || (product.sales_rate_inc_dis_and_tax ? parseFloat(String(product.sales_rate_inc_dis_and_tax)) : 0)
        || (product.sales_rate_exc_dis_and_tax ? parseFloat(String(product.sales_rate_exc_dis_and_tax)) : 0)
        || product.selling_price 
        || 0;
      
      // Add to cart first
      cartUtils.addToCart({
        id: product.id,
        name: product.name,
        price: cartPrice,
        image: product.image || (product.ProductImage && product.ProductImage.length > 0 ? product.ProductImage[0].image : null) || '/Banner-01.jpg',
        productId: product.id,
        quantity: quantity,
      });
      
      // Redirect to checkout
      router.push('/checkout');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loader size="xl" text="Loading product details..." fullScreen />
      </>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col justify-center items-center py-20">
          <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
          <Link href="/shop" className="text-[#1A73A8] hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Product Details */}
      <section className="py-4 sm:py-6 md:py-8 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-10">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src={product.ProductImage && product.ProductImage[selectedImage] ? product.ProductImage[selectedImage].image : (product.image || '/Banner-01.jpg')}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {discount > 0 && (
                  <div className="absolute top-2.5 left-2.5 bg-[#F97316] text-white px-2.5 py-0.5 rounded-full font-bold text-xs">
                    -{discount}%
                  </div>
                )}
              </motion.div>
              <div className="grid grid-cols-4 gap-2">
                {(product.ProductImage && product.ProductImage.length > 0 ? product.ProductImage.map(img => img.image) : [product.image || '/Banner-01.jpg']).map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#1A73A8] shadow-sm'
                        : 'border-gray-200 hover:border-[#1A73A8]/50'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div>
                <Link href={`/categories/${(product.category?.name || (product as any).category || '').toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="inline-block text-[#1A73A8] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 hover:text-[#0D2B3A] transition-colors">
                    {product.category?.name || (product as any).category}
                  </span>
                </Link>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0D2B3A] mb-2 leading-tight">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor((product as any).rating || 4.5)
                            ? 'fill-[#F97316] text-[#F97316]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#6B7280] text-xs sm:text-sm">
                    {(product as any).rating || 4.5} ({(product as any).reviews || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#F8F2DE]/60 rounded-xl">
                <span className="text-xl sm:text-2xl font-bold text-[#0D2B3A]">
                  Rs. {(product.selling_price || product.price || 0).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9CA3AF] line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && product.price && (
                  <span className="bg-[#F97316] text-white px-2 py-0.5 rounded-full text-[11px] font-bold ml-auto">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#6B7280] leading-relaxed">{product.description}</p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
              <div className="bg-[#F8F2DE]/50 rounded-xl p-3 sm:p-4">
                <h3 className="font-bold text-[#0D2B3A] mb-2 text-sm">Key Features</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#1A73A8] flex-shrink-0" />
                      <span className="text-[#6B7280] text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Quantity/Unit Selector */}
              {product.unit ? (
                quantityOptions.length > 0 ? (
                  <div className="flex flex-col space-y-2 p-3 bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0D2B3A] text-sm">Select Quantity</span>
                      <span className="text-[#9CA3AF] text-xs">{product.stock} in stock</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quantityOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedQuantityOption(option.value);
                            setQuantity(parseFloat(option.value));
                          }}
                          className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                            selectedQuantityOption === option.value
                              ? 'bg-[#0D2B3A] text-white'
                              : 'bg-gray-100 text-[#0D2B3A] hover:bg-[#DFF3EA]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
                    <span className="font-semibold text-[#0D2B3A] text-sm">Quantity</span>
                    <div className="flex items-center bg-gray-100 rounded-lg px-1 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5 text-[#0D2B3A]" />
                      </button>
                      <span className="font-bold text-[#0D2B3A] min-w-[50px] text-center text-sm">
                        {quantity} {isPiecesUnit ? product.unit.name : ''}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#0D2B3A]" />
                      </button>
                    </div>
                    <span className="text-[#9CA3AF] text-xs ml-auto">{product.stock} in stock</span>
                  </div>
                )
              ) : (
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
                <span className="font-semibold text-[#0D2B3A] text-sm">Quantity</span>
                <div className="flex items-center bg-gray-100 rounded-lg px-1 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-[#0D2B3A]" />
                  </button>
                  <span className="font-bold text-[#0D2B3A] min-w-[50px] text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#0D2B3A]" />
                  </button>
                </div>
                <span className="text-[#9CA3AF] text-xs ml-auto">{product.stock} in stock</span>
              </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                    addedToCart 
                      ? 'bg-green-500 text-white' 
                      : 'bg-[#0D2B3A] text-white hover:bg-[#1A73A8]'
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{addedToCart ? 'Added!' : 'Add to Cart'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-2.5 bg-[#1A73A8] text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5 hover:bg-[#0D2B3A]"
                  aria-label="Buy now"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border ${
                    isInWishlist
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-[#1A73A8] hover:text-[#1A73A8]'
                  }`}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-lg">
                  <Shield className="w-4 h-4 text-[#1A73A8] flex-shrink-0" />
                  <span className="text-[11px] text-[#6B7280] font-medium leading-tight">Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-lg">
                  <RotateCcw className="w-4 h-4 text-[#1A73A8] flex-shrink-0" />
                  <span className="text-[11px] text-[#6B7280] font-medium leading-tight">Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-6 sm:py-8 bg-gray-50 overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          {/* Tabs */}
          <div className="flex space-x-1 mb-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {['description', 'nutrition', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize transition-all text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-[#1A73A8] border-b-2 border-[#1A73A8]'
                    : 'text-[#6B7280] hover:text-[#0D2B3A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm"
          >
            {activeTab === 'description' && (
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-[#0D2B3A]">Product Description</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  {(product as any).longDescription || product.description || 'No description available.'}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-4 h-4 text-[#1A73A8]" />
                    <div>
                      <p className="font-medium text-[#0D2B3A] text-xs">Weight</p>
                      <p className="text-[#6B7280] text-xs">{(product as any).weight || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#1A73A8]" />
                    <div>
                      <p className="font-medium text-[#0D2B3A] text-xs">Origin</p>
                      <p className="text-[#6B7280] text-xs">{(product as any).origin || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0D2B3A] mb-3">Nutritional Information</h3>
                {product.nutrition && Array.isArray(product.nutrition) && product.nutrition.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {product.nutrition.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-[#0D2B3A] text-sm">{item.label}</span>
                      <span className="text-[#6B7280] text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[#6B7280] text-sm">Nutritional information not available for this product.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0D2B3A] mb-3">Customer Reviews</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#1A73A8] rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {review}
                          </div>
                          <span className="font-medium text-[#0D2B3A] text-sm">Customer {review}</span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#F97316] text-[#F97316]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#6B7280] text-sm">Great product! Highly recommended.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Buy This Product */}
      <section className="py-6 sm:py-8 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <h2 className="text-lg sm:text-xl font-bold text-[#0D2B3A] text-center mb-4">Why Choose This Product?</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Handpicked & tested' },
              { icon: CheckCircle, title: '100% Authentic', desc: 'Genuine guaranteed' },
              { icon: Gift, title: 'Best Value', desc: 'Competitive prices' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-[#0D2B3A] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0D2B3A] mb-0.5">{item.title}</h3>
                  <p className="text-[#6B7280] text-xs">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-4 bg-[#0D2B3A] text-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-sm sm:text-base font-bold">Limited Time Offer!</h3>
                <p className="text-white/70 text-xs">Buy 2 Get 1 Free on selected items</p>
              </div>
            </div>
            <Link href="/shop" className="bg-white text-[#0D2B3A] px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-[#DFF3EA] transition-colors whitespace-nowrap">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-6 sm:py-8 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-[#0D2B3A]">You May Also Like</h2>
            <p className="text-[#6B7280] text-xs sm:text-sm mt-1">Related products you might be interested in</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch">
            {relatedProducts.length > 0 ? relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price || product.selling_price || 0}
                  originalPrice={product.originalPrice}
                  image={product.image || '/Banner-01.jpg'}
                  category={product.category?.name || (product as any).category}
                  sales_rate_inc_dis_and_tax={product.sales_rate_inc_dis_and_tax}
                  sales_rate_exc_dis_and_tax={product.sales_rate_exc_dis_and_tax}
                  selling_price={product.selling_price}
                />
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-[#6B7280]">No related products available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
