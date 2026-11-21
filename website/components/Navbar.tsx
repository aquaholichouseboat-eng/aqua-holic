'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const navItems = [
  { id: 'houseboats', label: 'Houseboats', count: 4, href: '#houseboats' },
  { id: 'activities', label: 'Activities', count: 4, href: '#activities' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('houseboats');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/houseboats')) {
        setActiveTab('houseboats');
        return;
      }
      if (window.location.pathname.startsWith('/activities')) {
        setActiveTab('activities');
        return;
      }
      if (window.location.pathname.startsWith('/gallery')) {
        setActiveTab('gallery');
        return;
      }
    }

    const handleScroll = () => {
      // Scrollspy to detect active section on homepage
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string, href: string) => {
    setActiveTab(id);
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 
        Single Unified Floating Pill Navbar matching User Reference:
        - White rounded capsule: `rounded-full bg-white`
        - Left: Brand title `AquaHolic` in theme blue color (`text-sky-600`)
        - Center: Navigation links with theme blue active pill
        - Right: Clean hamburger menu icon `☰` on mobile & CTA button on desktop
      */}
      <header className="fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 z-50 pointer-events-none flex justify-center">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4 w-full max-w-5xl">

          {/* Left: Brand Name in Theme Blue */}
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-poppins font-bold text-lg sm:text-xl text-sky-600 tracking-tight group-hover:text-sky-700 transition-colors">
              AquaHolic
            </span>
          </a>

          {/* Center: Desktop Navigation Links with Theme Blue Sliding Pill */}
          <nav className="hidden lg:flex items-center gap-1 font-poppins">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${isActive ? 'text-white' : 'text-slate-600 hover:text-sky-600'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-sky-500 rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.count && (
                    <span
                      className={`relative z-10 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action on Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 font-poppins transition-colors"
            >
              <Phone size={13} className="text-sky-600" />
              <span>+91 98765 43210</span>
            </a>
            <button
              onClick={() => scrollTo('houseboats', '#houseboats')}
              className="px-4 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-xs font-semibold font-poppins transition-all shadow-xs cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Right: Clean Hamburger Menu Icon (Mobile & Tablet) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 text-slate-800 hover:text-sky-600 transition-colors rounded-full cursor-pointer focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={22} className="text-sky-600" /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu right beneath the unified capsule */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 sm:top-18 left-3 right-3 sm:left-6 sm:right-6 z-50 bg-white/98 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-2xl p-4 sm:p-5 max-w-md mx-auto font-poppins"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id, item.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${isActive ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.count && (
                      <span
                        className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Aquaholic,%20I%20would%20like%20to%20enquire%20about%20houseboat%20booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] text-white text-sm font-semibold shadow-xs"
                >
                  <WhatsAppIcon size={18} className="text-white fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-slate-100 text-slate-800 text-sm font-semibold hover:text-sky-600 transition-colors"
                >
                  <Phone size={15} className="text-sky-600" />
                  <span>Call +91 98765 43210</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
