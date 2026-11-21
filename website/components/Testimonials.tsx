'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul & Priya Sharma',
    location: 'Mumbai, India',
    avatar: 'RS',
    avatarBg: 'bg-gradient-to-br from-sky-400 to-blue-600 text-white',
    rating: 5,
    text: 'Absolutely magical experience! The 2-bedroom houseboat was spotless, and the food was incredible — fresh fish curry, warm appams, and coconut pudding. The crew was so friendly and knowledgeable about the Alleppey backwaters. Already planning our return trip with Aquaholic!',
    boat: '2 Bedroom Premium Houseboat',
    trip: 'Overnight Stay · Oct 2026',
    highlight: 'Fresh Karimeen Fish Curry & Spotless Rooms',
  },
  {
    id: 2,
    name: 'James & Sarah O\'Brien',
    location: 'Dublin, Ireland',
    avatar: 'JO',
    avatarBg: 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white',
    rating: 5,
    text: 'Best travel experience we had in India! The booking was seamless with direct boat pricing and zero hidden costs. Watching the golden sunset from the open sundeck while sipping fresh tender coconut water felt like a dream. Highly recommend to anyone visiting Kerala.',
    boat: '1 Bedroom Deluxe Houseboat',
    trip: 'Overnight Stay · Sep 2026',
    highlight: 'Direct Pricing · Sunset Sundeck',
  },
  {
    id: 3,
    name: 'The Kapoor Family',
    location: 'Delhi, India',
    avatar: 'KF',
    avatarBg: 'bg-gradient-to-br from-purple-400 to-indigo-600 text-white',
    rating: 5,
    text: 'We booked the 3-bedroom luxury houseboat for our family vacation with parents and kids. Everyone loved it! The private chef prepared custom mild food for the kids, and the crew took us on peaceful village walks. Everything was as promised.',
    boat: '3 Bedroom Luxury Houseboat',
    trip: 'Overnight Stay · Aug 2026',
    highlight: 'Family Friendly · Private Chef Service',
  },
  {
    id: 4,
    name: 'Ananya Krishnan',
    location: 'Bangalore, India',
    avatar: 'AK',
    avatarBg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white',
    rating: 5,
    text: 'Did the shikara day cruise for our wedding anniversary. So quiet and intimate! Going through the narrow village canals with lotus flowers, water lilies, and bird sightings was breathtaking. Our captain knew the best photography spots!',
    boat: 'Shikara Boat Cruise',
    trip: 'Day Cruise · Nov 2026',
    highlight: 'Romantic Route · Narrow Canal Cruise',
  },
  {
    id: 5,
    name: 'Vikram & Meera Patel',
    location: 'Ahmedabad, India',
    avatar: 'VP',
    avatarBg: 'bg-gradient-to-br from-rose-400 to-pink-600 text-white',
    rating: 5,
    text: 'Celebrated our anniversary with a group of friends on the 4-bedroom Royal Heritage. The upper deck lounge, evening barbecue, and traditional Kerala banana leaf lunch exceeded all expectations. Exceptional hospitality by Aquaholic team.',
    boat: '4 Bedroom Royal Heritage',
    trip: 'Overnight Cruise · Jul 2026',
    highlight: 'Upper Deck Lounge · Traditional Sadhya',
  },
];

// Motion variants for smooth Left-to-Right auto slide
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? -100 : 100, // enters from left when moving left-to-right
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 100 : -100, // exits to right when moving left-to-right
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = left to right
  const [isPaused, setIsPaused] = useState(false);

  // Auto-running timer (advances one by one every 4.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="reviews" className="relative py-[15px] bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-50 font-poppins border-t border-slate-100 overflow-hidden">
      {/* Ambient background glow spheres */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-[15px]">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2.5">
            What Our <span className="text-sky-600">Guests Say</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-slate-500 text-xs sm:text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-slate-800">4.9 / 5.0</span>
            <span>· Verified Backwater Guest Reviews</span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <CheckCircle2 size={12} />
              100% Real Travelers
            </span>
          </div>
        </div>

        {/* 
          Auto-running Carousel (One by One left-to-right) 
          Pauses on mouse hover so the guest can read easily
        */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Glassmorphism Review Card */}
          <div className="relative bg-white/75 backdrop-blur-2xl rounded-3xl border border-white/90 shadow-[0_12px_40px_0_rgba(15,23,42,0.08)] p-6 sm:p-8 md:p-10 min-h-[310px] sm:min-h-[290px] flex flex-col justify-between overflow-hidden">
            
            {/* Top Auto-run Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
              <motion.div
                key={`${currentIndex}-${isPaused}`}
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '0%' : '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-sky-400 to-sky-600"
              />
            </div>

            {/* Decorative Quote mark */}
            <Quote size={52} className="absolute top-5 right-6 text-sky-100/90 pointer-events-none select-none" />

            {/* Slide Area */}
            <div className="relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Top Bar: Stars + Highlight Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(current.rating)].map((_, j) => (
                        <Star key={j} size={17} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="inline-block text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/70 px-3 py-1 rounded-full">
                      ★ {current.highlight}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-poppins mb-6 italic">
                    &ldquo;{current.text}&rdquo;
                  </p>

                  {/* Reviewer Details */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-200/70">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ${current.avatarBg}`}>
                        {current.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm sm:text-base leading-tight">
                          {current.name}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {current.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sky-600 text-xs sm:text-sm font-semibold">
                        {current.boat}
                      </p>
                      <p className="text-slate-400 text-[11px] sm:text-xs">
                        {current.trip}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls & Pagination Bar */}
          <div className="flex items-center justify-center mt-5">
            {/* Navigation Buttons & Number Indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-sm hover:bg-sky-500 hover:text-white text-slate-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots / Pills */}
              <div className="flex items-center gap-1.5 mx-1">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full h-2 ${
                      idx === currentIndex
                        ? 'w-6 bg-sky-500'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next review"
                className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-sm hover:bg-sky-500 hover:text-white text-slate-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
