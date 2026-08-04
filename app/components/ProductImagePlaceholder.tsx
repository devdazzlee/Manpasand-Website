'use client';

type Props = {
  name: string;
  category?: string | null;
  className?: string;
  compact?: boolean;
  /** Tiny thumbs (search, cart): logo only — name is already beside the image */
  logoOnly?: boolean;
};

/**
 * Clean branded placeholder when a product has no photo.
 * Logo + name + optional category (or logo-only for small thumbs).
 */
export default function ProductImagePlaceholder({
  name,
  category,
  className = '',
  compact = false,
  logoOnly = false,
}: Props) {
  const displayName = (name || 'Product').trim() || 'Product';
  const categoryLabel = category?.trim() || '';

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      role="img"
      aria-label={displayName}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(165deg, #FBF9F5 0%, #F3F7FA 50%, #EAF3F8 100%)',
        }}
        aria-hidden
      />

      {!logoOnly && (
        <>
          <div
            className="absolute -top-10 -right-8 w-2/5 h-2/5 rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #1A73A8 0%, transparent 70%)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-12 -left-8 w-1/2 h-1/2 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0D2B3A 0%, transparent 70%)' }}
            aria-hidden
          />
        </>
      )}

      <div
        className={`absolute pointer-events-none rounded-sm border border-[#0D2B3A]/12 ${
          logoOnly ? 'inset-1.5' : compact ? 'inset-2' : 'inset-3 sm:inset-3.5'
        }`}
        aria-hidden
      />
      {!logoOnly && (
        <div
          className={`absolute pointer-events-none rounded-sm border border-[#1A73A8]/15 ${
            compact ? 'inset-3' : 'inset-4 sm:inset-[18px]'
          }`}
          aria-hidden
        />
      )}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
          logoOnly
            ? 'px-2'
            : compact
              ? 'px-3 gap-1.5'
              : 'px-5 sm:px-6 gap-2.5 sm:gap-3'
        }`}
      >
        <picture>
          <source srcSet="/Manpasand-Logo.webp" type="image/webp" />
          <img
            src="/Manpasand-Logo.png"
            alt=""
            width={94}
            height={84}
            className={`w-auto object-contain opacity-95 ${
              logoOnly
                ? 'h-7 w-auto max-w-[70%]'
                : compact
                  ? 'h-8 sm:h-9'
                  : 'h-11 sm:h-14 md:h-16'
            }`}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </picture>

        {!logoOnly && (
          <>
            <div
              className={`flex items-center gap-2 ${compact ? 'my-0.5' : 'my-1'}`}
              aria-hidden
            >
              <span className="h-px w-5 sm:w-7 bg-[#1A73A8]/35" />
              <span className="w-1 h-1 rounded-full bg-[#1A73A8]/50" />
              <span className="h-px w-5 sm:w-7 bg-[#1A73A8]/35" />
            </div>

            {categoryLabel ? (
              <p
                className={`font-medium uppercase tracking-[0.16em] text-[#1A73A8] ${
                  compact ? 'text-[7px] sm:text-[8px]' : 'text-[8px] sm:text-[9px]'
                }`}
              >
                {categoryLabel}
              </p>
            ) : null}

            <p
              className={`font-semibold text-[#0D2B3A] leading-snug line-clamp-3 max-w-[18ch] ${
                compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base md:text-lg'
              }`}
              style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}
            >
              {displayName}
            </p>

            {!compact && (
              <p className="text-[8px] sm:text-[9px] font-medium tracking-[0.14em] uppercase text-[#1A73A8]/80">
                Premium Quality
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
