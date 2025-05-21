export const defaultLocale = 'en';
export const locales = ['en', 'es', 'pt'];

export type Locale = (typeof locales)[number];

// This is used to match the locale in the path
export function getLocaleFromPath(path: string): Locale | undefined {
  const locale = locales.find(
    (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)
  );
  return locale;
}

// Function to check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
