import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppIcon from '@/components/WhatsAppIcon';
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
  const cmsBoats = await sanityFetch<Houseboat[]>({
    query: houseboatsQuery,
    fallback: houseboats,
  });
  const boats = cmsBoats && cmsBoats.length > 0 ? cmsBoats : houseboats;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 font-poppins text-slate-800 pt-20 sm:pt-24 flex flex-col justify-between">
      {/* Unified Floating Navbar */}
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

        {/* All Houseboats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {boats.map((boat) => {
            const fallbackBoat = houseboats.find((h) => h.slug === boat.slug || h.id === boat.id);
            const fallbackImg =
              fallbackBoat?.image ||
              'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop';
            const imgSrc =
              urlForImage(boat.image) ||
              (typeof boat.image === 'string' ? boat.image : fallbackImg);

            const rating = boat.rating || fallbackBoat?.rating || 4.9;
            const reviews = boat.reviews || fallbackBoat?.reviews || 120;
            const bedrooms = boat.bedrooms || fallbackBoat?.bedrooms || 1;
            const capacity = boat.capacity || fallbackBoat?.capacity || '2–4 Guests';
            const tag = boat.tag || fallbackBoat?.tag || 'Top Rated';
            const price = boat.price || fallbackBoat?.price || 7500;
            const unit = boat.unit || fallbackBoat?.unit || '/ night';
            const desc = boat.desc || fallbackBoat?.desc || '';
            const chips =
              boat.chips && boat.chips.length > 0
                ? boat.chips
                : fallbackBoat?.chips || ['Overnight Stay', 'Private Chef'];

            return (
              <div key={boat.id || boat.slug} className="flex flex-col">
                <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#1b2621] via-[#141e1a] to-[#0d1411] text-white shadow-lg border border-white/10 hover:border-sky-400/50 flex flex-col h-full group hover:shadow-[0_20px_45px_rgba(14,165,233,0.22)] hover:-translate-y-1.5 transition-all duration-300">
                  {/* Photo with natural fade into dark card */}
                  <Link
                    href={`/houseboats/${boat.slug}`}
                    aria-label={`View details for ${boat.title}`}
                    className="block relative h-48 sm:h-52 md:h-44 lg:h-48 w-full overflow-hidden"
                  >
                    <Image
                      src={imgSrc}
                      alt={boat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141e1a] via-[#141e1a]/25 to-transparent" />

                    {/* Rating Pill Top-Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-xs font-semibold text-amber-300 shadow-md">
                      <span>★</span>
                      <span>{rating}</span>
                      <span className="text-white/60 font-normal text-[10px]">({reviews}+)</span>
                    </div>

                    {/* Tag Pill Top-Right */}
                    <span className="absolute top-3 right-3 bg-sky-600/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md border border-white/20">
                      {tag}
                    </span>
                  </Link>

                  {/* Card Body */}
                  <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-2">
                      {/* Title */}
                      <Link
                        href={`/houseboats/${boat.slug}`}
                        className="block group-hover:text-sky-300 transition-colors"
                      >
                        <h3 className="font-poppins font-bold text-base sm:text-lg text-white tracking-tight leading-snug line-clamp-1">
                          {boat.title}
                        </h3>
                      </Link>

                      {/* Specs: Bedrooms & Capacity */}
                      <div className="flex items-center gap-2 text-xs text-white/75 flex-wrap">
                        <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                          🛏️ {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                          👥 {capacity}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                        {desc}
                      </p>

                      {/* Frosted Glass Tags / Chips */}
                      {chips && chips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {chips.slice(0, 2).map((chip) => (
                            <span
                              key={chip}
                              className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white/90 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border border-white/10"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Pricing & Action Section */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span className="text-[10px] text-white/50 block font-normal uppercase tracking-wider">
                          Starts From
                        </span>
                        <div className="text-sky-400 font-bold text-base sm:text-lg leading-tight">
                          ₹{price.toLocaleString('en-IN')}
                          <span className="text-[11px] text-white/60 font-normal"> {unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* WhatsApp Instant Booking CTA */}
                        <a
                          href={`https://wa.me/919876543210?text=Hello%20AquaHolic,%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(
                            boat.title
                          )}%20houseboat.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-md transition-colors"
                          title="Book on WhatsApp"
                          aria-label={`Book ${boat.title} on WhatsApp`}
                        >
                          <WhatsAppIcon size={15} className="text-white" />
                          <span className="hidden xs:inline sm:hidden lg:inline text-[11px]">Book</span>
                        </a>

                        {/* View Details Link */}
                        <Link
                          href={`/houseboats/${boat.slug}`}
                          aria-label={`View details for ${boat.title}`}
                          className="text-xs text-sky-400 font-medium group-hover:text-sky-300 flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-2 rounded-xl border border-white/10 transition-colors"
                        >
                          <span>Details</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
