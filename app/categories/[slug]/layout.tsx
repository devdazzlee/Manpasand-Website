import type { Metadata } from 'next';
import { buildMetadata } from '../../../lib/seo/metadata';
import { API_URL } from '../../../config/config';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbSchema } from '../../../lib/seo/schema';

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

async function fetchCategory(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/web/categories/${encodeURIComponent(slug)}?limit=1`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.category ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategory(slug);
  const name = category?.name || slug.replace(/-/g, ' ');
  return buildMetadata({
    path: `/categories/${slug}`,
    title: `Buy ${name} Online`,
    description: `Shop ${name} at Manpasand Store Karachi — premium quality dry fruits, spices, and herbs with nationwide delivery across Pakistan.`,
    keywords: [
      name,
      `buy ${name} Karachi`,
      `${name} online Pakistan`,
      'Manpasand Store',
      'dry fruits Karachi',
    ],
  });
}

export default async function CategoryLayout({ children, params }: Props) {
  const { slug } = await params;
  const category = await fetchCategory(slug);
  const name = category?.name || slug.replace(/-/g, ' ');

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          { name: name, path: `/categories/${slug}` },
        ])}
      />
      {children}
    </>
  );
}
