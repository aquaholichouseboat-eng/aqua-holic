'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { houseboats, Houseboat } from '@/data/houseboats';
import { urlForImage } from '@/lib/sanity/image';

interface AllHouseboatsClientProps {
  initialBoats: Houseboat[];
}

export default function AllHouseboatsClient({ initialBoats }: AllHouseboatsClientProps) {
  const [activeCategory, setActiveCategory] = useState<'private' | 'sharing'>('private');

  const boats = initialBoats && initialBoats.length > 0 ? initialBoats : houseboats;
  const privateBoats = boats.filter((b) => b.category === 'private' || !b.category);
  const sharingBoats =
    boats.filter((b) => b.category === 'sharing').length > 0
      ? boats.filter((b) => b.category === 'sharing')
      : houseboats.filter((b) => b.category === 'sharing');

  const currentBoats = activeCategory === 'private' ? privateBoats : sharingBoats;

  const renderBoatCard = (boat: Houseboat) => {
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
      <div key={boat.id || boat.slug} className="flex flex-col">
        <Link
          href={`/houseboats/${boat.slug}`}
          aria-label={`View details for ${boat.title}`}
          className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-lg border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_20px_45px_rgba(14,165,233,0.22)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
        >
          {/* Photo */}
          <div className="relative h-48 sm:h-52 md:h-44 lg:h-48 w-full overflow-hidden">
            <Image
              src={imgSrc}
              alt={boat.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between gap-3">
            <div className="space-y-2">
              {/* Title */}
              <h3 className="font-poppins font-bold text-base sm:text-lg text-white group-hover:text-sky-300 transition-colors tracking-tight leading-snug line-clamp-1">
                {boat.title}
              </h3>

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

              <div className="text-xs text-sky-400 font-medium group-hover:text-sky-300 flex items-center gap-1.5 shrink-0">
                <span>View Details</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 flex-1 w-full pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">All Houseboats</span>
        </nav>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors bg-white hover:bg-sky-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles size={13} />
          <span>{boats.length} Certified Fleet Vessels</span>
        </div>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800">
          Explore All <span className="text-sky-600">Houseboats</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Select your private charter or sharing houseboat package in Alleppey. Every booking includes a private chef, traditional Kerala meals, and certified marine captain.
        </p>
      </div>

      {/* Modern Segmented Category Tab Switcher: Side-by-Side on Mobile & Desktop */}
      <div className="flex justify-start mb-6 sm:mb-8">
        <div className="bg-slate-100/95 p-1 sm:p-1.5 rounded-full inline-flex items-center w-full max-w-[390px] sm:max-w-none sm:w-auto border border-slate-200/90 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('private')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeCategory === 'private'
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                activeCategory === 'private' ? 'bg-white' : 'bg-sky-600'
              }`}
            />
            <span className="truncate">
              <span className="inline sm:hidden">Private</span>
              <span className="hidden sm:inline">Private Houseboats</span>
            </span>
            <span
              className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium shrink-0 ${
                activeCategory === 'private'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              {privateBoats.length}
              <span className="hidden sm:inline"> Vessels</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('sharing')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeCategory === 'sharing'
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                activeCategory === 'sharing' ? 'bg-white' : 'bg-sky-600'
              }`}
            />
            <span className="truncate">
              <span className="inline sm:hidden">Sharing</span>
              <span className="hidden sm:inline">Sharing Houseboats</span>
            </span>
            <span
              className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium shrink-0 ${
                activeCategory === 'sharing'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              {sharingBoats.length}
              <span className="hidden sm:inline"> Packages</span>
            </span>
          </button>
        </div>
      </div>

      {/* Selected Category Header & Cards Grid */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-slate-200">
          <span className="w-3 h-3 rounded-full bg-sky-600" />
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-800">
            {activeCategory === 'private' ? (
              <>
                Private <span className="text-sky-600">Houseboats</span>
              </>
            ) : (
              <>
                Sharing <span className="text-sky-600">Houseboats</span>
              </>
            )}
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold ml-auto bg-sky-100 text-sky-700">
            {currentBoats.length} {activeCategory === 'private' ? 'Vessels' : 'Packages'}
          </span>
        </div>

        <p className="text-slate-500 text-xs sm:text-sm mb-6">
          {activeCategory === 'private'
            ? 'Exclusive entire-vessel charters for couples, private families, and luxury VIP groups. Dedicated captain and private chef included.'
            : 'Individual AC bedroom bookings on a luxury multi-bedroom cruiser with private ensuite bathroom and shared sundeck.'}
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {currentBoats.map(renderBoatCard)}
        </div>
      </div>
    </main>
  );
}
