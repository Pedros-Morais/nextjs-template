'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

interface ScriptLoaderProps {
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  id?: string;
  onLoad?: () => void;
  onError?: () => void;
  onReady?: () => void;
  preload?: boolean;
}

/**
 * Component for optimized loading of third-party scripts
 * Uses Next.js Script component with performance optimizations
 */
export function ScriptLoader({
  src,
  strategy = 'lazyOnload',
  id,
  onLoad,
  onError,
  onReady,
  preload = false,
}: ScriptLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (preload) {
      // Prefetch the script using rel="preload"
      const linkEl = document.createElement('link');
      linkEl.rel = 'preload';
      linkEl.as = 'script';
      linkEl.href = src;
      document.head.appendChild(linkEl);
      
      return () => {
        document.head.removeChild(linkEl);
      };
    }
  }, [src, preload]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <Script
      src={src}
      strategy={strategy}
      id={id}
      onLoad={handleLoad}
      onError={onError}
      onReady={onReady}
    />
  );
}
