export interface Activity {
  id: number;
  slug: string;
  title: string;
  tag: string;
  duration: string;
  capacity: string;
  price: number;
  unit: string;
  image: string;
  gallery: string[];
  desc: string;
  longDesc: string;
  chips: string[];
  inclusions: string[];
  highlights: string[];
  safety: string[];
}

export const activities: Activity[] = [
  {
    id: 1,
    slug: 'speed-boat',
    title: 'Speed Boat Ride',
    tag: 'Top Adventure',
    duration: '30–60 Mins',
    capacity: 'Up to 6 Persons',
    price: 1500,
    unit: '/ boat',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop',
    ],
    desc: 'High-speed thrill ride across the open waters of Vembanad Lake. Life jackets & expert pilot included for maximum excitement.',
    longDesc: 'Feel the rush of adrenaline with our private speed boat cruise in Alleppey. Zip across the expansive, shimmering waters of Vembanad Lake, carving waves past islands, migratory birds, and distant houseboats. Handled by a certified professional pilot with international-standard safety life jackets provided for all passengers.',
    chips: ['Top Rated', '30–60 Mins'],
    inclusions: [
      'Private High-Speed Motorboat (Entire boat reserved for your group)',
      'Government Licensed Marine Pilot with 10+ Years Experience',
      'High-Grade Coast Guard Approved Lifejackets',
      'Cruise across Punnamada Lake & Vembanad Lake expanse',
      'High-Speed S-Turns and Wave Cruising Thrills',
    ],
    highlights: [
      'Speeds up to 45 km/h on open waters',
      'Breathtaking panoramic lake photography angles',
      'Flexible start times from 6:00 AM to 6:00 PM',
      'Suitable for families, couples, and thrill seekers',
    ],
    safety: [
      'Mandatory life jackets worn at all times',
      'Pre-ride safety briefing by certified marine captain',
      'Onboard emergency communication and first aid kit',
    ],
  },
  {
    id: 2,
    slug: 'kayaking',
    title: 'Backwater Kayaking',
    tag: 'Eco Tour',
    duration: '2 Hours',
    capacity: 'Single & Tandem',
    price: 800,
    unit: '/ person',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&fit=crop',
    ],
    desc: 'Glide through narrow, calm village canals, lotus ponds, and hidden bird-watching spots where houseboats cannot enter.',
    longDesc: 'Explore Kerala\'s backwaters at your own peaceful rhythm. Our guided kayaking adventure navigates quiet, shallow rural canals inaccessible to large motorized boats. Glide beneath low rustic bridges, paddle alongside blooming water lilies, and observe authentic daily village life, duck farming, and coir making along the riverbanks.',
    chips: ['Eco Certified', '2 Hours'],
    inclusions: [
      'Imported High-Stability Sea Kayaks (Single or Tandem Double)',
      'Lightweight Ergonomic Carbon-Fiber Paddles',
      'Certified Local Kayak Guide leading the tour',
      'Waterproof dry bag for phones & cameras',
      'Fresh Tender Coconut refreshment stop',
    ],
    highlights: [
      'Access to shallow village waterways untouched by tourists',
      'Up-close photography of kingfishers, egrets & cormorants',
      'Zero engine noise — 100% serene natural backwaters',
      'Beginner friendly — no previous kayaking experience needed',
    ],
    safety: [
      'Lightweight buoyancy aid life vest for effortless paddling',
      'Calm, current-free shallow waterways for maximum safety',
      'Complete paddle technique instruction before launching',
    ],
  },
  {
    id: 3,
    slug: 'shikara',
    title: 'Traditional Shikara',
    tag: 'Romantic Cruise',
    duration: '2–4 Hours',
    capacity: 'Up to 8 Persons',
    price: 1200,
    unit: '/ hour',
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1000&q=80&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=1000&q=80&fit=crop',
    ],
    desc: 'Comfortable cushioned seating with thatched canopy, perfect for relaxing family tours and golden sunset photography.',
    longDesc: 'A romantic and peaceful way to cruise Alleppey\'s waterways. Our handcrafted wooden shikara boats feature plush reclined seating, thatched roofs for shade, and an open front deck. Easily navigates both open lakes and tranquil village canals with zero noise disturbance.',
    chips: ['Romantic Cruise', '2–4 Hours'],
    inclusions: [
      'Private Handcrafted Wooden Shikara Boat',
      'Experienced Native Helmsman & Tour Storyteller',
      'Plush Cushioned Recliner Seating & Thatched Sunshade',
      'Cruising through Kuttanad Village Canals & Vembanad Lake',
      'Bottled Drinking Water & Local Snack Stop',
    ],
    highlights: [
      'Can pass beneath narrow village footbridges',
      'Smooth, leisurely cruising speed ideal for sightseeing',
      'Most cost-effective private cruising option in Alleppey',
      'Sunset cruise option with golden hour backwater reflections',
    ],
    safety: [
      'Certified life jackets on board for every passenger',
      'Stable low-center-of-gravity traditional boat architecture',
      'Government authorized tourist boat registration',
    ],
  },
  {
    id: 4,
    slug: 'open-boat',
    title: 'Open Motor Boat',
    tag: 'Panoramic Tour',
    duration: '1–2 Hours',
    capacity: 'Up to 10 Persons',
    price: 900,
    unit: '/ hour',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80&fit=crop',
    ],
    desc: 'Unobstructed 360-degree open-air sightseeing boat offering refreshing lake breezes and sweeping backwater panoramas.',
    longDesc: 'Enjoy 360-degree open air panoramic views of the backwaters. Perfect for photography enthusiasts, sightseers, and budget travelers who want to experience the beauty of Alleppey\'s lakes and waterways with cool tropical breezes.',
    chips: ['360° Views', '1–2 Hours'],
    inclusions: [
      'Open-Deck Motorized Cruise Boat',
      'Certified Backwater Driver & Guide',
      'Spacious Bench Seating for up to 10 Guests',
      'Punnamada Finishing Point to Lake Vembanad Route',
      'Life Jackets for all passengers',
    ],
    highlights: [
      'Unobstructed 360-degree photography angles',
      'Refreshing open-air breeze throughout the cruise',
      'Great for large groups and family sightseeing',
      'Direct jetty departure with zero wait time',
    ],
    safety: [
      'Certified safety lifejackets provided for all guests',
      'Experienced licensed marine operator',
      'Government tourist boat compliance certified',
    ],
  },
];
