'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export type BookingTarget = {
  name: string;
  price: number;
  type: string;
};

export default function BookingModal({
  target,
  onClose,
}: {
  target: BookingTarget;
  onClose: () => void;
}) {
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
      style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-md w-full shadow-2xl border border-white/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-sky-500 p-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white p-1 text-lg">✕</button>
          <p className="text-sky-100 text-xs mb-1">Aquaholic Backwaters Booking</p>
          <h3 className="font-playfair text-xl font-bold text-white">{target.name}</h3>
          <p className="text-sky-100 text-sm mt-1">
            From ₹{target.price.toLocaleString('en-IN')} · {target.type}
          </p>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h4 className="font-playfair text-xl font-semibold text-slate-800 mb-2 leading-[1.2]">Request Received!</h4>
              <p className="text-slate-500 text-sm leading-[1.7] mb-6">
                Our local Alleppey coordinator will call you within 30 minutes to confirm your houseboat date and arrangements.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Aquaholic! I submitted a booking request for ${target.name}. Please confirm availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#25D366]/25"
                >
                  <WhatsAppIcon size={18} className="text-white fill-white" />
                  <span>Connect on WhatsApp Now</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800 placeholder:text-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800 placeholder:text-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800"
                >
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9+'].map((n) => (
                    <option key={n}>{n} Guest{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                  Activity & Food Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Fishing rods, veg/non-veg, sunset cruise, village canoe walk..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 text-slate-800 placeholder:text-slate-300 resize-none"
                />
              </div>

              {/* Action Buttons: Instant WhatsApp Message Send & Direct Submit */}
              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Aquaholic! I want to book:
• Package: ${target.name} (₹${target.price.toLocaleString('en-IN')})
• Name: ${form.name || 'Guest'}
• Phone: ${form.phone || 'Not provided'}
• Date: ${form.date || 'Flexible'}
• Guests: ${form.guests}
• Preferences: ${form.message || 'Standard'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#25D366]/25 hover:shadow-[#25D366]/40 cursor-pointer active:scale-98"
                >
                  <WhatsAppIcon size={18} className="text-white fill-white" />
                  <span>Send Booking via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  className="py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  Confirm Houseboat Booking
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400">
                No advance payment now · Free cancellation · Instant confirmation
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
