'use client';

type Props = {
  name: string;
  category?: string | null;
  className?: string;
  compact?: boolean;
  /** Tiny thumbs (search, cart): logo only — name is already beside the image */
  logoOnly?: boolean;
  /** @deprecated Prefer showing the product name on placeholders; ignored for card tiles */
  hideName?: boolean;
};

/**
 * Branded placeholder when a product has no photo.
 * Logo scales with card width; product name is mobile-safe then larger on desktop.
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
  const longName = displayName.length > 24;

  return (
    <div
      className={`relative w-full h-full min-h-0 overflow-hidden select-none ${className}`}
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
            className="absolute -top-8 -right-6 w-2/5 h-2/5 rounded-full opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #1A73A8 0%, transparent 70%)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-10 -left-6 w-1/2 h-1/2 rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0D2B3A 0%, transparent 70%)' }}
            aria-hidden
          />
        </>
      )}

      <div
        className={`absolute pointer-events-none rounded-sm border border-[#0D2B3A]/10 ${
          logoOnly ? 'inset-1' : 'inset-1.5 sm:inset-2.5'
        }`}
        aria-hidden
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center min-h-0 ${
          logoOnly
            ? 'px-1.5 gap-0'
            : compact
              ? 'px-2 sm:px-3 md:px-4 gap-1 sm:gap-1.5 md:gap-2'
              : 'px-3 sm:px-5 gap-1.5 sm:gap-2'
        }`}
      >
        <picture className="shrink-0 flex justify-center w-full">
          <source srcSet="/Manpasand-Logo.webp" type="image/webp" />
          <img
            src="/Manpasand-Logo.png"
            alt=""
            width={94}
            height={84}
            className={`object-contain opacity-95 ${
              logoOnly
                ? 'w-8 h-auto sm:w-9'
                : compact
                  ? 'w-[26%] min-w-[44px] max-w-[72px] sm:w-[30%] sm:min-w-[56px] sm:max-w-[100px] md:w-[28%] md:max-w-[120px] h-auto'
                  : 'w-[28%] min-w-[52px] max-w-[90px] sm:w-[32%] sm:max-w-[130px] h-auto'
            }`}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </picture>

        {!logoOnly && (
          <>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-hidden>
              <span className="h-px w-3 sm:w-5 bg-[#1A73A8]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A73A8]/55" />
              <span className="h-px w-3 sm:w-5 bg-[#1A73A8]/40" />
            </div>

            {categoryLabel ? (
              <p
                className={`font-semibold uppercase tracking-wide text-[#1A73A8] line-clamp-1 max-w-[95%] px-0.5 ${
                  compact ? 'text-[9px] sm:text-[10px] md:text-xs' : 'text-[10px] sm:text-xs'
                }`}
                style={{ fontFamily: 'var(--font-body), Poppins, system-ui, sans-serif' }}
              >
                {categoryLabel}
              </p>
            ) : null}

            {/* Bold sans for placeholder title — clearer than serif at small card sizes */}
            <p
              className={`font-bold text-[#0D2B3A] leading-snug line-clamp-2 sm:line-clamp-3 max-w-[95%] px-0.5 break-words tracking-tight ${
                compact
                  ? longName
                    ? 'text-[11px] sm:text-sm md:text-base lg:text-lg'
                    : 'text-xs sm:text-base md:text-lg lg:text-xl'
                  : longName
                    ? 'text-sm sm:text-lg md:text-xl'
                    : 'text-base sm:text-xl md:text-2xl'
              }`}
              style={{ fontFamily: 'var(--font-body), Poppins, system-ui, sans-serif' }}
            >
              {displayName}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
