import type { Metadata } from 'next';
import GalleryPageClient from '@/components/GalleryPageClient';
import { sanityFetch } from '@/lib/sanity/client';
import { galleryQuery } from '@/lib/sanity/queries';
import { galleryItems, GalleryItem } from '@/data/gallery';

export const metadata: Metadata = {
  title: 'Photo Gallery | AquaHolic Alleppey Backwater Fleet & Views',
  description:
    'Explore high-resolution photographs of AquaHolic houseboats, luxury air-conditioned suites, authentic Kerala cuisine, and serene Alleppey backwater landscapes.',
};

export default async function GalleryPage() {
  const items = await sanityFetch<GalleryItem[]>({
    query: galleryQuery,
    fallback: galleryItems,
  });

  return <GalleryPageClient initialItems={items} />;
}
