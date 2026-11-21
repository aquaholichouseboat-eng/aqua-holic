'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';
import { activities, Activity } from '@/data/activities';
import { urlForImage } from '@/lib/sanity/image';

interface ActivitiesProps {
  items?: Activity[];
  title?: string;
  highlight?: string;
  subtitle?: string;
}

interface ActivityStackCardProps {
  act: Activity;
  index: number;
  progress: MotionValue<number>;
  isActive: boolean;
}

function ActivityStackCard({
  act,
  index,
  progress,
  isActive,
}: ActivityStackCardProps) {
  const fallbackAct = activities.find(
    (a) => a.slug === act.slug || a.id === act.id
  );
  const fallbackImg =
    fallbackAct?.image ||
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop';
  const imgSrc =
    urlForImage(act.image) ||
    (typeof act.image === 'string' ? act.image : fallbackImg);

  const tag = act.tag || fallbackAct?.tag || 'Adventure';
  const duration = act.duration || fallbackAct?.duration || '1–2 Hours';
  const capacity =
    act.capacity || fallbackAct?.capacity || 'Up to 6 Persons';
  const price = act.price || fallbackAct?.price || 1500;
  const unit = act.unit || fallbackAct?.unit || '/ boat';
  const desc = act.desc || fallbackAct?.desc || '';
  const chips =
    act.chips && act.chips.length > 0
      ? act.chips
      : fallbackAct?.chips || ['Guided Tour', duration];

  // Continuous Framer Motion transforms for 4 cards across scroll progress [0, 1]
  const y0 = useTransform(progress, [0, 0.18, 0.28], [0, 0, -25]);
  const y1 = useTransform(progress, [0.12, 0.18, 0.28, 0.46, 0.56], [60, 60, 0, 0, -25]);
  const y2 = useTransform(progress, [0.40, 0.46, 0.56, 0.74, 0.84], [60, 60, 0, 0, -25]);
  const y3 = useTransform(progress, [0.68, 0.74, 0.84, 1.0], [60, 60, 0, 0]);

  const scale0 = useTransform(progress, [0, 0.18, 0.28], [1, 1, 0.93]);
  const scale1 = useTransform(progress, [0.12, 0.18, 0.28, 0.46, 0.56], [0.93, 0.93, 1, 1, 0.93]);
  const scale2 = useTransform(progress, [0.40, 0.46, 0.56, 0.74, 0.84], [0.93, 0.93, 1, 1, 0.93]);
  const scale3 = useTransform(progress, [0.68, 0.74, 0.84, 1.0], [0.93, 0.93, 1, 1]);

  const opacity0 = useTransform(progress, [0, 0.18, 0.28], [1, 1, 0]);
  const opacity1 = useTransform(progress, [0.12, 0.18, 0.28, 0.46, 0.56], [0, 0, 1, 1, 0]);
  const opacity2 = useTransform(progress, [0.40, 0.46, 0.56, 0.74, 0.84], [0, 0, 1, 1, 0]);
  const opacity3 = useTransform(progress, [0.68, 0.74, 0.84, 1.0], [0, 0, 1, 1]);

  const imgScale0 = useTransform(progress, [0, 0.18, 0.28], [1, 1, 1.06]);
  const imgScale1 = useTransform(progress, [0.18, 0.28, 0.46, 0.56], [1.10, 1.0, 1.0, 1.06]);
  const imgScale2 = useTransform(progress, [0.46, 0.56, 0.74, 0.84], [1.10, 1.0, 1.0, 1.06]);
  const imgScale3 = useTransform(progress, [0.74, 0.84, 1.0], [1.10, 1.0, 1.0]);

  const y = [y0, y1, y2, y3][index] || y0;
  const scale = [scale0, scale1, scale2, scale3][index] || scale0;
  const opacity = [opacity0, opacity1, opacity2, opacity3][index] || opacity0;
  const imgScale = [imgScale0, imgScale1, imgScale2, imgScale3][index] || imgScale0;

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: (index + 1) * 10,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      className="absolute inset-0 w-full h-full"
    >
      <Link
        href={`/activities/${act.slug}`}
        aria-label={`View details for ${act.title}`}
        className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 hover:border-sky-400/50 flex flex-col md:flex-row md:items-stretch h-full w-full group hover:shadow-[0_25px_60px_rgba(14,165,233,0.25)] transition-all duration-300 cursor-pointer"
      >
        {/* Left Column (Desktop) / Top Section (Mobile): Image Showcase */}
        <div className="relative h-44 sm:h-52 md:h-full md:w-[48%] lg:w-[50%] shrink-0 overflow-hidden bg-slate-900">
          <motion.div
            style={{ scale: imgScale }}
            className="relative w-full h-full"
          >
            <Image
              src={imgSrc}
              alt={act.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 45vw"
              priority={index === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#141e1a] via-[#141e1a]/30 to-transparent" />

          {/* Duration Badge Top-Left */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs font-medium text-emerald-300 shadow-md">
            <span>⏱️</span>
            <span>{duration}</span>
          </div>

          {/* Tag Pill Top-Right */}
          <span className="absolute top-3.5 right-3.5 bg-sky-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md border border-white/20">
            {tag}
          </span>

          {/* Bottom badge counter */}
          <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/15">
              Experience 0{index + 1} of 04
            </span>
          </div>
        </div>

        {/* Right Column (Desktop) / Bottom Section (Mobile): Card Details */}
        <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between flex-1 gap-3 sm:gap-4 overflow-hidden">
          <div className="space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                Kerala Backwater Experience
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-white/50 font-medium">
                Step 0{index + 1} / 04
              </span>
            </div>

            {/* Title */}
            <h3 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-semibold text-white group-hover:text-sky-300 transition-colors tracking-tight leading-[1.2]">
              {act.title}
            </h3>

            {/* Specs: Capacity & Safety */}
            <div className="flex items-center gap-2 text-xs text-white/80 flex-wrap font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs">
                👥 {capacity}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs">
                🛡️ Safety Gear & Pilot
              </span>
            </div>

            {/* Description */}
            <p className="text-white/75 text-xs sm:text-sm leading-[1.7] line-clamp-2 md:line-clamp-3">
              {desc}
            </p>

            {/* Frosted Glass Tags / Chips */}
            {chips && chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {chips.slice(0, 3).map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white/90 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-white/10"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Pricing & Action Section */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
            <div>
              <span className="text-[10px] text-white/50 block font-normal uppercase tracking-wider">
                Starts From
              </span>
              <div className="text-sky-400 font-bold text-lg sm:text-xl lg:text-2xl leading-tight font-playfair">
                ₹{price.toLocaleString('en-IN')}
                <span className="text-xs text-white/60 font-normal font-sans"> {unit}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-600/30 group-hover:shadow-lg transition-all shrink-0">
              <span>View Activity</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </Link>
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

  // Guarantee exactly 4 activities
  let displayActivities = items && items.length > 0 ? [...items] : [...activities];
  if (displayActivities.length < 4) {
    for (const fallback of activities) {
      if (!displayActivities.some((a) => a.slug === fallback.slug || a.id === fallback.id)) {
        displayActivities.push(fallback);
      }
      if (displayActivities.length >= 4) break;
    }
  }
  displayActivities = displayActivities.slice(0, 4);

  const sectionTitle = title || 'Backwater';
  const sectionHighlight = highlight || 'Activities';
  const sectionSubtitle =
    subtitle ||
    "Experience thrilling speed boats, eco kayaking, scenic shikaras, and open boats across Kerala's most beautiful backwaters.";

  // Scroll tracking across sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.23) {
      setActiveIndex(0);
    } else if (latest < 0.51) {
      setActiveIndex(1);
    } else if (latest < 0.79) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  const scrollToCard = (targetIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) return;

    const targetProgressMap = [0.05, 0.35, 0.63, 0.92];
    const targetY = containerTop + scrollableDistance * targetProgressMap[targetIdx];

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="activities"
      ref={containerRef}
      className="relative bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-50 border-t border-slate-100"
      style={{ height: '340vh' }}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden pt-16 sm:pt-20 pb-4 sm:pb-6">
        {/* Ambient background light spheres */}
        <div className="absolute top-1/4 left-4 sm:left-12 w-72 sm:w-96 h-72 sm:h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-4 sm:right-12 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col justify-center flex-1">
          {/* Section Header + Step Navigator */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 sm:mb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100/80 border border-sky-200/80 rounded-full text-sky-800 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                <span>Alleppey Experiences • 4 Curated Rides</span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-800 leading-[1.2]">
                {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm md:text-[15px] mt-1 max-w-xl leading-[1.6]">
                {sectionSubtitle}
              </p>
            </div>

            {/* Interactive Step Navigator */}
            <div className="flex items-center gap-1.5 sm:gap-2 self-start md:self-end overflow-x-auto max-w-full pb-1 scrollbar-none">
              {displayActivities.map((act, idx) => (
                <button
                  key={act.id || act.slug || idx}
                  onClick={() => scrollToCard(idx)}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                    activeIndex === idx
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-102'
                      : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200/80 hover:border-sky-300'
                  }`}
                  aria-label={`Jump to activity ${idx + 1}: ${act.title}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      activeIndex === idx
                        ? 'bg-white'
                        : 'bg-slate-300 group-hover:bg-sky-400'
                    }`}
                  />
                  <span className="hidden sm:inline">{act.title}</span>
                  <span className="sm:hidden font-mono">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stacking Card Stage */}
          <div className="relative w-full max-w-[340px] sm:max-w-md md:max-w-3xl lg:max-w-4xl h-[420px] sm:h-[450px] md:h-[390px] lg:h-[415px] mx-auto">
            {displayActivities.map((act, index) => (
              <ActivityStackCard
                key={act.id || act.slug || index}
                act={act}
                index={index}
                progress={scrollYProgress}
                isActive={activeIndex === index}
              />
            ))}
          </div>

          {/* Bottom Progress Bar & Scroll Hint */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between gap-4 max-w-[340px] sm:max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full px-1">
            {/* 4-Segment Progress Bar */}
            <div className="flex-1 flex items-center gap-1.5 bg-slate-200/80 h-1.5 rounded-full overflow-hidden p-0.5">
              {displayActivities.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-full rounded-full overflow-hidden bg-slate-200"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      activeIndex >= idx ? 'bg-sky-600 w-full' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500 shrink-0">
              <span className="text-sky-600 font-bold">0{activeIndex + 1}</span>
              <span>/</span>
              <span>04</span>
              <span className="text-slate-400 hidden sm:inline ml-1">
                {activeIndex < 3
                  ? '• Scroll down for next ride ↓'
                  : '• Scroll down to explore Gallery ↓'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
