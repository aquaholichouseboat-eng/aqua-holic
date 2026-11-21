import { groq } from 'next-sanity';

// 1. Homepage & Hero Query
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeading,
    heroHeadingHighlight,
    heroSubtitle,
    heroImage {
      asset->,
      alt
    },
    heroFeatures,
    heroWhatsAppText,
    heroWhatsAppNumber,
    heroCallText,
    heroCallNumber,
    statsBar
  }
`;

// 2. Houseboats / Products Queries
export const houseboatsQuery = groq`
  *[_type == "product"] | order(order asc, _createdAt asc) {
    _id,
    id,
    "slug": slug.current,
    title,
    tag,
    rating,
    reviews,
    stay,
    capacity,
    bedrooms,
    price,
    unit,
    image {
      asset->,
      alt
    },
    "gallery": gallery[]{
      asset->,
      alt
    },
    desc,
    longDesc,
    chips,
    inclusions,
    highlights,
    menu,
    featured
  }
`;

export const houseboatBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    id,
    "slug": slug.current,
    title,
    tag,
    rating,
    reviews,
    stay,
    capacity,
    bedrooms,
    price,
    unit,
    image {
      asset->,
      alt
    },
    "gallery": gallery[]{
      asset->,
      alt
    },
    desc,
    longDesc,
    chips,
    inclusions,
    highlights,
    menu
  }
`;

// 3. Services / Activities Queries
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    id,
    "slug": slug.current,
    title,
    tag,
    duration,
    capacity,
    price,
    unit,
    image {
      asset->,
      alt
    },
    "gallery": gallery[]{
      asset->,
      alt
    },
    desc,
    longDesc,
    chips,
    inclusions,
    highlights,
    safety
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    id,
    "slug": slug.current,
    title,
    tag,
    duration,
    capacity,
    price,
    unit,
    image {
      asset->,
      alt
    },
    "gallery": gallery[]{
      asset->,
      alt
    },
    desc,
    longDesc,
    chips,
    inclusions,
    highlights,
    safety
  }
`;

// 4. Gallery Query
export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(order asc, _createdAt asc) {
    _id,
    id,
    title,
    image {
      asset->,
      alt
    },
    category,
    categoryLabel
  }
`;

// 5. About Us Query
export const aboutQuery = groq`
  *[_type == "about"][0] {
    badge,
    title,
    subtitle,
    story,
    mission,
    vision,
    experienceYears,
    happyGuests,
    houseboatsCount,
    "images": images[]{
      asset->,
      alt
    },
    highlights
  }
`;

// 6. Contact Info Query
export const contactQuery = groq`
  *[_type == "contactInfo"][0] {
    phone,
    phoneRaw,
    whatsappNumber,
    whatsappRaw,
    email,
    addressTitle,
    addressLine1,
    addressLine2,
    workingHours,
    googleMapsUrl,
    socialLinks
  }
`;

// 7. Banners Query
export const bannersQuery = groq`
  *[_type == "banner" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    badge,
    linkText,
    linkUrl,
    image {
      asset->,
      alt
    }
  }
`;

// 8. Website Settings Query
export const websiteSettingsQuery = groq`
  *[_type == "websiteSettings"][0] {
    siteName,
    tagline,
    logo {
      asset->
    },
    primaryWhatsApp,
    supportPhone,
    supportEmail,
    footerCopyright,
    defaultMetaTitle,
    defaultMetaDescription
  }
`;
