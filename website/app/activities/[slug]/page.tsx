import { notFound } from 'next/navigation';
import { activities, Activity } from '@/data/activities';
import ActivityDetailClient from '@/components/ActivityDetailClient';
import { sanityFetch } from '@/lib/sanity/client';
import { serviceBySlugQuery, servicesQuery } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';

export async function generateStaticParams() {
  const fallbackParams = activities.map((a) => ({ slug: a.slug }));
  try {
    const cmsActivities = await sanityFetch<Activity[]>({
      query: servicesQuery,
      fallback: activities,
    });
    return (cmsActivities && cmsActivities.length > 0 ? cmsActivities : activities).map((a) => ({
      slug: a.slug,
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
  const localAct = activities.find((a) => a.slug === slug);
  const act = await sanityFetch<Activity | null>({
    query: serviceBySlugQuery,
    params: { slug },
    fallback: localAct || null,
  });

  if (!act) return { title: 'Activity Not Found - Aquaholic' };

  return {
    title: `${act.title} | Aquaholic Kerala Activities`,
    description: act.desc,
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const localAct = activities.find((a) => a.slug === slug);
  const act = await sanityFetch<Activity | null>({
    query: serviceBySlugQuery,
    params: { slug },
    fallback: localAct || null,
  });

  if (!act) {
    notFound();
  }

  // Normalize image urls if returned from Sanity image asset objects
  const fallbackImg =
    localAct?.image ||
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedGallery = act.gallery && act.gallery.length > 0
    ? act.gallery.map((g: any) => urlForImage(g) || (typeof g === 'string' ? g : '')).filter(Boolean)
    : (localAct?.gallery || [fallbackImg]);

  const normalizedAct: Activity = {
    ...(localAct || {}),
    ...act,
    image:
      urlForImage(act.image) ||
      (typeof act.image === 'string' ? act.image : fallbackImg),
    gallery: resolvedGallery.length > 0 ? resolvedGallery : [fallbackImg],
  };

  return <ActivityDetailClient act={normalizedAct} />;
}
