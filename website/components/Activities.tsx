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
    <section id="activities" className="relative py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-50 font-poppins border-t border-slate-100 overflow-hidden">
      {/* Ambient background light spheres */}
      <div className="absolute top-1/4 left-4 sm:left-12 w-72 sm:w-96 h-72 sm:h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-4 sm:right-12 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800">
              {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
              {sectionSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-sky-600 font-medium md:hidden">
            <span>← Swipe left to right to explore →</span>
          </div>
        </div>

        {/* Activities Cards Grid / Responsive Carousel */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto pb-5 pt-1 -mx-4 sm:-mx-6 md:mx-0 scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-0 scrollbar-none snap-x snap-mandatory">
          {displayActivities.map((act) => {
            const fallbackAct = activities.find((a) => a.slug === act.slug || a.id === act.id);
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
            const desc = act.desc || fallbackAct?.desc || '';
            const chips =
              act.chips && act.chips.length > 0
                ? act.chips
                : fallbackAct?.chips || ['Guided Tour', duration];

            return (
              <div
                key={act.id || act.slug}
                className="flex-none w-[80vw] max-w-[310px] sm:w-[280px] md:w-auto snap-start flex flex-col first:ml-4 sm:first:ml-6 md:first:ml-0 last:mr-4 sm:last:mr-6 md:last:mr-0"
              >
                <Link
                  href={`/activities/${act.slug}`}
                  aria-label={`View details for ${act.title}`}
                  className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-lg border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_20px_45px_rgba(14,165,233,0.22)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  {/* Photo with natural fade into dark card */}
                  <div className="relative h-48 sm:h-52 md:h-44 lg:h-48 w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={act.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/25 to-transparent" />

                    {/* Duration Badge Top-Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-xs font-medium text-emerald-300 shadow-md">
                      <span>⏱️</span>
                      <span>{duration}</span>
                    </div>

                    {/* Tag Pill Top-Right */}
                    <span className="absolute top-3 right-3 bg-sky-600/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md border border-white/20">
                      {tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-2">
                      {/* Title */}
                      <h3 className="font-poppins font-bold text-base sm:text-lg text-white group-hover:text-sky-300 transition-colors tracking-tight leading-snug line-clamp-1">
                        {act.title}
                      </h3>

                      {/* Specs: Capacity & Safety */}
                      <div className="flex items-center gap-2 text-xs text-white/75 flex-wrap">
                        <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                          👥 {capacity}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                          🛡️ Safety Gear
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                        {desc}
                      </p>

                      {/* Frosted Glass Tags / Chips */}
                      {chips && chips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {chips.slice(0, 2).map((chip) => (
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
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span className="text-[10px] text-white/50 block font-normal uppercase tracking-wider">
                          Starts From
                        </span>
                        <div className="text-sky-400 font-bold text-base sm:text-lg leading-tight">
                          ₹{price.toLocaleString('en-IN')}
                          <span className="text-[11px] text-white/60 font-normal"> {unit}</span>
                        </div>
                      </div>

                      <div className="text-xs text-sky-400 font-medium group-hover:text-sky-300 flex items-center gap-1.5 shrink-0">
                        <span>View Activity</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
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
