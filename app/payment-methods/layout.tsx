import type { Metadata } from 'next';
import { metadataForPath } from '../../lib/seo/metadata';

export const metadata: Metadata = metadataForPath('/payment-methods');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
