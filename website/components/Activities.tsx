'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { activities, Activity } from '@/data/activities';
import { urlForImage } from '@/lib/sanity/image';

interface ActivitiesProps {
  items?: Activity[];
  title?: string;
  highlight?: string;
  subtitle?: string;
}

interface ActivityCardConfig {
  id: number | string;
  slug: string;
  title: string;
  tag: string;
  duration: string;
  capacity: string;
  price: number;
  unit: string;
  image: string;
  desc: string;
  glowColor: string;
  icon: string;
}

const DEFAULT_ACTIVITY_METAS = [
  { glowColor: '#38bdf8', icon: '⚡' },
  { glowColor: '#34d399', icon: '🛶' },
  { glowColor: '#fbbf24', icon: '⛵' },
  { glowColor: '#818cf8', icon: '🌊' },
];

export default function Activities({
  items,
  title,
  highlight,
  subtitle,
}: ActivitiesProps) {
  // Guarantee exactly 4 activity items with reliable fallbacks
  let rawActivities = items && items.length > 0 ? [...items] : [...activities];
  if (rawActivities.length < 4) {
    for (const fallback of activities) {
      if (!rawActivities.some((a) => a.slug === fallback.slug || a.id === fallback.id)) {
        rawActivities.push(fallback);
      }
      if (rawActivities.length >= 4) break;
    }
  }
  rawActivities = rawActivities.slice(0, 4);

  // Map to rich card configs
  const cards: ActivityCardConfig[] = rawActivities.map((act, i) => {
    const fallbackAct = activities.find((a) => a.slug === act.slug || a.id === act.id);
    const fallbackImg =
      fallbackAct?.image ||
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop';
    const imgSrc =
      urlForImage(act.image) ||
      (typeof act.image === 'string' ? act.image : fallbackImg);

    return {
      id: act.id || act.slug || i,
      slug: act.slug || fallbackAct?.slug || 'speed-boat',
      title: (act.title || fallbackAct?.title || 'Activity').toUpperCase(),
      tag: act.tag || fallbackAct?.tag || 'Curated Experience',
      duration: act.duration || fallbackAct?.duration || '1–2 Hours',
      capacity: act.capacity || fallbackAct?.capacity || 'Up to 6 Persons',
      price: act.price || fallbackAct?.price || 1500,
      unit: act.unit || fallbackAct?.unit || '/ boat',
      image: imgSrc,
      desc:
        act.desc ||
        fallbackAct?.desc ||
        'Experience the scenic calm and natural backwater charm of Alleppey.',
      glowColor: DEFAULT_ACTIVITY_METAS[i % 4].glowColor,
      icon: DEFAULT_ACTIVITY_METAS[i % 4].icon,
    };
  });

  const sectionTitle = title || 'Backwater';
  const sectionHighlight = highlight || 'Activities';
  const sectionSubtitle =
    subtitle ||
    "Experience thrilling speed boats, eco kayaking, scenic shikaras, and open boats across Kerala's most beautiful backwaters.";

  const total = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-jump loop every 3.8s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextCard();
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, nextCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  // Subtle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseParallax({
      x: Math.max(-1, Math.min(1, nx)) * 2.5,
      y: Math.max(-1, Math.min(1, ny)) * 2.5,
    });
  };

  const handleMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const activeCard = cards[activeIndex];

  // Slot stacking configurations for the 4 cards:
  // Slot 0: Front active card (only one full card in view)
  // Slot 1: Layer behind 1 (tilted 9 deg, offset up-left, darker)
  // Slot 2: Layer behind 2 (tilted 12 deg, offset further up-left, semi-transparent)
  // Slot 3: Waiting in back (invisible)
  const getSlotStyle = (slot: number) => {
    switch (slot) {
      case 0:
        return {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1.0,
          opacity: 1.0,
          zIndex: 40,
          filter: 'brightness(1)',
          pointerEvents: 'auto' as const,
        };
      case 1:
        return {
          x: -26,
          y: -18,
          rotate: 9,
          scale: 0.94,
          opacity: 0.65,
          zIndex: 30,
          filter: 'brightness(0.65)',
          pointerEvents: 'none' as const,
        };
      case 2:
        return {
          x: -48,
          y: -34,
          rotate: 12,
          scale: 0.88,
          opacity: 0.38,
          zIndex: 20,
          filter: 'brightness(0.4)',
          pointerEvents: 'none' as const,
        };
      default:
        return {
          x: -68,
          y: -50,
          rotate: 15,
          scale: 0.82,
          opacity: 0.0,
          zIndex: 10,
          filter: 'brightness(0.2)',
          pointerEvents: 'none' as const,
        };
    }
  };

  return (
    <section
      id="activities"
      className="relative py-14 sm:py-20 md:py-24 overflow-hidden border-t border-slate-200/80 select-none"
      style={{ background: '#f6f6f4' }}
    >
      {/* Dynamic Colored Ambient Radial Glow (Smoothly cross-fades per card) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] md:w-[780px] h-[480px] sm:h-[650px] md:h-[780px] rounded-full blur-[110px] pointer-events-none transition-colors duration-700 ease-out"
        style={{
          backgroundColor: activeCard.glowColor,
          opacity: 0.32,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-slate-200/90 rounded-full text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs backdrop-blur-md">
            <Sparkles size={14} className="text-sky-600 animate-pulse" />
            <span>Alleppey Experiences • 4 Curated Rides</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-[1.2]">
            {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
          </h2>
          <p className="text-slate-600 text-[15px] sm:text-base mt-2.5 max-w-xl mx-auto leading-[1.7]">
            {sectionSubtitle}
          </p>
        </div>

        {/* Stacked Glass Card Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-xl mx-auto h-[530px] sm:h-[590px] md:h-[630px] flex items-center justify-center"
        >
          {/* Subtle Parallax Tilt Container */}
          <motion.div
            animate={{
              rotateY: mouseParallax.x,
              rotateX: -mouseParallax.y,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-[300px] sm:w-[350px] md:w-[380px] h-[450px] sm:h-[500px] md:h-[530px] flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The 4 Stacked Cards */}
            {cards.map((card, i) => {
              // Relative slot: 0 = front (only this one in full view), 1 = behind 1, 2 = behind 2, 3 = queue
              const slot = (i - activeIndex + total) % total;
              const slotStyle = getSlotStyle(slot);
              const isFront = slot === 0;

              return (
                <motion.div
                  key={card.id}
                  initial={false}
                  animate={{
                    x: slotStyle.x,
                    y: slotStyle.y,
                    rotate: slotStyle.rotate,
                    scale: slotStyle.scale,
                    opacity: slotStyle.opacity,
                    zIndex: slotStyle.zIndex,
                    filter: slotStyle.filter,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 28,
                    mass: 0.85,
                  }}
                  className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[34px] overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.38)] bg-gradient-to-b from-[#1c212a] via-[#12151c] to-[#0c0e12] text-white"
                  style={{
                    pointerEvents: slotStyle.pointerEvents,
                    boxShadow: isFront
                      ? `0 30px 70px -10px ${card.glowColor}40, 0 20px 40px -15px rgba(0,0,0,0.5)`
                      : '0 20px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="flex flex-col h-full p-4 sm:p-5 justify-between">
                    {/* Top Bar: Icon top-left & Circular Action Button top-right */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">
                          {card.icon}
                        </span>
                        <span className="text-[11px] font-semibold text-white/60 tracking-widest uppercase">
                          Experience 0{i + 1}
                        </span>
                      </div>

                      <Link
                        href={`/activities/${card.slug}`}
                        aria-label={`Open ${card.title} details`}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-108 active:scale-95"
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>

                    {/* Centered Uppercase Title */}
                    <div className="text-center my-1">
                      <h3 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl text-white tracking-wide uppercase line-clamp-1">
                        {card.title}
                      </h3>
                      <div
                        className="w-10 h-0.5 mx-auto mt-1.5 rounded-full"
                        style={{ backgroundColor: card.glowColor }}
                      />
                    </div>

                    {/* Rounded-Corner Image with Pill Tag */}
                    <div className="relative w-full h-[200px] sm:h-[235px] md:h-[250px] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-inner">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-106"
                        sizes="(max-width: 640px) 300px, (max-width: 1024px) 350px, 380px"
                        priority={isFront}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                      {/* Pill Tag */}
                      <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5 shadow-md">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: card.glowColor }}
                        />
                        <span>{card.tag}</span>
                      </div>

                      {/* Duration Tag Top-Left */}
                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-300 border border-white/15">
                        ⏱️ {card.duration}
                      </div>
                    </div>

                    {/* Description & Two-Column Metrics */}
                    <div className="space-y-2.5 mt-2">
                      <p className="text-white/75 text-xs sm:text-[13px] text-center leading-relaxed line-clamp-2 px-1">
                        {card.desc}
                      </p>

                      {/* Two-Column Stats Box */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {card.capacity}
                          </span>
                          <span className="text-[10px] text-white/50 uppercase tracking-wider">
                            Capacity
                          </span>
                        </div>

                        <div className="flex flex-col border-l border-white/10">
                          <span className="text-xs sm:text-sm font-bold text-sky-400 font-playfair">
                            ₹{card.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-white/50 uppercase tracking-wider">
                            Starts From {card.unit}
                          </span>
                        </div>
                      </div>

                      {/* CTA Action Button on Front Card */}
                      {isFront && (
                        <Link
                          href={`/activities/${card.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-600/30 transition-all hover:scale-101 active:scale-98"
                        >
                          <span>Explore Experience</span>
                          <span className="text-base leading-none">→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Faded Blurred Mirror Reflection Below Stack */}
            <div
              className="absolute -bottom-28 sm:-bottom-32 left-0 right-0 h-[100px] sm:h-[120px] rounded-[30px] overflow-hidden opacity-20 pointer-events-none"
              style={{
                transform: 'scaleY(-1) rotateX(180deg)',
                filter: 'blur(3px)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                WebkitMaskImage:
                  'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))',
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#1c212a] to-transparent p-4 flex flex-col justify-end">
                <div className="text-center font-playfair font-bold text-sm text-white/50 uppercase">
                  {activeCard.title}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Interactive Controls (Next/Prev Buttons & Jumping Pills) */}
        <div className="flex flex-col items-center gap-3.5 mt-8 sm:mt-10">
          <div className="flex items-center gap-3">
            {/* Previous Jump Button */}
            <button
              onClick={prevCard}
              aria-label="Previous activity card"
              className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center shadow-md border border-slate-200/90 transition-all hover:scale-108 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>

            {/* Pill Tabs for Instant Card Jumping */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-full border border-slate-200/90 shadow-sm">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-slate-900 text-white shadow-sm scale-102'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      activeIndex === idx ? 'bg-white' : 'bg-slate-400'
                    }`}
                  />
                  <span className="hidden sm:inline">{card.title.split(' ')[0]}</span>
                  <span className="sm:hidden font-mono">0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Next Jump Button */}
            <button
              onClick={nextCard}
              aria-label="Next activity card"
              className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center shadow-md border border-slate-200/90 transition-all hover:scale-108 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={20} className="text-slate-700" />
            </button>
          </div>

          <span className="text-xs text-slate-600 font-medium">
            Click cards or arrows to jump to next experience • Auto-jumps every 3.8s
          </span>
        </div>
      </div>
    </section>
  );
}
