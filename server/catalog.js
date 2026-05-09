// Product + membership catalog. Prices are server-authoritative — never trust the client.
// Amounts are in cents (USD).

const PRODUCTS = {
  'fresh-pint': {
    id: 'fresh-pint',
    name: 'Fresh Blueberry Pint',
    description: 'One pint of just-picked Sequim blueberries (~12 oz). Available July–September.',
    priceCents: 800,
    image: '/images/pint.svg',
    category: 'fresh',
  },
  'fresh-flat': {
    id: 'fresh-flat',
    name: 'Fresh Blueberry Flat (12 pints)',
    description: 'A whole flat of fresh berries — perfect for jam, pies, or freezing.',
    priceCents: 8400,
    image: '/images/flat.svg',
    category: 'fresh',
  },
  'frozen-5lb': {
    id: 'frozen-5lb',
    name: 'Frozen Blueberries — 5 lb bag',
    description: 'Flash-frozen at the peak of ripeness. Great in smoothies year-round.',
    priceCents: 4500,
    image: '/images/frozen.svg',
    category: 'frozen',
  },
  'jam-classic': {
    id: 'jam-classic',
    name: 'Classic Blueberry Jam (8 oz)',
    description: 'Small-batch preserves, made on the farm with our own berries.',
    priceCents: 1200,
    image: '/images/jam.svg',
    category: 'pantry',
  },
  'syrup': {
    id: 'syrup',
    name: 'Blueberry Maple Syrup (12 oz)',
    description: 'Pure maple syrup blended with our blueberry reduction.',
    priceCents: 1800,
    image: '/images/syrup.svg',
    category: 'pantry',
  },
  'upick-pass': {
    id: 'upick-pass',
    name: 'U-Pick Day Pass',
    description: 'Reserve a slot to pick your own berries at the farm. Buckets provided.',
    priceCents: 1500,
    image: '/images/upick.svg',
    category: 'experiences',
  },
};

const MEMBERSHIPS = {
  'sprout': {
    id: 'sprout',
    name: 'Sprout',
    tagline: 'Berry curious',
    priceCents: 4900,
    interval: 'year',
    perks: [
      '10% off all online orders',
      'Members-only seasonal newsletter',
      'Early notice when fresh berries go live',
      'One free U-Pick day pass each summer',
    ],
  },
  'harvest': {
    id: 'harvest',
    name: 'Harvest',
    tagline: 'Most popular',
    priceCents: 9900,
    interval: 'year',
    featured: true,
    perks: [
      'Everything in Sprout',
      '15% off all online orders',
      'Quarterly Berry Box shipped to your door',
      'Two free U-Pick passes per season',
      'Invitations to members-only farm events',
    ],
  },
  'orchard': {
    id: 'orchard',
    name: 'Orchard',
    tagline: 'For the true berry believer',
    priceCents: 19900,
    interval: 'year',
    perks: [
      'Everything in Harvest',
      '20% off all online orders',
      'A reserved row at peak season — your name on a sign',
      'Six U-Pick passes per season',
      'Two tickets to our annual Blueberry Bash dinner',
    ],
  },
};

module.exports = { PRODUCTS, MEMBERSHIPS };
