'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  index: number;
}

export default function ServiceCard({
  number,
  title,
  description,
  imageUrl,
  imageAlt,
  index,
}: ServiceCardProps) {
  const scrollToBookings = () => {
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      onClick={scrollToBookings}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer h-[260px] sm:h-[320px] md:h-[380px] w-full flex flex-col justify-between"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient overlays for high text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Glass overlay on hover */}
      <div
        className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'rgba(14, 165, 233, 0.15)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 z-[3] rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: '1.5px solid rgba(56, 189, 248, 0.6)',
          boxShadow: 'inset 0 0 25px rgba(56, 189, 248, 0.2)',
        }}
      />
      {/* Subtle border */}
      <div
        className="absolute inset-0 z-[3] rounded-2xl sm:rounded-3xl pointer-events-none border border-white/20"
      />

      {/* Card Content */}
      <div className="relative z-[4] h-full flex flex-col justify-between p-3.5 sm:p-5 md:p-6">
        {/* Top: Number & Arrow */}
        <div className="flex items-start justify-between">
          <span className="font-playfair text-2xl sm:text-3xl md:text-5xl font-bold leading-none text-sky-300/80 group-hover:text-sky-300 transition-colors">
            {number}
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight size={14} className="sm:w-4 sm:h-4 text-white" />
          </div>
        </div>

        {/* Bottom: Info */}
        <div>
          <div className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mb-1.5 bg-sky-500/30 border border-sky-400/40 text-sky-200 backdrop-blur-sm">
            Kerala Safari
          </div>

          <h3 className="font-playfair text-base sm:text-xl md:text-2xl font-semibold text-white mb-1 leading-[1.2] group-hover:text-sky-200 transition-colors">
            {title}
          </h3>

          <p className="text-white/80 text-[11px] sm:text-xs md:text-sm leading-[1.7] line-clamp-2 md:line-clamp-none mb-2">
            {description}
          </p>

          <div className="hidden sm:flex items-center gap-1.5 text-sky-300 text-xs font-semibold group-hover:translate-x-1 transition-transform">
            <span>View Boats</span>
            <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
