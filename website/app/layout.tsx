import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AquaHolic – Alleppey Houseboats & Backwater Cruise Agency',
  description:
    'AquaHolic is your trusted Kerala houseboat booking agency in Alleppey. Overnight stays, day cruises, 1–4 bedroom houseboats, shikaras & speedboats. Direct pricing, instant confirmation.',
  keywords: ['AquaHolic houseboat', 'Kerala houseboat booking', 'Alleppey houseboat price', 'backwater cruise Kerala', 'overnight houseboat Alleppey'],
  openGraph: {
    title: 'AquaHolic – Alleppey Houseboats & Backwater Cruise Agency',
    description: 'Direct boat pricing, certified crew, transparent rates. Instant confirmation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
