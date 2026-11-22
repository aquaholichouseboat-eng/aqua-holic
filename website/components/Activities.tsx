'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { activities, Activity } from '@/data/activities';
import { urlForImage } from '@/lib/sanity/image';

interface ActivitiesProps {
  items?: Activity[];
  title?: string;
  highlight?: string;
  subtitle?: string;
}

export default function Activities({
  items,
  title,
  highlight,
  subtitle,
}: ActivitiesProps) {
  // Ensure exactly 4 activity items with reliable fallbacks
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

  const total = displayActivities.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotation every 4.5s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextCard();
    }, 4500);
    return () => clearInterval(interval);
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

  // Generate 5 slot offsets: [-2, -1, 0, 1, 2] to form the continuous 3D cylinder curve
  const slots = [-2, -1, 0, 1, 2];

  return (
    <section
      id="activities"
      className="relative py-14 sm:py-20 md:py-24 bg-gradient-to-b from-[#090f1d] via-[#0d1629] to-[#090f1d] text-white border-t border-slate-800/80 overflow-hidden"
    >
      {/* 3D Ambient Stage Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[400px] sm:h-[500px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-500/15 border border-sky-400/30 rounded-full text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md shadow-xs">
            <Compass size={14} className="text-sky-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Alleppey Experiences • 4 Curated Rides</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.2]">
            {sectionTitle} <span className="text-sky-400">{sectionHighlight}</span>
          </h2>
          <p className="text-slate-300 text-[15px] sm:text-base mt-2.5 max-w-xl mx-auto leading-[1.7]">
            {sectionSubtitle}
          </p>
        </div>

        {/* 3D Curved Cylindrical Coverflow Stage */}
        <div
          ref={stageRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-5xl mx-auto h-[460px] sm:h-[500px] md:h-[540px] flex items-center justify-center select-none"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {slots.map((offset) => {
            // Calculate corresponding activity index with circular wrap
            const activityIndex = (activeIndex + offset + total * 10) % total;
            const act = displayActivities[activityIndex];

            const isCenter = offset === 0;
            const isLeft = offset < 0;
            const isRight = offset > 0;
            const isOuter = Math.abs(offset) === 2;

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
            const capacity = act.capacity || fallbackAct?.capacity || 'Up to 6 Persons';
            const price = act.price || fallbackAct?.price || 1500;
            const unit = act.unit || fallbackAct?.unit || '/ boat';

            // 3D Cylinder Curve Calculations
            // Responsive offsets based on slot distance
            return (
              <motion.div
                key={`${act.slug || act.id}-${offset}`}
                initial={false}
                animate={{
                  x:
                    offset === 0
                      ? 0
                      : offset === -1
                      ? -250
                      : offset === 1
                      ? 250
                      : offset === -2
                      ? -430
                      : 430,
                  z:
                    offset === 0
                      ? 0
                      : offset === -1 || offset === 1
                      ? -130
                      : -280,
                  rotateY:
                    offset === 0
                      ? 0
                      : offset === -1
                      ? 36
                      : offset === 1
                      ? -36
                      : offset === -2
                      ? 52
                      : -52,
                  scale:
                    offset === 0
                      ? 1.0
                      : offset === -1 || offset === 1
                      ? 0.88
                      : 0.74,
                  opacity:
                    offset === 0
                      ? 1.0
                      : offset === -1 || offset === 1
                      ? 0.78
                      : 0.42,
                  zIndex:
                    offset === 0
                      ? 30
                      : offset === -1 || offset === 1
                      ? 20
                      : 10,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 26,
                  mass: 0.85,
                }}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, { offset: dragOffset, velocity }) => {
                  if (dragOffset.x > 50 || velocity.x > 300) {
                    prevCard();
                  } else if (dragOffset.x < -50 || velocity.x < -300) {
                    nextCard();
                  }
                }}
                onClick={() => {
                  if (offset < 0) prevCard();
                  if (offset > 0) nextCard();
                }}
                className={`absolute w-[290px] sm:w-[330px] md:w-[360px] h-[410px] sm:h-[450px] md:h-[480px] rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-2xl transition-all duration-300 ${
                  isCenter
                    ? 'cursor-grab active:cursor-grabbing border-2 border-sky-400/80 shadow-[0_30px_70px_rgba(14,165,233,0.35),0_15px_30px_rgba(0,0,0,0.6)]'
                    : 'cursor-pointer border border-white/15 hover:border-sky-400/50 shadow-[0_20px_45px_rgba(0,0,0,0.6)]'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  touchAction: 'pan-y',
                }}
              >
                {/* Card Container with Open Journal / 3D Curve Aesthetic */}
                <div className="flex flex-col h-full bg-gradient-to-b from-[#182333] via-[#101926] to-[#0c121d] text-white">
                  {/* Photo Section (Top ~60%) */}
                  <div className="relative h-[60%] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imgSrc}
                      alt={act.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? 'scale-100 hover:scale-106' : 'scale-100'
                      }`}
                      sizes="(max-width: 640px) 290px, (max-width: 1024px) 330px, 360px"
                      priority={isCenter}
                    />
                    {/* Natural Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101926] via-[#101926]/30 to-transparent" />

                    {/* Subtle Central Fold / Journal Lighting Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    {/* Duration Badge Top-Left */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-emerald-300 shadow-md">
                      <span>⏱️</span>
                      <span>{duration}</span>
                    </div>

                    {/* Tag Badge Top-Right */}
                    <span className="absolute top-3.5 right-3.5 bg-sky-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md border border-white/20">
                      {tag}
                    </span>

                    {/* Card Index Indicator */}
                    <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5">
                      <span className="bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/15">
                        Experience 0{activityIndex + 1} of 04
                      </span>
                    </div>
                  </div>

                  {/* Card Content Section (Bottom ~40%) */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-2.5 bg-[#101926]">
                    {/* Title */}
                    <div>
                      <h3 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug line-clamp-1">
                        {act.title}
                      </h3>
                    </div>

                    {/* Two-Column Stats Box (Exact Structure from User Reference) */}
                    <div className="grid grid-cols-2 gap-3 py-2 px-3 rounded-xl bg-white/5 border border-white/10 my-auto">
                      {/* Left: Capacity */}
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {capacity}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                          Capacity
                        </span>
                      </div>

                      {/* Right: Pricing */}
                      <div className="flex flex-col pl-2 border-l border-white/10">
                        <span className="text-xs sm:text-sm font-bold text-sky-400 font-playfair leading-tight">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                          Starts From {unit}
                        </span>
                      </div>
                    </div>

                    {/* Action Button: Interactive on Active Center Card */}
                    <div className="pt-1">
                      {isCenter ? (
                        <Link
                          href={`/activities/${act.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-102 active:scale-98"
                        >
                          <span>Explore Details</span>
                          <span className="text-base leading-none">→</span>
                        </Link>
                      ) : (
                        <div className="w-full text-center py-2 text-xs font-semibold text-sky-400/90 flex items-center justify-center gap-1">
                          <span>Click to rotate</span>
                          <span>↷</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            onClick={prevCard}
            aria-label="Previous activity"
            className="absolute left-2 sm:left-4 md:left-6 z-40 w-11 sm:w-13 h-11 sm:h-13 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextCard}
            aria-label="Next activity"
            className="absolute right-2 sm:right-4 md:right-6 z-40 w-11 sm:w-13 h-11 sm:h-13 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>

        {/* Bottom Interactive Controls & Pill Indicators */}
        <div className="flex flex-col items-center gap-3.5 mt-8 sm:mt-10">
          {/* Pill Tabs for Desktop */}
          <div className="hidden sm:flex items-center gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/15 shadow-xl">
            {displayActivities.map((act, idx) => (
              <button
                key={act.id || act.slug || idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-102'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeIndex === idx ? 'bg-white' : 'bg-slate-600'
                  }`}
                />
                <span>{act.title}</span>
              </button>
            ))}
          </div>

          {/* Dots Indicator for Mobile */}
          <div className="flex sm:hidden items-center gap-2">
            {displayActivities.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to activity ${idx + 1}`}
                className={`transition-all rounded-full ${
                  activeIndex === idx
                    ? 'w-7 h-2.5 bg-sky-500'
                    : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Drag horizontally or click side cards to rotate the 3D showcase
          </span>
        </div>
      </div>
    </section>
  );
}
