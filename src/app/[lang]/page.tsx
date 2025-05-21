'use client';

import { useTranslation } from 'react-i18next';
import { Locale } from '@/i18n/settings';

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">
        {t('hello')} 👋
      </h1>
      <p className="text-xl max-w-md mb-8 text-gray-600 dark:text-gray-300">
        {t('welcome_message')}
      </p>
      <div className="grid grid-cols-3 gap-4 text-center w-full max-w-md">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <p className="font-mono text-sm">Hello World!</p>
          <p className="text-xs text-gray-500 mt-2">English</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <p className="font-mono text-sm">¡Hola Mundo!</p>
          <p className="text-xs text-gray-500 mt-2">Español</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <p className="font-mono text-sm">Olá Mundo!</p>
          <p className="text-xs text-gray-500 mt-2">Português</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        {t('start_editing')} <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">src/app/[lang]/page.tsx</code>
      </p>
    </div>
  );
}
