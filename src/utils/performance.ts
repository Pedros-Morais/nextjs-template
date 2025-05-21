import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

/**
 * Hook to prefetch routes when hovering over links
 * @param href The route to prefetch
 * @param options Prefetch options
 * @returns An object with onHover and onClick handlers
 */
export function usePrefetch(href: string) {
  const router = useRouter();

  const handleHover = useCallback(() => {
    router.prefetch(href);
  }, [router, href]);

  const handleClick = useCallback(() => {
    router.push(href);
  }, [router, href]);

  return {
    onMouseEnter: handleHover,
    onClick: handleClick,
  };
}

/**
 * Hook to delay loading of non-critical resources
 * @param callback Function to call after delay
 * @param delay Delay in ms before executing (default: 1000)
 */
export function useDeferredLoad(callback: () => void, delay = 1000) {
  useEffect(() => {
    // Check if requestIdleCallback is available
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(() => {
        setTimeout(callback, delay);
      });
      
      return () => {
        (window as any).cancelIdleCallback(id);
      };
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timeoutId = setTimeout(callback, delay);
      
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [callback, delay]);
}

/**
 * Utility to split code into critical and non-critical chunks
 * @param criticalFn Function containing critical operations
 * @param nonCriticalFn Function containing non-critical operations
 */
export function splitCodeExecution(
  criticalFn: () => void,
  nonCriticalFn: () => void
) {
  // Execute critical code immediately
  criticalFn();
  
  // Defer non-critical code
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        nonCriticalFn();
      });
    } else {
      setTimeout(nonCriticalFn, 100);
    }
  }
}
