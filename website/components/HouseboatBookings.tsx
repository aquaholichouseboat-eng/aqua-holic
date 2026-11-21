'use client';

import Image from 'next/image';
import Link from 'next/link';
import { houseboats, Houseboat } from '@/data/houseboats';
import { urlForImage } from '@/lib/sanity/image';
import WhatsAppIcon from './WhatsAppIcon';

interface HouseboatBookingsProps {
  boats?: Houseboat[];
  title?: string;
  highlight?: string;
  subtitle?: string;
}

export default function HouseboatBookings({
  boats,
  title,
  highlight,
  subtitle,
}: HouseboatBookingsProps) {
  const displayBoats = (boats && boats.length > 0 ? boats : houseboats).slice(0, 4);
  const sectionTitle = title || 'Houseboat';
  const sectionHighlight = highlight || 'Bookings';
  const sectionSubtitle =
    subtitle ||
    'Select your private and sharing houseboat in Alleppey. All bookings include private chef, fuel, government permits, and meals.';

  return (
    <section id="houseboats" className="relative py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-50 font-poppins overflow-hidden">
      {/* Ambient background light spheres */}
      <div className="absolute top-1/4 right-4 sm:right-12 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-4 sm:left-12 w-72 sm:w-96 h-72 sm:h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
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
            <span>← Swipe left to right to see more →</span>
          </div>
        </div>

        {/* Cards Grid / Responsive Carousel */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto pb-5 pt-1 px-4 sm:px-6 md:px-0 -mx-4 sm:-mx-6 md:mx-0 scrollbar-none snap-x snap-mandatory">
          {displayBoats.map((boat) => {
            const fallbackBoat = houseboats.find((h) => h.slug === boat.slug || h.id === boat.id);
            const fallbackImg =
              fallbackBoat?.image ||
              'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop';
            const imgSrc =
              urlForImage(boat.image) ||
              (typeof boat.image === 'string' ? boat.image : fallbackImg);

            const rating = boat.rating || fallbackBoat?.rating || 4.9;
            const reviews = boat.reviews || fallbackBoat?.reviews || 120;
            const bedrooms = boat.bedrooms || fallbackBoat?.bedrooms || 1;
            const capacity = boat.capacity || fallbackBoat?.capacity || '2–4 Guests';
            const tag = boat.tag || fallbackBoat?.tag || 'Top Rated';
            const price = boat.price || fallbackBoat?.price || 7500;
            const unit = boat.unit || fallbackBoat?.unit || '/ night';
            const desc = boat.desc || fallbackBoat?.desc || '';
            const chips =
              boat.chips && boat.chips.length > 0
                ? boat.chips
                : fallbackBoat?.chips || ['Overnight Stay', 'Private Chef'];

            return (
              <div
                key={boat.id || boat.slug}
                className="flex-none w-[80vw] max-w-[310px] sm:w-[280px] md:w-auto snap-start flex flex-col"
              >
                <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-lg border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_20px_45px_rgba(14,165,233,0.22)] hover:-translate-y-1.5 transition-all duration-300">
                  {/* Photo with natural fade into dark card */}
                  <Link
                    href={`/houseboats/${boat.slug}`}
                    aria-label={`View details for ${boat.title}`}
                    className="block relative h-48 sm:h-52 md:h-44 lg:h-48 w-full overflow-hidden"
                  >
                    <Image
                      src={imgSrc}
                      alt={boat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/25 to-transparent" />

                    {/* Rating Pill Top-Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-xs font-semibold text-amber-300 shadow-md">
                      <span>★</span>
                      <span>{rating}</span>
                      <span className="text-white/60 font-normal text-[10px]">({reviews}+)</span>
                    </div>

                    {/* Tag Pill Top-Right */}
                    <span className="absolute top-3 right-3 bg-sky-600/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md border border-white/20">
                      {tag}
                    </span>
                  </Link>

                  {/* Card Body */}
                  <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-2">
                      {/* Title */}
                      <Link
                        href={`/houseboats/${boat.slug}`}
                        className="block group-hover:text-sky-300 transition-colors"
                      >
                        <h3 className="font-poppins font-bold text-base sm:text-lg text-white tracking-tight leading-snug line-clamp-1">
                          {boat.title}
                        </h3>
                      </Link>

                      {/* Specs: Bedrooms & Capacity */}
                      <div className="flex items-center gap-2 text-xs text-white/75 flex-wrap">
                        <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                          🛏️ {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                          👥 {capacity}
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

                      <div className="flex items-center gap-2 shrink-0">
                        {/* WhatsApp Instant Booking CTA */}
                        <a
                          href={`https://wa.me/919876543210?text=Hello%20AquaHolic,%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(
                            boat.title
                          )}%20houseboat.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-md transition-colors"
                          title="Book on WhatsApp"
                          aria-label={`Book ${boat.title} on WhatsApp`}
                        >
                          <WhatsAppIcon size={15} className="text-white" />
                          <span className="hidden xs:inline sm:hidden lg:inline text-[11px]">Book</span>
                        </a>

                        {/* View Details Link */}
                        <Link
                          href={`/houseboats/${boat.slug}`}
                          aria-label={`View details for ${boat.title}`}
                          className="text-xs text-sky-400 font-medium group-hover:text-sky-300 flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-2 rounded-xl border border-white/10 transition-colors"
                        >
                          <span>Details</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
