// This component is used to provide translations to the React components
'use client';

import { useRef, useEffect, type PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './client';
import { Locale } from './settings';

// Props to initialize the translations provider
interface TranslationsProviderProps extends PropsWithChildren {
  locale: Locale;
  resources: Record<Locale, Record<string, any>>;
}

export function TranslationsProvider({
  children,
  locale,
  resources,
}: TranslationsProviderProps) {
  const initialized = useRef(false);

  // Handle initialization and locale changes
  useEffect(() => {
    // Update i18next instance with current locale and resources
    if (resources && Object.keys(resources).length > 0) {
      Object.entries(resources).forEach(([lng, namespaces]) => {
        Object.entries(namespaces).forEach(([ns, resource]) => {
          i18next.addResourceBundle(lng, ns, resource, true, true);
        });
      });
    }

    if (locale && !initialized.current) {
      i18next.changeLanguage(locale);
      initialized.current = true;
    }
  }, [locale, resources]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
