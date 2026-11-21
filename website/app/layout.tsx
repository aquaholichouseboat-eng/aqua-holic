import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
