'use client';

import Image from 'next/image';
import Link from 'next/link';
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
  const displayActivities = items && items.length > 0 ? items : activities;
  const sectionTitle = title || 'Backwater';
  const sectionHighlight = highlight || 'Activities';
  const sectionSubtitle =
    subtitle ||
    'Experience thrilling speed boats, eco kayaking, scenic shikaras, and open boats across Kerala\'s most beautiful backwaters.';

  return (
    <section id="activities" className="relative py-[15px] bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-50 font-poppins border-t border-slate-100 overflow-hidden">
      {/* Ambient background light spheres */}
      <div className="absolute top-1/4 left-4 sm:left-12 w-72 sm:w-96 h-72 sm:h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-4 sm:right-12 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-[15px]">
          <div>
            <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800">
              {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-1 max-w-xl">
              {sectionSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-sky-600 font-medium md:hidden">
            <span>← Swipe left to right to explore →</span>
          </div>
        </div>

        {/* Activities Cards Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 overflow-x-auto pb-4 pt-1 px-4 sm:px-6 md:px-0 -mx-4 sm:-mx-6 md:mx-0 scrollbar-none snap-x snap-mandatory">
          {displayActivities.map((act) => {
            const imgSrc =
              urlForImage(act.image) ||
              (typeof act.image === 'string'
                ? act.image
                : 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop');
            return (
              <div
                key={act.id || act.slug}
                className="flex-none w-[calc((100vw-40px)/2.5)] sm:w-[220px] md:w-auto snap-start flex flex-col"
              >
                <Link
                  href={`/activities/${act.slug}`}
                  aria-label={`View details for ${act.title}`}
                  className="relative rounded-[18px] sm:rounded-[22px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-md border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_16px_40px_rgba(14,165,233,0.22)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Photo with natural fade into dark card */}
                  <div className="relative h-24 sm:h-32 md:h-36 w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={act.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 40vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/30 to-transparent" />
                  </div>

                  {/* 3 Pagination dots right at image threshold */}
                  <div className="flex items-center justify-center gap-1 my-1.5">
                    <span className="w-1 h-1 rounded-full bg-white shadow-xs" />
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                  </div>

                  {/* Card Body */}
                  <div className="p-2 sm:p-3 md:p-3.5 flex flex-col flex-1 justify-between gap-1.5">
                    <div>
                      {/* Title & Price Capsule */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h3 className="font-poppins font-bold text-xs sm:text-sm md:text-base text-white group-hover:text-sky-300 transition-colors tracking-tight leading-tight truncate">
                          {act.title}
                        </h3>
                        <div className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-semibold text-[10px] sm:text-xs border border-white/10 w-fit shrink-0 shadow-xs">
                          ₹{act.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-[9px] sm:text-[11px] leading-tight mb-1.5 line-clamp-1 sm:line-clamp-2">
                        {act.desc}
                      </p>

                      {/* Frosted Glass Tags / Chips */}
                      {act.chips && act.chips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mb-1">
                          {act.chips.map((chip) => (
                            <span
                              key={chip}
                              className="inline-flex items-center bg-white/12 backdrop-blur-md text-white/90 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium border border-white/10 truncate max-w-full"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Clean Link Footer Indicator */}
                    <div className="pt-1 flex items-center justify-between text-[9px] sm:text-[11px] text-sky-400/90 font-medium group-hover:text-sky-300">
                      <span>View Activity</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
