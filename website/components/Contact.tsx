'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface ContactProps {
  data?: {
    phone?: string;
    phoneRaw?: string;
    whatsappNumber?: string;
    whatsappRaw?: string;
    email?: string;
    addressTitle?: string;
    addressLine1?: string;
    addressLine2?: string;
    workingHours?: string;
    googleMapsUrl?: string;
  };
}

export default function Contact({ data }: ContactProps) {
  const phone = data?.phone || '+91 98765 43210';
  const phoneRaw = data?.phoneRaw || '+919876543210';
  const waNumber = data?.whatsappNumber || '+91 98765 43210';
  const waRaw = data?.whatsappRaw || '919876543210';
  const email = data?.email || 'booking@aquaholic.in';
  const addressTitle = data?.addressTitle || 'Punnamada Jetty';
  const addressLine1 = data?.addressLine1 || 'Finishing Point Road, Punnamada,';
  const addressLine2 = data?.addressLine2 || 'Alleppey (Alappuzha), Kerala 688013';
  const workingHours = data?.workingHours || '6:00 AM – 10:00 PM Daily';

  return (
    <section id="contact" className="py-[15px] bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 font-poppins border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-[15px]">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800">
            Get in Touch with <span className="text-sky-600">AquaHolic</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2">
            No login required. Reach us directly via WhatsApp, direct call, or email for instant houseboat quotes and availability.
          </p>
        </div>

        {/* Direct Contact Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {/* Card 1: WhatsApp Instant Booking */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/90 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-5 border border-[#25D366]/30 shadow-sm">
                <WhatsAppIcon size={24} />
              </div>
              <span className="text-[#25D366] text-xs font-semibold uppercase tracking-wider block mb-1">
                Fastest Response
              </span>
              <h3 className="font-playfair text-xl font-bold text-slate-800 mb-2">
                Chat on WhatsApp
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                Receive live houseboat photos, customized itineraries, and instant quotes directly on WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/${waRaw}?text=Hello%20Aquaholic,%20I%20would%20like%20to%20enquire%20about%20houseboat%20booking`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#25D366]/25 hover:shadow-[#25D366]/40 active:scale-98 cursor-pointer"
            >
              <WhatsAppIcon size={18} className="text-white fill-white" />
              <span>Message {waNumber}</span>
            </a>
          </div>

          {/* Card 2: Phone Hotline */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/90 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-5 border border-sky-500/20 shadow-sm">
                <Phone size={24} />
              </div>
              <span className="text-sky-600 text-xs font-semibold uppercase tracking-wider block mb-1">
                Call Our Coordinator
              </span>
              <h3 className="font-playfair text-xl font-bold text-slate-800 mb-2">
                Direct Phone Call
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-2">
                Speak directly with our Alleppey cruise manager for same-day bookings and special dietary requests.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
                <Clock size={13} className="text-sky-500" />
                <span>{workingHours}</span>
              </div>
            </div>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-sky-500/20 hover:shadow-sky-500/35"
            >
              <Phone size={16} />
              <span>Call {phone}</span>
            </a>
          </div>

          {/* Card 3: Boarding Jetty & Email */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/90 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5 border border-amber-500/20 shadow-sm">
                <MapPin size={24} />
              </div>
              <span className="text-amber-600 text-xs font-semibold uppercase tracking-wider block mb-1">
                Boarding Jetty &amp; Email
              </span>
              <h3 className="font-playfair text-xl font-bold text-slate-800 mb-2">
                {addressTitle}
              </h3>
              <p className="text-slate-700 font-medium text-xs sm:text-sm mb-1">
                {addressLine1}
              </p>
              <p className="text-slate-400 text-xs mb-3">
                {addressLine2}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
                <Mail size={13} className="text-amber-600" />
                <a href={`mailto:${email}`} className="hover:text-sky-600 font-semibold underline">
                  {email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={data?.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(addressTitle + ' ' + addressLine1 + ' ' + addressLine2)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold text-xs text-center transition-colors shadow-sm"
              >
                View on Google Maps
              </a>
              <a
                href={`mailto:${email}`}
                className="px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-xs transition-colors shadow-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
