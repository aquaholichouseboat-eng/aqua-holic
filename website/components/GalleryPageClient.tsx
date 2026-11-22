'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppIcon from './WhatsAppIcon';
import { galleryItems, GalleryItem } from '@/data/gallery';
import { urlForImage } from '@/lib/sanity/image';

interface GalleryPageClientProps {
  initialItems?: GalleryItem[];
}

export default function GalleryPageClient({ initialItems }: GalleryPageClientProps) {
  const rawItems = initialItems && initialItems.length > 0 ? initialItems : galleryItems;

  const items: GalleryItem[] = rawItems.map((item, idx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityImage = (item as any).image;
    const resolvedSrc =
      urlForImage(sanityImage) ||
      item.src ||
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop';
    return {
      id: item.id || idx + 1,
      src: resolvedSrc,
      alt: item.alt || item.title || 'Kerala Backwaters',
      title: item.title,
      category: item.category || 'backwaters',
      categoryLabel: item.categoryLabel || 'Backwaters',
    };
  });

  const [selected, setSelected] = useState<null | GalleryItem>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-50 text-slate-800 pt-20 sm:pt-24 flex flex-col justify-between">
      {/* Same Unified Floating Navbar as Index Page */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 flex-1 w-full pb-20">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Full Gallery</span>
          </nav>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors bg-white hover:bg-sky-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-800 leading-[1.2]">
            Kerala Backwaters <span className="text-sky-600">Photo Gallery</span>
          </h1>
          <p className="text-slate-500 text-[15px] sm:text-base mt-2 leading-[1.7] max-w-2xl mx-auto">
            Take a visual tour through our private & sharing houseboats, luxury air-conditioned master bedrooms, traditional Kerala culinary feasts, and peaceful village backwaters.
          </p>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="group relative h-44 sm:h-56 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/80 shadow-md hover:shadow-2xl hover:border-sky-300 transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Smooth Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge top-left */}
              <div className="absolute top-2.5 left-2.5 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[9px] sm:text-[10px] font-medium border border-white/10">
                {item.categoryLabel}
              </div>

              {/* Bottom Overlay Title */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
                <p className="font-semibold text-xs sm:text-sm leading-tight text-white drop-shadow-sm">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 text-sky-300 text-[10px] sm:text-xs font-medium mt-1">
                  <Eye size={12} />
                  <span>Expand view</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Strip */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-sky-600 to-sky-700 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold">
              Ready to Experience Alleppey in Person?
            </h3>
            <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-xl">
              Book private or sharing houseboats directly on WhatsApp with best rates and instant confirmation.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%20AquaHolic,%20I%20saw%20your%20photo%20gallery%20and%20would%20like%20to%20enquire%20about%20booking"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-102"
          >
            <WhatsAppIcon size={18} className="text-white fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="flex items-center justify-between w-full mt-3 px-2">
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    {selected.title}
                  </p>
                  <span className="text-sky-400 text-xs font-medium">
                    {selected.categoryLabel}
                  </span>
                </div>
                <a
                  href="https://wa.me/919876543210?text=Hello%20AquaHolic,%20I%20am%20interested%20in%20houseboat%20booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white rounded-full text-xs font-semibold shadow-xs"
                >
                  <WhatsAppIcon size={14} className="text-white fill-white" />
                  <span>Enquire</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 100px Height Footer */}
      <Footer />
    </div>
  );
}
