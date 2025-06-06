import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { defaultLocale, locales } from './settings';

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common'],
    react: {
      useSuspense: false,
    },
  });

export default i18next;
