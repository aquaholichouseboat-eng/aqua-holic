'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Shield, Phone, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { urlForImage } from '@/lib/sanity/image';

interface HeroProps {
  data?: {
    heroHeading?: string;
    heroHeadingHighlight?: string;
    heroSubtitle?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heroImage?: any;
    heroFeatures?: string[];
    heroWhatsAppText?: string;
    heroWhatsAppNumber?: string;
    heroCallText?: string;
    heroCallNumber?: string;
    statsBar?: Array<{ label: string; desc: string; icon?: string }>;
  };
}

export default function Hero({ data }: HeroProps) {
  const heading = data?.heroHeading || 'Experience the Beauty of';
  const headingHighlight = data?.heroHeadingHighlight || 'Alleppey Backwaters';
  const subtitle =
    data?.heroSubtitle ||
    'AquaHolic luxury Kerala houseboats (private & sharing), day cruises, and romantic shikaras. Transparent pricing, chef-prepared meals, and instant booking.';
  const heroImgSrc =
    urlForImage(data?.heroImage) ||
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85&fit=crop';
  const features = data?.heroFeatures && data.heroFeatures.length > 0
    ? data.heroFeatures
    : ['All Meals Included', 'Private & Sharing AC', 'Instant Confirmation'];
  const waNumber = data?.heroWhatsAppNumber || '919876543210';
  const callText = data?.heroCallText || 'Call +91 98765 43210';
  const callNumber = data?.heroCallNumber || '+919876543210';

  return (
    <section id="home" className="relative bg-white pt-20 sm:pt-24 md:pt-24">
      {/* 
        Hero Container with Visible Small Curved Shape on Top Two Sides:
        - Starts directly below the fixed navbar so the top curve is 100% visible
        - Small smooth 36px (mobile) / 60px (desktop) curve on top-left & top-right
        - Straight vertical sides down to the bottom baseline
        - 100% straight flat horizontal baseline at the bottom
      */}
      <div className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[600px] w-full flex items-center justify-center pt-10 pb-10 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16 overflow-hidden">
        {/* Background Image */}
        <Image
          src={heroImgSrc}
          alt="Kerala backwater houseboat"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Subtle dark overlay for natural photo clarity and sharp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />

        {/* 
          Curved Shape on Top Two Sides + Left & Right Side Border:
          - Deep smooth curved shoulders (92px mobile, 160px desktop)
          - Continuous border running down the left and right sides
          - Flat straight baseline at the bottom
        */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Mobile Curve & Left/Right Side Border SVG */}
          <svg
            viewBox="0 0 390 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full block md:hidden"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,0 L 390,0 L 390,500 L 0,500 Z M 0,500 L 0,92 Q 0,0 92,0 L 298,0 Q 390,0 390,92 L 390,500 Z"
              fill="#ffffff"
              fillRule="evenodd"
            />
            {/* Left border, top curves, and right border */}
            <path
              d="M 1.5,500 L 1.5,92 Q 1.5,1.5 92,1.5 L 298,1.5 Q 388.5,1.5 388.5,92 L 388.5,500"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Desktop Curve & Left/Right Side Border SVG */}
          <svg
            viewBox="0 0 1440 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full hidden md:block"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,0 L 1440,0 L 1440,640 L 0,640 Z M 0,640 L 0,160 Q 0,0 160,0 L 1280,0 Q 1440,0 1440,160 L 1440,640 Z"
              fill="#ffffff"
              fillRule="evenodd"
            />
            {/* Left border, top curves, and right border */}
            <path
              d="M 2,640 L 2,160 Q 2,2 160,2 L 1280,2 Q 1438,2 1438,160 L 1438,640"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Hero center content - aligned with balanced spacing inside the two curved sides */}
        <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 drop-shadow-md max-w-3xl mx-auto">
              {heading}<br />
              <span className="text-sky-300">
                {headingHighlight}
              </span>
            </h1>

            <p className="text-white/90 text-xs sm:text-base md:text-lg font-poppins max-w-md sm:max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed drop-shadow-sm">
              {subtitle}
            </p>

            {/* Feature bullets */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-white text-xs sm:text-sm font-poppins mb-6 sm:mb-8">
              {features.map((feat, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 bg-black/25 sm:bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full"
                >
                  <CheckCircle2 size={13} className="text-emerald-400" /> {feat}
                </span>
              ))}
            </div>

            {/* Two Action Buttons: Fixed at the bottom of the Hero section (Left & Right side) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full max-w-sm sm:max-w-md mx-auto">
              {/* Left Side: WhatsApp Button */}
              <a
                href={`https://wa.me/${waNumber}?text=Hello%20AquaHolic,%20I%20would%20like%20to%20enquire%20about%20houseboat%20booking`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 font-poppins cursor-pointer"
              >
                <WhatsAppIcon size={17} className="text-white fill-white flex-shrink-0" />
                <span className="truncate hidden sm:inline">Chat on WhatsApp</span>
                <span className="truncate sm:hidden">WhatsApp</span>
              </a>

              {/* Right Side: Call Button */}
              <a
                href={`tel:${callNumber}`}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 bg-white/95 hover:bg-white text-slate-800 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all backdrop-blur-sm hover:-translate-y-0.5 font-poppins shadow-md cursor-pointer"
              >
                <Phone size={15} className="text-sky-600 flex-shrink-0" />
                <span className="truncate hidden sm:inline">{callText}</span>
                <span className="truncate sm:hidden">Call Now</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 
        Bottom of Hero: Glassmorphism Stats & Guarantee Bar
      */}
      <div className="bg-slate-50/70 backdrop-blur-lg border-y border-slate-200/70 shadow-sm relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { icon: Shield, label: 'Best Price Guarantee', desc: 'Direct owner rates' },
            { icon: Star, label: '4.9 / 5 Rating', desc: 'From 500+ happy guests' },
            { icon: CheckCircle2, label: 'Instant Booking', desc: 'Confirm in 1 minute' },
            { icon: Shield, label: '100% Safe & Certified', desc: 'Gov. safety certified' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white/75 backdrop-blur-xl rounded-2xl border border-white/90 shadow-sm hover:shadow-md hover:bg-white/95 transition-all duration-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-sky-100">
                <Icon size={16} className="text-sky-600 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-slate-800 text-[11px] sm:text-xs font-semibold font-poppins leading-tight truncate">{label}</p>
                <p className="text-slate-500 text-[10px] sm:text-[11px] font-poppins truncate">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
