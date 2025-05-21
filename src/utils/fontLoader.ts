import { NextFont } from 'next/dist/compiled/@next/font';

interface FontWithVariable extends NextFont {
  variable: string;
}
import { Inter, Roboto_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto-mono',
});

export function combineFont(...fonts: NextFont[]): string {
  return fonts.map((font) => font.className).join(' ');
}
export function getFontVariables(...fonts: FontWithVariable[]): string {
  return fonts.map((font) => font.variable).join(' ');
}

export function getAllFontVariables(): string {
  return getFontVariables(inter, robotoMono);
}
