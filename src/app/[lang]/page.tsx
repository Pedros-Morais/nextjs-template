'use client';

import { useTranslation } from 'react-i18next';
import { Locale } from '@/i18n/settings';
import Image from 'next/image';

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="py-12 px-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t('welcome')}
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://nextjs.org/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              {t('navigation.documentation')}
            </a>
            <a 
              href="https://github.com/your-username/nextlingo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-full border border-blue-400 hover:bg-blue-800 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="font-bold text-xl mb-2">{t('features.feature1.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t('features.feature1.description')}</p>
          </div>
          
          {/* Feature 2 */}
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-xl mb-2">{t('features.feature2.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t('features.feature2.description')}</p>
          </div>
          
          {/* Feature 3 */}
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-bold text-xl mb-2">{t('features.feature3.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t('features.feature3.description')}</p>
          </div>
        </div>
      </section>

      {/* Language Showcase */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('languages.title')}</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* English */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-24 bg-gradient-to-r from-red-500 to-blue-500 flex items-center justify-center">
                <span className="text-4xl">🇺🇸</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">English</h3>
                <p className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm">Hello World!</p>
              </div>
            </div>
            
            {/* Spanish */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-24 bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center">
                <span className="text-4xl">🇪🇸</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Español</h3>
                <p className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm">¡Hola Mundo!</p>
              </div>
            </div>
            
            {/* Portuguese */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-24 bg-gradient-to-r from-green-500 to-yellow-500 flex items-center justify-center">
                <span className="text-4xl">🇧🇷</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Português</h3>
                <p className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm">Olá Mundo!</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {t('languages.add_more')}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
          {t('cta.description')}
        </p>
        <a 
          href="https://github.com/your-username/nextlingo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-colors inline-block"
        >
          {t('cta.button')}
        </a>
      </section>
    </div>
  );
}
