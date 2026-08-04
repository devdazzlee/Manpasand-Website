import type { Metadata } from 'next';
import {
  PAGE_SEO,
  PUBLISHER,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  PAKISTAN_CITIES,
  type PageSeo,
} from './config';

type BuildOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  type?: 'website' | 'article' | 'product';
};

function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildMetadata(opts: BuildOptions = {}): Metadata {
  const fromConfig: PageSeo | undefined = opts.path ? PAGE_SEO[opts.path] : undefined;
  const titleCore = opts.title ?? fromConfig?.title ?? SITE_NAME;
  const description = opts.description ?? fromConfig?.description ?? SITE_DESCRIPTION;
  const path = opts.path ?? fromConfig?.path ?? '/';
  const keywords = [
    ...(opts.keywords ?? fromConfig?.keywords ?? SITE_KEYWORDS),
    ...PAKISTAN_CITIES.map((c) => `dry fruits ${c}`),
  ];
  const ogImage = absoluteUrl(opts.ogImage ?? fromConfig?.ogImage ?? '/banners/New-Banner-1200.webp');
  const canonical = absoluteUrl(path);
  const fullTitle = titleCore.includes(SITE_NAME) ? titleCore : `${titleCore} | ${SITE_NAME}`;

  void opts.noIndex; // ignored — all pages are intentionally indexable

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [...new Set(keywords)],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: PUBLISHER.name,
    category: 'Shopping',
    classification: 'Dry Fruits, Spices, Nuts, Dates, Herbs — Pakistan',
    applicationName: SITE_NAME,
    referrer: 'origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        'en-PK': canonical,
        en: canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type: opts.type === 'article' ? 'article' : 'website',
      locale: SITE_LOCALE,
      alternateLocale: ['en_US', 'ur_PK'],
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      countryName: 'Pakistan',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 666,
          alt: fullTitle,
          type: 'image/webp',
        },
        {
          url: absoluteUrl('/Manpasand-Logo.png'),
          width: 158,
          height: 141,
          alt: 'Manpasand Store Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    other: {
      'geo.region': 'PK',
      'geo.placename': 'Pakistan',
      'og:email': PUBLISHER.email,
      'og:phone_number': PUBLISHER.phone,
      'og:country-name': 'Pakistan',
      'twitter:label1': 'Brand',
      'twitter:data1': 'Manpasand Store',
      'twitter:label2': 'Delivery',
      'twitter:data2': 'All Pakistan',
    },
  };
}

export function metadataForPath(path: string): Metadata {
  return buildMetadata({ path });
}
