import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DeferredHomeContent from './components/DeferredHomeContent';
import { webApi } from '../lib/api/webApi';
import type { WebHomePayload } from '../lib/api/webApi';

export const revalidate = 60;

async function getHomeData(): Promise<WebHomePayload | null> {
  try {
    return await webApi.getHome({ featuredLimit: 8, categoriesLimit: 24 });
  } catch {
    return null;
  }
}

export default async function Home() {
  const dataPromise = getHomeData();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-auto z-[200] focus:left-2 focus:top-2 focus:w-auto focus:h-auto focus:px-4 focus:py-2 focus:bg-white focus:text-[#0D2B3A] focus:rounded-md focus:shadow-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1A73A8]"
      >
        Skip to main content
      </a>
      <div className="w-full sticky top-0 z-50">
        <Header />
      </div>
      <main id="main-content" className="w-full">
        <HeroSection />
        <DeferredHomeContent dataPromise={dataPromise} />
      </main>
    </div>
  );
}
