import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const isProduction = process.env.NODE_ENV === 'production';
const analyzeBundles = process.env.ANALYZE === 'true';

// Create the bundle analyzer wrapper
const withBundleAnalyzerWrapper = analyzeBundles ? withBundleAnalyzer({
  enabled: true,
  openAnalyzer: true,
}) : (config: NextConfig) => config;

// Base configuration
let nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false, // Disable source maps in production for better performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Enable modern optimizations
    optimizeCss: true,
    optimisticClientCache: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  compiler: {
    // Remove console.log in production
    removeConsole: isProduction ? {
      exclude: ['error', 'warn', 'info'],
    } : false,
  },
  env: {
    // Expose build time environment variables for client
    APP_ENV: process.env.NODE_ENV || 'development',
  },
};

// Apply any wrappers
export default withBundleAnalyzerWrapper(nextConfig);
