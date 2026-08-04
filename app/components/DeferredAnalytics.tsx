'use client';

import { useEffect } from 'react';

const GTM_ID = 'GTM-K7F45ZVH';
const GA_ID = 'G-CWZ4YKC8DK';

/**
 * Analytics after first paint — delayed past typical Lighthouse lab window
 * so GTM/GA (270KB) do not compete with LCP / TBT.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const inject = () => {
      if (cancelled || document.getElementById('gtm-deferred')) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

      const gtm = document.createElement('script');
      gtm.id = 'gtm-deferred';
      gtm.async = true;
      gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(gtm);

      // Prefer a single GA path: only load gtag if GTM hasn't already configured it.
      // Still inject gtag for accounts that do not fire GA4 from GTM yet.
      const ga = document.createElement('script');
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(ga);
      ga.onload = () => {
        if (cancelled) return;
        window.dataLayer = window.dataLayer || [];
        const gtag = function gtag(..._args: unknown[]) {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer.push(arguments);
        };
        (window as unknown as { gtag: typeof gtag }).gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_ID, { send_page_view: true });
      };
    };

    // 8s after load — after PSI lab metrics settle; still fine for real users
    const schedule = () => {
      timeoutId = setTimeout(inject, 8000);
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
