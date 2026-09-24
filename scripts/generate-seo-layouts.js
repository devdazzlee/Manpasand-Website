const fs = require('fs');
const path = require('path');

const routes = [
  'about',
  'shop',
  'contact',
  'faq',
  'shipping-returns',
  'privacy-policy',
  'terms-conditions',
  'best-sellers',
  'new-arrivals',
  'offers',
  'deals',
  'gift-packs',
  'saffron',
  'herbal-remedies',
  'recipes',
  'reviews',
  'wholesale',
  'payment-methods',
  'support',
  'blog',
  'ingredient-sourcing',
  'custom-formulas',
  'supplier',
  'feedback',
  'newsletter-signup',
  'sitemap',
  'cart',
  'checkout',
  'wishlist',
  'compare',
  'login',
  'register',
  'search',
  'account',
  'account/profile',
  'account/orders',
  'account/addresses',
  'account/track-order',
  'order-status',
  'checkout/thank-you',
];

for (const route of routes) {
  const dir = path.join('app', route);
  fs.mkdirSync(dir, { recursive: true });
  const seoPath = '/' + route;
  const depth = route.split('/').length;
  const rel = Array(depth + 1)
    .fill('..')
    .join('/') + '/lib/seo/metadata';
  const file = path.join(dir, 'layout.tsx');
  const fixed = `import type { Metadata } from 'next';
import { metadataForPath } from '${rel}';

export const metadata: Metadata = metadataForPath('${seoPath}');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
  fs.writeFileSync(file, fixed);
  console.log('wrote', file);
}
