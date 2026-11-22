'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, BedDouble, Utensils, Wifi, Star, ArrowRight, CheckCircle, Zap } from 'lucide-react';

type Boat = {
  id: number;
  name: string;
  type: string;
  tag: 'Most Popular' | 'Best Value' | 'Premium' | 'Adventure' | 'Romantic';
  tagColor: string;
  bedrooms: number;
  guests: number;
  image: string;
  priceNight: number;
  priceDay: number;
  rating: number;
  reviews: number;
  includes: string[];
  highlight: string;
  category: string;
};

const boats: Boat[] = [
  {
    id: 1,
    name: '1 Bedroom Deluxe Houseboat',
    type: 'Overnight Stay',
    tag: 'Best Value',
    tagColor: 'badge-green',
    bedrooms: 1,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700&q=80&fit=crop',
    priceNight: 7500,
    priceDay: 4500,
    rating: 4.8,
    reviews: 128,
    includes: ['Breakfast & Dinner', 'AC Bedroom', 'Private Sundeck', 'Experienced Crew'],
    highlight: 'Perfect for honeymooners & couples',
    category: '1 Bedroom',
  },
  {
    id: 2,
    name: '2 Bedroom Premium Houseboat',
    type: 'Overnight Stay',
    tag: 'Most Popular',
    tagColor: 'badge-blue',
    bedrooms: 2,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=700&q=80&fit=crop',
    priceNight: 12500,
    priceDay: 7500,
    rating: 4.9,
    reviews: 214,
    includes: ['All Meals Included', '2 AC Bedrooms', 'Open Deck', 'Cook & Crew'],
    highlight: 'Best seller for families & groups',
    category: '2 Bedroom',
  },
  {
    id: 3,
    name: '3 Bedroom Luxury Houseboat',
    type: 'Overnight Stay',
    tag: 'Premium',
    tagColor: 'badge-orange',
    bedrooms: 3,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=700&q=80&fit=crop',
    priceNight: 18000,
    priceDay: 11000,
    rating: 4.9,
    reviews: 96,
    includes: ['Chef-cooked Meals', '3 AC Bedrooms', 'Jacuzzi Deck', 'Butler Service'],
    highlight: 'Ultimate luxury for large groups',
    category: '3 Bedroom',
  },
  {
    id: 4,
    name: '1 Bedroom Day Cruise',
    type: 'Day Cruise',
    tag: 'Best Value',
    tagColor: 'badge-green',
    bedrooms: 1,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80&fit=crop',
    priceNight: 0,
    priceDay: 3500,
    rating: 4.7,
    reviews: 183,
    includes: ['Lunch Included', 'Village Tour', 'Fishing Activity', 'Scenic Canals'],
    highlight: '8-hour backwater day experience',
    category: 'Day Cruise',
  },
  {
    id: 5,
    name: 'Shikara Boat Ride',
    type: 'Day Cruise',
    tag: 'Romantic',
    tagColor: 'badge-orange',
    bedrooms: 0,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=700&q=80&fit=crop',
    priceNight: 0,
    priceDay: 1500,
    rating: 4.8,
    reviews: 311,
    includes: ['2-hour Cruise', 'Village Canals', 'Sunset Views', 'Photography Spots'],
    highlight: 'Intimate shikara for couples',
    category: 'Day Cruise',
  },
  {
    id: 6,
    name: '4 Bedroom Royal Houseboat',
    type: 'Overnight Stay',
    tag: 'Premium',
    tagColor: 'badge-orange',
    bedrooms: 4,
    guests: 8,
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=700&q=80&fit=crop',
    priceNight: 28000,
    priceDay: 18000,
    rating: 5.0,
    reviews: 44,
    includes: ['Gourmet Meals', '4 AC Bedrooms', 'Pool Deck', 'Private Chef + Staff'],
    highlight: 'Royal party & corporate retreats',
    category: '4 Bedroom',
  },
];


function BoatCard({ boat, onBook }: { boat: Boat; onBook: (b: Boat) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={boat.image}
          alt={boat.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Tag */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${boat.tagColor}`}>
          {boat.tag}
        </div>
        {/* Instant badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-semibold text-sky-600">
          <Zap size={10} className="fill-sky-500 text-sky-500" />
          Instant Confirm
        </div>
        {/* Rating overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{boat.rating}</span>
          <span className="text-white/70">({boat.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
          {boat.bedrooms > 0 && (
            <span className="flex items-center gap-1"><BedDouble size={12} /> {boat.bedrooms} Bedroom{boat.bedrooms > 1 ? 's' : ''}</span>
          )}
          <span className="flex items-center gap-1"><Users size={12} /> Up to {boat.guests} guests</span>
          <span className="flex items-center gap-1 text-sky-500">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
            {boat.type}
          </span>
        </div>

        <h3 className="font-playfair text-lg font-bold text-slate-800 mb-1 leading-tight">{boat.name}</h3>
        <p className="text-sky-600 text-xs font-medium mb-4">{boat.highlight}</p>

        {/* Inclusions */}
        <div className="grid grid-cols-2 gap-1.5 mb-5">
          {boat.includes.map((inc) => (
            <div key={inc} className="flex items-center gap-1.5 text-xs text-slate-600">
              <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
              {inc}
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            {boat.priceNight > 0 && (
              <div>
                <p className="text-[10px] text-slate-400">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-playfair text-2xl font-bold text-slate-800">₹{boat.priceNight.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-400">/night</span>
                </div>
                {boat.priceDay > 0 && (
                  <p className="text-xs text-slate-400">Day cruise from ₹{boat.priceDay.toLocaleString('en-IN')}</p>
                )}
              </div>
            )}
            {boat.priceNight === 0 && (
              <div>
                <p className="text-[10px] text-slate-400">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-playfair text-2xl font-bold text-slate-800">₹{boat.priceDay.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-400">/day</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onBook(boat)}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-md shadow-sky-100 flex-shrink-0"
          >
            Book Now <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BoatListings() {
  const [bookingBoat, setBookingBoat] = useState<Boat | null>(null);

  return (
    <section id="listings" className="py-14 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800">
            Available Houseboats & Packages
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Handpicked luxury houseboats in Alleppey · All prices include private chef, fuel & taxes
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boats.map((boat) => (
            <BoatCard key={boat.id} boat={boat} onBook={setBookingBoat} />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingBoat && (
        <BookingModal boat={bookingBoat} onClose={() => setBookingBoat(null)} />
      )}
    </section>
  );
}

function BookingModal({ boat, onClose }: { boat: Boat; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '2', message: '' });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-sky-500 p-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-1">✕</button>
          <p className="text-sky-100 text-xs mb-1">Booking Request</p>
          <h3 className="font-playfair text-xl font-bold text-white">{boat.name}</h3>
          <p className="text-sky-100 text-sm mt-1">
            From ₹{(boat.priceNight || boat.priceDay).toLocaleString('en-IN')}
            {boat.priceNight > 0 ? '/night' : '/day'} · {boat.type}
          </p>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h4 className="font-playfair text-xl font-bold text-slate-800 mb-2">Request Sent!</h4>
              <p className="text-slate-500 text-sm mb-5">
                Our team will call you within 30 minutes to confirm your booking.
              </p>
              <button onClick={onClose} className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-semibold text-sm">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Your Name *</label>
                <input required type="text" placeholder="Full name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800 placeholder:text-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Phone *</label>
                  <input required type="tel" placeholder="+91 XXXXX" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800 placeholder:text-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Date</label>
                  <input type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Guests</label>
                <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800"
                >
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9+'].map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Special Requests</label>
                <textarea rows={2} placeholder="Honeymoon decoration, veg meals, early check-in…"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800 placeholder:text-slate-300 resize-none"
                />
              </div>
              <button type="submit"
                className="py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-sky-200"
              >
                Confirm Booking Request
              </button>
              <p className="text-center text-xs text-slate-400">
                Free cancellation · No advance required · We&apos;ll call within 30 mins
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
