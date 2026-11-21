import { groq } from 'next-sanity';

export interface HomePageData {
  heroHeading?: string;
  heroHeadingHighlight?: string;
  heroSubtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
  heroFeatures?: string[];
  heroWhatsAppText?: string;
  heroWhatsAppNumber?: string;
  heroCallText?: string;
  heroCallNumber?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statsBar?: any[];
  houseboatsSectionTitle?: string;
  houseboatsSectionHighlight?: string;
  houseboatsSectionSubtitle?: string;
  activitiesSectionTitle?: string;
  activitiesSectionHighlight?: string;
  activitiesSectionSubtitle?: string;
  gallerySectionTitle?: string;
  gallerySectionHighlight?: string;
  gallerySectionSubtitle?: string;
  testimonialsSectionTitle?: string;
  testimonialsSectionHighlight?: string;
  testimonialsSectionSubtitle?: string;
  contactSectionTitle?: string;
  contactSectionHighlight?: string;
  contactSectionSubtitle?: string;
}

// 1. Homepage & Section Headers Query
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
    statsBar,
    houseboatsSectionTitle,
    houseboatsSectionHighlight,
    houseboatsSectionSubtitle,
    activitiesSectionTitle,
    activitiesSectionHighlight,
    activitiesSectionSubtitle,
    gallerySectionTitle,
    gallerySectionHighlight,
    gallerySectionSubtitle,
    testimonialsSectionTitle,
    testimonialsSectionHighlight,
    testimonialsSectionSubtitle,
    contactSectionTitle,
    contactSectionHighlight,
    contactSectionSubtitle
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

// 5. Testimonials Query
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    name,
    location,
    rating,
    text,
    boat,
    trip,
    highlight,
    avatar,
    avatarImage {
      asset->,
      alt
    }
  }
`;

// 6. FAQ Query
export const faqQuery = groq`
  *[_type == "faq"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer
  }
`;

// 7. About Us Query
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

// 8. Contact Info Query
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

// 9. Banners Query
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

// 10. Website Settings Query
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
