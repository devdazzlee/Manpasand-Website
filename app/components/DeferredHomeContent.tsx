import { Suspense } from 'react';
import type { WebHomePayload } from '../../lib/api/webApi';
import { getPageSeo } from '../../lib/seo/config';
import HomeContent from './HomeContent';
import Footer from './Footer';

async function BelowFold({
  dataPromise,
}: {
  dataPromise: Promise<WebHomePayload | null>;
}) {
  const data = await dataPromise;
  return (
    <>
      <HomeContent initialData={data} />
      {/* Footer must render AFTER home sections — early paint + late content = CLS 0.145 */}
      <Footer seo={getPageSeo('/')} />
    </>
  );
}

/**
 * Hero streams immediately. Below-fold (home sections + footer) waits on API
 * so the SEO footer is not painted then pushed down (major CLS).
 */
export default function DeferredHomeContent({
  dataPromise,
}: {
  dataPromise: Promise<WebHomePayload | null>;
}) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" aria-hidden="true" />}>
      <BelowFold dataPromise={dataPromise} />
    </Suspense>
  );
}
