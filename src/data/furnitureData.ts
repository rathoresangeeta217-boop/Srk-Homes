import { FurnitureSuite, FurnitureProduct } from '../types';

export const HERO_SUITES: FurnitureSuite[] = [
  {
    id: 'living-alva',
    name: 'The Alva Living Collection',
    tagline: 'Sculptural modular relaxation engineered in tactile bouclé & solid walnut',
    room: 'living',
    image: '/src/assets/images/hero_luxury_living_sofa_1794044589907.jpg',
    description: 'Designed around low, grounded proportions and cloud-like ergonomics. The Alva modular sectional anchors large modern living spaces with gentle organic curves and whisper-quiet materiality.',
    keySpecs: [
      'Modular 4-piece configuration',
      'Solid kiln-dried American walnut subframe',
      'High-resilience foam core with hypoallergenic down-blend wrap',
      'Available in 18 architectural fabric grades'
    ],
    hotspots: [
      {
        id: 'hotspot-sectional',
        title: 'Alva Modular 4-Seat Sectional',
        category: 'Seating',
        price: '$4,450',
        materials: 'Heavyweight Oatmeal Bouclé · FSC American Walnut Base',
        dimensions: '340 cm (W) × 115 cm (D) × 72 cm (H)',
        x: 36,
        y: 67,
        description: 'Deep modular lounge seating with recessed walnut plinth base, stain-repellent organic bouclé, and magnetic linking brackets.',
        image: '/src/assets/images/hero_luxury_living_sofa_1794044589907.jpg'
      },
      {
        id: 'hotspot-coffee-table',
        title: 'Monolithic Low Walnut Coffee Table',
        category: 'Living Tables',
        price: '$1,650',
        materials: 'Solid American Black Walnut · Hand-Rubbed Organic Oil',
        dimensions: '150 cm (L) × 85 cm (W) × 32 cm (H)',
        x: 54,
        y: 74,
        description: 'Sculptural cantilevered timber table highlighting book-matched grain patterns with recessed shadowline perimeter.',
        image: '/src/assets/images/product_travertine_table_1794044592007.jpg'
      },
      {
        id: 'hotspot-accent-chair',
        title: 'Verona Sculpted Low Chair',
        category: 'Armchairs',
        price: '$1,290',
        materials: 'Smoked Oak · Aniline Saddle Leather Details',
        dimensions: '82 cm (W) × 86 cm (D) × 74 cm (H)',
        x: 83,
        y: 66,
        description: 'Single-piece hand-carved armrest with floating seat posture for reading corners and salon firesides.',
        image: '/src/assets/images/product_sculptural_armchair_1794044591034.jpg'
      }
    ],
    materials: [
      { id: 'boucle-oatmeal', name: 'Oatmeal Bouclé', colorHex: '#E5DFD5', textureNote: '100% Belgian Wool Blend · 90k Martindale' },
      { id: 'linen-sand', name: 'Desert Sand Linen', colorHex: '#D4C6B1', textureNote: 'Pre-washed French Flax Linen' },
      { id: 'velvet-forest', name: 'Moss Forest Velvet', colorHex: '#4E5A44', textureNote: 'Plush Stain-Shielded Microfiber' },
      { id: 'chenille-charcoal', name: 'Smoked Slate Chenille', colorHex: '#3D3D3F', textureNote: 'Architectural Heather Texture' }
    ]
  },
  {
    id: 'dining-kyoto',
    name: 'The Kyoto Solid Oak Dining Suite',
    tagline: 'Monumental timber dining crafted with seamless joinery and natural contours',
    room: 'dining',
    image: '/src/assets/images/hero_crafted_oak_dining_1794044590576.jpg',
    description: 'An architectural gathering centerpiece. Hand-selected European white oak paired with master-woven dining chairs creating an ethereal interplay between heavy timber strength and airy lightness.',
    keySpecs: [
      'Monolithic sculpted oak pedestal base',
      'Comfortably seats 10–12 dinner guests',
      'Matte polyurethane architectural seal resistant to wine, heat, and moisture',
      'Handcrafted mortise and tenon concealed construction'
    ],
    hotspots: [
      {
        id: 'hotspot-dining-table',
        title: 'Kyoto Monolithic Oak 10-Seater Table',
        category: 'Dining Tables',
        price: '$3,890',
        materials: 'Solid French White Oak · Natural Matte Bio-Finish',
        dimensions: '290 cm (L) × 110 cm (W) × 76 cm (H)',
        x: 50,
        y: 69,
        description: 'Monumental 60mm solid oak tabletop with radiused chamfer edge resting on twin sculptural curved oak pylons.',
        image: '/src/assets/images/hero_crafted_oak_dining_1794044590576.jpg'
      },
      {
        id: 'hotspot-dining-chairs',
        title: 'Kyoto Artisan Curved Dining Chairs',
        category: 'Chairs',
        price: '$580 each',
        materials: 'Solid Steam-Bent Oak · Natural Papercord Weave',
        dimensions: '58 cm (W) × 54 cm (D) × 75 cm (H)',
        x: 29,
        y: 72,
        description: 'Continuous curved horseshoe backrest with hand-tensioned Danish paper cord weaving for hours of relaxed dining.',
        image: '/src/assets/images/hero_crafted_oak_dining_1794044590576.jpg'
      },
      {
        id: 'hotspot-credenza-wall',
        title: 'Architectural Fluted Sideboard Bar',
        category: 'Storage',
        price: '$2,750',
        materials: 'Ribbed White Oak · Honed Calacatta Marble Surface',
        dimensions: '220 cm (W) × 50 cm (D) × 85 cm (H)',
        x: 92,
        y: 52,
        description: 'Integrated dining storage with soft-touch acoustic tambour doors and dimmable internal warm LED gallery light.',
        image: '/src/assets/images/product_fluted_credenza_1794044591854.jpg'
      }
    ],
    materials: [
      { id: 'oak-natural', name: 'Natural White Oak', colorHex: '#CDB18B', textureNote: 'FSC-Certified French Timber' },
      { id: 'oak-smoked', name: 'Smoked Charcoal Oak', colorHex: '#4A433A', textureNote: 'Fumed Deep Brown Oak Grain' },
      { id: 'walnut-raw', name: 'American Walnut', colorHex: '#69513D', textureNote: 'Warm Heartwood Grain with Satin Luster' },
      { id: 'ash-bleached', name: 'Nordic Bleached Ash', colorHex: '#E2DACD', textureNote: 'Ultra-Pale Minimalist Finish' }
    ]
  },
  {
    id: 'bedroom-sylvan',
    name: 'The Sylvan Master Bedroom Suite',
    tagline: 'A sanctuary of serene warm minimalism with continuous timber fluting',
    room: 'bedroom',
    image: '/src/assets/images/hero_serene_penthouse_bedroom_1794044590698.jpg',
    description: 'Conceived to evoke quiet architectural calm. The Sylvan low-profile bed features an expansive fluted walnut wall-headboard with integrated floating nightstands and soft indirect halo illumination.',
    keySpecs: [
      'Low-slung Japanese platform architecture',
      'Continuous 3.8-meter wall-mount fluted headboard',
      'Dual floating nightstands with concealed wireless charging pockets',
      'Solid multi-slat orthopedic mattress suspension'
    ],
    hotspots: [
      {
        id: 'hotspot-platform-bed',
        title: 'Sylvan Fluted Platform Bed & Floating Nightstands',
        category: 'Beds',
        price: '$3,690',
        materials: 'Solid American Walnut · Raw Belgian Linen Upholstery',
        dimensions: '360 cm (Headboard W) × 225 cm (L) × 95 cm (H)',
        x: 56,
        y: 70,
        description: 'Continuous architectural fluted backboard in select walnut with integrated solid brass switchgear and floating drawers.',
        image: '/src/assets/images/hero_serene_penthouse_bedroom_1794044590698.jpg'
      },
      {
        id: 'hotspot-slipper-chair',
        title: 'Nara Low Profile Slipper Lounge',
        category: 'Armchairs',
        price: '$890',
        materials: 'Alabaster Textured Bouclé · Solid Walnut Sled Base',
        dimensions: '74 cm (W) × 78 cm (D) × 65 cm (H)',
        x: 12,
        y: 72,
        description: 'Low lounge chair crafted for meditation, morning coffee, and dressing ease with ergonomic reclined angle.',
        image: '/src/assets/images/product_sculptural_armchair_1794044591034.jpg'
      },
      {
        id: 'hotspot-modular-wardrobe',
        title: 'SRK Modular Architectural Wardrobe System',
        category: 'Custom Modular',
        price: 'Bespoke from $4,800',
        materials: 'Smoked Glass · Walnut Veneer · Sensor Illumination',
        dimensions: 'Floor-to-ceiling customized to room dimensions',
        x: 49,
        y: 42,
        description: 'Custom modular walk-in and wall wardrobe cabinetry built by SRK Homes master joiners.',
        image: '/src/assets/images/hero_serene_penthouse_bedroom_1794044590698.jpg'
      }
    ],
    materials: [
      { id: 'walnut-sylvan', name: 'Rich Walnut', colorHex: '#5C4434', textureNote: 'Heartwood Select Solid Timber' },
      { id: 'oak-warm', name: 'Warm European Oak', colorHex: '#BC9D7A', textureNote: 'Fine Straight-Grained Timber' },
      { id: 'linen-bone', name: 'Bone White Linen', colorHex: '#EAE5DB', textureNote: 'Organic Slub Weave 450 GSM' },
      { id: 'ebony-ash', name: 'Matte Ebony Ash', colorHex: '#252525', textureNote: 'Deep Architectural Black Stained Grain' }
    ]
  }
];

export const FEATURED_PRODUCTS: FurnitureProduct[] = [
  {
    id: 'prod-armchair-olive',
    name: 'The Verona Sculptural Armchair',
    category: 'Lounge Seating',
    collection: '2026 Salon Series',
    price: '$1,480',
    dimensions: '88 cm (W) × 84 cm (D) × 76 cm (H)',
    material: 'Italian Textured Wool Bouclé · Solid Walnut Legs',
    finish: 'Deep Olive Bouclé / Oiled Walnut',
    leadTime: 'In Stock · Dispatches in 48h',
    image: '/src/assets/images/product_sculptural_armchair_1794044591034.jpg',
    description: 'An organic silhouette inspired by mid-century Italian design. Wrapped in tactile moss-olive bouclé with hand-turned solid American walnut legs.',
    features: [
      'Sculptural curved wingback profile',
      'Dual-density high resilience foam seat',
      'Reinforced solid hardwood internal frame',
      'Tested to 85,000 Martindale rub cycles'
    ]
  },
  {
    id: 'prod-credenza-walnut',
    name: 'The Horizon Fluted Media Credenza',
    category: 'Living & Dining Storage',
    collection: 'Architectural Storage',
    price: '$2,650',
    dimensions: '200 cm (W) × 48 cm (D) × 78 cm (H)',
    material: 'Natural Fluted American Walnut · Honed Carrara Marble Top',
    finish: 'Natural Matte Lacquer / Calacatta Veining',
    leadTime: 'Made to Order · 2–3 Weeks',
    image: '/src/assets/images/product_fluted_credenza_1794044591854.jpg',
    description: 'Precision vertical fluting wraps seamlessly across four soft-close push doors. Topped with a solid 20mm slab of honed natural Italian marble.',
    features: [
      'Continuous vertical rhythm fluting',
      'Concealed cable management & ventilation ports',
      'German Blum soft-close push hinges',
      'Solid brushed brass vertical pull handles'
    ]
  },
  {
    id: 'prod-travertine-table',
    name: 'The Monolith Honed Travertine Table',
    category: 'Occasional & Coffee Tables',
    collection: 'Stone Editions',
    price: '$1,890',
    dimensions: '130 cm (L) × 85 cm (W) × 34 cm (H)',
    material: 'Solid Italian Roman Travertine Stone',
    finish: 'Honed Matte with Natural Porous Cavities Preserved',
    leadTime: 'Limited Edition · 4 Units Remaining',
    image: '/src/assets/images/product_travertine_table_1794044592007.jpg',
    description: 'Cut from a single quarry block of Roman travertine. Featuring hand-rounded bullnose edges and a grounded organic posture that grounds modern living rooms.',
    features: [
      'Authentic monolithic natural travertine',
      'Hand-rounded organic corner radius',
      'Anti-stain breathable stone impregnator applied',
      'Weighs 115 kg with integrated felt floor protectors'
    ]
  }
];

export const CRAFTSMANSHIP_PILLARS = [
  {
    number: '01',
    title: 'Solid Hardwood Integrity',
    description: 'We source exclusively certified American Black Walnut and European White Oak, kiln-dried to 8% moisture content to prevent seasonal movement.'
  },
  {
    number: '02',
    title: 'Traditional Joinery, Modern Tolerances',
    description: 'Mortise-and-tenon and precision butterfly joints hand-chiseled by master artisans with CNC sub-millimeter tolerances for life-long durability.'
  },
  {
    number: '03',
    title: 'Tactile Architectural Textiles',
    description: 'Bouclés, heavy linens, and top-grain semi-aniline hides selected for tactile softness and tested rigorously for resistance against stains and daily life.'
  },
  {
    number: '04',
    title: 'Bespoke Millimeter Tailoring',
    description: 'Every SRK Homes sofa, dining table, and bedroom suite can be custom-scaled to your exact residence floor plans with customized timber stains.'
  }
];
