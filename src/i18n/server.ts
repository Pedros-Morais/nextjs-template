import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLocale, Locale, locales } from './settings';

async function loadTranslations(locale: Locale, namespace: string) {
  try {
    return await import(`../locales/${locale}/${namespace}.json`);
  } catch (error) {
    console.error(`Failed to load translations for ${locale}/${namespace}`, error);
    if (locale !== defaultLocale) {
      return await import(`../locales/${defaultLocale}/${namespace}.json`);
    }
    return {};
  }
}

export function getLanguageFromPath(path: string): Locale {
  const segments = path.split('/');
  const pathLocale = segments[1]; 
  
  if (pathLocale && locales.includes(pathLocale as Locale)) {
    return pathLocale as Locale;
  }
  
  return defaultLocale;
}

export async function initTranslations(locale: Locale = defaultLocale, namespaces: string[] = ['common']) {
  const i18nInstance = createInstance();
  
  const resources: Record<Locale, Record<string, any>> = {} as Record<Locale, Record<string, any>>;
  
  for (const lng of locales) {
    resources[lng] = {};
    for (const ns of namespaces) {
      resources[lng][ns] = await loadTranslations(lng, ns);
    }
  }
  
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
    });
  
  return {
    i18n: i18nInstance,
    locale,
    resources,
  };
}
