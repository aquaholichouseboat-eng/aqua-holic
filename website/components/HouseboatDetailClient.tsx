'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  BedDouble,
  Users,
  Clock,
  CheckCircle2,
  Phone,
  ShieldCheck,
  ArrowLeft,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import { Houseboat, houseboats } from '@/data/houseboats';
import Navbar from './Navbar';
import WhatsAppIcon from './WhatsAppIcon';
import BookingModal from './BookingModal';
import Footer from './Footer';

export default function HouseboatDetailClient({ boat }: { boat: Houseboat }) {
  const [activeImage, setActiveImage] = useState(boat.image);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-800 pt-20 sm:pt-24 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      {/* Same Unified Floating Navbar as Index Page */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full min-w-0 pb-24">
        {/* Breadcrumb & Quick Back Link */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 min-w-0">
            <Link href="/" className="hover:text-sky-600 transition-colors shrink-0">Home</Link>
            <span>/</span>
            <Link href="/#houseboats" className="hover:text-sky-600 transition-colors shrink-0">Houseboats</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-[140px] sm:max-w-none">{boat.title}</span>
          </nav>
          <Link
            href="/#houseboats"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors bg-white hover:bg-sky-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-xs shrink-0"
          >
            <ArrowLeft size={14} />
            <span>All Houseboats</span>
          </Link>
        </div>

        {/* Title & Quick Stats Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="bg-sky-500/10 text-sky-600 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                {boat.tag}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2.5 py-1 rounded-full text-xs font-semibold">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{boat.rating}</span>
                <span className="text-slate-400 font-normal">({boat.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 break-words">
              {boat.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {boat.desc}
            </p>
          </div>

          {/* Quick Header Badge */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-4 py-2 rounded-2xl text-xs font-medium shrink-0">
            <CheckCircle2 size={16} />
            <span>Direct Boat Rate · Zero Middleman Markup</span>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 w-full min-w-0">
          <div className="lg:col-span-2 relative h-72 sm:h-96 md:h-[440px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 w-full min-w-0">
            <Image
              src={activeImage}
              alt={boat.title}
              fill
              priority
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                {boat.stay} · {boat.capacity}
              </span>
              <span className="text-xs text-white/80">Alleppey (Alappuzha) Backwaters</span>
            </div>
          </div>

          <div className="w-full min-w-0 flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {(boat.gallery || []).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative flex-none w-32 sm:w-40 lg:w-full h-24 sm:h-28 lg:h-34 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === img ? 'border-sky-500 ring-2 ring-sky-300' : 'border-slate-200 opacity-80 hover:opacity-100'
                  }`}
              >
                <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" sizes="200px" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 w-full min-w-0">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <BedDouble size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold truncate">Bedrooms</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800 truncate">{boat.bedrooms} AC Bedroom{boat.bedrooms > 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold truncate">Capacity</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800 truncate">{boat.capacity}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold truncate">Check-in / out</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800 truncate">12:00 PM – 9:00 AM</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <UtensilsCrossed size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold truncate">Meal Plan</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800 truncate">All 4 Kerala Meals</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections - Full Width Layout without the right side block */}
        <div className="space-y-8 mb-16 w-full min-w-0">
          {/* Description & Highlights */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-4">
              About this Houseboat Experience
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {boat.longDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-100">
              {(boat.highlights || []).map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Sparkles size={16} className="text-sky-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-4">
              What&apos;s Included in Your Cruise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {(boat.inclusions || []).map((inc, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Onboard Traditional Kerala Menu */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed size={22} className="text-sky-600" />
              <h2 className="font-playfair text-2xl font-bold text-slate-800">
                Onboard Dining Menu
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Freshly prepared live on boat by your private culinary chef. Veg and custom non-veg options available upon request.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {(boat.menu || []).map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Houseboats */}
        <div className="border-t border-slate-200 pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold text-slate-800">
              Explore Other Houseboats
            </h2>
            <Link href="/houseboats" className="text-xs sm:text-sm font-semibold text-sky-600 hover:underline">
              View All Houseboats →
            </Link>
          </div>

          {/* Other Houseboats Grid: 2 columns on mobile side by side, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
            {houseboats
              .filter((b) => b.slug !== boat.slug)
              .slice(0, 4)
              .map((other) => (
                <div key={other.id} className="flex flex-col min-w-0 w-full">
                  <Link
                    href={`/houseboats/${other.slug}`}
                    aria-label={`View details for ${other.title}`}
                    className="relative rounded-[20px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-md border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_16px_40px_rgba(14,165,233,0.22)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-24 sm:h-32 md:h-36 w-full overflow-hidden">
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/30 to-transparent" />
                    </div>

                    <div className="flex items-center justify-center gap-1 my-1.5">
                      <span className="w-1 h-1 rounded-full bg-white shadow-xs" />
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                    </div>

                    <div className="p-2 sm:p-3 md:p-3.5 flex flex-col flex-1 justify-between gap-1.5">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h3 className="font-poppins font-bold text-xs sm:text-sm text-white group-hover:text-sky-300 transition-colors tracking-tight leading-tight truncate">
                            {other.title}
                          </h3>
                          <div className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-semibold text-[10px] sm:text-xs border border-white/10 w-fit shrink-0 shadow-xs">
                            ₹{other.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <p className="text-white/70 text-[9px] sm:text-[11px] leading-tight mb-1.5 line-clamp-1 sm:line-clamp-2">
                          {other.desc}
                        </p>
                        <div className="flex flex-wrap items-center gap-1 mb-1">
                          {(other.chips || []).slice(0, 2).map((chip) => (
                            <span
                              key={chip}
                              className="inline-flex items-center bg-white/12 backdrop-blur-md text-white/90 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium border border-white/10 truncate max-w-full"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between text-[9px] sm:text-[11px] text-sky-400/90 font-medium group-hover:text-sky-300">
                        <span>View Package</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* 
        FLOATING BOTTOM ACTION PILL (Matching user reference design):
        - White rounded capsule
        - Left button: soft pastel green pill showing Price (like 'Add to Cart')
        - Right button: solid button with original WhatsApp icon showing Book Now (like 'Buy Now')
      */}
      <aside
        aria-label="Book houseboat"
        className="fixed bottom-4 sm:bottom-6 left-3 sm:left-4 right-3 sm:right-4 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl p-1.5 sm:p-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-200/90 flex items-center gap-2 sm:gap-2.5 w-full max-w-sm sm:max-w-md">
          {/* Left Pill: Price Button */}
          <div className="flex-1 bg-[#dcead7] text-[#21381c] py-3 sm:py-3.5 px-3 sm:px-4 rounded-full flex items-center justify-center gap-1.5 text-center shadow-xs">
            <span className="font-playfair text-base sm:text-lg font-bold leading-none">
              ₹{boat.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#21381c]/75 font-medium leading-none">
              {boat.unit}
            </span>
          </div>

          {/* Right Pill: Book Now Button with Original WhatsApp Icon */}
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Hello Aquaholic! I would like to book the ${boat.title} (₹${boat.price.toLocaleString('en-IN')}). Please confirm dates and availability.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 sm:py-3.5 px-3 sm:px-4 rounded-full font-semibold text-xs sm:text-sm font-poppins flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <WhatsAppIcon size={18} className="text-white fill-white shrink-0" />
            <span>Book Now</span>
          </a>
        </div>
      </aside>

      {/* Booking Modal */}
      {bookingOpen && (
        <BookingModal
          target={{
            name: boat.title,
            price: boat.price,
            type: boat.stay,
          }}
          onClose={() => setBookingOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
