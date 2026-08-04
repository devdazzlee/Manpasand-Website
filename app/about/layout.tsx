import type { Metadata } from 'next';
import { metadataForPath } from '../../lib/seo/metadata';

export const metadata: Metadata = metadataForPath('/about');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
