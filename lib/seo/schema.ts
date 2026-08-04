import {
  PUBLISHER,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STORES,
  PAKISTAN_CITIES,
} from './config';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Brand'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ['Manpasand', 'Manpasand Dry Fruits', 'Manpasand Pakistan'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: PUBLISHER.logo,
      width: 158,
      height: 141,
    },
    image: PUBLISHER.logo,
    email: PUBLISHER.email,
    telephone: PUBLISHER.phone,
    sameAs: PUBLISHER.sameAs,
    foundingDate: '2000',
    slogan: 'Premium Dry Fruits, Spices & Herbs since 2000',
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    knowsAbout: [
      'Dry fruits',
      'Nuts',
      'Dates',
      'Saffron',
      'Spices',
      'Herbs',
      'Honey',
      'Gift packs',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahadurabad',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PUBLISHER.phone,
        contactType: 'customer service',
        areaServed: 'PK',
        availableLanguage: ['English', 'Urdu'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: 'Manpasand',
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['en-PK', 'en', 'ur'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function onlineStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': `${SITE_URL}/#onlinestore`,
    name: `${SITE_NAME} Online`,
    url: SITE_URL,
    image: PUBLISHER.logo,
    telephone: PUBLISHER.phone,
    email: PUBLISHER.email,
    priceRange: '$$',
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: PAKISTAN_CITIES.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'Country', name: 'Pakistan' },
    })),
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };
}

export function localBusinessSchemas() {
  return STORES.map((store) => ({
    '@context': 'https://schema.org',
    '@type': ['Store', 'LocalBusiness'],
    name: store.name,
    image: PUBLISHER.logo,
    url: SITE_URL,
    telephone: store.phone,
    priceRange: '$$',
    currenciesAccepted: 'PKR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.street,
      addressLocality: store.city,
      addressRegion: store.region,
      postalCode: store.postalCode,
      addressCountry: store.country,
    },
    ...('lat' in store && 'lng' in store && store.lat && store.lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: store.lat,
            longitude: store.lng,
          },
        }
      : {}),
    hasMap: store.maps,
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  }));
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function productSchema(opts: {
  name: string;
  description?: string;
  image?: string;
  sku?: string;
  price?: number;
  currency?: string;
  availability?: boolean;
  url: string;
  brand?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description || opts.name,
    image: opts.image ? [opts.image] : [PUBLISHER.logo],
    sku: opts.sku,
    brand: {
      '@type': 'Brand',
      name: opts.brand || SITE_NAME,
    },
    category: 'Dry Fruits & Spices',
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    offers: {
      '@type': 'Offer',
      url: opts.url,
      priceCurrency: opts.currency || 'PKR',
      price: opts.price ?? 0,
      availability:
        opts.availability === false
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organization` },
      areaServed: {
        '@type': 'Country',
        name: 'Pakistan',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK',
        },
      },
    },
  };
}
