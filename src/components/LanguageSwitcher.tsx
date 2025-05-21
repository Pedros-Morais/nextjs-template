'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { locales } from '@/i18n/settings';
import { useEffect, useState } from 'react';

type LanguageOption = {
  value: string;
  label: string;
  flag: string;
};

const languageOptions: LanguageOption[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'pt', label: 'Português', flag: '🇧🇷' }
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Set initial locale state after mount to avoid hydration mismatch
  useEffect(() => {
    setCurrentLocale(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      if (newLocale === currentLocale) return;

      // Create a date 1 year from now for the cookie expiration
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);

      // Set the locale cookie
      document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

      // Determine the new path
      let newPath = pathname;
      
      // Remove current locale from path if it exists
      locales.forEach(locale => {
        if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
          newPath = pathname.replace(`/${locale}`, '');
          if (newPath === '') newPath = '/';
        }
      });

      // Add new locale to the path
      if (newPath === '/') {
        newPath = `/${newLocale}`;
      } else {
        newPath = `/${newLocale}${newPath}`;
      }

      // Update i18n language on the client side
      i18n.changeLanguage(newLocale);
      
      // Close dropdown
      setIsOpen(false);
      
      // Navigate to the new path
      router.push(newPath);
      router.refresh();
    },
    [currentLocale, i18n, pathname, router]
  );

  if (!currentLocale) return null; // Avoid rendering before client-side hydration

  const currentLanguage = languageOptions.find(option => option.value === currentLocale) || languageOptions[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 dark:bg-gray-800/30 hover:bg-white/30 dark:hover:bg-gray-800/50 backdrop-blur-sm transition-colors border border-gray-200/30 dark:border-gray-700/30 text-sm font-medium"
        aria-label={t('language_selector')}
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 border border-gray-100 dark:border-gray-700">
          <ul>
            {languageOptions.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleLanguageChange(option.value)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${option.value === currentLocale ? 'bg-blue-50 dark:bg-blue-900/20 font-medium' : ''}`}
                >
                  <span className="text-xl">{option.flag}</span>
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
