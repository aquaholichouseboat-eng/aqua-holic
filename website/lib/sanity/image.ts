import { createImageUrlBuilder } from '@sanity/image-url';
import { projectId, dataset } from './client';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'aquaholic-demo',
  dataset: dataset || 'production',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any): string | null {
  if (!source) return null;
  // If it's already a full URL string (e.g. Unsplash URL fallback)
  if (typeof source === 'string') return source;
  // If source has asset or _ref
  if (source.asset || source._ref) {
    try {
      return imageBuilder.image(source).auto('format').fit('max').url();
    } catch {
      return null;
    }
  }
  return null;
}
