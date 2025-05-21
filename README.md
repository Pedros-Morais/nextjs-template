# Next.js Multilanguage Template

![Next.js Version](https://img.shields.io/badge/Next.js-15.3.2-blue)
![React Version](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![i18n](https://img.shields.io/badge/i18n-Built--in-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue)

A production-ready, feature-rich Next.js template designed to kickstart your multilingual web applications. This template provides a solid foundation with industry best practices for performance, internationalization, and developer experience.

## ✨ Features

### 🌐 Built-in Internationalization
- Complete i18n setup with Next.js App Router
- Language switching with cookie persistence
- Automatic language detection
- Typed translations with TypeScript support

### 🚀 Performance Optimizations
- Optimized image loading with blur placeholders and responsive sizing
- Component lazy loading with Suspense boundaries
- Font optimization with preloading and swap strategies
- Optimized script loading for third-party scripts
- Route prefetching for faster navigation
- Deferred loading of non-critical resources

### 📝 Form Validation
- Zod schema validation for type-safe forms
- Integration with React Hook Form
- Server-side validation utilities
- Type inference from schemas to TypeScript types

### 🎨 Modern UI Foundation
- TailwindCSS setup with dark mode support
- Responsive design out of the box
- Clean component architecture
- Optimized for accessibility

### 🧰 Developer Experience
- TypeScript configured for maximum type safety
- ESLint and Prettier for code quality
- Husky for pre-commit hooks
- Ready-to-use directory structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nextjs-template.git my-project
cd my-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📋 Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── [lang]/     # Language-specific routes
│   │   ├── api/        # API routes
│   │   └── layout.tsx  # Root layout
│   ├── components/     # Reusable components
│   │   ├── forms/      # Form components
│   │   └── ui/         # UI components
│   ├── i18n/           # Internationalization setup
│   ├── lib/            # Utility libraries
│   │   └── validations/# Zod schemas
│   ├── locales/        # Translation files
│   └── utils/          # Utility functions
├── .eslintrc.js        # ESLint configuration
├── next.config.ts      # Next.js configuration
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🌐 Internationalization

This template includes a complete i18n setup for multiple languages:

- Current supported languages: English (en), Spanish (es), Portuguese (pt)
- Add new languages by creating new folders in `src/locales/`
- Use the language switcher component to change languages

Example usage in components:

```tsx
'use client'

import { useTranslation } from 'react-i18next'

export function MyComponent() {
  const { t } = useTranslation()
  
  return <h1>{t('welcome')}</h1>
}
```

## ⚡ Performance Examples

Check out the performance examples page at `/[lang]/performance-examples` to see demonstrations of:

1. Optimized image loading
2. Component lazy loading
3. Route prefetching
4. Optimized script loading
5. Font optimization

## 📝 Form Validation

The template includes Zod for form validation. See examples at `/[lang]/form-examples`.

Usage example:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact'

const form = useForm<ContactFormValues>({
  resolver: zodResolver(contactFormSchema),
  defaultValues: {
    name: '',
    email: '',
  },
})
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Bundle Analysis

To analyze the bundle size, run:

```bash
ANALYZE=true npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form Documentation](https://react-hook-form.com/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Developed with ❤️ using Next.js 15.3.2 and React 19
