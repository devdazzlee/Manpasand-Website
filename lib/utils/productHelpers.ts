import { Product } from '../api/productApi';

export interface DisplayProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  sales_rate_inc_dis_and_tax?: string | number;
  sales_rate_exc_dis_and_tax?: string | number;
  selling_price?: number;
  description?: string;
  weight?: string;
  origin?: string;
  rating?: number;
  reviews?: number;
  created_at?: string;
}

export function mapApiProduct(product: Product): DisplayProduct {
  const priceValue = product.sales_rate_inc_dis_and_tax
    ? parseFloat(String(product.sales_rate_inc_dis_and_tax))
    : product.sales_rate_exc_dis_and_tax
    ? parseFloat(String(product.sales_rate_exc_dis_and_tax))
    : product.selling_price || product.price || 0;

  const discountAmount = product.discount_amount
    ? parseFloat(String(product.discount_amount))
    : 0;
  const originalPrice =
    discountAmount > 0 && priceValue > 0 ? priceValue + discountAmount : undefined;

  const productImage =
    product.ProductImage && Array.isArray(product.ProductImage) && product.ProductImage.length > 0
      ? product.ProductImage[0].image
      : product.image || '/Banner-01.jpg';

  return {
    id: product.id,
    name: product.name,
    price: priceValue,
    originalPrice,
    image: productImage,
    category: product.category?.name,
    sales_rate_inc_dis_and_tax: product.sales_rate_inc_dis_and_tax,
    sales_rate_exc_dis_and_tax: product.sales_rate_exc_dis_and_tax,
    selling_price: product.selling_price,
    description: product.description || product.short_description,
    weight: product.weight,
    origin: product.origin,
    rating: product.rating,
    reviews: product.reviews,
    created_at: product.created_at,
  };
}

export function mapApiProducts(products: Product[]): DisplayProduct[] {
  return products.map(mapApiProduct);
}
