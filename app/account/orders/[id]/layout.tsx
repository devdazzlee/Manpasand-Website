import type { Metadata } from 'next';
import { buildMetadata } from '../../../../lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  path: '/account/orders',
  title: 'Order Details — Manpasand Store',
  description:
    'View Manpasand Store order details for your dry fruits and spices delivery in Pakistan.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
