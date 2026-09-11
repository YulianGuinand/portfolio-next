'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  showSpinner?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  wrapperClassName = '',
  wrapperStyle,
  showSpinner = false,
  className = '',
  style,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const isPriority = Boolean(priority || props.loading === 'eager');
  const [isLoading, setIsLoading] = useState(!isPriority);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`optimized-image-wrapper ${isLoading ? 'is-loading' : 'is-loaded'} ${wrapperClassName}`}
      style={wrapperStyle}
    >
      {/* Loader Shimmer Skeleton : uniquement pour les images chargées en différé (hors LCP) */}
      {isLoading && (
        <div className="image-skeleton" aria-hidden="true">
          {showSpinner && <div className="image-spinner" />}
        </div>
      )}

      {/* Image optimisée avec transition fluide (instantanée pour l'élément LCP prioritaire) */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          priority={priority}
          className={`optimized-image ${isLoading ? 'img-loading' : 'img-loaded'} ${className}`}
          style={{
            ...style,
            transition: isPriority
              ? 'none'
              : 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      )}

      {hasError && (
        <div className="image-error-fallback" aria-label={alt}>
          <span>Image non disponible</span>
        </div>
      )}
    </div>
  );
}
