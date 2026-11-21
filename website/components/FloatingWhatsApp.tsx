'use client';

import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip / Label */}
      <span className="hidden sm:inline-block mr-2.5 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>

      {/* Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Aquaholic,%20I%20would%20like%20to%20enquire%20about%20houseboat%20booking"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Send WhatsApp message to Aquaholic"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/40 hover:scale-108 active:scale-95 transition-all duration-300 relative cursor-pointer"
      >
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <WhatsAppIcon size={30} className="text-white fill-white relative z-10" />
      </a>
    </aside>
  );
}
