export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: 'houseboats' | 'interiors' | 'backwaters' | 'activities' | 'dining';
  categoryLabel: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop',
    alt: 'Traditional Kerala Houseboat on Backwaters',
    title: 'Alleppey Lagoon Cruise',
    category: 'houseboats',
    categoryLabel: 'Houseboats',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=1000&q=80&fit=crop',
    alt: 'Houseboat Interior Luxury Suite',
    title: 'AC Luxury Master Bedroom',
    category: 'interiors',
    categoryLabel: 'Interiors',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1000&q=80&fit=crop',
    alt: 'Traditional Shikara Boat in Canal',
    title: 'Serene Shikara Canal Tour',
    category: 'activities',
    categoryLabel: 'Activities',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&fit=crop',
    alt: 'Kerala Backwater Sunset Views',
    title: 'Golden Hour Sunset Anchor',
    category: 'backwaters',
    categoryLabel: 'Backwaters',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop',
    alt: 'Speedboat on Vembanad Lake',
    title: 'High-Speed Water Adventure',
    category: 'activities',
    categoryLabel: 'Activities',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=1000&q=80&fit=crop',
    alt: 'Coconut Palms & Village Waterway',
    title: 'Pristine Village Canals',
    category: 'backwaters',
    categoryLabel: 'Backwaters',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80&fit=crop',
    alt: 'Grand Double Deck Houseboat',
    title: 'Two-Tier Grand Palace Cruiser',
    category: 'houseboats',
    categoryLabel: 'Houseboats',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80&fit=crop',
    alt: 'Royal Sundeck & Glass Dining Lounge',
    title: 'Glass-Walled Panoramic Dining',
    category: 'interiors',
    categoryLabel: 'Interiors',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80&fit=crop',
    alt: 'Day Cruiser on Vembanad Lake',
    title: 'Day Cruiser Experience',
    category: 'houseboats',
    categoryLabel: 'Houseboats',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&q=80&fit=crop',
    alt: 'Honeymoon Suite Flower Decor',
    title: 'Honeymoon Floral Suite',
    category: 'interiors',
    categoryLabel: 'Interiors',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=1000&q=80&fit=crop',
    alt: 'Traditional Kerala Sadhya Feast',
    title: 'Authentic Kerala Sadhya Feast',
    category: 'dining',
    categoryLabel: 'Dining',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=80&fit=crop',
    alt: 'Fresh Karimeen Fish Fry',
    title: 'Fresh Karimeen Pollichathu',
    category: 'dining',
    categoryLabel: 'Dining',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80&fit=crop',
    alt: 'Peaceful Morning Backwater Mist',
    title: 'Morning Mist over Punnamada',
    category: 'backwaters',
    categoryLabel: 'Backwaters',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000&q=80&fit=crop',
    alt: 'Kayaking in Lotus Waterways',
    title: 'Kayaking in Kuttanad Waters',
    category: 'activities',
    categoryLabel: 'Activities',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80&fit=crop',
    alt: 'Candlelight Dining on Sundeck',
    title: 'Sundeck Candlelight Dinner',
    category: 'dining',
    categoryLabel: 'Dining',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&fit=crop',
    alt: 'Sundown Silhouette of Coconut Palms',
    title: 'Sunset over Vembanad Lake',
    category: 'backwaters',
    categoryLabel: 'Backwaters',
  },
];
