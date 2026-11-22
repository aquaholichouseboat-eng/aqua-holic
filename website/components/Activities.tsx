'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { activities, Activity } from '@/data/activities';
import { urlForImage } from '@/lib/sanity/image';

interface ActivitiesProps {
  items?: Activity[];
  title?: string;
  highlight?: string;
  subtitle?: string;
}

interface ActivityCardData {
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

const DEFAULT_METAS = [
  { glowColor: '#38bdf8', icon: '⚡' },
  { glowColor: '#34d399', icon: '🛶' },
  { glowColor: '#fbbf24', icon: '⛵' },
  { glowColor: '#818cf8', icon: '🌊' },
];

interface GlassStackCardProps {
  card: ActivityCardData;
  index: number;
  progress: MotionValue<number>;
  isFront: boolean;
}

function GlassStackCard({ card, index, progress, isFront }: GlassStackCardProps) {
  // Continuous scroll transforms for the 4 card slots
  // Card 0 (Front initially)
  const x0 = useTransform(progress, [0, 0.18, 0.3], [0, 0, -95]);
  const y0 = useTransform(progress, [0, 0.18, 0.3], [0, 0, -65]);
  const rot0 = useTransform(progress, [0, 0.18, 0.3], [0, 0, -11]);
  const sc0 = useTransform(progress, [0, 0.18, 0.3], [1.0, 1.0, 0.9]);
  const op0 = useTransform(progress, [0, 0.18, 0.3], [1.0, 1.0, 0]);
  const z0 = useTransform(progress, [0, 0.18, 0.29, 0.31], [40, 40, 40, 10]);

  // Card 1 (Slot 1 initially -> Slot 0 -> Exits)
  const x1 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6], [-26, -26, 0, 0, -95]);
  const y1 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6], [-18, -18, 0, 0, -65]);
  const rot1 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6], [8.5, 8.5, 0, 0, -11]);
  const sc1 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6], [0.94, 0.94, 1.0, 1.0, 0.9]);
  const op1 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6], [0.65, 0.65, 1.0, 1.0, 0]);
  const z1 = useTransform(progress, [0, 0.29, 0.3, 0.48, 0.59, 0.61], [30, 30, 40, 40, 40, 10]);

  // Card 2 (Slot 2 initially -> Slot 1 -> Slot 0 -> Exits)
  const x2 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9], [-48, -48, -26, -26, 0, 0, -95]);
  const y2 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9], [-34, -34, -18, -18, 0, 0, -65]);
  const rot2 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9], [11.5, 11.5, 8.5, 8.5, 0, 0, -11]);
  const sc2 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9], [0.88, 0.88, 0.94, 0.94, 1.0, 1.0, 0.9]);
  const op2 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9], [0.38, 0.38, 0.65, 0.65, 1.0, 1.0, 0]);
  const z2 = useTransform(progress, [0, 0.59, 0.6, 0.78, 0.89, 0.91], [20, 20, 40, 40, 40, 10]);

  // Card 3 (Slot 3 in queue -> Slot 2 -> Slot 1 -> Slot 0 in front)
  const x3 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9, 1.0], [-68, -68, -48, -48, -26, -26, 0, 0]);
  const y3 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9, 1.0], [-50, -50, -34, -34, -18, -18, 0, 0]);
  const rot3 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9, 1.0], [14, 14, 11.5, 11.5, 8.5, 8.5, 0, 0]);
  const sc3 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9, 1.0], [0.82, 0.82, 0.88, 0.88, 0.94, 0.94, 1.0, 1.0]);
  const op3 = useTransform(progress, [0.12, 0.18, 0.3, 0.48, 0.6, 0.78, 0.9, 1.0], [0, 0, 0.38, 0.38, 0.65, 0.65, 1.0, 1.0]);
  const z3 = useTransform(progress, [0, 0.89, 0.9, 1.0], [10, 10, 40, 40]);

  const x = [x0, x1, x2, x3][index] || x0;
  const y = [y0, y1, y2, y3][index] || y0;
  const rotate = [rot0, rot1, rot2, rot3][index] || rot0;
  const scale = [sc0, sc1, sc2, sc3][index] || sc0;
  const opacity = [op0, op1, op2, op3][index] || op0;
  const zIndex = [z0, z1, z2, z3][index] || z0;

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
        pointerEvents: isFront ? 'auto' : 'none',
        boxShadow: isFront
          ? `0 30px 70px -10px ${card.glowColor}45, 0 20px 40px -15px rgba(0,0,0,0.6)`
          : '0 20px 40px rgba(0,0,0,0.45)',
      }}
      className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[34px] overflow-hidden border border-white/20 bg-gradient-to-b from-[#1c212a]/95 via-[#12151c]/95 to-[#0c0e12]/95 backdrop-blur-2xl text-white shadow-2xl transition-shadow duration-300"
    >
      <div className="flex flex-col h-full p-4 sm:p-5 justify-between">
        {/* Top Header: Icon & Action Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm shadow-xs">
              {card.icon}
            </span>
            <span className="text-[11px] font-semibold text-white/60 tracking-widest uppercase">
              Experience 0{index + 1}
            </span>
          </div>

          <Link
            href={`/activities/${card.slug}`}
            aria-label={`Open ${card.title} details`}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-108 active:scale-95 cursor-pointer shadow-xs"
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

        {/* Cinematic Activity Photo with Pill Tag */}
        <div className="relative w-full h-[190px] sm:h-[220px] md:h-[240px] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-inner">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-106"
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 350px, 380px"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

          {/* Tag Pill */}
          <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5 shadow-md">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: card.glowColor }}
            />
            <span>{card.tag}</span>
          </div>

          {/* Duration Pill */}
          <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-300 border border-white/15">
            ⏱️ {card.duration}
          </div>
        </div>

        {/* Description & Two-Column Stats */}
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
              <span className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                Capacity
              </span>
            </div>

            <div className="flex flex-col border-l border-white/10">
              <span className="text-xs sm:text-sm font-bold text-sky-400 font-playfair">
                ₹{card.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                Starts From {card.unit}
              </span>
            </div>
          </div>

          {/* Action CTA Button */}
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
}

export default function Activities({
  items,
  title,
  highlight,
  subtitle,
}: ActivitiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
  const cards: ActivityCardData[] = rawActivities.map((act, i) => {
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
      glowColor: DEFAULT_METAS[i % 4].glowColor,
      icon: DEFAULT_METAS[i % 4].icon,
    };
  });

  const sectionTitle = title || 'Backwater';
  const sectionHighlight = highlight || 'Activities';
  const sectionSubtitle =
    subtitle ||
    "Experience thrilling speed boats, eco kayaking, scenic shikaras, and open boats across Kerala's most beautiful backwaters.";

  const total = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll tracking across sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.24) {
      setActiveIndex(0);
    } else if (latest < 0.54) {
      setActiveIndex(1);
    } else if (latest < 0.84) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  const activeCard = cards[activeIndex];

  // Jump to specific card by smoothly scrolling to target track progress
  const scrollToCard = (targetIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    const targets = [0.04, 0.36, 0.66, 0.95];
    const targetY = containerTop + scrollDistance * targets[targetIdx];

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const nextCard = () => {
    scrollToCard((activeIndex + 1) % total);
  };

  const prevCard = () => {
    scrollToCard((activeIndex - 1 + total) % total);
  };

  return (
    <section
      id="activities"
      ref={containerRef}
      className="relative select-none border-t border-slate-200/80"
      style={{ height: '300vh', background: '#f6f6f4' }}
    >
      {/* Sticky Frame: Pins at top-0 during scroll, releases smoothly after card 4 */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden py-4 sm:py-6">
        {/* Soft Ambient Radial Background Glow (Cross-fades per card) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] md:w-[780px] h-[480px] sm:h-[650px] md:h-[780px] rounded-full blur-[110px] pointer-events-none transition-colors duration-700 ease-out"
          style={{
            backgroundColor: activeCard.glowColor,
            opacity: 0.35,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col justify-center flex-1">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-slate-200/90 rounded-full text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs backdrop-blur-md">
              <Sparkles size={14} className="text-sky-600 animate-pulse" />
              <span>Alleppey Experiences • 4 Curated Rides</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-[1.2]">
              {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] mt-1.5 max-w-xl mx-auto leading-[1.6]">
              {sectionSubtitle}
            </p>
          </div>

          {/* 3D Glass Stacked Cards Stage */}
          <div className="relative w-full max-w-xl mx-auto h-[480px] sm:h-[530px] md:h-[560px] flex items-center justify-center">
            <div
              className="relative w-[300px] sm:w-[350px] md:w-[380px] h-[450px] sm:h-[490px] md:h-[520px] flex items-center justify-center"
              style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            >
              {/* All 4 Glass Stacked Cards */}
              {cards.map((card, i) => (
                <GlassStackCard
                  key={card.id}
                  card={card}
                  index={i}
                  progress={scrollYProgress}
                  isFront={activeIndex === i}
                />
              ))}

              {/* Faded Mirror Reflection Below Stack */}
              <div
                className="absolute -bottom-24 sm:-bottom-28 left-0 right-0 h-[80px] sm:h-[100px] rounded-[30px] overflow-hidden opacity-20 pointer-events-none"
                style={{
                  transform: 'scaleY(-1) rotateX(180deg)',
                  filter: 'blur(3px)',
                  maskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-[#1c212a] to-transparent p-4 flex flex-col justify-end">
                  <div className="text-center font-playfair font-bold text-xs sm:text-sm text-white/50 uppercase">
                    {activeCard.title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Navigation & Scroll Guidance */}
          <div className="flex flex-col items-center gap-3 mt-4 sm:mt-6">
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
                    onClick={() => scrollToCard(idx)}
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

            {/* Scroll Indicator Guide */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500">
              <span className="text-sky-600 font-bold">0{activeIndex + 1}</span>
              <span>/</span>
              <span>04</span>
              <span className="text-slate-400 ml-1">
                {activeIndex < 3
                  ? '• Scroll down to jump to next activity ↓'
                  : '• Scroll down to explore Gallery ↓'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
