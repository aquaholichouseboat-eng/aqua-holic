'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Users,
  CheckCircle2,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  LifeBuoy,
} from 'lucide-react';
import { Activity, activities } from '@/data/activities';
import Navbar from './Navbar';
import WhatsAppIcon from './WhatsAppIcon';
import BookingModal from './BookingModal';
import Footer from './Footer';

export default function ActivityDetailClient({ act }: { act: Activity }) {
  const [activeImage, setActiveImage] = useState(act.image);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 sm:pt-24 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      {/* Same Unified Floating Navbar as Index Page */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full min-w-0 pb-24">
        {/* Breadcrumb & Quick Back Link */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 min-w-0 font-medium">
            <Link href="/" className="hover:text-sky-600 transition-colors shrink-0">Home</Link>
            <span>/</span>
            <Link href="/#activities" className="hover:text-sky-600 transition-colors shrink-0">Activities</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-[140px] sm:max-w-none">{act.title}</span>
          </nav>
          <Link
            href="/#activities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors bg-white hover:bg-sky-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-xs shrink-0"
          >
            <ArrowLeft size={14} />
            <span>All Activities</span>
          </Link>
        </div>

        {/* Title & Quick Stats Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="bg-sky-500/10 text-sky-600 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                {act.tag}
              </span>
              <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                <ShieldCheck size={13} />
                Safety Certified Equipment
              </span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 break-words leading-[1.2]">
              {act.title}
            </h1>
            <p className="text-slate-500 text-[15px] sm:text-base mt-2 max-w-2xl leading-[1.7]">
              {act.desc}
            </p>
          </div>

          {/* Quick Header Badge */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-4 py-2 rounded-2xl text-xs font-medium shrink-0">
            <CheckCircle2 size={16} />
            <span>Direct Activity Operator · Life Jackets Included</span>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 w-full min-w-0">
          <div className="lg:col-span-2 relative h-72 sm:h-96 md:h-[440px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 w-full min-w-0">
            <Image
              src={activeImage}
              alt={act.title}
              fill
              priority
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                {act.duration} · {act.capacity}
              </span>
              <span className="text-xs text-white/80">Vembanad Lake & Alleppey Canals</span>
            </div>
          </div>

          <div className="w-full min-w-0 flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {(act.gallery || []).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative flex-none w-32 sm:w-40 lg:w-full h-24 sm:h-28 lg:h-34 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === img ? 'border-sky-500 ring-2 ring-sky-300' : 'border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" sizes="200px" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 w-full min-w-0">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold truncate">Duration</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800 truncate">{act.duration}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Group Capacity</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800">{act.capacity}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <LifeBuoy size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Safety Gear</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800">Life Jackets Provided</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections - Full Width Layout without the right side block */}
        <div className="space-y-8 mb-16">
          {/* Description & Highlights */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="font-playfair text-2xl font-semibold text-slate-800 mb-4 leading-[1.2]">
              Activity Overview
            </h2>
            <p className="text-slate-600 leading-[1.7] text-[15px] sm:text-base">
              {act.longDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-100 font-medium">
              {(act.highlights || []).map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Sparkles size={16} className="text-sky-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="font-playfair text-2xl font-semibold text-slate-800 mb-4 leading-[1.2]">
              What&apos;s Included in Your Package
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 font-medium">
              {(act.inclusions || []).map((inc, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Guidelines */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={22} className="text-sky-600" />
              <h2 className="font-playfair text-2xl font-semibold text-slate-800 leading-[1.2]">
                Safety Standards
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 font-medium">
              {(act.safety || []).map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Activities */}
        <div className="border-t border-slate-200 pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-slate-800 leading-[1.2]">
              Explore More Water Activities
            </h2>
            <Link href="/#activities" className="text-xs sm:text-sm font-semibold text-sky-600 hover:underline">
              View All Activities →
            </Link>
          </div>

          {/* Other Activities Grid: 2 columns on mobile side by side, 3 columns on tablet/desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
            {activities
              .filter((a) => a.slug !== act.slug)
              .slice(0, 3)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/activities/${other.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col h-full"
                >
                  <div className="relative h-28 sm:h-36 md:h-44 w-full overflow-hidden">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 350px"
                    />
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/55 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-semibold shadow-xs">
                      ₹{other.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-1.5">
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-sky-600 transition-colors line-clamp-1">
                        {other.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                        {other.desc}
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-sky-600 mt-1 block">
                      View Activity →
                    </span>
                  </div>
                </Link>
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
        aria-label="Book activity"
        className="fixed bottom-4 sm:bottom-6 left-3 sm:left-4 right-3 sm:right-4 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl p-1.5 sm:p-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-200/90 flex items-center gap-2 sm:gap-2.5 w-full max-w-sm sm:max-w-md">
          {/* Left Pill: Price Button */}
          <div className="flex-1 bg-[#dcead7] text-[#21381c] py-3 sm:py-3.5 px-3 sm:px-4 rounded-full flex items-center justify-center gap-1.5 text-center shadow-xs">
            <span className="font-playfair text-base sm:text-lg font-bold leading-none">
              ₹{act.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#21381c]/75 font-medium leading-none">
              {act.unit}
            </span>
          </div>

          {/* Right Pill: Book Now Button with Original WhatsApp Icon */}
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Hello Aquaholic! I would like to book the ${act.title} (₹${act.price.toLocaleString('en-IN')}). Please confirm time slots and availability.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 sm:py-3.5 px-3 sm:px-4 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
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
            name: act.title,
            price: act.price,
            type: act.duration,
          }}
          onClose={() => setBookingOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
