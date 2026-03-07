import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Space_Mono } from 'next/font/google';
import './globals.css';

// Inter is already bundled by most OSes / browsers as the system-ui font.
// Loading it from Google only delays first paint on mobile — skip it.

// Cinzel: used for headings only — subset to latin, preload the 400 weight
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
  display: 'swap',
  preload: true,
});

// Cormorant: editorial body text — italic 300 is most used, load that first
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false, // secondary font — don't block parse
});

// Space Mono: terminal / monospace labels
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'SAMVEEKSHANA 2026 | The Next Revolution',
  description: 'A National Level Tech Fest — Initiating the Next Revolution at S. G. Balekundri Institute of Technology, Belagavi. March 11 & 12, 2026.',
  keywords: ['Samveekshana', 'tech fest', 'SGBIT', 'Belagavi', '2026', 'national level'],
  openGraph: {
    title: 'SAMVEEKSHANA 2026',
    description: 'Initiating the Next Revolution — National Level Tech Fest',
    url: 'https://samveekshana.tech',
    siteName: 'Samveekshana 2026',
    locale: 'en_IN',
    type: 'website',
  },
  icons: [
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon.png' },
  ],
  // Prevents zooming on input focus (iOS) which causes layout jank
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased selection:bg-[#c9a84c] selection:text-black">
        {children}
      </body>
    </html>
  );
}
