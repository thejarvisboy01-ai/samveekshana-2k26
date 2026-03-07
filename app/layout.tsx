import type { Metadata } from 'next';
import { Inter, Cinzel, Cinzel_Decorative, Cormorant_Garamond, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600'] });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '700', '900'] });
const cinzelDecorative = Cinzel_Decorative({ subsets: ['latin'], variable: '--font-cinzel-decorative', weight: ['400', '700', '900'] });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['300', '600', '700'], style: ['normal', 'italic'] });
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-space-mono', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'SAMVEEKSHANA 2026 | The Next Revolution',
  description: 'Initiating the Next Revolution',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon.png',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${cormorant.variable} ${spaceMono.variable}`}>
      <body className="antialiased selection:bg-[#c9a84c] selection:text-black transition-colors duration-700">
        {children}
      </body>
    </html>
  );
}
