'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard, Utensils, ThumbsUp, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Government Approved Boats',
    desc: 'All our houseboats are safety certified and regularly inspected for safety standards.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    desc: 'What you see is what you pay. No hidden charges, no last-minute surprises.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Utensils,
    title: 'Authentic Kerala Meals',
    desc: 'Fresh fish curry, appam, karimeen — cooked by experienced local chefs on board.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    desc: 'Check-in from 12 PM. Overnight stays, 8-hour day cruises, or custom durations.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ThumbsUp,
    title: 'Best Price Guarantee',
    desc: 'Find it cheaper elsewhere? We\'ll match the price and add a complimentary upgrade.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    desc: 'Our team is always reachable by phone, WhatsApp, or email — before and during your trip.',
    color: 'bg-pink-50 text-pink-600',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-slate-800 leading-[1.2]">
              Kerala&apos;s Most Trusted<br />Houseboat Platform
            </h2>
          </div>
          <div className="flex gap-8">
            {[
              { value: '500+', label: 'Happy Guests' },
              { value: '15+', label: 'Years Experience' },
              { value: '4.9★', label: 'Avg. Rating' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-playfair text-3xl font-bold text-sky-600">{s.value}</p>
                <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-sky-200 hover:shadow-card transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${r.color}`}>
                <r.icon size={22} />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-slate-800 mb-2 leading-[1.2]">{r.title}</h3>
              <p className="text-slate-600 text-sm leading-[1.7]">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
