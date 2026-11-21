import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AllHouseboatsClient from '@/components/AllHouseboatsClient';
import { houseboats, Houseboat } from '@/data/houseboats';
import { sanityFetch } from '@/lib/sanity/client';
import { houseboatsQuery } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'All Houseboats | AquaHolic Alleppey Backwater Fleet',
  description:
    'Browse all private and sharing luxury Kerala houseboats in Alleppey by AquaHolic. 1 to 6 bedroom private houseboats and sharing cruises with transparent pricing.',
};

export default async function AllHouseboatsPage() {
  const cmsBoats = await sanityFetch<Houseboat[]>({
    query: houseboatsQuery,
    fallback: houseboats,
  });
  const boats = cmsBoats && cmsBoats.length > 0 ? cmsBoats : houseboats;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 text-slate-800 pt-20 sm:pt-24 flex flex-col justify-between">
      {/* Unified Floating Navbar */}
      <Navbar />

      {/* Interactive Houseboat Fleet Viewer with Private and Sharing Tab Buttons */}
      <AllHouseboatsClient initialBoats={boats} />

      <Footer />
    </div>
  );
}
