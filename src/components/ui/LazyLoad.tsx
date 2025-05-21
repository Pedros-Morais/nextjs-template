'use client';

import React, { Suspense, lazy, ComponentType, LazyExoticComponent } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback || <DefaultLoadingFallback />}>
      {children}
    </Suspense>
  );
}

function DefaultLoadingFallback() {
  return (
    <div className="w-full h-full min-h-[100px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100" />
    </div>
  );
}

// Helper function to create lazy-loaded components
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
): {
  Component: LazyExoticComponent<T>;
  withSuspense: (props: React.ComponentProps<T>) => React.ReactElement;
} {
  const Component = lazy(importFn);
  
  const withSuspense = (props: React.ComponentProps<T>) => (
    <LazyLoad fallback={fallback}>
      <Component {...props} />
    </LazyLoad>
  );

  return { Component, withSuspense };
}
