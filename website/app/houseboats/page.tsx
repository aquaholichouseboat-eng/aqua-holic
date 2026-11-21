import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { houseboats, Houseboat } from '@/data/houseboats';
import { sanityFetch } from '@/lib/sanity/client';
import { houseboatsQuery } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';

export const metadata: Metadata = {
  title: 'All Houseboats | AquaHolic Alleppey Backwater Fleet',
  description:
    'Browse all private and sharing luxury Kerala houseboats in Alleppey by AquaHolic. 1 to 6 bedroom houseboats, honeymoon suites, and day cruises with transparent pricing.',
};

export default async function AllHouseboatsPage() {
  const boats = await sanityFetch<Houseboat[]>({
    query: houseboatsQuery,
    fallback: houseboats,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 font-poppins text-slate-800 pt-20 sm:pt-24 flex flex-col justify-between">
      {/* Same Unified Floating Navbar as Index Page */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 flex-1 w-full pb-20">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">All Houseboats</span>
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
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles size={13} />
            <span>{boats.length} Certified Fleet Vessels</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800">
            Explore All <span className="text-sky-600">Houseboats</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Select your private and sharing vessel in Alleppey. Every booking includes a private chef, all traditional Kerala meals, dedicated captain, and government safety certification.
          </p>
        </div>

        {/* 
          All Houseboats Cards Grid:
          - Mobile View: 2 cards per row (grid-cols-2), stacking downwards row-by-row ("below below")
          - Tablet / Desktop: 3 to 4 cards per row (md:grid-cols-3 lg:grid-cols-4)
          - EXACT same card div style as index page (dark gradient, top photo melt, 3 center dots, price pill, chips, link indicator)
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {boats.map((boat) => {
            const imgSrc = urlForImage(boat.image) || (typeof boat.image === 'string' ? boat.image : 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop');
            return (
              <div key={boat.id || boat.slug} className="flex flex-col">
                <Link
                  href={`/houseboats/${boat.slug}`}
                  aria-label={`View details for ${boat.title}`}
                  className="relative rounded-[20px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-md border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_16px_40px_rgba(14,165,233,0.22)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Photo with natural fade into dark card */}
                  <div className="relative h-28 sm:h-36 md:h-40 w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={boat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Smooth gradient melt */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/30 to-transparent" />
                  </div>

                  {/* 3 Pagination dots right at image threshold */}
                  <div className="flex items-center justify-center gap-1 my-1.5">
                    <span className="w-1 h-1 rounded-full bg-white shadow-xs" />
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                  </div>

                  {/* Card Body */}
                  <div className="p-2 sm:p-3 md:p-3.5 flex flex-col flex-1 justify-between gap-1.5">
                    <div>
                      {/* Title & Price Capsule */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h3 className="font-poppins font-bold text-xs sm:text-sm md:text-base text-white group-hover:text-sky-300 transition-colors tracking-tight leading-tight truncate">
                          {boat.title}
                        </h3>
                        <div className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-semibold text-[10px] sm:text-xs border border-white/10 w-fit shrink-0 shadow-xs">
                          ₹{boat.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-[9px] sm:text-[11px] leading-tight mb-1.5 line-clamp-1 sm:line-clamp-2">
                        {boat.desc}
                      </p>

                      {/* Frosted Glass Tags / Chips */}
                      {boat.chips && boat.chips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mb-1">
                          {boat.chips.map((chip) => (
                            <span
                              key={chip}
                              className="inline-flex items-center bg-white/12 backdrop-blur-md text-white/90 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium border border-white/10 truncate max-w-full"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Clean Link Footer Indicator */}
                    <div className="pt-1 flex items-center justify-between text-[9px] sm:text-[11px] text-sky-400/90 font-medium group-hover:text-sky-300">
                      <span>View Package</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      {/* 100px Height Footer */}
      <Footer />
    </div>
  );
}
