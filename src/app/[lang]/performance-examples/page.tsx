'use client';

import { useTranslation } from 'react-i18next';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { LazyLoad } from '@/components/ui/LazyLoad';
import { ScriptLoader } from '@/components/ui/ScriptLoader';
import { usePrefetch, useDeferredLoad } from '@/utils/performance';
import { useState, useEffect } from 'react';

const HeavyComponent = () => {
  const [data, setData] = useState<string[]>([]);
  
  useEffect(() => {
    setTimeout(() => {
      setData(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
    }, 1000);
  }, []);
  
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
      <h3 className="text-lg font-medium mb-2">Heavy Component Loaded</h3>
      <ul className="list-disc pl-5">
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default function PerformanceExamplesPage() {
  const { t } = useTranslation();
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const homeLink = usePrefetch('/');
  
  useDeferredLoad(() => {
    console.log('Non-critical resources loaded after page render');
  }, 2000);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Performance Optimization Examples</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Optimized Images</h2>
        <p className="mb-4">This image uses next/image with optimizations like lazy loading, blur placeholder, and responsive sizing:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1682687982501-1e58ab814714" 
            alt="Example optimized image"
            width={800}
            height={500}
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
          />
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Benefits:</h3>
            <ul className="list-disc pl-5">
              <li>Automatic WebP/AVIF conversion</li>
              <li>Responsive sizing with the sizes attribute</li>
              <li>Lazy loading for images below the fold</li>
              <li>Placeholder during loading</li>
              <li>Proper width and height to prevent layout shifts</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Lazy Component Loading</h2>
        <p className="mb-4">Click the button below to lazy-load a component:</p>
        
        <button
          onClick={() => setShowHeavyComponent(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Load Heavy Component
        </button>
        
        {showHeavyComponent && (
          <LazyLoad fallback={<div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse h-40"></div>}>
            <HeavyComponent />
          </LazyLoad>
        )}
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Route Prefetching</h2>
        <p className="mb-4">This link prefetches the home page when you hover over it:</p>
        
        <a 
          href="/"
          {...homeLink}
          className="text-blue-500 hover:underline"
        >
          Go to Home Page (prefetched on hover)
        </a>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Optimized Third-Party Scripts</h2>
        <p className="mb-4">This loads a third-party script with the lazyOnload strategy:</p>
        
        <ScriptLoader 
          src="https://cdn.example.com/example-script.js" 
          strategy="lazyOnload"
          id="example-script"
        />
        
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p>The script above would be loaded with lowest priority after everything else.</p>
          <p className="mt-2">You can also use:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><code>beforeInteractive</code> - For critical scripts needed before page becomes interactive</li>
            <li><code>afterInteractive</code> - Default, loads immediately after page becomes interactive</li>
            <li><code>lazyOnload</code> - Loads during idle time</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Font Optimization</h2>
        <p className="mb-4">This page uses Next.js font optimization with:</p>
        <ul className="list-disc pl-5">
          <li>Self-hosted Google fonts with <code>next/font</code></li>
          <li>Font display swap for better performance</li>
          <li>Preloaded fonts to eliminate layout shifts</li>
          <li>CSS variables for flexible usage throughout the app</li>
        </ul>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-sans">
            <p className="mb-2 font-medium">This text uses the Inter font (sans-serif)</p>
            <p>The quick brown fox jumps over the lazy dog.</p>
          </div>
          
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono">
            <p className="mb-2 font-medium">This text uses the Roboto Mono font (monospace)</p>
            <p>The quick brown fox jumps over the lazy dog.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
