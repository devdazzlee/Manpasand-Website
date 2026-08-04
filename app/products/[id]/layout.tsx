import type { Metadata } from 'next';
import { buildMetadata } from '../../../lib/seo/metadata';
import { API_URL } from '../../../config/config';
import { SITE_NAME, SITE_URL } from '../../../lib/seo/config';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbSchema, productSchema } from '../../../lib/seo/schema';
import { resolveProductImage } from '../../../lib/utils/productImagePlaceholder';

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

function toAbsoluteImage(url: string): string {
  if (!url || url.startsWith('data:')) return `${SITE_URL}/Manpasand-Logo.png`;
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

async function fetchProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/web/products/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function productPrice(product: Record<string, unknown>): number {
  const candidates = [
    product.selling_price,
    product.price,
    product.sales_rate_inc_dis_and_tax,
    product.sales_rate_exc_dis_and_tax,
  ];
  for (const c of candidates) {
    const n = Number(c);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 0;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) {
    return buildMetadata({
      path: `/products/${id}`,
      title: 'Product',
      description: 'View product details at Manpasand Store.',
    });
  }

  const name = product.name || 'Product';
  const categoryName = product.category?.name || 'dry fruits';
  const description =
    product.description ||
    `Buy ${name} online from Manpasand Store — ${categoryName} with delivery across Pakistan. Order from Karachi stores or nationwide shipping.`;
  const image = resolveProductImage(product.image, name, 1200);

  return buildMetadata({
    path: `/products/${id}`,
    title: `Buy ${name} Online`,
    description: String(description).slice(0, 160),
    keywords: [
      name,
      `buy ${name} online`,
      `buy ${name} Pakistan`,
      `buy ${name} Karachi`,
      categoryName,
      'Manpasand Store',
      'dry fruits Karachi',
      'dry fruits Pakistan',
    ],
    ogImage: image.startsWith('http') || image.startsWith('data:') ? undefined : image,
    type: 'product',
  });
}

export default async function ProductLayout({ children, params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(id);

  const schemas: Array<Record<string, unknown>> = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      {
        name: product?.category?.name || 'Product',
        path: product?.category?.slug ? `/categories/${product.category.slug}` : '/shop',
      },
      { name: product?.name || 'Product', path: `/products/${id}` },
    ]),
  ];

  if (product) {
    const name = product.name || 'Product';
    const primaryImage = toAbsoluteImage(resolveProductImage(product.image, name, 1200));
    const extraImages = Array.isArray(product.images)
      ? product.images.filter(Boolean).map((img: string) => toAbsoluteImage(img))
      : [];

    schemas.push(
      productSchema({
        name,
        description:
          product.description ||
          `Buy ${name} online from ${SITE_NAME}. Premium quality with delivery across Pakistan.`,
        image: [...new Set([primaryImage, ...extraImages])],
        sku: product.sku || product.code || id,
        price: productPrice(product),
        availability: product.in_stock !== false,
        url: `${SITE_URL}/products/${id}`,
        category: product.category?.name || 'Dry Fruits & Spices',
        brand: SITE_NAME,
      })
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      {children}
    </>
  );
}
