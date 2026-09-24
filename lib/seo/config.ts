export const SITE_URL = 'https://www.manpasandstore.com';
export const SITE_NAME = 'Manpasand Store';
export const SITE_LEGAL_NAME = 'Manpasand Store';
export const SITE_TAGLINE = 'Premium Dry Fruits, Dates, Nuts, Spices & Herbs since 2000';
export const SITE_DESCRIPTION =
  'Buy premium dry fruits, dates, nuts, saffron, honey & spices from Manpasand Store. Delivery across Pakistan. Stores in Bahadurabad, DHA & Bahria Town.';

export const SITE_KEYWORDS = [
  'Manpasand Store',
  'Manpasand',
  'Manpasand Pakistan',
  'dry fruits Pakistan',
  'buy dry fruits online Pakistan',
  'dry fruits Karachi',
  'dry fruits Lahore',
  'dry fruits Islamabad',
  'dry fruits Rawalpindi',
  'dry fruits Faisalabad',
  'dry fruits Multan',
  'dry fruits Peshawar',
  'dry fruits Hyderabad',
  'premium nuts Pakistan',
  'dates online Pakistan',
  'Ajwa dates Pakistan',
  'saffron Karachi',
  'zafran Pakistan',
  'spices and herbs Pakistan',
  'honey Pakistan',
  'Bahadurabad dry fruits',
  'Manpasand Bahadurabad',
  'Manpasand DHA',
  'gift packs dry fruits Pakistan',
  'Eid gift hamper Pakistan',
  'wholesale dry fruits Karachi',
  'online dry fruit store Pakistan',
  'best dry fruits brand Pakistan',
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot',
  'Gujranwala',
  'Sukkur',
  'Bahawalpur',
  'Sargodha',
];

export const DEFAULT_FAQS = [
  {
    question: 'Does Manpasand Store deliver all over Pakistan?',
    answer:
      'Yes. Manpasand Store delivers premium dry fruits, nuts, dates, spices, honey, and herbs nationwide across Pakistan — including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and other cities.',
  },
  {
    question: 'What is Manpasand Store famous for?',
    answer:
      'Manpasand is a Karachi-based brand since 2000, known for pure spices, hand-graded nuts, premium dates, saffron, honey, and traditional herbs — with stores in Bahadurabad, DHA Phase 4, and Bahria Town.',
  },
  {
    question: 'How can I buy from Manpasand Store online?',
    answer:
      'Shop at www.manpasandstore.com, add products to your cart, and checkout for delivery anywhere in Pakistan. You can also visit our Karachi stores for in-person shopping.',
  },
];


export const SITE_LOCALE = 'en_PK';
export const TWITTER_HANDLE = '@manpasandstore';

export const PUBLISHER = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/Manpasand-Logo.png`,
  email: 'Contact@manpasandstore.com',
  phone: '+923423344040',
  sameAs: [
    'https://www.facebook.com/manpasandstore/',
    'https://www.instagram.com/manpasandstoreofficial/',
  ],
};

export const STORES = [
  {
    name: 'Manpasand Store Bahadurabad',
    street: 'Bahadurabad',
    city: 'Karachi',
    region: 'Sindh',
    postalCode: '74800',
    country: 'PK',
    phone: '+922134892110',
    maps: 'https://www.google.com/maps/place/Manpasand+Store+Bahadurabad/@24.8827589,67.069352,17z',
    lat: 24.8827589,
    lng: 67.069352,
  },
  {
    name: 'Manpasand Store DHA Phase 4',
    street: 'Phase 4, DHA',
    city: 'Karachi',
    region: 'Sindh',
    postalCode: '75500',
    country: 'PK',
    phone: '+922135384433',
    maps: 'https://www.google.com/maps/place/Manpasand+dry+fruit/@24.8237151,67.0618563,17z',
    lat: 24.8237151,
    lng: 67.0618563,
  },
  {
    name: 'Manpasand Store Bahria Town',
    street: 'Shop No 209, AQ Supermarket, Bahria Town',
    city: 'Karachi',
    region: 'Sindh',
    postalCode: '75340',
    country: 'PK',
    phone: '+923423344040',
    maps: 'https://www.google.com/maps/search/?api=1&query=Shop+No+209%2C+AQ+Supermarket%2C+Bahria+Town+Karachi',
  },
] as const;

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  faqs?: Array<{ question: string; answer: string }>;
  seoHeading?: string;
  seoBody?: string[];
};

/** Static marketing / content routes for metadata, sitemap, and on-page SEO. */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'Premium Dry Fruits, Dates, Nuts & Spices in Karachi',
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    seoHeading: 'Why buy dry fruits online from Manpasand Store?',
    seoBody: [
      'Manpasand Store is a trusted Pakistan brand for premium dry fruits, dates, nuts, honey, saffron, herbs, and spices since 2000. From our Bahadurabad roots to stores in DHA and Bahria Town, Karachi, we serve customers across the country with carefully graded products for cooking and gifting.',
      'Order online for nationwide delivery to Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Hyderabad, and more. Every pack is selected for freshness, purity, and authentic taste — the Manpasand standard for over 25 years.',
      'Whether you need everyday almonds and cashews, Ajwa dates, pure masalas, or Eid gift hampers, Manpasand Store is your one-stop shop for quality dry fruits and spices in Pakistan.',
    ],
    faqs: [
      {
        question: 'Does Manpasand Store deliver across Pakistan?',
        answer:
          'Yes. We deliver dry fruits, spices, honey, and more nationwide across Pakistan — Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and beyond. Free shipping applies on eligible orders over Rs. 10,000. Below that, Karachi is Rs. 500 and outside Karachi is Rs. 700.',
      },
      {
        question: 'Where are Manpasand Store locations in Karachi?',
        answer:
          'We have stores in Bahadurabad, DHA Phase 4, and Bahria Town (AQ Supermarket). You can shop in-store or order online for home delivery anywhere in Pakistan.',
      },
      {
        question: 'Are Manpasand dry fruits and spices pure?',
        answer:
          'Yes. We follow a zero-compromise freshness policy — spices are pure and nuts are hand-graded for size and taste, continuing our heritage since 2000.',
      },
      {
        question: 'Is Manpasand a Pakistani brand?',
        answer:
          'Yes. Manpasand Store started in Bahadurabad, Karachi in 2000 and has grown into a multi-store brand serving customers online across Pakistan.',
      },
    ],
  },
  '/shop': {
    path: '/shop',
    title: 'Shop Premium Dry Fruits, Nuts & Spices Online',
    description:
      'Browse 1400+ premium dry fruits, nuts, dates, spices, herbs, honey, and saffron at Manpasand Store. Filter by category and order online for delivery across Pakistan.',
    keywords: [...SITE_KEYWORDS, 'shop dry fruits online', 'buy nuts online Pakistan'],
    seoHeading: 'Shop the full Manpasand collection online',
    seoBody: [
      'Explore our complete catalogue of dry fruits, nuts, dates, spices, herbs, honey, and specialty products. Use filters to find exactly what you need for your kitchen, pantry, or gift pack.',
    ],
    faqs: [
      {
        question: 'How do I find a specific product on the shop page?',
        answer:
          'Use the search and category filters on the Shop page, or browse by category from the homepage. You can also use site search from the header.',
      },
      {
        question: 'Can I buy in bulk from the online shop?',
        answer:
          'Yes. Many products are available in multiple pack sizes. For larger wholesale quantities, visit our Wholesale page or contact us directly.',
      },
    ],
  },
  '/about': {
    path: '/about',
    title: 'About Manpasand Store — 25+ Years in Karachi',
    description:
      'Learn about Manpasand Store’s journey since 2000 — from a family shop in Bahadurabad to Karachi’s trusted destination for pure dry fruits, spices, and herbs.',
    keywords: [...SITE_KEYWORDS, 'about Manpasand', 'Manpasand history'],
    seoHeading: 'Our story: from Bahadurabad to Pakistan-wide trust',
    seoBody: [
      'Founded in 2000 in Bahadurabad, Karachi, Manpasand Store grew from a small family apothecary into a multi-store brand known for unadulterated spices and fresh dry fruits.',
      'Today we serve thousands of customers in-store and online with the same commitment to purity and quality that started our journey.',
    ],
    faqs: [
      {
        question: 'When was Manpasand Store established?',
        answer: 'Manpasand Store opened in 2000 in Bahadurabad, Karachi, and has served customers for over 25 years.',
      },
      {
        question: 'What makes Manpasand different?',
        answer:
          'Heritage sourcing, hand-graded nuts, pure spices, and transparent service across three Karachi locations plus nationwide delivery.',
      },
    ],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Manpasand Store — Karachi Branches & Support',
    description:
      'Contact Manpasand Store for orders, wholesale, or store visits. Call +92 342 3344040 or email Contact@manpasandstore.com. Branches in Bahadurabad, DHA & Bahria Town.',
    keywords: [...SITE_KEYWORDS, 'Manpasand contact', 'dry fruits Karachi phone'],
    seoHeading: 'Get in touch with Manpasand Store',
    seoBody: [
      'Reach our team for product questions, order help, wholesale inquiries, or store directions. We are available by phone, email, and at our Karachi outlets.',
    ],
    faqs: [
      {
        question: 'What is Manpasand Store’s phone number?',
        answer: 'You can call us at +92 342 3344040. Branch lines: Bahadurabad 021-34892110 and DHA 021-35384433.',
      },
      {
        question: 'What is the Manpasand email address?',
        answer: 'Email us at Contact@manpasandstore.com for support and business inquiries.',
      },
    ],
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ — Returns, Refunds & Order Help',
    description:
      'Frequently asked questions about returns, refunds, damaged orders, and exchanges at Manpasand Store Karachi.',
    keywords: [...SITE_KEYWORDS, 'Manpasand FAQ', 'dry fruits return policy'],
    seoHeading: 'Returns & refunds — quick answers',
    seoBody: [
      'This FAQ covers returns, damaged deliveries, refund timelines, and exchanges for Manpasand Store orders. For shipping details, also see our Shipping & Returns page.',
    ],
  },
  '/shipping-returns': {
    path: '/shipping-returns',
    title: 'Shipping & Returns Policy — Manpasand Store',
    description:
      'Learn about Manpasand Store shipping across Pakistan, delivery timelines, free shipping threshold, and our returns & refunds policy.',
    keywords: [...SITE_KEYWORDS, 'shipping Pakistan dry fruits', 'Manpasand returns'],
    seoHeading: 'Shipping across Pakistan & hassle-free returns',
    seoBody: [
      'We ship premium dry fruits and spices nationwide. Review delivery expectations, free-shipping eligibility, and how to request a return if something is wrong with your order.',
    ],
    faqs: [
      {
        question: 'Is shipping free?',
        answer: 'Complimentary shipping is available on eligible orders over Rs. 10,000 across Pakistan. Below that, Karachi delivery is Rs. 500 and outside Karachi is Rs. 700.',
      },
      {
        question: 'How long do I have to return an item?',
        answer:
          'Eligible unopened items can typically be returned within 7 days of delivery with original packaging and receipt. Opened food items cannot be returned for hygiene reasons.',
      },
    ],
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy — Manpasand Store',
    description: 'Read how Manpasand Store collects, uses, and protects your personal information when you shop online or visit our stores.',
    seoHeading: 'Your privacy at Manpasand Store',
    seoBody: [
      'We respect your privacy when you browse, create an account, or place an order. This policy explains what data we collect and how it is used to fulfil orders and improve your experience.',
    ],
  },
  '/terms-conditions': {
    path: '/terms-conditions',
    title: 'Terms & Conditions — Manpasand Store',
    description: 'Terms and conditions for shopping at Manpasand Store online and in our Karachi retail locations.',
    seoHeading: 'Terms for shopping with Manpasand',
    seoBody: [
      'These terms apply to purchases made on manpasandstore.com and in our Karachi stores. By placing an order you agree to our product, payment, and delivery policies.',
    ],
  },
  '/best-sellers': {
    path: '/best-sellers',
    title: 'Best Sellers — Top Dry Fruits & Spices',
    description: 'Discover Manpasand Store best-selling dry fruits, nuts, dates, and spices loved by customers across Karachi and Pakistan.',
    keywords: [...SITE_KEYWORDS, 'best dry fruits Karachi'],
    seoHeading: 'Karachi’s favourite dry fruits & spices',
    seoBody: [
      'Our best sellers reflect what customers reorder most — from everyday almonds and dates to specialty spices. Updated regularly based on popular demand.',
    ],
    faqs: [
      {
        question: 'What are Manpasand’s most popular products?',
        answer:
          'Customer favourites typically include premium almonds, cashews, pistachios, Ajwa dates, saffron, and everyday spice blends. Check Best Sellers for the current top picks.',
      },
    ],
  },
  '/new-arrivals': {
    path: '/new-arrivals',
    title: 'New Arrivals — Latest Dry Fruits & Spices',
    description: 'See the latest products added to Manpasand Store — fresh stock of dry fruits, spices, herbs, and specialty items.',
    seoHeading: 'Fresh stock & new additions',
    seoBody: [
      'Browse newly listed dry fruits, spices, and specialty items as we refresh inventory from trusted sources for the Manpasand collection.',
    ],
  },
  '/offers': {
    path: '/offers',
    title: 'Special Offers & Promotions',
    description: 'Limited-time deals on premium dry fruits, nuts, and spices at Manpasand Store. Save on your favourite pantry essentials.',
    seoHeading: 'Save on premium pantry essentials',
    seoBody: [
      'Check current promotions on dry fruits, nuts, and spices. Offers change seasonally — especially around Eid and festive gifting periods.',
    ],
  },
  '/deals': {
    path: '/deals',
    title: 'Top Deals & Clearance',
    description: 'Shop top deals and clearance offers on dry fruits and spices from Manpasand Store Karachi.',
    seoHeading: 'Value deals from Manpasand Store',
    seoBody: [
      'Find clearance and limited deals without compromising on the quality Manpasand is known for across Karachi.',
    ],
  },
  '/gift-packs': {
    path: '/gift-packs',
    title: 'Gift Packs & Dry Fruit Hampers',
    description: 'Premium dry fruit gift packs and hampers from Manpasand Store — perfect for weddings, Eid, corporate gifting, and family occasions.',
    keywords: [...SITE_KEYWORDS, 'dry fruit gift pack Pakistan', 'Eid gift hamper Karachi'],
    seoHeading: 'Gift packs for every occasion',
    seoBody: [
      'Manpasand gift packs and dry fruit hampers are ideal for Eid, weddings, corporate clients, and family visits — presented with care and premium contents.',
    ],
    faqs: [
      {
        question: 'Do you offer dry fruit gift packaging?',
        answer:
          'Yes. Manpasand Store offers curated gift packs and hampers suitable for Eid, weddings, and corporate gifting. Browse Gift Packs or ask in-store for custom options.',
      },
    ],
  },
  '/saffron': {
    path: '/saffron',
    title: 'Buy Premium Saffron in Karachi',
    description: 'Shop authentic premium saffron at Manpasand Store. Quality-graded zafran for cooking, remedies, and gifting — available online and in Karachi stores.',
    keywords: [...SITE_KEYWORDS, 'buy saffron Karachi', 'zafran Pakistan', 'premium saffron'],
    seoHeading: 'Premium saffron (zafran) in Karachi',
    seoBody: [
      'Choose quality-graded saffron for biryani, desserts, traditional remedies, and gifting. Available online and at Manpasand Store locations across Karachi.',
    ],
    faqs: [
      {
        question: 'Is Manpasand saffron authentic?',
        answer:
          'We stock carefully selected premium saffron (zafran) for culinary and traditional use. Visit the Saffron collection or ask our staff for grade guidance.',
      },
    ],
  },
  '/herbal-remedies': {
    path: '/herbal-remedies',
    title: 'Herbs & Herbal Remedies',
    description: 'Explore 700+ herbs and traditional remedies at Manpasand Store — trusted pansar expertise from Bahadurabad, Karachi since 2000.',
    keywords: [...SITE_KEYWORDS, 'herbs Karachi', 'herbal remedies Pakistan', 'pansar Bahadurabad'],
    seoHeading: 'Traditional herbs with pansar expertise',
    seoBody: [
      'From everyday kitchen herbs to specialty remedies, Manpasand continues Bahadurabad’s pansar tradition with a wide, carefully curated herbal range.',
    ],
  },
  '/recipes': {
    path: '/recipes',
    title: 'Recipes & Cooking Ingredients',
    description: 'Find recipe-ready ingredients from Manpasand Store — spices, nuts, and dry fruits for authentic home cooking.',
    seoHeading: 'Ingredients for authentic home cooking',
    seoBody: [
      'Stock your kitchen with Manpasand spices, nuts, and dry fruits used in Pakistani and traditional recipes — fresh packs ready for everyday cooking.',
    ],
  },
  '/reviews': {
    path: '/reviews',
    title: 'Customer Reviews — Manpasand Store',
    description: 'Read real customer reviews of Manpasand Store Bahadurabad and our dry fruits, spices, and service across Karachi.',
    seoHeading: 'What customers say about Manpasand',
    seoBody: [
      'Read Google and customer feedback for Manpasand Store Bahadurabad and our service across Karachi. Quality and trust have defined us since 2000.',
    ],
  },
  '/wholesale': {
    path: '/wholesale',
    title: 'Wholesale & Bulk Dry Fruits Orders',
    description: 'Request wholesale and bulk pricing on dry fruits, nuts, and spices from Manpasand Store Karachi. Ideal for retailers, caterers, and businesses.',
    keywords: [...SITE_KEYWORDS, 'wholesale dry fruits Karachi', 'bulk nuts Pakistan'],
    seoHeading: 'Bulk & wholesale supply from Karachi',
    seoBody: [
      'Retailers, caterers, and businesses can request bulk pricing on dry fruits, nuts, and spices. Tell us your product list and quantities for a quote.',
    ],
    faqs: [
      {
        question: 'How do I place a wholesale order?',
        answer:
          'Submit a request on our Wholesale page with product and quantity details, or call +92 342 3344040. Our team will share bulk pricing and availability.',
      },
    ],
  },
  '/payment-methods': {
    path: '/payment-methods',
    title: 'Payment Methods',
    description: 'See accepted payment methods for Manpasand Store online orders and in-store purchases.',
    seoHeading: 'Convenient ways to pay',
    seoBody: [
      'Manpasand Store supports secure payment options for online checkout and in-store purchases. Choose the method that works best for you at checkout.',
    ],
  },
  '/support': {
    path: '/support',
    title: 'Customer Support',
    description: 'Get help with Manpasand Store orders, deliveries, and product questions. Call or email our support team.',
    seoHeading: 'We’re here to help',
    seoBody: [
      'Need help with an order, delivery, or product question? Contact Manpasand support by phone or email — our team is ready to assist.',
    ],
  },
  '/blog': {
    path: '/blog',
    title: 'Health & Wellness Blog',
    description: 'Tips on dry fruits, spices, nutrition, and wellness from Manpasand Store — Karachi’s premium pantry destination.',
    seoHeading: 'Wellness tips from Manpasand',
    seoBody: [
      'Explore articles on dry fruits, spices, and everyday wellness inspired by the products families buy from Manpasand Store.',
    ],
  },
  '/ingredient-sourcing': {
    path: '/ingredient-sourcing',
    title: 'Ingredient Sourcing Transparency',
    description: 'Learn how Manpasand Store sources premium dry fruits, spices, and herbs with a focus on purity and quality.',
    seoHeading: 'How we source our products',
    seoBody: [
      'Manpasand prioritises purity and freshness when sourcing dry fruits, spices, and herbs — continuing a standard built over 25 years in Karachi.',
    ],
  },
  '/custom-formulas': {
    path: '/custom-formulas',
    title: 'Custom Formulas & Blends',
    description: 'Ask Manpasand Store about custom spice blends and traditional formulas prepared with care.',
    seoHeading: 'Custom blends on request',
    seoBody: [
      'Looking for a specific traditional blend or custom spice mix? Speak with our team about custom formulas prepared with Manpasand quality ingredients.',
    ],
  },
  '/supplier': {
    path: '/supplier',
    title: 'Become a Supplier',
    description: 'Partner with Manpasand Store as a supplier of dry fruits, spices, herbs, or specialty products.',
    seoHeading: 'Supply partnership inquiries',
    seoBody: [
      'If you supply premium dry fruits, spices, or specialty foods, share your details on the Supplier page — we welcome quality-focused partners.',
    ],
  },
  '/feedback': {
    path: '/feedback',
    title: 'Feedback & Complaints',
    description: 'Share feedback or raise a complaint with Manpasand Store. We value your experience and respond promptly.',
    seoHeading: 'Tell us how we’re doing',
    seoBody: [
      'Your feedback helps us improve. Share compliments or concerns and our team will follow up as quickly as possible.',
    ],
  },
  '/newsletter-signup': {
    path: '/newsletter-signup',
    title: 'Newsletter Signup',
    description: 'Subscribe to Manpasand Store updates for offers on dry fruits, spices, and seasonal gift packs.',
    seoHeading: 'Stay updated with Manpasand offers',
    seoBody: [
      'Subscribe for seasonal offers, new arrivals, and gift-pack announcements from Manpasand Store.',
    ],
  },
  '/site-map': {
    path: '/site-map',
    title: 'HTML Sitemap',
    description: 'Browse all important pages on Manpasand Store — shop, categories, policies, and support links.',
    seoHeading: 'Find every Manpasand page',
    seoBody: [
      'Use this HTML sitemap to jump to shop collections, policies, support, and company pages. Search engines can also use our XML sitemap at /sitemap.xml.',
    ],
  },
  '/cart': {
    path: '/cart',
    title: 'Shopping Cart — Manpasand Store Pakistan',
    description:
      'Review your Manpasand Store cart — premium dry fruits, nuts, dates, and spices ready for checkout and delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Your Manpasand shopping cart',
    seoBody: [
      'Review selected dry fruits, spices, and pantry essentials before checkout. Manpasand Store delivers nationwide across Pakistan from our Karachi warehouses and stores.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/checkout': {
    path: '/checkout',
    title: 'Checkout — Order Dry Fruits Online Pakistan',
    description:
      'Secure checkout at Manpasand Store. Complete your order for premium dry fruits and spices with delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Checkout with Manpasand Store',
    seoBody: [
      'Complete your order securely. Manpasand Store ships premium dry fruits, nuts, dates, and spices to cities across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/checkout/thank-you': {
    path: '/checkout/thank-you',
    title: 'Order Confirmed — Thank You | Manpasand Store',
    description:
      'Thank you for ordering from Manpasand Store. Your premium dry fruits and spices order is confirmed for delivery in Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Thank you for choosing Manpasand',
    seoBody: [
      'Your order supports a Karachi brand trusted since 2000. We prepare and ship premium dry fruits and spices carefully for customers across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/wishlist': {
    path: '/wishlist',
    title: 'Wishlist — Save Dry Fruits & Spices | Manpasand',
    description:
      'Save favourite Manpasand Store products — dry fruits, nuts, dates, saffron, and spices — and shop later with delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Save your Manpasand favourites',
    seoBody: [
      'Keep track of dry fruits and spices you love. Add wishlist items to cart anytime and order for delivery anywhere in Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/compare': {
    path: '/compare',
    title: 'Compare Products — Manpasand Store',
    description:
      'Compare Manpasand Store dry fruits, nuts, and spices side by side to choose the best packs for your kitchen in Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Compare Manpasand products',
    seoBody: [
      'Compare grades, pack sizes, and prices of Manpasand dry fruits and spices to pick what suits your cooking and gifting needs.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/login': {
    path: '/login',
    title: 'Login — Manpasand Store Account',
    description:
      'Sign in to your Manpasand Store account to track orders, manage addresses, and reorder premium dry fruits across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Sign in to Manpasand Store',
    seoBody: [
      'Access your orders and saved addresses. Manpasand Store members enjoy a faster checkout for dry fruits and spices delivered across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/register': {
    path: '/register',
    title: 'Create Account — Manpasand Store Pakistan',
    description:
      'Create a Manpasand Store account to shop premium dry fruits and spices online with easy reorder and delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Join Manpasand Store',
    seoBody: [
      'Register to manage orders and addresses. Shop Pakistan’s trusted dry fruits and spices brand online with nationwide delivery.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/search': {
    path: '/search',
    title: 'Search Dry Fruits & Spices — Manpasand Store',
    description:
      'Search Manpasand Store for dry fruits, nuts, dates, saffron, honey, herbs, and spices. Buy online with delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Search the Manpasand catalogue',
    seoBody: [
      'Find almonds, cashews, pistachios, dates, saffron, masalas, honey, and more. Manpasand Store delivers premium pantry products nationwide in Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/account': {
    path: '/account',
    title: 'My Account — Manpasand Store',
    description:
      'Manage your Manpasand Store account — orders, profile, and addresses for dry fruit delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Your Manpasand account',
    seoBody: [
      'View orders and account details for your Manpasand Store purchases. We deliver premium dry fruits and spices across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/account/profile': {
    path: '/account/profile',
    title: 'My Profile — Manpasand Store',
    description: 'Update your Manpasand Store profile details for faster checkout and delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Manage your profile',
    seoBody: [
      'Keep your contact details up to date so Manpasand can deliver your dry fruits and spices orders smoothly across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/account/orders': {
    path: '/account/orders',
    title: 'My Orders — Manpasand Store',
    description: 'View your Manpasand Store order history for dry fruits, nuts, dates, and spices delivered in Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Your Manpasand orders',
    seoBody: [
      'Track and review past orders from Manpasand Store — Pakistan’s trusted dry fruits and spices brand since 2000.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/account/addresses': {
    path: '/account/addresses',
    title: 'Address Book — Manpasand Store',
    description:
      'Manage delivery addresses for Manpasand Store orders anywhere in Pakistan — Karachi, Lahore, Islamabad, and more.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Delivery addresses across Pakistan',
    seoBody: [
      'Save multiple delivery addresses for Manpasand Store orders so you can send dry fruits and spices to family across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/account/track-order': {
    path: '/account/track-order',
    title: 'Track Order — Manpasand Store Pakistan',
    description: 'Track your Manpasand Store order status for dry fruits and spices delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Track your Manpasand delivery',
    seoBody: [
      'Enter your order details to follow shipment progress. Manpasand Store ships premium products nationwide across Pakistan.',
    ],
    faqs: DEFAULT_FAQS,
  },
  '/order-status': {
    path: '/order-status',
    title: 'Order Status — Manpasand Store Pakistan',
    description:
      'Check your Manpasand Store order status with your order number and checkout email or phone. Delivery across Pakistan.',
    keywords: SITE_KEYWORDS,
    seoHeading: 'Check your order status',
    seoBody: [
      'Look up any Manpasand Store website order using the order number from your confirmation and the email or phone used at checkout.',
    ],
    faqs: DEFAULT_FAQS,
  },
};

export function getPageSeo(path: string): PageSeo {
  const normalized = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  if (PAGE_SEO[normalized]) return PAGE_SEO[normalized];

  // Dynamic category / product fallbacks so every URL still has SEO copy
  if (normalized.startsWith('/categories/')) {
    const slug = normalized.replace('/categories/', '').replace(/-/g, ' ');
    const name = slug.replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      path: normalized,
      title: `Buy ${name} Online — Manpasand Store Pakistan`,
      description: `Shop ${name} at Manpasand Store — premium quality with delivery across Pakistan including Karachi, Lahore, Islamabad and more.`,
      keywords: [...SITE_KEYWORDS, name, `${name} Pakistan`, `${name} Karachi`],
      seoHeading: `${name} from Manpasand Store`,
      seoBody: [
        `Browse ${name} at Manpasand Store, a trusted Pakistan brand for dry fruits, spices, and herbs since 2000. Order online for nationwide delivery.`,
        `Customers in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and other cities shop Manpasand for freshness and purity.`,
      ],
      faqs: DEFAULT_FAQS,
    };
  }

  if (normalized.startsWith('/products/')) {
    return {
      path: normalized,
      title: 'Buy Premium Dry Fruits & Spices | Manpasand Store',
      description:
        'Buy this product from Manpasand Store — premium dry fruits, nuts, dates, and spices with delivery across Pakistan.',
      keywords: SITE_KEYWORDS,
      seoHeading: 'Premium quality from Manpasand Store',
      seoBody: [
        'Manpasand Store offers carefully selected dry fruits, nuts, dates, spices, honey, and herbs with delivery across Pakistan.',
        'Shop with confidence from a Karachi brand trusted since 2000 — Bahadurabad, DHA, and Bahria Town stores plus nationwide shipping.',
      ],
      faqs: DEFAULT_FAQS,
    };
  }

  if (normalized.startsWith('/account/orders/')) {
    return {
      path: normalized,
      title: 'Order Details — Manpasand Store',
      description: 'View Manpasand Store order details for your dry fruits and spices delivery in Pakistan.',
      keywords: SITE_KEYWORDS,
      seoHeading: 'Order details',
      seoBody: [
        'Review items and status for your Manpasand Store order. We deliver premium dry fruits and spices across Pakistan.',
      ],
      faqs: DEFAULT_FAQS,
    };
  }

  return {
    path: normalized || '/',
    title: 'Manpasand Store — Dry Fruits & Spices Pakistan',
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    seoHeading: 'Manpasand Store — dry fruits & spices across Pakistan',
    seoBody: [
      'Manpasand Store is a premium dry fruits and spices brand based in Karachi, delivering quality products nationwide across Pakistan since 2000.',
    ],
    faqs: DEFAULT_FAQS,
  };
}

/** Every configured path is included — nothing excluded from the XML sitemap. */
export const SITEMAP_PATHS = Object.values(PAGE_SEO).map((p) => p.path);
