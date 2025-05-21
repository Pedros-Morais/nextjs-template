import type { Metadata } from "next";
import "./globals.css";
import { Locale, defaultLocale } from "@/i18n/settings";
import { initTranslations } from "@/i18n/server";
import { TranslationsProvider } from "@/i18n/TranslationsProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getAllFontVariables, inter, robotoMono } from "@/utils/fontLoader";

// Get combined font variables for optimal font loading
const fontVariables = getAllFontVariables();

export const metadata: Metadata = {
  title: "Next.js Multilanguage Template",
  description: "A minimal multilanguage Next.js starter template",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang?: string };
}>) {
  // Initialize translations on the server
  const lang = params.lang as Locale || defaultLocale;
  const { locale, resources } = await initTranslations(lang);
  
  // Only pass serializable data to client components
  const serializedResources = JSON.parse(JSON.stringify(resources));

  return (
    <html lang={locale}>
      <body
        className={`${fontVariables} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <TranslationsProvider
          locale={locale}
          resources={serializedResources}
        >
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center max-w-5xl mx-auto p-4">
                <h1 className="text-xl font-bold">Next.js Template</h1>
                <LanguageSwitcher />
              </div>
            </header>
            <main className="flex-grow">
              <div className="max-w-5xl mx-auto">
                {children}
              </div>
            </main>
            <footer className="border-t border-gray-200 dark:border-gray-800 py-4">
              <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Next.js Multilanguage Template
              </div>
            </footer>
          </div>
        </TranslationsProvider>
      </body>
    </html>
  );
}
