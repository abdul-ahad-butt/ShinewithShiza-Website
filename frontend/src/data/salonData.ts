export interface ServiceItem {
  id: string;
  title: string;
  category: 'bridal' | 'party' | 'hair' | 'skin' | 'nails';
  categoryLabel: string;
  duration: string;
  pricePKR: number;
  formattedPrice: string;
  tag?: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface CourseModule {
  number: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface AcademyCourse {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  originalPricePKR: number;
  discountedPricePKR: number;
  durationWeeks: string;
  classSchedule: string;
  certification: string;
  description: string;
  modules: CourseModule[];
  perks: string[];
}

export interface BridalPackage {
  id: string;
  name: string;
  subtitle: string;
  pricePKR: string;
  badge?: string;
  description: string;
  includes: string[];
  isPopular?: boolean;
}

export const SALON_INFO = {
  name: "Shine With Shiza",
  tagline: "Luxury Beauty Salon & Beautician Courses",
  city: "Lahore, Pakistan",
  landmark: "Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Phase 3 GECH Society, Lahore, 54600, Pakistan",
  landmarkCallout: "Located in Baby World Basement — directly opposite Amanah Mall and adjacent to Jalal Sons.",
  address: "Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Phase 3 GECH Society, Lahore, 54600, Pakistan",
  shortAddress: "Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Lahore",
  phone: "+92 337 4262774",
  cleanPhone: "923374262774",
  hours: "Monday – Sunday: 11:00 AM – 08:30 PM",
  instagram: "https://www.instagram.com/shinewithshiza",
  instagramHandle: "@shinewithshiza",
  tiktok: "https://www.tiktok.com/@shinewithshizaofficial",
  tiktokHandle: "@shinewithshizaofficial",
  youtube: "https://www.youtube.com/@shinewithshiza-q8z5j",
  youtubeHandle: "@shinewithshiza",
  googleMapsUrl: "https://maps.google.com/?q=Shine+With+Shiza+Baby+World+Basement+Model+Town+Link+Rd+Lahore",
  rating: "4.9",
  reviewsCount: "127+"
};

export const SERVICES_CATALOG: ServiceItem[] = [
  // BRIDAL & NIKKAH
  {
    id: "barat-royal-bridal",
    title: "Signature Barat Royal Bridal Makeover",
    category: "bridal",
    categoryLabel: "Bridal Studio",
    duration: "4.5 Hours",
    pricePKR: 65000,
    formattedPrice: "PKR 65,000",
    tag: "Signature Bestseller",
    description: "Opulent regal bridal glam designed for your main wedding day. High-definition waterproof base, bespoke eye artistry, luxury lashes, hair styling, heavy jewelry setting, and dupatta draping.",
    highlights: ["HD Waterproof Porcelain Base", "Custom Mink Lashes & Smoky Gold Eye Art", "Royal Dupatta Draping & Jewelry Pinning", "Complimentary Touch-Up Kit"],
    image: "/images/hero-bridal.jpg"
  },
  {
    id: "walima-sheer-elegance",
    title: "Walima Soft Glam & Crystal Finish",
    category: "bridal",
    categoryLabel: "Bridal Studio",
    duration: "3.5 Hours",
    pricePKR: 50000,
    formattedPrice: "PKR 50,000",
    tag: "Bride's Favorite",
    description: "Ethereal, luminous pastel bridal makeover crafted for modern Walima brides. Soft smokey eyes with champagne shimmer, glass skin finish, and intricate European or traditional updos.",
    highlights: ["Luminous Glass Skin Airbrush Base", "Shimmer Champagne Cut-Crease", "Romantic Textured Updo / Soft Curls", "Jewelry & Veil Setting"],
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "nikkah-mehndhi-glam",
    title: "Nikkah / Engagement Radiant Glow",
    category: "bridal",
    categoryLabel: "Bridal Studio",
    duration: "3 Hours",
    pricePKR: 38000,
    formattedPrice: "PKR 38,000",
    tag: "Romantic Look",
    description: "Delicate soft pink or golden undertone glam emphasizing natural beauty with subtle winged liner, dewy blushing cheeks, and statement floral hair styling.",
    highlights: ["Dewy Radiant Mineral Prep", "Classic Winged Liner & Flutter Lashes", "Signature Floral Braid or Half-Updo", "Jewelry Setting"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
  },

  // PARTY & EVENT GLAM
  {
    id: "hd-signature-party",
    title: "Signature HD Party Makeup",
    category: "party",
    categoryLabel: "Party & Event Glam",
    duration: "1.5 Hours",
    pricePKR: 12000,
    formattedPrice: "PKR 12,000",
    tag: "Top Rated",
    description: "Camera-ready high definition party glam tailored to your outfit. Flawless contouring, dramatic or soft glam eyes, premium lashes, and complimentary blowout hair styling.",
    highlights: ["Full HD Foundation with 16h Wear", "Custom Eye Makeup of Choice", "Premium 3D Lashes Included", "Blowout or Ironing/Curling"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "soft-glam-glow",
    title: "Soft Glam & Glass Skin Party Look",
    category: "party",
    categoryLabel: "Party & Event Glam",
    duration: "1 Hour",
    pricePKR: 8500,
    formattedPrice: "PKR 8,500",
    description: "Effortless Parisian-inspired soft glam with velvet matte complexion, rosy glow, feathered brows, and natural volume waves.",
    highlights: ["Lightweight Featherweight Base", "Nude Velvet Lips & Rosy Cheeks", "Feathered Natural Brow Sculpt", "Casual Glam Soft Curls"],
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
  },

  // HAIR SPA & KERATIN
  {
    id: "brazilian-keratin-rebonding",
    title: "Brazilian Keratin & Protein Rebonding",
    category: "hair",
    categoryLabel: "Hair & Skin Clinic",
    duration: "3.5 - 4 Hours",
    pricePKR: 28000,
    formattedPrice: "PKR 28,000",
    tag: "Transformation",
    description: "Eliminate 100% of frizz while restoring high-gloss shine and silkiness. Infused with organic Brazilian protein that strengthens keratin bonds for up to 6 months.",
    highlights: ["Zero Frizz Guarantee for 5-6 Months", "High-Gloss Mirror Glass Hair Finish", "Repairs Chemically Treated Hair", "Includes Post-Keratin Treatment Serum"],
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "balayage-highlights",
    title: "Dimensional Caramel / Ash Blonde Balayage",
    category: "hair",
    categoryLabel: "Hair & Skin Clinic",
    duration: "4 Hours",
    pricePKR: 22000,
    formattedPrice: "PKR 22,000",
    description: "Hand-painted seamless balayage customized to your skin undertone. Gentle ammonia-free lightening followed by gloss toner and moisture seal.",
    highlights: ["Seamless Hand-Painted Melting", "Olaplex Bond Protection Included", "Customized Toner Formulation", "Gloss Finish Hair Mask"],
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },

  // SKIN & HYDRAFACIALS
  {
    id: "hydrafacial-9-step-gold",
    title: "9-Step 24K Gold HydraFacial Rejuvenation",
    category: "skin",
    categoryLabel: "Hair & Skin Clinic",
    duration: "75 Mins",
    pricePKR: 14500,
    formattedPrice: "PKR 14,500",
    tag: "Instant Glow",
    description: "Medical-grade vortex hydradermabrasion infusing hyaluronic acid, antioxidants, and 24K gold serum. Deep pore extraction, RF skin tightening, and LED photon light therapy.",
    highlights: ["Painless Vortex Blackhead Extraction", "Radio Frequency Skin Tightening", "24K Gold Collagen Infusion", "Cold Hammer Pore Shrinking"],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "whitening-skin-polishing",
    title: "Bridal Skin Polishing & Oxygen Glow",
    category: "skin",
    categoryLabel: "Hair & Skin Clinic",
    duration: "60 Mins",
    pricePKR: 7500,
    formattedPrice: "PKR 7,500",
    description: "Gentle multi-fruit enzyme exfoliation paired with pure oxygen infusion. Restores natural radiance and eliminates dead skin layers before weddings.",
    highlights: ["Micro-crystal Diamond Polishing", "Pure Oxygen Nutrient Jet", "Calming Lavender Alginate Mask", "Neck & Shoulder Relaxation Massage"],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"
  },

  // NAILS & LASH
  {
    id: "acrylic-gel-nail-art",
    title: "Luxury Acrylic Extensions & Custom Nail Art",
    category: "nails",
    categoryLabel: "Nails & Lash Studio",
    duration: "2 Hours",
    pricePKR: 6500,
    formattedPrice: "PKR 6,500",
    description: "Premium durable acrylic extensions with custom chrome, French ombré, or crystal embellishments tailored to your wedding lehenga.",
    highlights: ["Long-lasting 4-Week Retention", "Chrome, Glitter & Crystal Accents", "Cuticle Care & Hot Oil Massage", "Non-damaging Gel Formula"],
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  }
];

export const ACADEMY_FLAGSHIP_COURSE: AcademyCourse = {
  id: "basic-to-advance-beautician-course",
  title: "Basic to Advance Beautician Course",
  tagline: "Master Professional Skin Prep, Bridal & HD Glam, Hair Rebonding & Styling",
  badge: "50% OFF SPECIAL BATCH DISCOUNT",
  originalPricePKR: 70000,
  discountedPricePKR: 35000,
  durationWeeks: "2 Months Hands-on Training",
  classSchedule: "Morning & Afternoon Batches | 100% Practical Training on Live Models",
  certification: "Professional Beautician Certification by Shiza",
  description: "Designed by Master Artist Shiza for aspiring beauticians and makeup artists. Comprehensive 2-month hands-on masterclass covering professional skin prep, signature bridal & party glam, eye artistry, hair treatments, and client consultation.",
  modules: [
    {
      number: "01",
      title: "Professional Skin Prep & Hygiene",
      duration: "Weeks 1 - 2",
      topics: [
        "Skin anatomy & analyzing South Asian skin types (Dry, Oily, Combination, Sensitive)",
        "Deep double cleansing, chemical/physical exfoliation & hydration infusing",
        "Clinical hygiene, workstation sterilization & brush sanitization protocols",
        "Pore minimizing, primer layering & moisture barrier lock"
      ]
    },
    {
      number: "02",
      title: "Bridal & HD Party Glam",
      duration: "Weeks 3 - 4",
      topics: [
        "Color correction: Neutralizing dark circles, hyperpigmentation & redness",
        "Base formulation & perfect shade matching for Pakistani skin tones",
        "Waterproof 18-hour sweatproof royal bridal base baking",
        "Dewy vs velvet matte HD party makeup execution"
      ]
    },
    {
      number: "03",
      title: "Signature Eye Art",
      duration: "Weeks 5 - 6",
      topics: [
        "Barat 24K gold smokey eye & Walima pastel cut-crease eye artistry",
        "Precision Arabic winged eyeliner, kohl waterline smoking & graphic styles",
        "Mink lash customization, individual cluster lash application",
        "Eyebrow sculpting, feathering & ombré brow styling"
      ]
    },
    {
      number: "04",
      title: "Hair Rebonding & Styling",
      duration: "Weeks 7 - 8",
      topics: [
        "Brazilian Keratin, protein restoration & hair rebonding masterclass",
        "Bridal backcombing architecture, stuffing placement & royal buns",
        "Hollywood waves, textured braids & clip-in extension blending",
        "Heavy bridal dupatta setting, mathapatti pinning & veil balance"
      ]
    },
    {
      number: "05",
      title: "Client Consultation & Salon Business",
      duration: "Capstone",
      topics: [
        "Bridal trial consultation etiquette, contract drafting & package pricing",
        "Mobile photography, ring lighting & Instagram Reels showcase creation",
        "Starting your salon/freelance business & direct wholesale product sourcing",
        "Live model practical examination & diploma award ceremony"
      ]
    }
  ],
  perks: [
    "🎁 Professional Starter Practice Kit Included",
    "👩‍🎓 100% Practical Training on Live Models",
    "📜 Verified Beautician Certification by Shiza",
    "💼 Salon Internship & Client Referral Opportunities",
    "🏷️ Exclusive 50% Off Special Batch Discount"
  ]
};

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: "barat-package",
    name: "Barat Signature Royal Grandeur",
    subtitle: "For the Queen of the Barat",
    pricePKR: "PKR 65,000",
    badge: "Most Requested",
    isPopular: true,
    description: "Designed for high-impact presence under grand hall chandeliers and 4K cameras.",
    includes: [
      "Signature HD Royal Bridal Base (18H Waterproof)",
      "Traditional Kundan / 24K Gold Smoky Eye Glam",
      "Hair Styling with Real Hair Padding & Texturing",
      "Heavy Embroidered Dupatta Setting & Pinning",
      "Full Jewelry Setting (Mathapatti, Nath, Jhumkas)",
      "Nail Paint, Lash Extensions & Body Glow",
      "Free Consultation & Face Sheet Mask Pre-Prep"
    ]
  },
  {
    id: "walima-package",
    name: "Walima Ethereal Pastel Glam",
    subtitle: "Modern Luxury & Soft Radiance",
    pricePKR: "PKR 50,000",
    description: "Tailored for champagne, silver, and soft blush bridal lehengas.",
    includes: [
      "Glass Skin Airbrush Base with Soft Strobe Glow",
      "Champagne Shimmer & Soft Cut-Crease Eye Art",
      "Hollywood Waves or European Textured Low Bun",
      "Veil & Jewelry Pinning with Crystal Hair Accents",
      "Mink Lashes & Nude Velvet Lip Finish",
      "Pre-makeup Cryo Ice Roller Facial Therapy"
    ]
  },
  {
    id: "nikkah-package",
    name: "Nikkah / Mehndi Sacred Bliss",
    subtitle: "Delicate & Timeless Beauty",
    pricePKR: "PKR 38,000",
    description: "Captivating, intimate glow for daytime or evening Nikkah ceremonies.",
    includes: [
      "Luminous Mineral Base with Radiant Blush",
      "Soft Winged Liner & Brown Smoke Dimension",
      "Traditional Paranda Braid or Soft Romantic Curls",
      "Dupatta Drape & Jewelry Fastening",
      "Delicate False Lashes & Pink Tint Lips"
    ]
  }
];

export const BEFORE_AFTER_LOOKS = [
  {
    id: "bridal-trans",
    title: "Signature Barat Bridal Transformation",
    category: "Bridal Studio",
    beforeLabel: "Natural Bare Skin",
    afterLabel: "Royal Signature Glam",
    beforeImage: "/images/bridal-before.jpg",
    afterImage: "/images/hero-bridal.jpg",
    description: "From natural prepped skin to Lahore's most celebrated royal bridal look with sculpted features and luminous gold shimmer."
  },
  {
    id: "hair-trans",
    title: "Brazilian Keratin Hair Rebonding",
    category: "Hair Clinic",
    beforeLabel: "Frizzy & Damaged Hair",
    afterLabel: "Sleek Mirror Glass Hair",
    beforeImage: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    description: "Total frizz elimination with high-gloss organic protein infusion lasting up to 6 months."
  },
  {
    id: "skin-trans",
    title: "9-Step 24K Gold HydraFacial",
    category: "Skin Clinic",
    beforeLabel: "Congested & Dull Skin",
    afterLabel: "Plump & Glowing Complexion",
    beforeImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    description: "Deep vortex vacuum extraction followed by hyaluronic acid and gold micro-infusion."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    client: "Dr. Anum Jahangir",
    role: "Barat Bride (DHA Phase 5, Lahore)",
    rating: 5,
    quote: "Shiza and her team made me feel like royalty on my wedding day! My makeup stayed flawless for 14 hours straight, through tears and hugs. The dupatta setting was so secure and comfortable.",
    service: "Barat Signature Bridal"
  },
  {
    id: 2,
    client: "Zainab Rauf",
    role: "Academy Graduate (Batch 2024)",
    rating: 5,
    quote: "Taking the 50% off Beautician Course was the best career decision of my life. Shiza ma'am taught us real salon secrets, from skin prep to bridal eyes. I have already booked 8 brides this season!",
    service: "Basic to Advance Course"
  },
  {
    id: 3,
    client: "Rabab Sheikh",
    role: "Regular Salon Client (Model Town, Lahore)",
    rating: 5,
    quote: "Their HydraFacial and Keratin treatments are world-class. The salon ambiance opposite Amanah Mall is pure luxury with golden mirrors and such polite staff. Highly recommend!",
    service: "HydraFacial & Keratin Rebonding"
  }
];
