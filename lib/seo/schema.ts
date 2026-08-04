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
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
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
  image?: string | string[];
  sku?: string;
  price?: number;
  currency?: string;
  availability?: boolean;
  url: string;
  brand?: string;
  category?: string;
}) {
  const images = Array.isArray(opts.image)
    ? opts.image.filter(Boolean)
    : opts.image
      ? [opts.image]
      : [PUBLISHER.logo];

  const price = Number(opts.price) || 0;
  // Google prefers a future priceValidUntil on Offers
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description || `Buy ${opts.name} online from ${SITE_NAME} — delivery across Pakistan.`,
    image: images,
    sku: opts.sku,
    mpn: opts.sku,
    brand: {
      '@type': 'Brand',
      name: opts.brand || SITE_NAME,
    },
    category: opts.category || 'Dry Fruits & Spices',
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    offers: {
      '@type': 'Offer',
      url: opts.url,
      priceCurrency: opts.currency || 'PKR',
      price: price.toFixed(2),
      priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        opts.availability === false
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Pakistan',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'PKR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'PK',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };
}

/** Category / collection page — helps Google understand product listings */
export function collectionPageSchema(opts: {
  name: string;
  description?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description:
      opts.description ||
      `Shop ${opts.name} at ${SITE_NAME} — premium dry fruits, nuts, spices & herbs with delivery across Pakistan.`,
    url: opts.url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: opts.name,
    },
  };
}
