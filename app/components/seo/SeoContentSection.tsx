'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  getPageSeo,
  PAKISTAN_CITIES,
  SITE_NAME,
  type PageSeo,
} from '../../../lib/seo/config';

type Props = {
  /** Server-resolved SEO — required for hydration-safe SSR (avoids React #418). */
  seo?: PageSeo;
};

/**
 * Path-specific SEO copy + FAQ accordion.
 *
 * When `seo` is passed from a Server Component, SSR and client match exactly.
 * Without `seo`, content waits until mount so usePathname cannot diverge
 * from the server HTML (root cause of production React #418).
 */
export default function SeoContentSection({ seo: seoProp }: Props) {
  const pathname = usePathname();
  const [allowClientPath, setAllowClientPath] = useState(Boolean(seoProp));

  useEffect(() => {
    if (!seoProp) setAllowClientPath(true);
  }, [seoProp]);

  const seo = useMemo(() => {
    if (seoProp) return seoProp;
    return getPageSeo(pathname || '/');
  }, [seoProp, pathname]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // No server-resolved seo: render nothing until mounted (SSR null === client null).
  if (!allowClientPath) return null;

  const faqs = seo.faqs ?? [];
  const body = seo.seoBody ?? [];
  const heading = seo.seoHeading ?? `${SITE_NAME} — premium dry fruits & spices across Pakistan`;

  return (
    <section className="bg-[#F8F2DE]/40 border-t border-gray-100" aria-label="About Manpasand Store">
      <div className="container mx-auto px-4 py-10 sm:py-12 max-w-4xl">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-3">{heading}</h2>
          <div className="space-y-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {body.map((para) => (
              <p key={para.slice(0, 64)}>{para}</p>
            ))}
            <p>
              Manpasand Store delivers to {PAKISTAN_CITIES.slice(0, 8).join(', ')}, and cities
              across Pakistan. Shop premium dry fruits, nuts, dates, saffron, honey, herbs, and
              spices online or visit our Karachi stores in Bahadurabad, DHA Phase 4, and Bahria Town.
            </p>
          </div>
        </div>

        {faqs.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D2B3A] mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const open = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left min-h-11"
                      aria-expanded={open}
                    >
                      <span className="font-semibold text-sm sm:text-base text-[#0D2B3A]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#1A73A8] shrink-0 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                        aria-hidden
                      />
                    </button>
                    {open ? (
                      <div className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed border-t border-gray-100 pt-3">
                        {faq.answer}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
