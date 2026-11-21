'use client';

import WhatsAppIcon from './WhatsAppIcon';

const socials = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919876543210?text=Hello%20Aquaholic,%20I%20would%20like%20to%20enquire%20about%20houseboat%20booking',
    svg: <WhatsAppIcon size={15} className="text-[#25D366] fill-[#25D366] group-hover:text-white group-hover:fill-white" />,
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

interface FooterProps {
  settings?: {
    siteName?: string;
    footerCopyright?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const brandName = settings?.siteName || 'AquaHolic';
  const copyright = settings?.footerCopyright || '© 2026 AquaHolic. All rights reserved. Alleppey, Kerala.';

  return (
    <footer id="footer" className="w-full bg-slate-900 text-white border-t border-slate-800 font-poppins h-[100px] flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 py-2 md:py-0">
        {/* Brand & Mobile Socials Row */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-4">
          <div className="flex items-center gap-2">
            <span className="font-poppins text-white font-bold text-sm sm:text-base md:text-lg tracking-tight">
              {brandName}
            </span>
          </div>

          {/* Socials on mobile */}
          <div className="flex md:hidden items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-6 h-6 rounded-md bg-slate-800 hover:bg-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav aria-label="Footer Navigation" className="flex items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-400 font-medium">
          <a href="/#houseboats" className="hover:text-sky-400 transition-colors">
            Houseboats
          </a>
          <a href="/#activities" className="hover:text-sky-400 transition-colors">
            Activities
          </a>
          <a href="/#gallery" className="hover:text-sky-400 transition-colors">
            Gallery
          </a>
          <a href="/#reviews" className="hover:text-sky-400 transition-colors">
            Reviews
          </a>
          <a href="/#contact" className="hover:text-sky-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Desktop Socials & Copyright */}
        <div className="flex items-center gap-3 text-center md:text-right">
          <div className="hidden md:flex items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-7 h-7 rounded-md bg-slate-800 hover:bg-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                {s.svg}
              </a>
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 hidden sm:inline">
            {copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
