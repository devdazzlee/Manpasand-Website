'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Loader from './Loader';
import { WebCategory } from '../../lib/api/webApi';
import { useWebCategoryStore } from '../../lib/store/webCategoryStore';
import { optimizeCloudinaryUrl } from '../../lib/utils/cloudinary';

const INITIAL_VISIBLE = 5;

interface CategoriesSectionProps {
  initialCategories: WebCategory[];
  initialTotal?: number;
  initialLoading?: boolean;
  error?: string | null;
}

function formatProductCount(count: number): string {
  if (count === 1) return '1 product';
  return `${count.toLocaleString()} products`;
}

function hasCategoryImage(image: string | null | undefined): boolean {
  return Boolean(image?.trim());
}

function CategoryCard({ category }: { category: WebCategory }) {
  const hasImage = hasCategoryImage(category.image);
  const src240 = optimizeCloudinaryUrl(category.image, { width: 240 });
  const src400 = optimizeCloudinaryUrl(category.image, { width: 400 });

  return (
    <div className="h-full flex">
      <Link
        href={`/categories/${category.slug}`}
        className="w-full flex flex-col group"
        aria-label={`Shop ${category.name}`}
      >
        <div
          className={`relative aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#1A73A8]/40 group-hover:-translate-y-1 ${
            !hasImage ? 'bg-gradient-to-br from-[#E8EDF2] via-[#DDE4EC] to-[#C5D0DC]' : ''
          }`}
        >
          {hasImage && (
            <img
              src={src400}
              srcSet={`${src240} 240w, ${src400} 400w`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 240px"
              alt=""
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div
            className={`absolute inset-0 ${
              hasImage
                ? 'bg-gradient-to-t from-[#0D2B3A]/90 via-[#0D2B3A]/35 to-transparent'
                : 'bg-gradient-to-t from-[#0D2B3A]/25 via-transparent to-transparent'
            }`}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
            <h3
              className={`font-semibold text-xs sm:text-sm md:text-base leading-tight line-clamp-2 transition-colors ${
                hasImage
                  ? 'text-white group-hover:text-[#DFF3EA]'
                  : 'text-[#0D2B3A] group-hover:text-[#1A73A8]'
              }`}
            >
              {category.name}
            </h3>
            {category.product_count > 0 && (
              <p
                className={`text-[10px] sm:text-xs mt-1 ${
                  hasImage ? 'text-white' : 'text-[#4B5563]'
                }`}
              >
                {formatProductCount(category.product_count)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function CategoriesSection({
  initialCategories,
  initialTotal,
  initialLoading,
  error,
}: CategoriesSectionProps) {
  const allCategories = useWebCategoryStore((s) => s.all);
  const allError = useWebCategoryStore((s) => s.allError);
  const fetchAll = useWebCategoryStore((s) => s.fetchAll);
  const [showAll, setShowAll] = useState(false);
  const [expanding, setExpanding] = useState(false);

  const categories = useMemo(() => {
    const source = allCategories?.length ? allCategories : initialCategories;
    return source.filter((c) => c.is_active);
  }, [allCategories, initialCategories]);

  const totalCount = initialTotal ?? categories.length;
  const hasFullList = categories.length >= totalCount;

  const visibleCategories = showAll ? categories : categories.slice(0, INITIAL_VISIBLE);
  const hiddenCount = showAll ? 0 : Math.max(0, totalCount - INITIAL_VISIBLE);
  const canExpand = !showAll && hiddenCount > 0;

  const handleExpand = async () => {
    if (!hasFullList) {
      setExpanding(true);
      try {
        await fetchAll();
      } catch {
        // still expand with whatever we have
      } finally {
        setExpanding(false);
      }
    }
    setShowAll(true);
  };

  const loading = initialLoading && categories.length === 0;
  const displayError = categories.length === 0 ? error || allError : null;

  return (
    <section className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-white to-[#F8F2DE]/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D2B3A] mb-2">
            Shop by Category
          </h2>
          <p className="text-[#4B5563] text-xs sm:text-sm">
            Explore our wide range of premium products
          </p>
        </div>

        {loading ? (
          <Loader size="lg" text="Loading categories..." />
        ) : displayError ? (
          <div className="text-center py-8">
            <p className="text-red-500 text-sm">{displayError}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#4B5563] text-sm">No categories available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 items-stretch">
              {visibleCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 mt-8 sm:mt-10">
              {canExpand && (
                <button
                  type="button"
                  onClick={handleExpand}
                  disabled={expanding}
                  className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-[#1A73A8] text-white font-semibold text-sm hover:bg-[#0D2B3A] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{expanding ? 'Loading…' : 'View All Categories'}</span>
                  {!expanding && (
                    <span className="text-white text-xs font-normal">
                      ({hiddenCount} more)
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {showAll && totalCount > INITIAL_VISIBLE && (
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full border border-[#1A73A8] text-[#1A73A8] font-semibold text-sm hover:bg-[#1A73A8]/5 transition-colors"
                >
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </button>
              )}

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 min-h-11 text-[#1A73A8] hover:text-[#0D2B3A] font-semibold text-sm group"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
