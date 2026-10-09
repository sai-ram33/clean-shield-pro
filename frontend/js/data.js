/**
 * Clean Shield Pro - Shared Data & State Management
 * Clean Home • Healthy Life | Rajamahendravaram, AP
 */

const STORAGE_KEYS = {
  BOOKINGS: 'csp_bookings',
  ENQUIRIES: 'csp_enquiries',
  REVIEWS: 'csp_reviews',
  PRICING: 'csp_pricing',
  ALERTS: 'csp_alerts'
};

// Official Business Contact Configuration
const BUSINESS_CONFIG = {
  name: 'Clean Shield Pro',
  slogan: "We Don't Just Clean, We Care.",
  tagline: 'Clean Home • Healthy Life',
  city: 'Rajamahendravaram, Andhra Pradesh',
  phone1: '+91 90596 39955',
  phone2: '+91 88973 12523',
  whatsapp1: '9059639955',
  whatsapp2: '8897312523',
  email1: 'madhuripaka756@gmail.com',
  email2: 'prasadanem777@gmail.com',
  allEmails: ['madhuripaka756@gmail.com', 'prasadanem777@gmail.com'],
  allWhatsApp: ['9059639955', '8897312523']
};

// Company Statistics & Achievements (10,000+ Customers)
const COMPANY_STATS = {
  customerCount: '10,000+',
  customerCountNum: 10000,
  customerCountLabel: '10,000+ Happy Customers',
  rating: '4.9 ★',
  branchesCount: '15+',
  satisfactionRate: '100%',
  homesCleaned: '10,000+ Homes Cleaned'
};

// Regional Operational Branches Network (Headquarters + 15 Service Hubs)
const BRANCHES_CONFIG = [
  { id: 'rajahmundry', name: 'Rajahmundry', district: 'East Godavari', isHq: true, phone: '+91 90596 39955', tag: 'Main HQ' },
  { id: 'east-godavari', name: 'East Godavari', district: 'East Godavari', isHq: false, phone: '+91 90596 39955', tag: 'District Hub' },
  { id: 'west-godavari', name: 'West Godavari', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'District Hub' },
  { id: 'palakollu', name: 'Palakollu', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'narasapuram', name: 'Narasapuram', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'jaggampeta', name: 'Jaggampeta', district: 'East Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'vijayawada', name: 'Vijayawada', district: 'Krishna / NTR', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'kakinada', name: 'Kakinada', district: 'Kakinada', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'tanuku', name: 'Tanuku', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'tadepalligudem', name: 'Tadepalligudem', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'eluru', name: 'Eluru', district: 'Eluru', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'amalapuram', name: 'Amalapuram', district: 'Dr. B.R. Ambedkar Konaseema', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'ravulapalem', name: 'Ravulapalem', district: 'Dr. B.R. Ambedkar Konaseema', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'bhimavaram', name: 'Bhimavaram', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'jangareddygudem', name: 'Jangareddygudem', district: 'Eluru', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'vizag', name: 'Vizag (Visakhapatnam)', district: 'Visakhapatnam', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' }
];

// Initial default pricing
const DEFAULT_PRICING = {
  deepCleaning: {
    '1 BHK': 3499,
    '2 BHK': 5499,
    '3 BHK': 5999,
    '4 BHK+': 7499
  },
  pestControl: {
    '1 BHK': 1499,
    '2 BHK': 1999,
    '3 BHK': 2499,
    'Villas': 7499
  },
  addons: {
    balconyCleaning: 499,
    fridgeDeepClean: 399,
    chimneyDegrease: 599,
    mattressSanitization: 899
  }
};

// Full Services Catalog for Urban Company Journey / Cart Flow
const SERVICES_CATALOG = [
  {
    categoryId: 'full-home',
    categoryName: 'Full Home Deep Cleaning',
    categoryIcon: '🏠',
    categorySubtitle: 'Single-disc machine scrubbing, vacuuming, and complete home sanitization',
    services: [
      {
        id: 'fh-furnished',
        name: 'Furnished Apartment Deep Cleaning',
        subtitle: 'Floor scrubbing machine, kitchen degreasing, bathroom descaling & dust extraction',
        rating: 4.88,
        reviewCount: '14.2K reviews',
        duration: '4 - 5 hrs',
        crew: '2-3 Professionals',
        image: 'images/service_deep_clean.jpg',
        badge: 'Bestseller',
        discountTag: '15% OFF',
        hasVariants: true,
        defaultVariantIndex: 1,
        variants: [
          { name: '1 BHK', price: 3499, originalPrice: 4199, duration: '3 - 3.5 hrs' },
          { name: '2 BHK', price: 5499, originalPrice: 6499, duration: '4 - 4.5 hrs' },
          { name: '3 BHK', price: 5999, originalPrice: 7199, duration: '5 - 6 hrs' },
          { name: '4 BHK+ / Villa', price: 7499, originalPrice: 8999, duration: '6 - 7 hrs' }
        ],
        highlights: [
          'High-speed single-disc machine scrubbing for tile & marble floors',
          'German Diversey & Taski eco-chemicals safe for toddlers and pets',
          'Intense degreasing of kitchen slab, chimney mesh & gas stove',
          'Complete descaling & stain removal for all bathroom tiles & WC',
          'Dry vacuuming of sofa, carpets, mattress, curtains & window tracks'
        ],
        inclusions: [
          'Floor scrubbing with rotary single-disc buffer machine',
          'Kitchen slab, backsplash, chimney filter and exhaust degreasing',
          'Bathroom tile descaling, WC sanitization, chrome buffing and mirror shine',
          'Dry vacuuming of upholstery, rugs, window tracks and sliding channels',
          'Balcony floor washing and exterior glass wiping',
          'Ceiling fan, switchboards, doors, handles and frame wipe-down'
        ],
        exclusions: [
          'Interior cleaning of wardrobes/drawers with customer clothes inside (unless emptied)',
          'Heavy furniture lifting beyond safe 2-feet displacement',
          'Exterior rope-access building facade washing'
        ],
        procedure: [
          { step: 1, title: 'Inspection & Dry Vacuuming', desc: 'Thorough dusting of walls, cobwebs, ceilings, sofa and mattress.' },
          { step: 2, title: 'Machine Floor Buffing', desc: 'Single-disc rotary scrubbing machine with Taski neutral floor cleaner.' },
          { step: 3, title: 'Deep Degreasing & Descaling', desc: 'Suma Inox on kitchen metals and Taski R6 on bathroom limescale.' },
          { step: 4, title: 'Steam Sanitization & Walkthrough', desc: 'High-temperature antibacterial steam on sanitizing touchpoints.' }
        ]
      },
      {
        id: 'fh-unfurnished',
        name: 'Unfurnished / Move-In Deep Cleaning',
        subtitle: 'Post-tenancy or new home handover with thorough cabinet & floor sanitization',
        rating: 4.90,
        reviewCount: '8.1K reviews',
        duration: '3.5 - 4.5 hrs',
        crew: '2 Professionals',
        image: 'images/service_deep_clean.jpg',
        badge: 'Move-In Special',
        discountTag: '17% OFF',
        hasVariants: true,
        defaultVariantIndex: 1,
        variants: [
          { name: '1 BHK (Empty)', price: 2999, originalPrice: 3599, duration: '3 hrs' },
          { name: '2 BHK (Empty)', price: 3999, originalPrice: 4799, duration: '3.5 - 4 hrs' },
          { name: '3 BHK (Empty)', price: 4999, originalPrice: 5999, duration: '4.5 - 5 hrs' },
          { name: '4 BHK (Empty)', price: 6999, originalPrice: 8299, duration: '5.5 - 6.5 hrs' },
          { name: 'Duplex Empty Flat', price: 7999, originalPrice: 9499, duration: '6.5 - 7.5 hrs' }
        ],
        highlights: [
          'Complete interior sanitization of empty cupboards, wardrobes and shelves',
          'Paint specks, plaster spots, and cement residue removal from tiles',
          'Acid-free bathroom descaling, mirror polish and drain deodorization',
          'Balcony wash and window glass gleaming'
        ],
        inclusions: [
          'Deep machine floor scrubbing across all rooms',
          'Inside-out cleaning of all modular cabinets, shelves and wardrobes',
          'Deep wash of bathrooms, taps, tiles and exhaust vents',
          'Window panes, sliding channels and balcony grill wash'
        ],
        exclusions: [
          'Heavy paint scraping on fragile wall putty'
        ],
        procedure: [
          { step: 1, title: 'Debris & Dust Evacuation', desc: 'Heavy-duty industrial vacuum extraction across all floors and recesses.' },
          { step: 2, title: 'Cupboard & Shelves Wash', desc: 'Microfiber antibacterial sanitization of all empty storage units.' },
          { step: 3, title: 'Floor Buffing & Paint Spotting', desc: 'Single-disc machine wash to lift stubborn stains and construction dust.' }
        ]
      },
      {
        id: 'fh-villa',
        name: 'Independent House / Duplex Villa Deep Cleaning',
        subtitle: 'Comprehensive multi-storey deep clean with industrial pressure jet & rotary machines',
        rating: 4.93,
        reviewCount: '3.8K reviews',
        duration: '6 - 8 hrs',
        crew: '4 Professionals',
        image: 'images/hero_team.jpg',
        badge: 'Luxury Care',
        discountTag: '16% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: '3 BHK Villa', price: 7999, originalPrice: 9499, duration: '6 hrs' },
          { name: '4 BHK Villa', price: 9999, originalPrice: 11999, duration: '7 hrs' },
          { name: '5 BHK+ Luxury Estate', price: 13499, originalPrice: 15999, duration: '8 hrs' }
        ],
        highlights: [
          'Dual teams with high-pressure rotary floor buffers and jet cleaners',
          'Staircase, banister, porch, and terrace wash included',
          'Deep kitchen degreasing, bathroom descaling and sofa vacuuming'
        ],
        inclusions: [
          'Multi-level floor scrubbing and polishing',
          'Balconies, sit-out portico and terrace pressure washing',
          'All bathrooms, modular kitchen and store rooms deep cleaned'
        ],
        exclusions: [
          'Garden weed trimming or heavy landscaping'
        ],
        procedure: [
          { step: 1, title: 'Top-to-Bottom Zoning', desc: 'Systematic cleaning starting from upper floors down to porch and ground level.' }
        ]
      }
    ]
  },
  {
    categoryId: 'bathroom',
    categoryName: 'Bathroom & Toilet Cleaning',
    categoryIcon: '🚿',
    categorySubtitle: 'Hard water stain removal, tile descaling, WC sanitization and chrome buffer',
    services: [
      {
        id: 'bt-intense',
        name: 'Intense Bathroom Cleaning (Tile Descaling & Stain Removal)',
        subtitle: 'Deep scrubbing of tiles, grout, hard water stains, WC, basin, and taps',
        rating: 4.85,
        reviewCount: '24.6K reviews',
        duration: '30 - 60 mins',
        crew: '1 Professional',
        image: 'images/service_bathroom.jpg',
        badge: 'High Demand',
        discountTag: '20% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: '1 Bathroom', price: 599, originalPrice: 749, duration: '30 - 60 mins' },
          { name: '2 Bathrooms', price: 1099, originalPrice: 1299, duration: '60 - 90 mins' },
          { name: '3 Bathrooms', price: 1599, originalPrice: 1899, duration: '90 - 120 mins' }
        ],
        highlights: [
          'Diversey Taski R6 acidic chemical for hard water limescale on tiles & glass',
          'Tile grout scrubbing with manual stiff bristle brushes & hand buffer',
          'Sanitization of WC commode, urinal, basin and floor drains',
          'Chrome buffing for taps, showerheads and stainless steel fittings'
        ],
        inclusions: [
          'Wall tile descaling up to 7 feet height',
          'Shower partition glass stain removal',
          'Commode interior & exterior sanitization',
          'Floor tile scrubbing and drain opening de-gunking'
        ],
        exclusions: [
          'Broken tile grout replacement or regrouting'
        ],
        procedure: [
          { step: 1, title: 'Chemical Pre-soak', desc: 'Application of Diversey Taski R6 on hard water scales to dissolve deposits.' },
          { step: 2, title: 'Tile & Grout Scrubbing', desc: 'Mechanical scrubbing of wall tiles, floor joints and shower area.' },
          { step: 3, title: 'WC & Fitting Buffing', desc: 'Germicidal sanitization and chrome polishing for mirror-bright taps.' }
        ]
      },
      {
        id: 'bt-classic',
        name: 'Classic Bathroom Cleaning',
        subtitle: 'Routine maintenance sanitization, washbasin wipe and floor scrub',
        rating: 4.79,
        reviewCount: '9.2K reviews',
        duration: '30 - 45 mins',
        crew: '1 Professional',
        image: 'images/service_bathroom.jpg',
        badge: 'Value',
        discountTag: '15% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: '1 Bathroom', price: 499, originalPrice: 599, duration: '30 - 45 mins' },
          { name: '2 Bathrooms', price: 899, originalPrice: 1099, duration: '60 - 75 mins' }
        ],
        highlights: [
          'Regular hygiene wash using Taski R1 sanitizing detergent',
          'Washbasin, mirror, counter and WC seat disinfection',
          'Floor scrubbing and deodorizing'
        ],
        inclusions: [
          'Washbasin and mirror cleaning',
          'WC sanitization and floor wash'
        ],
        exclusions: [
          'Heavy calcium or brown hard water scale removal (choose Intense)'
        ],
        procedure: [
          { step: 1, title: 'Sanitizing Wash', desc: 'Quick foam wash and WC disinfection with fragrant deodorizer.' }
        ]
      }
    ]
  },
  {
    categoryId: 'kitchen',
    categoryName: 'Kitchen Deep Cleaning',
    categoryIcon: '🍳',
    categorySubtitle: 'Chimney degreasing, stove scrub, tile oil removal and cabinet wipe',
    services: [
      {
        id: 'kt-complete',
        name: 'Kitchen Deep Cleaning & Chimney Degreasing',
        subtitle: 'Heavy oil and grease removal from tiles, stove, countertop, exhaust & chimney filters',
        rating: 4.89,
        reviewCount: '16.4K reviews',
        duration: '2 - 3 hrs',
        crew: '1 - 2 Professionals',
        image: 'images/service_kitchen.jpg',
        badge: 'Bestseller',
        discountTag: '20% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: 'Standard Kitchen Degrease', price: 1499, originalPrice: 1899, duration: '2 - 2.5 hrs' },
          { name: 'Kitchen Chimney Only', price: 599, originalPrice: 799, duration: '45 mins' },
          { name: 'Complete Modular Kitchen', price: 1999, originalPrice: 2499, duration: '3 - 3.5 hrs' }
        ],
        highlights: [
          'Chimney baffle filter hot chemical soak to dissolve sticky oil deposits',
          'Industrial food-safe degreaser for stovetop, knobs, backsplash and exhaust fan',
          'Exterior sanitization of all modular drawers and upper cabinets',
          'Stainless steel sink descaling and chrome buffing'
        ],
        inclusions: [
          'Chimney filter wash, exterior hood wipe and exhaust fan degreasing',
          'Kitchen slab, gas stove, backsplash tile and sink deep scrub',
          'Exterior cabinet and handle wipe-down'
        ],
        exclusions: [
          'Chimney motor dismantling or duct replacement',
          'Interior cleaning of cabinets filled with grocery items (unless emptied)'
        ],
        procedure: [
          { step: 1, title: 'Degreasing Soak', desc: 'Chimney filters removed and soaked in high-potency degreasing solution.' },
          { step: 2, title: 'Backsplash & Stove Scrub', desc: 'Intensive scrubbing of oil-splattered ceramic tiles and burner tops.' },
          { step: 3, title: 'Sink & Metal Shine', desc: 'Descaling of stainless steel basin and tap with Taski Suma Inox.' }
        ]
      },
      {
        id: 'kt-modular',
        name: 'Modular Kitchen Interior & Drawer Sanitization',
        subtitle: 'Deep cleaning inside all drawers, pull-out wire baskets and food storage shelves',
        rating: 4.82,
        reviewCount: '5.1K reviews',
        duration: '2 hrs',
        crew: '1 Professional',
        image: 'images/service_kitchen.jpg',
        badge: 'Popular',
        discountTag: '20% OFF',
        hasVariants: false,
        variants: [
          { name: 'All Modular Drawers', price: 1199, originalPrice: 1499, duration: '2 hrs' }
        ],
        highlights: [
          'Food-safe antibacterial wipes for all cutlery trays and wire baskets',
          'Removal of yellow oil grease spots and spice rings on laminate shelves',
          'Safe non-toxic chemical formulas safe for spice jars and utensils'
        ],
        inclusions: [
          'Interior wiping of up to 12 modular drawers and pull-outs',
          'Drawer track dusting and roller glide cleaning'
        ],
        exclusions: [
          'Washing of individual plates and vessels'
        ],
        procedure: [
          { step: 1, title: 'Drawer Interior Extraction', desc: 'Vacuuming spice residues followed by warm sanitizing wipe.' }
        ]
      }
    ]
  },
  {
    categoryId: 'sofa',
    categoryName: 'Sofa & Upholstery Cleaning',
    categoryIcon: '🛋️',
    categorySubtitle: 'Injection-extraction shampooing for fabric sofas, dining chairs and mattresses',
    services: [
      {
        id: 'sf-shampoo',
        name: 'Fabric Sofa Deep Shampooing & Stain Extraction',
        subtitle: 'Foam shampooing and high-power vacuum extraction for deep dirt, sweat & odor',
        rating: 4.87,
        reviewCount: '18.1K reviews',
        duration: '1 - 2 hrs',
        crew: '1 - 2 Professionals',
        image: 'images/service_sofa.jpg',
        badge: 'Top Rated',
        discountTag: '20% OFF',
        hasVariants: true,
        defaultVariantIndex: 1,
        variants: [
          { name: '3-Seater Sofa Set', price: 1199, originalPrice: 1499, duration: '60 mins' },
          { name: '5-Seater Sofa Set', price: 1999, originalPrice: 2499, duration: '90 mins' },
          { name: '7-Seater Sofa Set', price: 2499, originalPrice: 3199, duration: '120 mins' },
          { name: 'Mattress Sanitization', price: 899, originalPrice: 1199, duration: '45 mins' }
        ],
        highlights: [
          'German injection-extraction machine with high-power moisture suction',
          'Biodegradable enzyme upholstery shampoo removes body grease and beverage spots',
          'Semi-dry process dries in just 3 to 4 hours under ceiling fan'
        ],
        inclusions: [
          'Complete dry vacuuming to remove embedded pet hair and dirt',
          'Fabric shampoo foam agitation with soft horsehair brush',
          'High-power moisture and stain suction extraction'
        ],
        exclusions: [
          'Permanent chemical dye bleaches or acid burns on fabric'
        ],
        procedure: [
          { step: 1, title: 'Deep Vacuuming', desc: 'Extraction of loose dirt, crumbs and hair from crevices and seat seams.' },
          { step: 2, title: 'Enzyme Foam Shampoo', desc: 'Mild foaming cleaner massaged evenly into fabric weave.' },
          { step: 3, title: 'Industrial Extraction', desc: '90% moisture extraction leaving sofa lightly damp and fresh.' }
        ]
      },
      {
        id: 'sf-mattress',
        name: 'Mattress Sanitization & Dust-Mite Extraction',
        subtitle: 'Allergen extraction, spot stain treatment and antibacterial steam deodorizing',
        rating: 4.88,
        reviewCount: '8.5K reviews',
        duration: '45 mins',
        crew: '1 Professional',
        image: 'images/service_sofa.jpg',
        badge: 'Health Choice',
        discountTag: '22% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: 'Single / Double Mattress', price: 899, originalPrice: 1199, duration: '45 mins' }
        ],
        highlights: [
          'HEPA vacuum extraction of dead skin cells and dust mites',
          'Enzyme spot treatment for stains and localized sanitization',
          'Leaves mattress hygienic, fresh and allergen-free'
        ],
        inclusions: [
          'Top and side surface vacuuming and stain extraction'
        ],
        procedure: [
          { step: 1, title: 'UV & HEPA Vacuum', desc: 'Removal of microscopic allergens and dead skin cells.' }
        ]
      }
    ]
  },
  {
    categoryId: 'pest',
    categoryName: 'Pest Control Services',
    categoryIcon: '🪳',
    categorySubtitle: 'Odorless Bayer gel baiting, termite drilling, and 3-year warranty',
    services: [
      {
        id: 'pc-cockroach',
        name: 'Odorless Cockroach Control',
        subtitle: 'Advanced herbal gel baiting & crack-and-crevice odorless spray with 90-day warranty',
        rating: 4.92,
        reviewCount: '21.3K reviews',
        duration: '45 - 60 mins',
        crew: '1 Certified Pest Technician',
        image: 'images/service_cockroach.jpg',
        badge: '90-Day Warranty',
        discountTag: '20% OFF',
        hasVariants: true,
        defaultVariantIndex: 1,
        variants: [
          { name: 'Kitchen Only', price: 1199, originalPrice: 1499, duration: '30 mins' },
          { name: '1 BHK', price: 1499, originalPrice: 1899, duration: '45 mins' },
          { name: '2 BHK', price: 1999, originalPrice: 2499, duration: '60 mins' },
          { name: '3 BHK', price: 2499, originalPrice: 2999, duration: '75 mins' },
          { name: 'Annual Contract (3 Visits)', price: 4999, originalPrice: 5999, duration: '1 Year' }
        ],
        highlights: [
          '100% odorless Bayer Maxforce certified gel dots in kitchen corners',
          'No need to empty cupboards, move heavy utensils or leave the house',
          'Secondary odorless spray along skirting boards and bathroom drains',
          'Free re-service warranty if cockroaches reappear within 90 days'
        ],
        inclusions: [
          'Kitchen cabinet gel dots placed at 20+ key nesting points',
          'Odorless chemical spray in all bathrooms, balconies and utility areas',
          'Safe for children, elderly persons and pets'
        ],
        exclusions: [
          'Outdoor sewer line municipal fogging'
        ],
        procedure: [
          { step: 1, title: 'Infestation Mapping', desc: 'Identify cockroach and ant transit routes behind fridge, sink and hinges.' },
          { step: 2, title: 'Gel Point Baiting', desc: 'Drop odorless gel points inside drawer hinges and dark joints.' },
          { step: 3, title: 'Barrier Spray', desc: 'Odorless perimeter spray on balcony thresholds and bathroom drains.' }
        ]
      },
      {
        id: 'pc-termite',
        name: 'Anti-Termite Drill Treatment',
        subtitle: '6mm to 8mm drill-and-inject barrier for skirting tiles and wooden door frames',
        rating: 4.95,
        reviewCount: '6.2K reviews',
        duration: '3 - 5 hrs',
        crew: '2 Certified Drilling Technicians',
        image: 'images/service_termite.jpg',
        badge: '3-Year Warranty',
        discountTag: '18% OFF',
        hasVariants: true,
        defaultVariantIndex: 1,
        variants: [
          { name: '1 BHK Protection', price: 2999, originalPrice: 3699, duration: '2.5 hrs' },
          { name: '2 BHK Protection', price: 3499, originalPrice: 4299, duration: '3.5 hrs' },
          { name: '3 BHK Protection', price: 4499, originalPrice: 5499, duration: '4.5 hrs' },
          { name: 'Villa / Duplex Protection', price: 7499, originalPrice: 8999, duration: '6 hrs' }
        ],
        highlights: [
          'Precision 6mm to 8mm drilling along wall skirtings and door frames',
          'High-pressure chemical injection using Bayer Premise termiticide',
          'Holes sealed neatly with matching white cement / wood filler',
          'Official 3-year warranty certificate with free annual audits'
        ],
        inclusions: [
          'All door frames, window sills and wardrobe base perimeters',
          '3-Year chemical warranty with free re-treatment if active tubes found'
        ],
        exclusions: [
          'Structural timber replacement of hollowed-out frames'
        ],
        procedure: [
          { step: 1, title: 'Drilling & Injection', desc: 'Drill 6mm to 8mm holes every 1 foot along wall-floor junction and infuse termiticide.' }
        ]
      },
      {
        id: 'pc-commercial',
        name: 'Commercial Pest Control (B2B)',
        subtitle: 'Customized IPM for corporate offices, IT parks, retail malls, restaurants & clinics',
        rating: 4.96,
        reviewCount: '460+ commercial premises',
        duration: 'Flexible / After-Hours Shifts',
        crew: 'Commercial IPM Crew (2 - 6 Specialists)',
        image: 'images/service_cockroach.jpg',
        badge: 'Custom Quote',
        discountTag: 'Site Survey',
        hasVariants: true,
        isCustomQuote: true,
        priceLabel: 'Custom Quote / Price on Request',
        variants: [
          { name: 'Corporate Office / IT Park', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Restaurant & Cloud Kitchen IPM', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Retail Showroom & Shopping Store', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Hospital, Clinic & Diagnostic Center', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' }
        ],
        highlights: [
          '100% odorless German Fipronil gel for server rooms, pantries & workstations',
          'Tamper-evident child & pet safe rodent bait stations for utility ducts',
          'FSSAI & ISO audit-ready digital pest logs and compliance certificates',
          'Flexible night & weekend shifts with zero business disruption'
        ],
        inclusions: [
          'Inspection of workstations, false ceilings, cafeteria, server rooms & restrooms',
          'Odorless Maxforce gel baiting in pantries and drawer joints',
          'Concealed rodent multi-catch glue boards and tamper-resistant bait stations',
          'FSSAI, ISO & audit compliance certificate'
        ]
      },
      {
        id: 'pc-industrial',
        name: 'Industrial Pest Control & Fumigation',
        subtitle: 'Heavy-duty pest proofing, godown fumigation & manufacturing plant pest eradication',
        rating: 4.94,
        reviewCount: '210+ factories & godowns',
        duration: 'Scheduled by Facility Acreage',
        crew: 'Industrial Pest Crew & Safety Supervisor (3 - 8 Pros)',
        image: 'images/service_pest_control.jpg',
        badge: 'Heavy-Duty',
        discountTag: 'Site Survey',
        hasVariants: true,
        isCustomQuote: true,
        priceLabel: 'Custom Quote / Price on Request',
        variants: [
          { name: 'Logistics Warehouse & Godown', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Manufacturing & Production Facility', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Cold Storage & Agro-Processing Unit', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' }
        ],
        highlights: [
          'Heavy-duty warehouse fumigation & thermal fogging for high-bay trusses',
          'Subterranean rodent burrow gassing & exterior perimeter bait stations',
          'Stored-product pest eradication for raw materials & pallets',
          'PPE-equipped technicians with Factory Inspectorate & ISO audit clearance'
        ]
      },
      {
        id: 'pc-amc',
        name: 'Pest Control AMC (Annual Maintenance Contract)',
        subtitle: 'Scheduled recurring 365-day pest protection with 4-hour emergency SLA callouts',
        rating: 4.98,
        reviewCount: '380+ active annual contracts',
        duration: 'Monthly / Quarterly Cycles',
        crew: 'Dedicated Account Manager & Assigned Technicians',
        image: 'images/service_pest_control.jpg',
        badge: 'Zero-Pest SLA',
        discountTag: 'Save 30%',
        hasVariants: true,
        isCustomQuote: true,
        priceLabel: 'Custom Quote / Price on Request',
        variants: [
          { name: 'Residential Villa / Home AMC (Quarterly)', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' },
          { name: 'Apartment Society Common Areas AMC', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' },
          { name: 'Corporate Office / Retail AMC (Monthly)', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' },
          { name: 'Restaurant & Hospitality AMC (Bi-Monthly)', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' }
        ],
        highlights: [
          'Scheduled recurring visits without follow-up hassles',
          'Unlimited free emergency callouts within 4-hour SLA response',
          'Multi-pest coverage: roaches, ants, termites, rodents, drain flies & mosquitoes',
          'Up to 30% savings compared to ad-hoc individual treatments'
        ]
      }
    ]
  },
  {
    categoryId: 'tank',
    categoryName: 'Water Tank & Balcony Cleaning',
    categoryIcon: '🚰',
    categorySubtitle: 'High pressure rotary jet washing for overhead tanks, underground sumps & balconies',
    services: [
      {
        id: 'wt-tank',
        name: 'Water Tank Jet Wash',
        subtitle: 'Overhead sintex tanks and underground sumps mechanized rotary pressure wash',
        rating: 4.93,
        reviewCount: '7.4K reviews',
        duration: '1.5 - 2 hrs',
        crew: '2 Certified Tank Technicians',
        image: 'images/service_water_tank.jpg',
        badge: 'UV Sterilized',
        discountTag: '20% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: 'Overhead Tank (Up to 1,000L)', price: 1199, originalPrice: 1499, duration: '60 mins' },
          { name: 'Overhead Tank (Up to 2,000L)', price: 1999, originalPrice: 2499, duration: '90 mins' },
          { name: 'Underground Sump (Up to 2,000L)', price: 1499, originalPrice: 1899, duration: '90 mins' },
          { name: 'Sump + Overhead Combo', price: 2499, originalPrice: 3199, duration: '120 mins' }
        ],
        highlights: [
          'Submersible dewatering pump to quickly evacuate murky stagnant water',
          'Heavy industrial sludge vacuum extraction of mud and silt layers',
          '140-bar high-pressure rotary water jet wash for tank walls and ceiling',
          'Food-grade antibacterial potassium permanganate / UV sanitization'
        ],
        inclusions: [
          'Complete sludge evacuation, wall scrubbing and disinfection',
          'Safe non-toxic chemical treatment leaves water immediately potable'
        ],
        exclusions: [
          'Plumbing pipeline replacement or ball valve repairs'
        ],
        procedure: [
          { step: 1, title: 'Dewatering & Sludge Removal', desc: 'Fast water pump-out followed by high-suction sediment evacuation.' },
          { step: 2, title: 'Pressure Jet Scrubbing', desc: '140-bar rotary pressure jet strips algae and microbial biofilm from walls.' },
          { step: 3, title: 'Antibacterial Disinfection', desc: 'UV treatment and food-grade disinfectant spray before refill.' }
        ]
      },
      {
        id: 'wt-balcony',
        name: 'Balcony, Window & Mesh Cleaning',
        subtitle: 'Pressure cleaning of balcony tiles, railing, sliding glass and mosquito mesh',
        rating: 4.81,
        reviewCount: '5.8K reviews',
        duration: '45 - 60 mins',
        crew: '1 - 2 Professionals',
        image: 'images/hero_team.jpg',
        badge: 'Streak-Free',
        discountTag: '20% OFF',
        hasVariants: true,
        defaultVariantIndex: 0,
        variants: [
          { name: '1 Balcony Deep Wash', price: 499, originalPrice: 699, duration: '45 mins' },
          { name: '2 Balconies Combo', price: 899, originalPrice: 1199, duration: '75 mins' },
          { name: 'Full Home Windows & Tracks', price: 1499, originalPrice: 1899, duration: '90 mins' }
        ],
        highlights: [
          'Floor tile scrubbing and bird mess removal',
          'Railing dusting, spiderweb clearing and glass slider gleam',
          'Mosquito mesh screen vacuuming'
        ],
        inclusions: [
          'Balcony floor, grill, glass pane and drain wash'
        ],
        exclusions: [
          'Rope rappelling external ledge wash'
        ],
        procedure: [
          { step: 1, title: 'Pressure Wash & Polish', desc: 'Tile scrubbing and glass wiping with streak-free squeegee.' }
        ]
      }
    ]
  },
  {
    categoryId: 'b2b-commercial',
    categoryName: 'Commercial, Industrial & AMC',
    categoryIcon: '🏢',
    categorySubtitle: 'Corporate offices, factories, warehouses and Annual Maintenance Contracts (Custom Quote)',
    services: [
      {
        id: 'comm-office',
        name: 'Commercial Office Deep Cleaning',
        subtitle: 'Workstation sanitization, single-disc floor buffing, restrooms & cafeteria degreasing',
        rating: 4.96,
        reviewCount: '580+ offices cleaned',
        duration: 'Flexible / After-Hours',
        crew: 'Dedicated Commercial Crew (4 - 10 Specialists)',
        image: 'images/service_floor.jpg',
        badge: 'Custom Quote',
        discountTag: 'Site Survey',
        hasVariants: true,
        isCustomQuote: true,
        priceLabel: 'Custom Quote / Price on Request',
        variants: [
          { name: 'Corporate Office / IT Park', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Retail Showroom & Shop', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Clinic & Hospital Space', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' }
        ],
        highlights: [
          'Workstation, cubicle & IT equipment safe wipedown',
          'High-torque rotary floor scrubbing & mirror buffing',
          'Touch-point sanitization & deep washroom descaling',
          'Flexible night-shift or weekend execution'
        ]
      },
      {
        id: 'ind-warehouse',
        name: 'Industrial & Warehouse Cleaning',
        subtitle: 'Epoxy floor auto-scrubbing, heavy machine degreasing, high rafters and trusses',
        rating: 4.94,
        reviewCount: '210+ factories serviced',
        duration: 'Scheduled by Facility Size',
        crew: 'Industrial Crew & Supervisor',
        image: 'images/service_floor.jpg',
        badge: 'Heavy-Duty',
        discountTag: 'Site Survey',
        hasVariants: true,
        isCustomQuote: true,
        priceLabel: 'Custom Quote / Price on Request',
        variants: [
          { name: 'Logistics Warehouse & Godown', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' },
          { name: 'Manufacturing & Production Floor', price: 0, priceDisplay: 'Custom Quote', duration: 'Custom' }
        ],
        highlights: [
          'Heavy industrial grease and oil emulsification',
          'Epoxy floor automatic scrubber-drier operation',
          'High-bay structural rafters & duct dusting',
          'Safety PPE compliance and on-site supervisor'
        ]
      },
      {
        id: 'amc-contract',
        name: 'AMC (Annual Maintenance Contract)',
        subtitle: 'Year-round scheduled deep cleaning, pest shield visits, and priority SLA callouts',
        rating: 4.98,
        reviewCount: '340+ active contracts',
        duration: 'Monthly / Quarterly Cycles',
        crew: 'Dedicated Account Manager & Crew',
        image: 'images/hero_team.jpg',
        badge: 'Zero-Downtime Care',
        discountTag: 'Save 30%',
        hasVariants: true,
        isCustomQuote: true,
        priceLabel: 'Custom Quote / Price on Request',
        variants: [
          { name: 'Residential Villa AMC (Quarterly)', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' },
          { name: 'Apartment Society Common Areas AMC', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' },
          { name: 'Corporate Office AMC (Monthly)', price: 0, priceDisplay: 'Custom Quote', duration: 'Annual' }
        ],
        highlights: [
          'Pre-scheduled quarterly or monthly deep clean cycles',
          'Integrated scheduled cockroach, ant and drain fly pest shield',
          'Free emergency callout within 4 hours',
          'Save up to 30% compared to ad-hoc individual bookings'
        ]
      }
    ]
  },
  {
    categoryId: 'addons',
    categoryName: 'Add-ons & Mini Services',
    categoryIcon: '⚡',
    categorySubtitle: 'Single-item quick upgrades you can add to any booking with 1-click',
    services: [
      {
        id: 'ao-fridge',
        name: 'Refrigerator Interior Deep Clean & Disinfection',
        subtitle: 'Removal of food spills, shelf sanitization and deodorizing',
        rating: 4.86,
        reviewCount: '4.2K reviews',
        duration: '30 mins',
        crew: '1 Pro',
        image: 'images/service_kitchen.jpg',
        badge: 'Add-on',
        discountTag: '20% OFF',
        hasVariants: false,
        variants: [
          { name: 'Single Fridge', price: 399, originalPrice: 499, duration: '30 mins' }
        ],
        highlights: ['Food-grade safe lemon extract disinfectant', 'Tray and vegetable crisper soak and wipe']
      },
      {
        id: 'ao-chimney',
        name: 'Kitchen Chimney Mesh Boiling & Degreasing',
        subtitle: 'Hot chemical soak for stainless steel baffle filters',
        rating: 4.90,
        reviewCount: '6.7K reviews',
        duration: '40 mins',
        crew: '1 Pro',
        image: 'images/service_kitchen.jpg',
        badge: 'Add-on',
        discountTag: '23% OFF',
        hasVariants: false,
        variants: [
          { name: 'Chimney Filter Degrease', price: 499, originalPrice: 649, duration: '40 mins' }
        ],
        highlights: ['Clears grease blocks, restores 100% chimney suction power']
      },
      {
        id: 'ao-microwave',
        name: 'Microwave & Oven Interior Degreasing',
        subtitle: 'Steam degreasing and baked-on oil splatters wipe',
        rating: 4.83,
        reviewCount: '3.1K reviews',
        duration: '25 mins',
        crew: '1 Pro',
        image: 'images/service_kitchen.jpg',
        badge: 'Add-on',
        discountTag: '25% OFF',
        hasVariants: false,
        variants: [
          { name: 'Single Microwave / OTG', price: 299, originalPrice: 399, duration: '25 mins' }
        ],
        highlights: ['Food-safe degreasing and glass plate sterilization']
      },
      {
        id: 'ao-fan',
        name: 'Ceiling Fan & Exhaust Fan Deep Scrub',
        subtitle: 'Grease and static dust removal from fan blades & motor casing',
        rating: 4.81,
        reviewCount: '5.5K reviews',
        duration: '20 mins',
        crew: '1 Pro',
        image: 'images/service_deep_clean.jpg',
        badge: 'Add-on',
        discountTag: '33% OFF',
        hasVariants: false,
        variants: [
          { name: 'Up to 3 Ceiling Fans', price: 199, originalPrice: 299, duration: '20 mins' }
        ],
        highlights: ['Microfiber anti-static dusting and blade degrease']
      }
    ]
  }
];

// Coupon Offers Configuration
const PROMO_COUPONS = {
  'FIRST500': { code: 'FIRST500', discountType: 'flat', value: 500, minOrder: 2500, desc: 'Flat ₹500 OFF on orders above ₹2,500' },
  'GODAVARI10': { code: 'GODAVARI10', discountType: 'percent', value: 10, maxDiscount: 600, minOrder: 1000, desc: '10% OFF on all services (up to ₹600)' },
  'CLEAN200': { code: 'CLEAN200', discountType: 'flat', value: 200, minOrder: 800, desc: 'Flat ₹200 OFF on your hygiene booking' }
};

// API Base URL for MongoDB Express Backend (Auto-detects Render cloud domain or localhost)
const API_BASE_URL = (typeof window !== 'undefined' && (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'))
  ? '/api'
  : ((typeof window !== 'undefined' && window.location.port === '5000') ? '/api' : 'http://localhost:5000/api');

// Initial seeds are completely empty as per user requirement (portal starts clean until real bookings occur)
const SEED_BOOKINGS = [];
const SEED_ENQUIRIES = [];

// Default customer reviews
const SEED_REVIEWS = [
  {
    id: 'REV-101',
    customerName: 'K. Durga Prasad',
    rating: 5,
    locality: 'Danavaipeta',
    service: 'Full Home Deep Cleaning (3 BHK)',
    date: '28 Sep 2026',
    review: 'Clean Shield Pro did an extraordinary job with our 3 BHK in Danavaipeta before the festive season. The team arrived on time with professional machines, and every corner looks spotless. Highly recommended in Rajamahendravaram!',
    approved: true
  },
  {
    id: 'REV-102',
    customerName: 'M. Padmavathi',
    rating: 5,
    locality: 'Prakash Nagar',
    service: 'Kitchen & Chimney Cleaning',
    date: '25 Sep 2026',
    review: 'Our kitchen chimney had years of tough grease buildup. Their crew cleaned it completely like brand new without any harsh smells. Safe eco-friendly products as promised!',
    approved: true
  },
  {
    id: 'REV-103',
    customerName: 'T. Subrahmanyam',
    rating: 5,
    locality: 'Morampudi',
    service: 'Pest Control (2 BHK)',
    date: '22 Sep 2026',
    review: 'Very professional odorless pest control treatment. We had severe cockroach trouble in the kitchen cabinets, and within 48 hours they were completely eliminated. Punctual and courteous staff.',
    approved: true
  }
];

// Database API helper with MongoDB Atlas synchronization
class CleanShieldDB {
  static init() {
    if (typeof localStorage === 'undefined') return;

    // Clear legacy mock seed bookings if any exist so admin portal starts empty
    const currentBookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
    const legacyIds = ['CSP-84921', 'CSP-84920', 'CSP-84919', 'CSP-84918', 'CSP-84922', 'CSP-84923', 'CSP-84924', 'CSP-84925', 'CSP-84926'];
    const cleanedBookings = currentBookings.filter(b => !legacyIds.includes(b.id));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(cleanedBookings));

    const currentEnquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
    const legacyEnqIds = ['ENQ-201', 'ENQ-202', 'ENQ-203'];
    const cleanedEnquiries = currentEnquiries.filter(e => !legacyEnqIds.includes(e.id));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(cleanedEnquiries));

    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(DEFAULT_PRICING));
    }

    // Background sync from MongoDB if available
    this.syncFromBackend();
  }

  static async syncFromBackend() {
    try {
      const bRes = await fetch(`${API_BASE_URL}/bookings`);
      if (bRes.ok) {
        const bData = await bRes.json();
        if (bData.success && Array.isArray(bData.data)) {
          localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bData.data));
          window.dispatchEvent(new CustomEvent('csp_bookings_synced', { detail: bData.data }));
        }
      }
      const eRes = await fetch(`${API_BASE_URL}/enquiries`);
      if (eRes.ok) {
        const eData = await eRes.json();
        if (eData.success && Array.isArray(eData.data)) {
          localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(eData.data));
          window.dispatchEvent(new CustomEvent('csp_enquiries_synced', { detail: eData.data }));
        }
      }
    } catch (e) {
      // Offline fallback: continue using local storage
    }
  }

  // Bookings
  static getBookings() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    } catch (e) {
      return [];
    }
  }

  static async fetchBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(json.data));
          return json.data;
        }
      }
    } catch (e) {}
    return this.getBookings();
  }

  static addBooking(bookingData) {
    const bookings = this.getBookings();
    const newId = 'CSP-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      paymentStatus: (Number(bookingData.amount) === 0) ? 'Site Survey Scheduled' : (bookingData.paymentMethod && bookingData.paymentMethod.includes('Cash') ? 'Pending' : 'Paid'),
      ...bookingData
    };
    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Asynchronously save to MongoDB Atlas
    fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    }).then(r => r.json()).then(res => {
      if (res.success && res.data) {
        console.log('✅ Booking successfully stored in MongoDB:', res.data.id);
      }
    }).catch(err => console.warn('Backend sync queued:', err.message));

    // Trigger cross-tab notification
    this.triggerAlert({
      type: 'booking',
      title: 'New Booking Received!',
      message: `${newBooking.customerName} booked ${newBooking.service} (${newBooking.bhk || ''}) for ₹${newBooking.amount.toLocaleString('en-IN')}`,
      id: newId,
      time: new Date().toLocaleTimeString()
    });

    return newBooking;
  }

  static updateBookingStatus(bookingId, newStatus, paymentStatus = null) {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      bookings[idx].status = newStatus;
      if (paymentStatus) {
        bookings[idx].paymentStatus = paymentStatus;
      } else if (newStatus === 'Completed') {
        bookings[idx].paymentStatus = 'Paid';
      }
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

      // Asynchronously update in MongoDB Atlas
      fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).catch(err => console.warn('Status sync error:', err.message));

      return bookings[idx];
    }
    return null;
  }

  static findBooking(query) {
    const bookings = this.getBookings();
    const q = query.trim().toLowerCase();
    return bookings.find(b => 
      b.id.toLowerCase() === q || 
      (b.phone && b.phone.replace(/\D/g, '').includes(q.replace(/\D/g, '')))
    );
  }

  // Enquiries
  static getEnquiries() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) || [];
    } catch (e) {
      return [];
    }
  }

  static async fetchEnquiries() {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(json.data));
          return json.data;
        }
      }
    } catch (e) {}
    return this.getEnquiries();
  }

  static addEnquiry(enquiryData) {
    const enquiries = this.getEnquiries();
    const newId = 'ENQ-' + Math.floor(200 + Math.random() * 800);
    const newEnquiry = {
      id: newId,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...enquiryData
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));

    // Asynchronously save to MongoDB Atlas
    fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEnquiry)
    }).then(r => r.json()).then(res => {
      if (res.success && res.data) {
        console.log('✅ Enquiry successfully stored in MongoDB:', res.data.id);
      }
    }).catch(err => console.warn('Enquiry sync error:', err.message));

    return newEnquiry;
  }

  static updateEnquiryStatus(enquiryId, newStatus) {
    const enquiries = this.getEnquiries();
    const idx = enquiries.findIndex(e => e.id === enquiryId);
    if (idx !== -1) {
      enquiries[idx].status = newStatus;
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));

      fetch(`${API_BASE_URL}/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).catch(err => console.warn('Enquiry status sync error:', err.message));

      return enquiries[idx];
    }
    return null;
  }

  // Reviews
  static getReviews(approvedOnly = true) {
    this.init();
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
      return approvedOnly ? all.filter(r => r.approved) : all;
    } catch (e) {
      return approvedOnly ? SEED_REVIEWS.filter(r => r.approved) : SEED_REVIEWS;
    }
  }

  static addReview(reviewData) {
    const reviews = this.getReviews(false);
    const newId = 'REV-' + Math.floor(100 + Math.random() * 900);
    const newReview = {
      id: newId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      approved: true, // auto-approve for demonstration, easily toggled in admin
      ...reviewData
    };
    reviews.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return newReview;
  }

  static toggleReviewStatus(reviewId) {
    const reviews = this.getReviews(false);
    const idx = reviews.findIndex(r => r.id === reviewId);
    if (idx !== -1) {
      reviews[idx].approved = !reviews[idx].approved;
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
      return reviews[idx];
    }
    return null;
  }

  // Pricing
  static getPricing() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICING)) || DEFAULT_PRICING;
    } catch (e) {
      return DEFAULT_PRICING;
    }
  }

  static updatePricing(newPricing) {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(newPricing));
  }

  // Live Alerts & Broadcasts
  static triggerAlert(alertData) {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify({
      ...alertData,
      timestamp: Date.now()
    }));
    window.dispatchEvent(new CustomEvent('csp_new_lead', { detail: alertData }));
  }

  // Business Details & Contacts
  static getBusinessConfig() {
    return BUSINESS_CONFIG;
  }

  // Generate WhatsApp Message Text for Confirmation
  static getFormattedConfirmationText(booking) {
    return `*CLEAN SHIELD PRO - OFFICIAL BOOKING CONFIRMATION*\n` +
      `"Clean Home • Healthy Life | We Don't Just Clean, We Care."\n\n` +
      `📌 *Booking ID:* ${booking.id}\n` +
      `👤 *Customer Name:* ${booking.customerName}\n` +
      `📞 *Primary Phone:* ${booking.phone}\n` +
      (booking.altPhone ? `📱 *Secondary Phone:* ${booking.altPhone}\n` : '') +
      `✉️ *Email:* ${booking.email || 'N/A'}\n` +
      `🧹 *Service:* ${booking.service} (${booking.bhk || 'Standard'})\n` +
      `🗓️ *Scheduled Date:* ${booking.date}\n` +
      `⏰ *Time Slot:* ${booking.timeSlot}\n` +
      `📍 *Locality:* ${booking.locality}, Rajamahendravaram\n` +
      `🏠 *Full Address:* ${booking.address}\n` +
      `➕ *Add-ons:* ${booking.addons && booking.addons.length ? booking.addons.join(', ') : 'None'}\n` +
      `💰 *Total Amount:* Rs. ${Number(booking.amount).toLocaleString('en-IN')}\n` +
      `💳 *Payment Mode:* ${booking.paymentMethod} (${booking.paymentStatus || 'Pending'})\n` +
      `📝 *Notes:* ${booking.notes || 'None'}\n\n` +
      `🏢 *Clean Shield Pro Rajamahendravaram Office*\n` +
      `Helplines: +91 90596 39955 | +91 88973 12523\n` +
      `Emails: madhuripaka756@gmail.com | prasadanem777@gmail.com`;
  }

  // WhatsApp Message Generator
  static getWhatsAppLink(phone, message) {
    let cleanPhone = (phone || BUSINESS_CONFIG.whatsapp1).toString().replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  }

  // Email Confirmation mailto: Generator
  static getEmailConfirmationLink(booking, recipients = null) {
    const toEmails = recipients || BUSINESS_CONFIG.allEmails.join(',');
    const subject = encodeURIComponent(`Clean Shield Pro Booking Confirmation [${booking.id}] - ${booking.customerName}`);
    
    const bodyContent = 
`Namaste Clean Shield Pro Team & Customer,

Here are the confirmed booking details for residential cleaning & pest control in Rajamahendravaram:

==================================================
CLEAN SHIELD PRO - OFFICIAL BOOKING CONFIRMATION
"Clean Home • Healthy Life"
"We Don't Just Clean, We Care."
==================================================

BOOKING INFORMATION:
- Booking Reference ID: ${booking.id}
- Customer Name: ${booking.customerName}
- Contact Phone: ${booking.phone}
- Customer Email: ${booking.email || 'N/A'}
- Service Booked: ${booking.service}
- Configuration / BHK: ${booking.bhk || 'Standard'}
- Scheduled Date: ${booking.date}
- Time Slot Window: ${booking.timeSlot}

SERVICE LOCATION:
- Locality: ${booking.locality}, Rajamahendravaram
- Complete Street Address: ${booking.address}
- Special Notes / Instructions: ${booking.notes || 'None'}

COMMERCIAL & PAYMENT DETAILS:
- Total Service Amount: Rs. ${Number(booking.amount).toLocaleString('en-IN')}
- Selected Payment Method: ${booking.paymentMethod}
- Payment Status: ${booking.paymentStatus || 'Pending'}
- Add-ons Included: ${booking.addons && booking.addons.length ? booking.addons.join(', ') : 'None'}

==================================================
OPERATIONS DESK CONTACT:
Rajamahendravaram, Andhra Pradesh
Primary WhatsApp / Phone: +91 90596 39955
Secondary WhatsApp / Phone: +91 88973 12523
Official Operations Emails: 
- madhuripaka756@gmail.com
- prasadanem777@gmail.com
==================================================`;

    const encodedBody = encodeURIComponent(bodyContent);
    const ccParam = (booking.email && booking.email !== 'N/A') ? `&cc=${encodeURIComponent(booking.email)}` : '';
    return `mailto:${toEmails}?subject=${subject}&body=${encodedBody}${ccParam}`;
  }

  // Catalog & Journey helpers
  static getCatalog() {
    return SERVICES_CATALOG;
  }

  static getCoupons() {
    return PROMO_COUPONS;
  }

  static getServiceById(serviceId) {
    for (const cat of SERVICES_CATALOG) {
      const found = cat.services.find(s => s.id === serviceId);
      if (found) return found;
    }
    return null;
  }
}

// Auto init on load
CleanShieldDB.init();

// Export to window for vanilla JS access
window.CleanShieldDB = CleanShieldDB;
window.SERVICES_CATALOG = SERVICES_CATALOG;
window.PROMO_COUPONS = PROMO_COUPONS;
