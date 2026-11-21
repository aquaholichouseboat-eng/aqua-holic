import { notFound } from 'next/navigation';
import { houseboats, Houseboat } from '@/data/houseboats';
import HouseboatDetailClient from '@/components/HouseboatDetailClient';
import { sanityFetch } from '@/lib/sanity/client';
import { houseboatBySlugQuery, houseboatsQuery } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';

export async function generateStaticParams() {
  const fallbackParams = houseboats.map((b) => ({ slug: b.slug }));
  try {
    const cmsBoats = await sanityFetch<Houseboat[]>({
      query: houseboatsQuery,
      fallback: houseboats,
    });
    return (cmsBoats && cmsBoats.length > 0 ? cmsBoats : houseboats).map((b) => ({
      slug: b.slug,
    }));
  } catch {
    return fallbackParams;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const localBoat = houseboats.find((b) => b.slug === slug);
  const boat = await sanityFetch<Houseboat | null>({
    query: houseboatBySlugQuery,
    params: { slug },
    fallback: localBoat || null,
  });

  if (!boat) return { title: 'Houseboat Not Found - Aquaholic' };

  return {
    title: `${boat.title} | Aquaholic Kerala Houseboats`,
    description: boat.desc,
  };
}

export default async function HouseboatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const localBoat = houseboats.find((b) => b.slug === slug);
  const boat = await sanityFetch<Houseboat | null>({
    query: houseboatBySlugQuery,
    params: { slug },
    fallback: localBoat || null,
  });

  if (!boat) {
    notFound();
  }

  // Normalize image urls if returned from Sanity image asset objects
  const fallbackImg =
    localBoat?.image ||
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedGallery = boat.gallery && boat.gallery.length > 0
    ? boat.gallery.map((g: any) => urlForImage(g) || (typeof g === 'string' ? g : '')).filter(Boolean)
    : (localBoat?.gallery || [fallbackImg]);

  const normalizedBoat: Houseboat = {
    ...(localBoat || {}),
    ...boat,
    image:
      urlForImage(boat.image) ||
      (typeof boat.image === 'string' ? boat.image : fallbackImg),
    gallery: resolvedGallery.length > 0 ? resolvedGallery : [fallbackImg],
    chips:
      boat.chips && Array.isArray(boat.chips) && boat.chips.length > 0
        ? boat.chips
        : (localBoat?.chips || ['Top Rated', 'Direct Rate']),
    highlights:
      boat.highlights && Array.isArray(boat.highlights) && boat.highlights.length > 0
        ? boat.highlights
        : (localBoat?.highlights || [
            'Government Approved & Certified Vessel',
            'Fresh Kerala Meals Live on Boat',
            'Zero Middleman Markup — Direct Booking',
            'Authentic Backwater Village Cruise',
          ]),
    inclusions:
      boat.inclusions && Array.isArray(boat.inclusions) && boat.inclusions.length > 0
        ? boat.inclusions
        : (localBoat?.inclusions || [
            'Air-Conditioned Bedroom with En-suite Bathroom',
            'Dedicated Captain & Crew',
            'Traditional Kerala Meals Included',
            'Vembanad Lake & Canal Cruise',
            'Clean Linens & Safety Equipment',
          ]),
    menu:
      boat.menu && Array.isArray(boat.menu) && boat.menu.length > 0
        ? boat.menu
        : (localBoat?.menu || [
            'Welcome Drink: Fresh Tender Coconut Water',
            'Lunch: Kerala Red Rice, Fried Karimeen Fish, Thoran, Sambar & Payasam',
            'Evening: Hot Kerala Tea / Coffee with Banana Fritters',
            'Dinner: Rotis / Rice, Chicken Roast, Dal & Salad',
            'Breakfast: Warm Kerala Appam with Stew, Fresh Fruits',
          ]),
  };

  return <HouseboatDetailClient boat={normalizedBoat} />;
}
