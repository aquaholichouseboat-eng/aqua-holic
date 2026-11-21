'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X, Eye, ArrowRight } from 'lucide-react';
import { urlForImage } from '@/lib/sanity/image';

const defaultGalleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&fit=crop',
    alt: 'Traditional Kerala Houseboat on Backwaters',
    title: 'Alleppey Lagoon Cruise',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=600&q=80&fit=crop',
    alt: 'Houseboat Interior Luxury Suite',
    title: 'AC Luxury Bedroom Suite',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80&fit=crop',
    alt: 'Traditional Shikara Boat in Canal',
    title: 'Serene Shikara Canal Tour',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop',
    alt: 'Kerala Backwater Sunset Views',
    title: 'Golden Hour Sunset Anchor',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80&fit=crop',
    alt: 'Speedboat on Vembanad Lake',
    title: 'Speedboat Adventure',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=600&q=80&fit=crop',
    alt: 'Coconut Palms & Village Waterway',
    title: 'Pristine Village Canals',
    span: 'col-span-1 row-span-1',
  },
];

interface GalleryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: any[];
  title?: string;
  highlight?: string;
  subtitle?: string;
}

export default function Gallery({
  items,
  title,
  highlight,
  subtitle,
}: GalleryProps) {
  const images = items && items.length > 0
    ? items.slice(0, 6).map((item, idx) => ({
        src: urlForImage(item.image) || item.src || defaultGalleryImages[idx % defaultGalleryImages.length].src,
        alt: item.alt || item.title || 'Kerala Backwater Photography',
        title: item.title,
        span: idx === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1',
      }))
    : defaultGalleryImages;

  const [selected, setSelected] = useState<null | typeof defaultGalleryImages[0]>(null);

  const sectionTitle = title || 'Kerala Backwaters';
  const sectionHighlight = highlight || 'Gallery';
  const sectionSubtitle =
    subtitle ||
    'A glimpse into the magical houseboats, tranquil waterways, and authentic experiences of God\'s Own Country.';

  return (
    <section id="gallery" className="py-[15px] bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-[15px]">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-800 leading-[1.2]">
            {sectionTitle} <span className="text-sky-600">{sectionHighlight}</span>
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-base mt-2 leading-[1.7]">
            {sectionSubtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              onClick={() => setSelected(img)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-sky-300 text-xs font-medium flex items-center gap-1 mb-1">
                  <Eye size={12} /> Click to enlarge
                </span>
                <p className="text-white text-xs sm:text-sm font-semibold leading-tight">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Photos Link Button */}
        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View All High-Resolution Photos</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="bg-slate-900/90 backdrop-blur-md p-4 flex items-center justify-between text-white border-t border-slate-700">
              <p className="font-playfair text-base sm:text-lg font-bold">{selected.title}</p>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
