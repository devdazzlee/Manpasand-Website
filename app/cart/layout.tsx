import type { Metadata } from 'next';
import { metadataForPath } from '../../lib/seo/metadata';

export const metadata: Metadata = metadataForPath('/cart');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
