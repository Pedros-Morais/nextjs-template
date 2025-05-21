import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { defaultLocale, locales, getLocaleFromPath } from './i18n/settings';

function getLocaleFromHeaders(request: NextRequest): string {
  // Get the preferred language from the request headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator to get language preferences
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // Match the preferred language against our supported locales
  try {
    const matchedLocale = match(languages, locales, defaultLocale);
    return matchedLocale;
  } catch (error) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameLocale = getLocaleFromPath(pathname);
  
  // If there's already a locale in the path, do nothing
  if (pathnameLocale) {
    return NextResponse.next();
  }
  
  // Check if this is an asset, API route, or other excluded path
  const shouldNotRedirect = [
    '/api/',
    '/_next/',
    '/images/',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
  ].some(excluded => pathname.startsWith(excluded));
  
  if (shouldNotRedirect) {
    return NextResponse.next();
  }
  
  // Get locale from cookie or request headers
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  let locale = cookieLocale || getLocaleFromHeaders(request);
  
  // Make sure the locale is supported, otherwise use default
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  
  // Redirect to the locale-prefixed path
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
