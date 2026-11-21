'use client';

import { motion } from 'framer-motion';
import { Search, CalendarCheck, ThumbsUp } from 'lucide-react';

// Boat icon not in standard lucide; custom SVG
function BoatSVG({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1H2v1z" />
      <path d="M12 2L4 14h16L12 2z" />
      <path d="M12 2v12" />
    </svg>
  );
}

const steps = [
  {
    icon: Search,
    num: '01',
    title: 'Choose Your Houseboat',
    desc: 'Browse our verified fleet. Filter by bedrooms, budget, and package type.',
  },
  {
    icon: CalendarCheck,
    num: '02',
    title: 'Pick Date & Duration',
    desc: 'Select your travel dates. Overnight stays or relaxed day cruises available.',
  },
  {
    icon: BoatSVG,
    num: '03',
    title: 'Confirm & Pay Securely',
    desc: 'Pay a small advance online. Balance due at check-in. 100% refund on cancellation.',
  },
  {
    icon: ThumbsUp,
    num: '04',
    title: 'Enjoy the Backwaters',
    desc: 'Board your houseboat, relax with fresh Kerala meals and scenic waterways.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block bg-sky-50 text-sky-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 font-poppins">
            Simple Process
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-sky-100 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-sky-50 border-4 border-white rounded-2xl flex items-center justify-center mb-5 shadow-card">
                <step.icon size={28} />
              </div>
              <span className="text-sky-400 text-xs font-bold tracking-widest uppercase font-poppins mb-1">
                Step {step.num}
              </span>
              <h3 className="font-playfair text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-poppins">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
