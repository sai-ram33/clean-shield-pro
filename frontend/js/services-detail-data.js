/**
 * Clean Shield Pro - Comprehensive Service Detail Profiles
 * Contains full data, pricing, inclusions, exclusions, and procedures for all 15 services.
 */

const SERVICES_DETAILED_DATA = {
  // =========================================================================
  // CATEGORY 1: HOME CLEANING SERVICES (8 Services)
  // =========================================================================
  'deep-clean': {
    id: 'deep-clean',
    cardId: 'card-deep-clean',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Full Home Deep Cleaning',
    badge: 'Bestseller • 4.9★',
    image: 'images/service_deep_clean.jpg',
    rating: 4.9,
    reviewCount: '1,420+ homes cleaned in Rajamahendravaram',
    duration: '4 - 5 Hours',
    crew: '2 - 3 Trained Cleaning Specialists',
    guarantee: '100% Re-cleaning Guarantee within 24 Hours',
    startingPrice: '₹3,500',
    priceUnit: 'for 1 BHK',
    brief: 'Single-disc rotary floor scrubbing, kitchen degreasing & washroom descaling.',
    description: 'Our signature whole-house restoration cleaning using German Taski eco-chemicals, high-torque single-disc rotary floor buffing machines, and heavy-duty dust extractors. We restore tile luster, dissolve grease in kitchens, eliminate hard water scales in bathrooms, and deep-vacuum all upholstery.',
    pricingOptions: [
      { label: '1 BHK Deep Clean', price: '₹3,500', note: 'Up to 600 sq.ft • 2 Pros • 3.5 hrs' },
      { label: '2 BHK Deep Clean', price: '₹4,500', note: 'Up to 1,000 sq.ft • 2-3 Pros • 4.5 hrs (Most Popular)' },
      { label: '3 BHK Deep Clean', price: '₹5,500', note: 'Up to 1,500 sq.ft • 3 Pros • 5.5 hrs' },
      { label: '4 BHK+ / Villa', price: '₹7,500', note: 'Up to 2,500 sq.ft • 4 Pros • 7 hrs' }
    ],
    bullets: [
      'Single-disc machine rotary floor scrubbing for tiles, marble and granite',
      'Intense kitchen degreasing, chimney baffle filter wash & gas stove scrubbing',
      'Complete bathroom hard-water tile descaling & WC germicidal sanitization',
      'Dry vacuuming of sofas, carpets, window channels, curtains and mattresses'
    ],
    inclusions: [
      'Single-disc rotary machine scrubbing with Taski R2 neutral floor cleaner across all living rooms, bedrooms, and passages.',
      'Modular kitchen degreasing: chimney filter wash, exhaust fan, cooktop, backsplash tiles, countertop, and cabinet exterior wipe-down.',
      'Bathroom restoration: acid-free Taski R6 limescale descaling on wall tiles, floor scrubbing, WC bowl sanitization, tap mirror buffing, and mirror shine.',
      'Upholstery & dust extraction: high-suction vacuuming of sofa, cushions, rugs, window track sliding channels, and ceiling cobweb removal.',
      'Fixtures & woodwork: ceiling fans, switchboards, door frames, wardrobes exterior wipedown, and balcony floor wash.'
    ],
    exclusions: [
      'Emptying customer clothes from occupied wardrobes (unless already cleared before service).',
      'Heavy furniture shifting beyond safe 2-feet sliding displacement.',
      'External building facade or rope-access glass cleaning.'
    ],
    chemicals: 'Diversey Taski R1 (Hygiene), R2 (Floor), R3 (Glass), Suma Inox (Stainless steel), and Taski R6 (Limescale remover). 100% child and pet safe.',
    steps: [
      { step: 1, title: 'Dry Dusting & Cobweb Evacuation', desc: 'Ceiling fans, chandeliers, wall corners, curtains, and high-level ledges dusted.' },
      { step: 2, title: 'Bathroom & Kitchen Pre-Soak', desc: 'Application of eco-descalers and degreasers to dissolve grease and hard-water lime.' },
      { step: 3, title: 'Rotary Single-Disc Floor Buffing', desc: 'Heavy scrubbing machine lifts deep-set dirt from grout lines and tile surfaces.' },
      { step: 4, title: 'Vacuuming & Window Shine', desc: 'Sliding track channels vacuumed, glass squeegeed, and upholstery surface-cleaned.' },
      { step: 5, title: 'Quality Handover & Inspection', desc: 'Supervisor audit with customer checklist before signing off.' }
    ]
  },

  'bathroom': {
    id: 'bathroom',
    cardId: 'card-bathroom',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Bathroom & Toilet Descaling',
    badge: 'Tile Descaling Specialist',
    image: 'images/service_bathroom.jpg',
    rating: 4.88,
    reviewCount: '2,650+ bathrooms restored',
    duration: '60 - 90 Minutes per Bath',
    crew: '1 - 2 Dedicated Specialists',
    guarantee: 'Sparkling Tile & Acid-Free Safe Chemistry',
    startingPrice: '₹799',
    priceUnit: 'per Bathroom',
    brief: 'Acid-free hard-water tile descaling, WC sanitization & tap mirror buff.',
    description: 'Specialized hard-water mineral stain removal formulated specifically for the Godavari region water supply. We utilize Taski R6 acid-free sanitizers that dissolve tough yellow scale from vitrified tiles, shower cubicles, and WC bowls without eroding grout or harming chrome taps.',
    pricingOptions: [
      { label: '1 Bathroom Intensive', price: '₹799', note: 'Complete descaling • 60 mins' },
      { label: '2 Bathrooms Combo', price: '₹1,499', note: 'Save ₹100 • 2 Hours' },
      { label: '3 Bathrooms Value Pack', price: '₹1,999', note: 'Save ₹400 • Most Popular' },
      { label: '4 Bathrooms Villa Pack', price: '₹2,499', note: 'Full house washroom hygiene' }
    ],
    bullets: [
      'Hard-water scale removal from wall & floor tiles',
      'Acid-free Taski R6 toilet sanitization & commode scrub',
      'Chrome taps & shower head mirror shine buffing',
      'Exhaust fan, mirror & floor drain deodorization'
    ],
    inclusions: [
      'Wall tile hard water limescale scrubbing up to 7 feet height.',
      'Glass shower partition scale removal with streak-free buffing.',
      'WC commode and washbasin deep disinfection inside-out.',
      'Chrome taps, shower heads, and CP fittings polished to showroom shine.',
      'Floor tile mechanical scrub, drain grating de-gunking, and odor removal.'
    ],
    exclusions: [
      'Tile regrouting or crack repairs.',
      'Removal of permanent internal marble etching caused by past harsh hydrochloric acid usage.'
    ],
    chemicals: 'Taski R6 (Descaler), Taski R1 (Super disinfectant), Diversey Clax (Chrome polish). Safe on vitrified tiles and sanitaryware.',
    steps: [
      { step: 1, title: 'Scale Softening', desc: 'Taski R6 foam sprayed onto tiles and shower glass to soften calcium carbonate deposits.' },
      { step: 2, title: 'Mechanical Scrub', desc: 'Stiff-bristle rotary pads scrub grout lines, soap scum, and water spots.' },
      { step: 3, title: 'WC & Drain Sterilization', desc: 'Germicidal sanitization of commode, urinal, washbasin, and drain traps.' },
      { step: 4, title: 'Chrome Buff & Shine', desc: 'Microfiber polishing of all taps, health faucets, and mirrors.' }
    ]
  },

  'kitchen': {
    id: 'kitchen',
    cardId: 'card-kitchen',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Kitchen & Chimney Degreasing',
    badge: 'Heavy Degreasing Pro',
    image: 'images/service_kitchen.jpg',
    rating: 4.87,
    reviewCount: '1,890+ kitchens degreased',
    duration: '2 - 3 Hours',
    crew: '2 Specialized Technicians',
    guarantee: '100% Oil & Tadka Stain Breakdown',
    startingPrice: '₹1,499',
    priceUnit: 'Standard Kitchen',
    brief: 'Heavy oil, grease & tadka stain breakdown with chimney filter wash.',
    description: 'Deep kitchen sanitization engineered to dissolve sticky oil deposits, tadka soot, and yellow grease from chimney baffle filters, gas hobs, backsplash tiles, and modular cabinets.',
    pricingOptions: [
      { label: 'Standard Kitchen Degrease', price: '₹1,499', note: 'Countertop, stove, backsplash & sink' },
      { label: 'Kitchen + Chimney Filter', price: '₹1,999', note: 'Includes mesh filter soak & wash' },
      { label: 'Complete Modular Kitchen', price: '₹2,499', note: 'Chimney + Inside/Out Cabinets + Sump' }
    ],
    bullets: [
      'Heavy oil, grease & tadka stain chemical breakdown',
      'Chimney mesh baffle filter wash & degreasing',
      'Gas stove, granite slab & tile backsplash scrubbing',
      'Modular cabinet exterior & interior wipe-down'
    ],
    inclusions: [
      'Chimney outer body wipe, oil collector cup degreasing, and baffle filter caustic wash.',
      'Gas stove burners, knob grooves, and stainless steel / glass cooktop scrub.',
      'Kitchen wall backsplash tile scrubbing to remove sticky cooking vapors.',
      'Granite slab buffing, sink drain pipe unclogging and sanitization.',
      'Cabinet exterior wipedown and handle grease removal.'
    ],
    exclusions: [
      'Internal chimney motor dismantling or duct replacement.',
      'Emptying full grocery jars from occupied cabinets (exterior wipe only unless emptied).'
    ],
    chemicals: 'Suma D9 Heavy Duty Oven & Grill Degreaser, Taski R3 Glass & Stainless Cleaner.',
    steps: [
      { step: 1, title: 'Filter Soak', desc: 'Chimney baffle filters soaked in heavy grease-dissolving solution.' },
      { step: 2, title: 'Backsplash & Hob Degrease', desc: 'Application of industrial degreaser on tiles, cooktop, and granite.' },
      { step: 3, title: 'Cabinet Scrub', desc: 'Microfiber degreasing of cabinet panels, handles, and exhaust fan blades.' },
      { step: 4, title: 'Sink & Drain Sterilization', desc: 'Hot water flush and sanitization of sink and drainage traps.' }
    ]
  },

  'sofa': {
    id: 'sofa',
    cardId: 'card-sofa',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Sofa & Upholstery Shampooing',
    badge: 'Fabric Shampoo • Quick Dry',
    image: 'images/service_sofa.jpg',
    rating: 4.89,
    reviewCount: '3,100+ sofas shampooed',
    duration: '1.5 - 2 Hours',
    crew: '1 - 2 Upholstery Experts',
    guarantee: 'Dust Mite & Odor Extraction',
    startingPrice: '₹999',
    priceUnit: 'for 3-Seater',
    brief: '3-Stage injection extraction shampoo for dust mites & deep sweat suction.',
    description: 'High-suction extraction shampoo treatment that eliminates embedded dirt, pet dander, food stains, body oils, and dust mites from sofa cushions and dining chairs without damaging delicate fabric threads.',
    pricingOptions: [
      { label: '3-Seater Sofa Set', price: '₹999', note: 'Fabric or suede material • 60 mins' },
      { label: '5-Seater Sofa Set (3+1+1)', price: '₹1,499', note: 'Most Popular • 90 mins' },
      { label: '7-Seater / L-Shape Recliner', price: '₹1,999', note: 'Includes backrests & headrests' },
      { label: 'Mattress Sanitization Add-on', price: '₹700', note: 'Double bed deep extraction' }
    ],
    bullets: [
      '3-Stage injection extraction shampoo machine wash',
      'Dust mite, pet dander & deep sweat suction',
      'Color-safe fabric brightening Diversey chemicals',
      'Quick 3-4 hour natural air drying technology'
    ],
    inclusions: [
      'Deep dry vacuuming to remove loose crumbs, pet hair, and coarse dust.',
      'Foam shampoo injection into fabric fibers to suspend deep-seated grime.',
      'Stain-spotting treatment on visible beverage, tea, or ink spots.',
      'High-pressure vacuum extraction pulling out 95% of moisture and dirt slurry.'
    ],
    exclusions: [
      'Permanent fabric dye bleeding caused by old sunlight degradation.',
      'Leather repainting or tear repairs (we offer leather cleaning/conditioning separately).'
    ],
    chemicals: 'Taski TR101 Carpet & Upholstery Shampoo. Neutral pH, gentle on skin and fabric dyes.',
    steps: [
      { step: 1, title: 'Dry Debris Vacuuming', desc: 'High-power suction reaches crevices and between cushion folds.' },
      { step: 2, title: 'Spotting & Foam Shampoo', desc: 'Color-safe foam agitator penetrates deep into weave to lift dirt.' },
      { step: 3, title: 'Slurry Extraction', desc: 'Industrial moisture extractor lifts dirty fluid into separate waste tank.' },
      { step: 4, title: 'Air-Dry Guidance', desc: 'Quick-dry natural ventilation ready for sitting in 3-4 hours.' }
    ]
  },

  'water-tank': {
    id: 'water-tank',
    cardId: 'card-water-tank',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Water Tank Jet Wash',
    badge: 'UV Sterilized & Jet Wash',
    image: 'images/service_water_tank.jpg',
    rating: 4.93,
    reviewCount: '1,560+ tanks sterilized',
    duration: '1.5 - 2 Hours',
    crew: '2 Certified Tank Technicians',
    guarantee: '100% Safe Drinking Water Standard',
    startingPrice: '₹999',
    priceUnit: 'Up to 1,000L Overhead',
    brief: '140-bar German pressure jet wash, sludge evacuation & UV sterilization.',
    description: '6-stage mechanized cleaning process for overhead Sintex tanks and underground sumps. Removes years of accumulated mud, algae, microbial biofilm, and mosquito larvae to protect your family from water-borne illnesses.',
    pricingOptions: [
      { label: 'Overhead Tank (Up to 1,000L)', price: '₹999', note: 'Sintex / plastic tanks' },
      { label: 'Overhead Tank (Up to 2,000L)', price: '₹1,299', note: 'Large residential overhead' },
      { label: 'Underground Sump (Up to 5,000L)', price: '₹1,499', note: 'Concrete or brick underground' },
      { label: 'Sump + Overhead Combo', price: '₹2,299', note: 'Save ₹200 • Best Value' }
    ],
    bullets: [
      'German high-pressure rotary pressure washer (140-bar)',
      'Sludge & algae vacuum extraction from floor & corners',
      'Food-grade potassium permanganate & UV sanitization',
      '100% safe for daily drinking & cooking water'
    ],
    inclusions: [
      'Submersible dewatering pump to empty stagnant bottom sediment.',
      'Sludge vacuum machine extraction of mud and silt cake.',
      '140-bar high pressure jet wash stripping algae off tank walls and ceiling.',
      'Vacuum suction of dirty slurry and residue.',
      'Antibacterial spray with potassium permanganate and UV chamber exposure.'
    ],
    exclusions: [
      'Plumbing pipeline modifications or ballcock valve replacements.'
    ],
    chemicals: 'Food-grade potassium permanganate and UV-C germicidal radiation. No harmful chlorine odor.',
    steps: [
      { step: 1, title: 'Dewatering', desc: 'Fast water pump-out using portable submersible pump.' },
      { step: 2, title: 'Sludge Suction', desc: 'Heavy sediment vacuum pulls out mud and settled silt.' },
      { step: 3, title: 'High-Pressure Rotary Wash', desc: '140-bar jet strips wall algae and organic slime.' },
      { step: 4, title: 'UV & Antibacterial Sterilize', desc: 'Food-grade sanitization leaves tank safe for immediate refill.' }
    ]
  },

  'floor-scrubbing': {
    id: 'floor-scrubbing',
    cardId: 'card-floor-scrubbing',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Floor Scrubbing & Machine Buffing',
    badge: 'Industrial Single-Disc',
    image: 'images/service_floor.jpg',
    rating: 4.88,
    reviewCount: '980+ floors restored',
    duration: '2 - 3 Hours',
    crew: '2 Machine Operators',
    guarantee: 'Grout Grime Lift & Mirror Shine',
    startingPrice: '₹1,800',
    priceUnit: 'Up to 1,000 sq.ft',
    brief: 'High-torque rotary buffer for marble, granite, vitrified & grout lines.',
    description: 'Industrial single-disc machine floor restoration that strips black dirt from tile joints, removes surface grime, and restores original glossy shine to vitrified tiles, Italian marble, and mosaic flooring.',
    pricingOptions: [
      { label: 'Up to 1,000 sq.ft', price: '₹1,800', note: 'Living, hall, dining & bedrooms' },
      { label: '1,001 - 1,500 sq.ft', price: '₹2,499', note: 'Standard 3 BHK flooring' },
      { label: '1,501 - 2,500 sq.ft Villa', price: '₹3,799', note: 'Multi-level bungalow floors' },
      { label: 'Extra Area Beyond Quoted', price: '₹1.50/sq.ft', note: 'Discounted per sq.ft add-on' }
    ],
    bullets: [
      'High-torque single-disc rotary machine scrubbing',
      'Marble, granite, vitrified & mosaic tile grime lift',
      'Deep grout line dirt & grease extraction',
      'Glistening gloss & mirror polish finish'
    ],
    inclusions: [
      'Single-disc rotary buffing machine with specialized nylon-grit scrubbing discs.',
      'Taski R2 professional alkaline neutral cleaning chemical solution.',
      'Wet vacuum extraction of suspended dirty water slurry.',
      'Mop drying and microfiber buffing for uniform sheen.'
    ],
    exclusions: [
      'Diamond pad deep stone grinding or crystallizing polish (available on custom marble quote).'
    ],
    chemicals: 'Taski R2 Floor Neutralizer and Diversey Jontec Floor Polish.',
    steps: [
      { step: 1, title: 'Chemical Flooding', desc: 'Diluted floor cleaning solution spread evenly to loosen dirt.' },
      { step: 2, title: 'Single-Disc Rotary Scrub', desc: '175 RPM weighted disc scrubs tile pores and grout seams.' },
      { step: 3, title: 'Wet Vacuum Extraction', desc: 'High-suction wet vacuum collects dirty slurry immediately.' },
      { step: 4, title: 'Microfiber Buff', desc: 'Dry buffing brings back natural glossy shine.' }
    ]
  },

  'vacant-flat': {
    id: 'vacant-flat',
    cardId: 'card-vacant-flat',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Move-in / Vacant Flat Cleaning',
    badge: '100% Move-in Ready',
    image: 'images/service_deep_clean.jpg',
    rating: 4.91,
    reviewCount: '1,240+ empty homes handed over',
    duration: '3.5 - 5 Hours',
    crew: '2 - 3 Cleaning Specialists',
    guarantee: 'Ready-to-Shift Sanitization',
    startingPrice: '₹2,999',
    priceUnit: 'for 1 BHK Empty',
    brief: 'Inside-out empty wardrobe wipedown, paint spots & construction dust removal.',
    description: 'Designed specifically for tenants moving into new rentals or homeowners taking possession. Focuses on inside-out cleaning of all empty wardrobes, kitchen shelves, window tracks, paint spot scraping, and multi-bathroom sterilization.',
    pricingOptions: [
      { label: '1 BHK Empty Flat', price: '₹2,999', note: 'Fast turnaround • 3 hrs' },
      { label: '2 BHK Empty Flat', price: '₹3,999', note: 'Most Popular • 4 hrs' },
      { label: '3 BHK Empty Flat', price: '₹4,999', note: 'Up to 1,600 sq.ft • 5 hrs' },
      { label: '4 BHK+ Empty / Duplex', price: '₹6,499', note: 'Large vacant home handover' }
    ],
    bullets: [
      'Inside-out empty wardrobe & cabinet wipedown',
      'Construction paint specks & adhesive residue removal',
      'Acid-free multi-washroom deep scrub',
      'Disinfected surfaces ready for immediate shifting'
    ],
    inclusions: [
      'All empty cupboards, drawers, lofts and kitchen cabinets wiped inside and out.',
      'Tile paint spots, masking tape glue, and plaster residue carefully scraped and removed.',
      'Machine scrubbing of floors across hall, kitchen, and all bedrooms.',
      'Complete deep sanitization of all bathrooms and washrooms.',
      'Balcony floor washing and window glass squeegee.'
    ],
    exclusions: [
      'Wall repainting or water seepage repairs.'
    ],
    chemicals: 'Diversey Taski R1, R2, R3, and Suma Inox.',
    steps: [
      { step: 1, title: 'Debris Removal', desc: 'Heavy dusting and vacuuming of all empty cabinets and floors.' },
      { step: 2, title: 'Paint & Adhesive Scraping', desc: 'Careful removal of paint drops from tiles, switches, and glass.' },
      { step: 3, title: 'Cabinet Disinfection', desc: 'Antibacterial wipe inside all empty wardrobes and modular racks.' },
      { step: 4, title: 'Machine Floor Buff', desc: 'Rotary buffer ensures spotless, sparkling floors for move-in.' }
    ]
  },

  'balcony': {
    id: 'balcony',
    cardId: 'card-balcony',
    category: 'cleaning',
    categoryName: 'Home Cleaning Services',
    name: 'Balcony, Window & Mesh Cleaning',
    badge: 'Streak-Free Crystal Shine',
    image: 'images/hero_team.jpg',
    rating: 4.82,
    reviewCount: '870+ balconies cleaned',
    duration: '45 - 60 Minutes per Unit',
    crew: '1 - 2 Technicians',
    guarantee: 'Bird Dropping & Track Dust Clear',
    startingPrice: '₹699',
    priceUnit: 'per Balcony',
    brief: 'Bird droppings wash, sliding track channel vacuuming & streak-free glass.',
    description: 'Thorough cleaning of open balconies, bird mess removal, railing wipedown, vacuuming of sliding mosquito mesh tracks, and crystal clear streak-free window glass wiping.',
    pricingOptions: [
      { label: '1 Balcony Deep Wash', price: '₹699', note: 'Floor, grill & glass' },
      { label: '2 Balconies Combo', price: '₹1,199', note: 'Save ₹200' },
      { label: 'Full Home Windows & Tracks', price: '₹1,299', note: 'All windows + sliding channels' }
    ],
    bullets: [
      'Bird dropping removal & tile floor pressure wash',
      'Sliding track channel dust vacuuming',
      'Glass pane streak-free squeegee buff',
      'Nylon mosquito net mesh wet wipe'
    ],
    inclusions: [
      'Balcony floor scrubbing and drain clear.',
      'Bird dropping sanitization using germicidal detergent.',
      'Window sliding channel vacuuming with specialized crevice tool.',
      'Glass cleaner squeegee application for transparent streak-free view.',
      'Mosquito mesh screen vacuuming and gentle wet sponge wipe.'
    ],
    exclusions: [
      'External ledge cleaning without safety balcony railing.'
    ],
    chemicals: 'Taski R3 Glass Cleaner, Diversey Floor Scrubbing Agent.',
    steps: [
      { step: 1, title: 'Bird Mess & Floor Wash', desc: 'Disinfectant applied to loosen and rinse off bird droppings.' },
      { step: 2, title: 'Sliding Track Vacuum', desc: 'Crevice nozzle removes accumulated dust from window channels.' },
      { step: 3, title: 'Mesh & Glass Polish', desc: 'Window panes squeegeed with streak-free glass cleaner.' }
    ]
  },

  // =========================================================================
  // CATEGORY 2: PESTICIDE CLEANING SERVICES (7 Services)
  // =========================================================================
  'cockroach': {
    id: 'cockroach',
    cardId: 'card-cockroach',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Odorless Cockroach Control',
    badge: '100% Odorless • 90-Day Warranty',
    image: 'images/service_cockroach.jpg',
    rating: 4.92,
    reviewCount: '4,100+ kitchens cockroach-free',
    duration: '45 - 60 Minutes',
    crew: '1 Certified Pest Technician',
    guarantee: '90-Day Relief Warranty with Free 45-Day Re-visit',
    startingPrice: '₹1,499',
    priceUnit: 'for 1 BHK',
    brief: 'German Fipronil herbal gel dots. No need to empty kitchen or vacate.',
    description: 'Advanced German Fipronil bait gel technology applied in microscopic dots at cockroach transit points. Cockroaches consume the bait and return to their nest, transferring the formula through the colony to eliminate the entire population at the root. 100% odorless with no need to empty utensils or vacate the home.',
    pricingOptions: [
      { label: '1 BHK Gel Treatment', price: '₹1,499', note: 'Kitchen, baths & dining • 90-day warranty' },
      { label: '2 BHK Gel Treatment', price: '₹1,899', note: 'Most Popular • Free 45-day check' },
      { label: '3 BHK Gel Treatment', price: '₹2,399', note: 'Whole house protection' },
      { label: 'Annual Contract (3 Visits)', price: '₹3,999', note: 'Year-round 365-day peace of mind' }
    ],
    bullets: [
      'German Fipronil herbal gel dot technology',
      'No need to empty kitchen utensils or leave home',
      'Eradicates cockroach nests at the root colony',
      'Odorless drain barrier spray against drain flies'
    ],
    inclusions: [
      'Strategic dot application in kitchen cabinet hinges, below sink, behind fridge, and microwave.',
      'Odorless contact spray along baseboards, toilet corners, and utility areas.',
      'Drain barrier application to prevent drain roaches and sewage flies.',
      'Free re-inspection service within warranty period if pest sightings occur.'
    ],
    exclusions: [
      'Water leakage repair causing wood rot (we advise client to seal).'
    ],
    chemicals: 'Bayer Maxforce / BASF Goliath Fipronil 0.05% odorless gel bait. Central Insecticides Board (CIB) approved.',
    steps: [
      { step: 1, title: 'Infestation Inspection', desc: 'Locating hiding harborage areas inside drawer joints and motor areas.' },
      { step: 2, title: 'Micro-Dot Gel Application', desc: 'Precision gel gun places odorless dots every 6-12 inches.' },
      { step: 3, title: 'Drain & Baseboard Barrier', desc: 'Odorless micron spray seals floor perimeter and drain entries.' },
      { step: 4, title: 'Preventive Advisory', desc: 'Technician guides homeowner on waste management and moisture prevention.' }
    ]
  },

  'termite': {
    id: 'termite',
    cardId: 'card-termite',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Anti-Termite Drill Treatment',
    badge: 'Bayer Premise • 5-Yr Warranty',
    image: 'images/service_termite.jpg',
    rating: 4.95,
    reviewCount: '1,150+ homes termite-proofed',
    duration: '3 - 5 Hours',
    crew: '2 Certified Drilling Technicians',
    guarantee: 'Official 5-Year Warranty Certificate with Free Annual Audits',
    startingPrice: '₹3,499',
    priceUnit: 'for 1 BHK',
    brief: '12mm drill-and-inject technology at skirtings & door frames.',
    description: 'Drill-Hole-Inject chemical barrier system utilizing genuine Bayer Premise (Imidacloprid). We drill neat 12mm holes along skirting tiles and wooden door frames, inject high-pressure termiticide into the masonry, and seal the holes with matching white cement. Non-repellent chemistry eliminates subterranean colonies.',
    pricingOptions: [
      { label: '1 BHK Drill & Barrier', price: '₹3,499', note: 'Skirting & frame injection • 5-Yr cert' },
      { label: '2 BHK Drill & Barrier', price: '₹4,499', note: 'Full flat protection • Most Popular' },
      { label: '3 BHK Drill & Barrier', price: '₹5,499', note: 'Comprehensive multi-room barrier' },
      { label: 'Independent Villa / Duplex', price: '₹8,499+', note: 'Perimeter soil drill + woodwork' }
    ],
    bullets: [
      '12mm drill-and-inject technology at wall skirtings',
      'Bayer Premise odorless non-repellent chemical',
      'Door frame, wardrobe & false ceiling chemical infusion',
      'Official warranty certificate & free annual audits'
    ],
    inclusions: [
      '12mm drilling along wall-floor junction at 1-foot intervals.',
      'High-pressure chemical pumping of Bayer Premise creating an impenetrable barrier.',
      'Door frames, wooden cupboards, and electrical conduits treated with wood injector.',
      'Color-matched chalk/cement sealing leaving drill holes virtually invisible.',
      'Official printed 5-Year Clean Shield Pro Warranty Certificate.'
    ],
    exclusions: [
      'Replacing already hollowed-out or destroyed woodwork.'
    ],
    chemicals: 'Bayer Premise (Imidacloprid 30.5% SC). Odorless, non-toxic to humans, non-repellent transfer effect.',
    steps: [
      { step: 1, title: 'Mud Tube & Moisture Mapping', desc: 'Acoustic and visual inspection of woodwork, wardrobes, and skirtings.' },
      { step: 2, title: 'Precision 12mm Drilling', desc: 'Neat holes drilled at 45-degree angle along floor skirting.' },
      { step: 3, title: 'Pressure Chemical Infusion', desc: 'Termiticide injected deep into masonry and soil bed.' },
      { step: 4, title: 'Invisible Sealing & Clean-up', desc: 'Holes sealed flush with matching color filler and vacuumed.' }
    ]
  },

  'bedbug': {
    id: 'bedbug',
    cardId: 'card-bedbug',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Bed Bug Eradication (2 Visits)',
    badge: '2-Visit Relief Guarantee',
    image: 'images/service_pest_control.jpg',
    rating: 4.86,
    reviewCount: '1,720+ bedrooms treated',
    duration: '2 Hours per Visit',
    crew: '2 Bed Bug Specialists',
    guarantee: '2 Full Visits Included to Break Complete Egg Cycle',
    startingPrice: '₹1,999',
    priceUnit: 'for 1 BHK (2 Visits)',
    brief: 'High-heat seam steaming & targeted pesticide to break life cycle.',
    description: 'Two-stage eradication protocol. Visit 1 uses high-temperature thermal steam extraction to penetrate mattress seams, headboards, and cot frames, followed by contact spray killing live bedbugs. Visit 2 follows after 12-14 days to kill newly hatched nymphs, permanently breaking the reproduction cycle.',
    pricingOptions: [
      { label: '1 BHK (2 Full Visits Included)', price: '₹1,999', note: '1 bedroom + living • 2 sessions' },
      { label: '2 BHK (2 Full Visits Included)', price: '₹2,699', note: '2 bedrooms • Most Popular' },
      { label: '3 BHK (2 Full Visits Included)', price: '₹3,399', note: 'Complete family home relief' }
    ],
    bullets: [
      'High-heat steaming for mattress seams & crevices',
      'Targeted contact pesticide to kill eggs and nymphs',
      'Second follow-up visit after 12 days to break life cycle',
      'Restful, itch-free sleep guaranteed'
    ],
    inclusions: [
      'Bed frame, box cot, mattress beading, headboard, and sofa seam inspection.',
      'Thermal steam application targeting heat-sensitive bedbug eggs.',
      'Targeted synthetic pyrethroid contact spray in crevice hiding spots.',
      'Mandatory Second Visit after 12-14 days to eliminate newly hatched instars.'
    ],
    exclusions: [
      'Washing infected bed linens (we advise hot water laundry above 60°C).'
    ],
    chemicals: 'Deltamethrin / Lambda-Cyhalothrin micro-encapsulated formulation. Safe once dry.',
    steps: [
      { step: 1, title: 'Seam & Joint Inspection', desc: 'Mattresses and cot headboards removed to locate fecal spotting and clusters.' },
      { step: 2, title: 'High-Heat Steam Evacuation', desc: '120°C dry steam kills live bugs and heat-sensitive eggs on contact.' },
      { step: 3, title: 'Residual Spray Barrier', desc: 'Long-lasting micro-encapsulated chemical applied to baseboards.' },
      { step: 4, title: 'Day-12 Follow-Up Treatment', desc: 'Second visit kills any newly emerged nymphs before they can lay eggs.' }
    ]
  },

  'mosquito': {
    id: 'mosquito',
    cardId: 'card-mosquito',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Mosquito & Drain Fly Fogging',
    badge: 'Dengue & Malaria Shield',
    image: 'images/service_pest_control.jpg',
    rating: 4.81,
    reviewCount: '920+ compounds fogged',
    duration: '45 - 60 Minutes',
    crew: '2 Fogging Technicians',
    guarantee: 'Immediate Swarm Knockdown & Larva Control',
    startingPrice: '₹1,299',
    priceUnit: 'Residential Flat',
    brief: 'Thermal fogging for balconies, drains & sumps with larvicide drops.',
    description: 'Dual-action mosquito control utilizing thermal fogging smoke in open areas, shafts, and balcony corridors, combined with microbial biological larvicide granules in water stagnation points to prevent larvae from turning into adult mosquitoes.',
    pricingOptions: [
      { label: 'Residential Flat (Balcony + Shaft)', price: '₹1,299', note: 'Balconies, ducts & interior residual' },
      { label: 'Duplex / Villa & Compound', price: '₹1,899', note: 'Garden, perimeter & drains' },
      { label: 'Apartment Society / Compound', price: '₹2,999', note: 'Stairwells, basement & boundary' }
    ],
    bullets: [
      'Thermal fogging of balconies, basements & drains',
      'Microbial larvicide drops for sumps & flower pots',
      'Wall residual spray prevents landing & resting',
      'High reduction in mosquito swarm activity'
    ],
    inclusions: [
      'Thermal smoke fogging across balcony shafts, air ducts, parking lots, and garden shrubs.',
      'Residual wall spray on shaded indoor curtains and back of doors where mosquitoes rest.',
      'Abate microbial larvicide granules applied to drain water, flower pots, and gutters.'
    ],
    exclusions: [
      'Permanent outdoor weather-proofing against nearby open municipal canals.'
    ],
    chemicals: 'Pyrethrum extract and Temephos (Abate) larvicide. WHO-recommended for dengue and malaria vectors.',
    steps: [
      { step: 1, title: 'Larva Source Treatment', desc: 'Granular larvicide dropped into standing water and sumps.' },
      { step: 2, title: 'Residual Wall Spray', desc: 'Odorless barrier spray on curtains and dark wall corners.' },
      { step: 3, title: 'Thermal Fogging Knockdown', desc: 'High-density fog smoke flushes outdoor bushes and balcony shafts.' }
    ]
  },

  'ants': {
    id: 'ants',
    cardId: 'card-ants',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Ants Perimeter Barrier',
    badge: 'Red & Black Ants Barrier',
    image: 'images/service_cockroach.jpg',
    rating: 4.84,
    reviewCount: '1,340+ homes treated',
    duration: '45 Minutes',
    crew: '1 Pest Specialist',
    guarantee: 'Queen Colony Kill & Perimeter Shield',
    startingPrice: '₹1,199',
    priceUnit: 'for 1 - 2 BHK',
    brief: 'Pheromone-attracting granular bait kills queen and entire colony.',
    description: 'Specialized sweet-and-protein attractant granules that foraging worker ants carry back deep into the subterranean nest. Once fed to the queen and larvae, the colony collapses within 48 to 72 hours.',
    pricingOptions: [
      { label: '1 - 2 BHK Home Barrier', price: '₹1,199', note: 'Kitchen, dining & balconies' },
      { label: '3 BHK / Duplex Barrier', price: '₹1,699', note: 'Multi-balcony & full house' },
      { label: 'Villa & Garden Perimeter', price: '₹2,499', note: 'Includes lawn and outdoor walls' }
    ],
    bullets: [
      'Specialized pheromone-attracting granular bait',
      'Colony transfer kills the queen and nest',
      'Baseboard & windowsill chemical barrier',
      'Safe for kitchen food slabs & pet areas'
    ],
    inclusions: [
      'Targeted granular baiting along ant trails behind kitchen counters and window sills.',
      'Perimeter crack-and-crevice residual spray on external entry points.',
      'Safe formulation that eliminates red fire ants, carpenter ants, and black sugar ants.'
    ],
    exclusions: [
      'Damage to rotten garden timber caused by old carpenter ants.'
    ],
    chemicals: 'Hydramethylnon / Fipronil ant bait matrix. Non-toxic to pets in micro-granular quantities.',
    steps: [
      { step: 1, title: 'Trail & Nest Tracking', desc: 'Following worker ant foraging lines to find wall voids and cracks.' },
      { step: 2, title: 'Granular Bait Stationing', desc: 'Placing slow-acting bait that ants enthusiastically carry to the queen.' },
      { step: 3, title: 'Perimeter Barrier Seal', desc: 'Spraying exterior windows and thresholds to prevent future entry.' }
    ]
  },

  'rodent': {
    id: 'rodent',
    cardId: 'card-rodent',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Rodent & Rat Proofing',
    badge: 'Safe Traps & Proofing',
    image: 'images/service_pest_control.jpg',
    rating: 4.83,
    reviewCount: '810+ premises rodent-proofed',
    duration: '1 Hour',
    crew: '1 - 2 Technicians',
    guarantee: 'Safe Trapping & Odorless Baits',
    startingPrice: '₹1,699',
    priceUnit: 'Standard House',
    brief: 'Child-safe lockable bait stations & heavy-duty transit glue pads.',
    description: 'Multi-angle rodent management using heavy-duty glue pad boards, tamper-proof lockable bait stations, and anti-coagulant cake blocks. Eliminates rats without risk of foul odors inside walls.',
    pricingOptions: [
      { label: 'Standard Residential Flat', price: '₹1,699', note: 'Up to 6 stations/pads placed' },
      { label: 'Independent House / Duplex', price: '₹2,499', note: 'Up to 12 stations + attic/false ceiling' },
      { label: 'Commercial Godown / Office', price: '₹2,899', note: 'Heavy industrial proofing' }
    ],
    bullets: [
      'Child-safe lockable bait station placement',
      'Heavy-duty glue pads along rat transit pathways',
      'Identification & advice on piping entry holes',
      'Safe, odorless dead-rodent prevention bait'
    ],
    inclusions: [
      'Strategic placement of heavy-duty industrial glue boards along rat runways.',
      'Tamper-resistant lockable bait stations for outdoor and utility balconies.',
      'Bromadiolone wax blocks that cause rats to seek open water sources outside.',
      'Technician audit of pipeline gaps and AC duct entry advice.'
    ],
    exclusions: [
      'Masonry or sheet metal sealing of large civil structural holes.'
    ],
    chemicals: 'Bromadiolone 0.005% RB multi-feed wax blocks. Tamper-safe for children and domestic pets.',
    steps: [
      { step: 1, title: 'Transit Pathway Mapping', desc: 'Identifying rub marks, droppings, and pipe entry points.' },
      { step: 2, title: 'Glue Board Placement', desc: 'Strategic positioning behind fridges, washing machines, and false ceilings.' },
      { step: 3, title: 'Bait Station Installation', desc: 'Secure lockable stations placed in utility areas.' },
      { step: 4, title: 'Entry Hole Advisory', desc: 'Detailed report on holes that require wire mesh sealing.' }
    ]
  },

  'combo-pest': {
    id: 'combo-pest',
    cardId: 'card-combo-pest',
    category: 'pesticides',
    categoryName: 'Pesticide Cleaning Services',
    name: 'Full House Pest Shield Combo',
    badge: 'All-in-One Best Value',
    image: 'images/service_pest_control.jpg',
    rating: 4.96,
    reviewCount: '2,900+ combo packs booked',
    duration: '1.5 - 2 Hours',
    crew: '2 Pest Specialists',
    guarantee: '6-Month Comprehensive Shield with Free Re-visit',
    startingPrice: '₹2,499',
    priceUnit: 'for 1 BHK',
    brief: 'Cockroach gel + Ants barrier + Silverfish + Mosquito with 6-month warranty.',
    description: 'Our most comprehensive home pest protection package. Combines odorless German cockroach gel, ants colony transfer bait, silverfish contact spray, drain fly foam treatment, and balcony mosquito barrier into a single, high-value visit.',
    pricingOptions: [
      { label: '1 BHK Pest Shield Combo', price: '₹2,499', note: 'All-in-one • 6-Month warranty' },
      { label: '2 BHK Pest Shield Combo', price: '₹3,299', note: 'Most Popular • Free re-service visit' },
      { label: '3 BHK Pest Shield Combo', price: '₹3,999', note: 'Full 3-bedroom protection' },
      { label: '4 BHK+ / Villa Combo', price: '₹5,499', note: 'Maximum coverage & warranty' }
    ],
    bullets: [
      'Cockroach gel + Ants barrier + Silverfish spray',
      'Drain fly sanitization in all washrooms',
      'Balcony & window mosquito perimeter spray',
      'Free re-service visit within 6 months'
    ],
    inclusions: [
      'Full kitchen and pantry German cockroach gel baiting.',
      'Perimeter ant barrier and pheromone bait application.',
      'Silverfish and booklice spray in wardrobes and bookshelf recesses.',
      'Drain fly sanitization and bio-film flush in all bathrooms.',
      'Balcony and window mosquito barrier residual spray.',
      '6-Month Peace of Mind Warranty with free re-visit on any pest sighting.'
    ],
    exclusions: [
      'Termite drill treatment (available as separate anti-termite drill service).'
    ],
    chemicals: 'Bayer Maxforce Gel, Fipronil granules, and micro-encapsulated synthetic pyrethroids. 100% CIB approved.',
    steps: [
      { step: 1, title: 'Multi-Pest Mapping', desc: 'Thorough inspection of all kitchen cabinets, bathrooms, and wardrobes.' },
      { step: 2, title: 'Kitchen & Pantry Gel Baiting', desc: 'Micro-dots placed for roaches and ants.' },
      { step: 3, title: 'Washroom & Drain Barrier', desc: 'Drain fly flush and silverfish perimeter spray.' },
      { step: 4, title: 'Warranty Issue & Certificate', desc: '6-month warranty registered on Clean Shield Pro operations console.' }
    ]
  }
};

// Global helper to open service detail page
function openServiceDetail(serviceId) {
  if (!serviceId) return;
  // Clean id if it has card- prefix
  const cleanId = serviceId.replace(/^card-/, '');
  window.location.href = 'service-detail.html?service=' + encodeURIComponent(cleanId);
}
