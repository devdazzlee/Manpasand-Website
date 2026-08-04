'use client';

import { useEffect } from 'react';

const GTM_ID = 'GTM-K7F45ZVH';
const GA_ID = 'G-CWZ4YKC8DK';

/**
 * Injects GTM + GA4 after load/idle only.
 * Must return null — never render <noscript> from a client component
 * (browsers omit noscript children when JS is on → React #418 HTML vs empty).
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
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
        gtag('config', GA_ID);
      };
    };

    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => inject(), { timeout: 4000 });
      } else {
        timeoutId = setTimeout(inject, 3500);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
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
