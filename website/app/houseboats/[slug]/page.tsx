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
  const normalizedBoat: Houseboat = {
    ...boat,
    image: urlForImage(boat.image) || (typeof boat.image === 'string' ? boat.image : 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gallery: boat.gallery ? boat.gallery.map((g: any) => urlForImage(g) || (typeof g === 'string' ? g : '')) : [],
  };

  return <HouseboatDetailClient boat={normalizedBoat} />;
}
