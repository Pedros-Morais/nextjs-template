import { NextFont } from 'next/dist/compiled/@next/font';
import { Inter, Roboto_Mono } from 'next/font/google';

// Define the Inter variable font for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

// Define the Roboto Mono font for code and monospace content
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto-mono',
});

// Utility function to get the className for multiple fonts
export function combineFont(...fonts: NextFont[]): string {
  return fonts.map((font) => font.className).join(' ');
}

// Get the CSS variables for multiple fonts
export function getFontVariables(...fonts: NextFont[]): string {
  return fonts.map((font) => font.variable).join(' ');
}

// Use this function in the RootLayout component to add all font variables
export function getAllFontVariables(): string {
  return getFontVariables(inter, robotoMono);
}
