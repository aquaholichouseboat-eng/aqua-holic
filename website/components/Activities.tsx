'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Subtle auto-rotation every 4.5s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextCard();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextCard]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  return (
    <section
      id="activities"
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 border-t border-slate-100 overflow-hidden"
    >
      {/* Ambient background light orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-sky-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-100/90 border border-sky-200/80 rounded-full text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Curated Backwater Experiences</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-[1.2]">
            {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
          </h2>
          <p className="text-slate-600 text-[15px] sm:text-base mt-2.5 max-w-xl mx-auto leading-[1.7]">
            {sectionSubtitle}
          </p>
        </div>

        {/* 3D Depth Carousel Stage (Matching User Recording) */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-5xl mx-auto h-[460px] sm:h-[500px] md:h-[530px] flex items-center justify-center select-none"
        >
          {/* Card Deck with 3D Offset & Scale Transforms */}
          {displayActivities.map((act, index) => {
            // Compute circular distance from active card
            let offset = (index - activeIndex) % total;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = Math.abs(offset) >= 2;

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

            // Desktop and mobile X-translation offsets
            // On mobile: ±230px; on tablet: ±290px; on desktop: ±340px
            let xOffset = 0;
            if (isLeft) xOffset = -340;
            else if (isRight) xOffset = 340;
            else if (offset < -1) xOffset = -480;
            else if (offset > 1) xOffset = 480;

            return (
              <motion.div
                key={act.id || act.slug || index}
                initial={false}
                animate={{
                  x: isLeft
                    ? '-68%'
                    : isRight
                    ? '68%'
                    : isHidden
                    ? offset * 120 + '%'
                    : '0%',
                  scale: isCenter ? 1.0 : isLeft || isRight ? 0.85 : 0.65,
                  opacity: isCenter ? 1.0 : isLeft || isRight ? 0.48 : 0,
                  zIndex: isCenter ? 30 : isLeft || isRight ? 10 : 0,
                  filter: isCenter ? 'brightness(1)' : 'brightness(0.72)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                  mass: 0.9,
                }}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset: dragOffset, velocity }) => {
                  if (dragOffset.x > 60 || velocity.x > 350) {
                    prevCard();
                  } else if (dragOffset.x < -60 || velocity.x < -350) {
                    nextCard();
                  }
                }}
                onClick={() => {
                  if (isLeft) prevCard();
                  if (isRight) nextCard();
                }}
                className={`absolute w-[280px] sm:w-[320px] md:w-[340px] h-[420px] sm:h-[460px] md:h-[480px] rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-2xl transition-shadow duration-300 ${
                  isCenter
                    ? 'shadow-[0_25px_50px_rgba(14,165,233,0.22),0_15px_30px_rgba(0,0,0,0.14)] cursor-grab active:cursor-grabbing border-2 border-white'
                    : 'cursor-pointer pointer-events-auto border border-slate-200/60'
                }`}
                style={{
                  touchAction: 'pan-y',
                }}
              >
                {/* Full Card Body */}
                <div className="flex flex-col h-full bg-white text-slate-800">
                  {/* Top Photo Section (Approx. 56% height, matching video reference) */}
                  <div className="relative h-[56%] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imgSrc}
                      alt={act.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? 'scale-100 hover:scale-105' : 'scale-100'
                      }`}
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                    {/* Duration Badge Top-Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[11px] font-semibold text-emerald-300 shadow-sm">
                      <span>⏱️</span>
                      <span>{duration}</span>
                    </div>

                    {/* Tag Badge Top-Right */}
                    <span className="absolute top-3 right-3 bg-sky-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm border border-white/20">
                      {tag}
                    </span>
                  </div>

                  {/* Bottom Stats & Details (Clean White Card Layout matching User Video) */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                    {/* Centered Uppercase Title */}
                    <div>
                      <h3 className="font-playfair font-bold text-lg sm:text-xl text-slate-900 tracking-tight uppercase line-clamp-1">
                        {act.title}
                      </h3>
                    </div>

                    {/* Two-Column Stats Box (Exact structure as recorded video: Title + 2 key metrics side by side) */}
                    <div className="grid grid-cols-2 gap-3 pt-2 pb-1 border-y border-slate-100 my-auto">
                      {/* Left Stat: Capacity */}
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
                          {capacity}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                          Capacity
                        </span>
                      </div>

                      {/* Right Stat: Price */}
                      <div className="flex flex-col pl-2 border-l border-slate-100">
                        <span className="text-sm sm:text-base font-bold text-sky-600 font-playfair leading-tight">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                          Starts From
                        </span>
                      </div>
                    </div>

                    {/* Action Button: Visible on Active Center Card */}
                    <div className="pt-2">
                      {isCenter ? (
                        <Link
                          href={`/activities/${act.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-600/25 transition-all hover:scale-101 active:scale-98"
                        >
                          <span>Explore Details</span>
                          <span className="text-base leading-none">→</span>
                        </Link>
                      ) : (
                        <div className="w-full text-center py-2 text-xs font-semibold text-sky-600">
                          Click to view
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
            className="absolute left-2 sm:left-4 z-40 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200/80 transition-all hover:scale-108 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft size={22} className="text-slate-700" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextCard}
            aria-label="Next activity"
            className="absolute right-2 sm:right-4 z-40 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200/80 transition-all hover:scale-108 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight size={22} className="text-slate-700" />
          </button>
        </div>

        {/* Interactive Step Navigator / Pagination Dots */}
        <div className="flex flex-col items-center gap-3 mt-6 sm:mt-8">
          {/* Pill Tabs for Desktop */}
          <div className="hidden sm:flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-slate-200/80 shadow-xs">
            {displayActivities.map((act, idx) => (
              <button
                key={act.id || act.slug || idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-102'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeIndex === idx ? 'bg-white' : 'bg-slate-400'
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
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full ${
                  activeIndex === idx
                    ? 'w-6 h-2 bg-sky-600'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-slate-600 font-medium">
            Swipe left/right or click flanking cards to explore
          </span>
        </div>
      </div>
    </section>
  );
}
