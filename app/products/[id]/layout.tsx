import type { Metadata } from 'next';
import { buildMetadata } from '../../../lib/seo/metadata';
import { API_URL } from '../../../config/config';
import { SITE_URL } from '../../../lib/seo/config';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbSchema, productSchema } from '../../../lib/seo/schema';
import { resolveProductImage } from '../../../lib/utils/productImagePlaceholder';

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

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
  const description =
    product.description ||
    `Buy ${name} online from Manpasand Store — premium dry fruits, spices & herbs in Karachi with nationwide delivery.`;
  const image = resolveProductImage(product.image, name, 1200);

  return buildMetadata({
    path: `/products/${id}`,
    title: `Buy ${name}`,
    description: String(description).slice(0, 160),
    keywords: [name, 'Manpasand Store', 'dry fruits Karachi', 'buy online Pakistan'],
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
    schemas.push(
      productSchema({
        name: product.name,
        description: product.description || undefined,
        image: product.image || undefined,
        sku: product.sku || product.code || id,
        price: Number(product.price) || 0,
        availability: product.in_stock !== false,
        url: `${SITE_URL}/products/${id}`,
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
