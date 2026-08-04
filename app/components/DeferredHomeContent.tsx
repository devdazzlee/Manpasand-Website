import { Suspense } from 'react';
import type { WebHomePayload } from '../../lib/api/webApi';
import HomeContent from './HomeContent';

async function HomeContentFromData({
  dataPromise,
}: {
  dataPromise: Promise<WebHomePayload | null>;
}) {
  const data = await dataPromise;
  return <HomeContent initialData={data} />;
}

/**
 * Streams hero first; below-fold waits on home API without blocking LCP HTML.
 */
export default function DeferredHomeContent({
  dataPromise,
}: {
  dataPromise: Promise<WebHomePayload | null>;
}) {
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-white" aria-hidden="true" />}>
      <HomeContentFromData dataPromise={dataPromise} />
    </Suspense>
  );
}
