'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What are the check-in and check-out timings for overnight houseboats?',
    a: 'Normal check-in time for overnight houseboats is 12:00 PM (Noon), and check-out is the next morning at 9:00 AM. For day cruises, timings are usually 11:00 AM to 5:00 PM.',
  },
  {
    q: 'Are meals included in the houseboat package?',
    a: 'Yes! All overnight packages include traditional Kerala lunch, evening tea with snacks, dinner, and breakfast the next morning. Both vegetarian and non-vegetarian (fresh backwater fish/chicken) options are served by your onboard private chef.',
  },
  {
    q: 'Is air conditioning available throughout the day?',
    a: 'In Deluxe houseboats, bedroom AC operates from 9:00 PM to 6:00 AM. In Premium and Luxury category houseboats, full-time (24-hour) AC is provided in both bedrooms and living areas.',
  },
  {
    q: 'Do I need to pay the full amount in advance to book?',
    a: 'No! You only need to pay a minimal token advance (around 20% to 30%) to confirm your booking and lock in the boat. The remaining balance can be paid directly upon check-in at Alleppey.',
  },
  {
    q: 'Is it safe for families with young children and elderly people?',
    a: 'Absolutely. All houseboats are government-inspected and certified, equipped with life jackets, fire extinguishers, first-aid kits, and an experienced 3-member crew (captain, engine driver, chef) dedicated to your comfort and safety.',
  },
  {
    q: 'What is the route taken during the backwater cruise?',
    a: 'The cruise departs from Alleppey finishing point/Punnamada and traverses the scenic Vembanad Lake, serene Kuttanad paddy canal networks, village waterways, and docks at a tranquil lake bank overnight.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            <HelpCircle size={14} />
            Common Queries
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-slate-800 leading-[1.2]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-base mt-2 leading-[1.7]">
            Everything you need to know about booking and enjoying your Kerala backwater safari.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors duration-200 hover:border-sky-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-slate-800 text-base md:text-lg pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-sky-500 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-[15px] md:text-base leading-[1.7] border-t border-slate-50 bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick query banner */}
        <div className="mt-12 p-6 md:p-8 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-playfair text-xl font-semibold text-slate-800 leading-[1.2]">Have questions not listed here?</h3>
            <p className="text-slate-600 text-sm mt-0.5 leading-[1.7]">
              Talk directly with our local Alleppey houseboat coordinator.
            </p>
          </div>
          <a
            href="tel:+919876543210"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            Call Us Anytime
          </a>
        </div>
      </div>
    </section>
  );
}
