import { preload } from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HomeContent from './components/HomeContent';
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
  preload('/banners/New-Banner-750.webp', {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet:
      '/banners/New-Banner-750.webp 750w, /banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w',
    imageSizes: '100vw',
    type: 'image/webp',
  });

  const data = await getHomeData();

  /**
   * Hero is first in the DOM (faster LCP discovery) while CSS order keeps
   * the header visually on top. Avoid display:contents — it breaks a11y/hydration.
   */
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-auto z-[200] focus:left-2 focus:top-2 focus:w-auto focus:h-auto focus:px-4 focus:py-2 focus:bg-white focus:text-[#0D2B3A] focus:rounded-md focus:shadow-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1A73A8]"
      >
        Skip to main content
      </a>
      <main id="main-content" className="order-2 w-full">
        <HeroSection />
        <HomeContent initialData={data} />
      </main>
      <div className="order-1 w-full sticky top-0 z-50">
        <Header />
      </div>
      <div className="order-3 w-full">
        <Footer />
      </div>
    </div>
  );
}
