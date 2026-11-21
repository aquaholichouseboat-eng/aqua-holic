'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ArrowRight, Check, Compass, Sparkles } from 'lucide-react';
import BookingModal, { BookingTarget } from './BookingModal';

const houseboatPackages = [
  {
    id: 1,
    tag: 'Best Value',
    tagColor: 'bg-emerald-500 text-white',
    title: 'Deluxe Houseboat Safari',
    subtitle: 'Classic Backwater & Village Life',
    price: 7500,
    unit: '/ night',
    capacity: '1–2 Bedrooms · Up to 4 Guests',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&fit=crop',
    rating: 4.8,
    reviews: 142,
    boatSpecs: ['AC Bedroom (Night)', 'Private Sundeck', 'Dedicated Chef & Captain'],
    activities: [
      '🛶 Traditional Village Canoe Canal Tour',
      '🎣 Backwater Fishing with Local Rods',
      '🍲 4 Fresh Kerala Meals (Karimeen Fish Fry)',
      '🌅 Sunset Point Cruising & Lake Docking',
      '🚶 Paddy Field & Village Walkway Tour',
    ],
  },
  {
    id: 2,
    tag: 'Most Popular',
    tagColor: 'bg-sky-500 text-white',
    title: 'Premium Luxury Houseboat',
    subtitle: 'All-Day AC & Island Adventure',
    price: 12500,
    unit: '/ night',
    capacity: '2–3 Bedrooms · Up to 8 Guests',
    image: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=800&q=80&fit=crop',
    rating: 4.9,
    reviews: 218,
    boatSpecs: ['Full-Time (24/7) AC', 'Glass-Walled Living Lounge', '3-Member Crew'],
    activities: [
      '🚤 Private Shikara Narrow Canal Ride',
      '👨‍🍳 Live Cooking Masterclass with Chef',
      '🌴 Island Coconut Grove & Coir Village Visit',
      '🕯️ Candlelight Sundeck Dinner under Stars',
      '☕ Evening Tea, Banana Fritters & Snacks',
    ],
  },
  {
    id: 3,
    tag: 'Ultra Luxury',
    tagColor: 'bg-amber-500 text-white',
    title: 'Royal Heritage Houseboat',
    subtitle: 'VIP Cruise & Full Eco Activities',
    price: 18000,
    unit: '/ night',
    capacity: '3–4 Bedrooms · Up to 12 Guests',
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&q=80&fit=crop',
    rating: 5.0,
    reviews: 86,
    boatSpecs: ['Jacuzzi on Upper Deck', 'Presidential Suites', 'Personal Butler'],
    activities: [
      '🚣 Guided Kayaking in Kuttanad Waterways',
      '🦅 Vembanad Lake Bird Sanctuary Cruise',
      '🦞 Grand Seafood Feast (Jumbo Prawns & Crab)',
      '🎶 Evening Traditional Backwater Folk Music',
      '📸 Drone Photography Session Assistance',
    ],
  },
];

export default function Services() {
  const [selectedBooking, setSelectedBooking] = useState<BookingTarget | null>(null);

  return (
    <section id="services" className="py-14 md:py-24 bg-slate-900 text-white relative overflow-hidden font-poppins">
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles size={13} className="text-sky-400" />
              Houseboat Packages with Activities
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Houseboat Bookings & <span className="text-sky-400">Full Activities</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-2 max-w-2xl">
              Every houseboat stay includes cruising, private chef meals, and authentic Kerala backwater village activities.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-sky-300 md:hidden">
            <span>← Swipe left to right to see all 3 packages →</span>
          </div>
        </div>

        {/* 
          3-Card Container:
          - Mobile: Horizontal scrollable flex with 2 full cards + half of 3rd card visible (~43vw per card)
          - Desktop (md:): Clean 3-column grid
        */}
        <div className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6 overflow-x-auto pb-4 pt-1 px-1 sm:px-0 scrollbar-none snap-x snap-mandatory">
          {houseboatPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex-none w-[44vw] min-w-[210px] max-w-[340px] sm:w-[40vw] md:w-auto snap-start flex flex-col"
            >
              <div className="bg-slate-800/90 rounded-2xl sm:rounded-3xl border border-slate-700/80 overflow-hidden hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col h-full group">
                {/* Image header */}
                <div className="relative h-36 sm:h-48 md:h-52 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 45vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                  
                  {/* Tag */}
                  <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${pkg.tagColor}`}>
                    {pkg.tag}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs text-white">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{pkg.rating}</span>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-2 left-2.5 sm:bottom-3 sm:left-3">
                    <p className="text-[10px] sm:text-xs text-slate-300">Starting from</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-playfair text-lg sm:text-2xl font-bold text-white">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">{pkg.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-playfair text-sm sm:text-lg md:text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-sky-400 text-[10px] sm:text-xs font-medium mt-0.5 mb-2 line-clamp-1">
                      {pkg.subtitle}
                    </p>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-medium mb-3">
                      {pkg.capacity}
                    </p>

                    {/* Boat Inclusions */}
                    <div className="space-y-1 py-2 border-t border-slate-700/60 mb-2">
                      <p className="text-[9px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Houseboat Features:
                      </p>
                      {pkg.boatSpecs.map((spec) => (
                        <div key={spec} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300">
                          <Check size={11} className="text-sky-400 flex-shrink-0" />
                          <span className="line-clamp-1">{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Full Activities Included */}
                    <div className="bg-slate-900/70 rounded-xl p-2.5 sm:p-3 border border-slate-700/50 space-y-1.5">
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        <Compass size={12} className="text-amber-400" />
                        Full Activities Included:
                      </div>
                      {pkg.activities.map((act) => (
                        <div key={act} className="text-[10px] sm:text-xs text-slate-300 leading-snug line-clamp-1 sm:line-clamp-none">
                          {act}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() =>
                      setSelectedBooking({
                        name: pkg.title,
                        price: pkg.price,
                        type: 'Overnight Houseboat with Full Activities',
                      })
                    }
                    className="w-full py-2.5 sm:py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold text-xs sm:text-sm font-poppins shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Book Houseboat</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedBooking && (
        <BookingModal target={selectedBooking} onClose={() => setSelectedBooking(null)} />
      )}
    </section>
  );
}
