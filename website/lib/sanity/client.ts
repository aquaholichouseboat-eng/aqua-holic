import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'aquaholic-demo';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensures published changes show immediately
});

/**
 * Check if a valid remote Sanity project is configured
 */
export function isSanityConfigured(): boolean {
  return (
    Boolean(projectId) &&
    projectId !== 'your-sanity-project-id' &&
    projectId !== 'aquaholic-demo'
  );
}

/**
 * Safe fetch wrapper that queries Sanity when available and returns fallback if not
 */
export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
  tags?: string[];
}): Promise<T> {
  if (!isSanityConfigured()) {
    return fallback;
  }

  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 30, tags },
    });
    if (data === null || data === undefined || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch (err) {
    console.warn('[Sanity Fetch Notice]: Falling back to local data source.', err);
    return fallback;
  }
}
