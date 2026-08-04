'use client';

type Props = {
  name: string;
  category?: string | null;
  className?: string;
  compact?: boolean;
  /** Tiny thumbs (search, cart): logo only — name is already beside the image */
  logoOnly?: boolean;
  /** When name is shown under the card, skip repeating it in the tile */
  hideName?: boolean;
};

/**
 * Branded placeholder when a product has no photo.
 * Readable type on mobile 2-col cards; scales up on larger tiles.
 */
export default function ProductImagePlaceholder({
  name,
  category,
  className = '',
  compact = false,
  logoOnly = false,
  hideName = false,
}: Props) {
  const displayName = (name || 'Product').trim() || 'Product';
  const categoryLabel = category?.trim() || '';
  const showName = !logoOnly && !hideName;
  const showMeta = !logoOnly;
  const cardTile = compact || hideName;

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

      {showMeta && (
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
          logoOnly ? 'inset-1' : cardTile ? 'inset-1.5 sm:inset-2.5' : 'inset-2 sm:inset-3'
        }`}
        aria-hidden
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center min-h-0 ${
          logoOnly
            ? 'px-1.5'
            : cardTile
              ? 'px-2 sm:px-3 gap-1.5 sm:gap-2'
              : 'px-3 sm:px-5 gap-1.5 sm:gap-2.5'
        }`}
      >
        <picture>
          <source srcSet="/Manpasand-Logo.webp" type="image/webp" />
          <img
            src="/Manpasand-Logo.png"
            alt=""
            width={94}
            height={84}
            className={`w-auto max-w-[60%] object-contain opacity-95 shrink-0 ${
              logoOnly
                ? 'h-6 sm:h-7'
                : cardTile
                  ? 'h-9 sm:h-11 md:h-12'
                  : 'h-10 sm:h-12 md:h-14'
            }`}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </picture>

        {showMeta && (
          <>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-hidden>
              <span className="h-px w-4 sm:w-6 bg-[#1A73A8]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A73A8]/55" />
              <span className="h-px w-4 sm:w-6 bg-[#1A73A8]/40" />
            </div>

            {categoryLabel ? (
              <p
                className={`font-semibold uppercase tracking-wide text-[#1A73A8] line-clamp-2 max-w-full px-1 leading-snug ${
                  cardTile ? 'text-[10px] sm:text-xs' : 'text-[11px] sm:text-xs'
                }`}
              >
                {categoryLabel}
              </p>
            ) : null}

            {showName ? (
              <p
                className={`font-semibold text-[#0D2B3A] leading-snug line-clamp-2 max-w-full px-1 ${
                  compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base md:text-lg'
                }`}
                style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}
              >
                {displayName}
              </p>
            ) : null}

            <p
              className={`font-semibold uppercase tracking-wide text-[#0D2B3A]/70 shrink-0 ${
                cardTile ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs'
              }`}
            >
              Premium Quality
            </p>
          </>
        )}
      </div>
    </div>
  );
}
