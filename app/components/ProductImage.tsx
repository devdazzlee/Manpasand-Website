'use client';

import { useEffect, useRef, useState } from 'react';
import { isMissingProductImage } from '../../lib/utils/productImagePlaceholder';
import { optimizeCloudinaryUrl } from '../../lib/utils/cloudinary';

type ProductImageProps = {
  src?: string | null;
  name: string;
  category?: string | null;
  alt?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  optimizeWidth?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  /** Use tighter typography for small thumbs */
  compact?: boolean;
  /** Logo-only tile for tiny thumbs where name sits beside the image */
  logoOnly?: boolean;
  /** Skip name in placeholder when the card already shows it below */
  hideName?: boolean;
};

function ImageSkeleton({ pulse }: { pulse: boolean }) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 ${
        pulse ? 'animate-pulse' : ''
      }`}
      aria-hidden
    />
  );
}

/**
 * Real product photo when available. While the photo loads — or when it is
 * missing / fails — the image area shows a skeleton instead of a branded tile.
 */
export default function ProductImage({
  src,
  name,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover object-center',
  width = 480,
  height = 480,
  optimizeWidth,
  loading = 'lazy',
  priority = false,
  sizes,
}: ProductImageProps) {
  const missing = isMissingProductImage(src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  const showSkeleton = missing || failed;
  const remoteSrc =
    !missing && src
      ? optimizeCloudinaryUrl(src, { width: optimizeWidth ?? width })
      : '';

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src, name]);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [remoteSrc]);

  if (showSkeleton) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        role="img"
        aria-label={alt || name}
      >
        <ImageSkeleton pulse />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <ImageSkeleton pulse />}
      <img
        ref={ref}
        src={remoteSrc}
        alt={alt || name}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        sizes={sizes}
        className={`${imgClassName} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
