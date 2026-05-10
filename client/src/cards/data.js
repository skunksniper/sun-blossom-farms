// BerryDex — the Sun Blossom Farms TCG.
// Rarities: common (★), uncommon (★★), rare (★★★), ultra (★★★★), legendary (☀)

export const TYPES = {
  sun:    { label: 'Sun',    color: '#f4c95d', deep: '#b88516', glyph: '☀' },
  rain:   { label: 'Rain',   color: '#7eb8e0', deep: '#2e5d85', glyph: '☂' },
  earth:  { label: 'Earth',  color: '#9bc290', deep: '#2f5a2a', glyph: '🌱' },
  frost:  { label: 'Frost',  color: '#cfe7f0', deep: '#3a7d8e', glyph: '❄' },
  sweet:  { label: 'Sweet',  color: '#f0a8c8', deep: '#a04068', glyph: '✿' },
  wild:   { label: 'Wild',   color: '#9678e0', deep: '#3a2a6a', glyph: '✦' },
};

export const RARITIES = {
  common:    { label: 'Common',     stars: 1, color: '#7a7384' },
  uncommon:  { label: 'Uncommon',   stars: 2, color: '#4d8044' },
  rare:      { label: 'Rare',       stars: 3, color: '#b88516' },
  ultra:     { label: 'Ultra Rare', stars: 4, color: '#9678e0' },
  legendary: { label: 'Legendary',  stars: 5, color: '#3a2a6a' },
};

export const CARDS = [
  // ---- Commons (8) ----
  {
    id: 'bluechu', name: 'Bluechu', type: 'sun', hp: 60, rarity: 'common',
    attacks: [
      { name: 'Sweet Spark', cost: ['sun'], damage: 20, text: 'Flip a coin. If heads, target is dazzled.' },
      { name: 'Berrybolt', cost: ['sun', 'sun'], damage: 40 },
    ],
    weakness: 'rain', retreat: 1,
    flavor: 'Crackles with static when fully ripe. Hides under leaves at noon.',
  },
  {
    id: 'mistling', name: 'Mistling', type: 'rain', hp: 50, rarity: 'common',
    attacks: [
      { name: 'Drizzle', cost: ['rain'], damage: 10, text: 'Heal 10 HP.' },
      { name: 'Splashberry', cost: ['rain', 'rain'], damage: 30 },
    ],
    weakness: 'sun', retreat: 0,
    flavor: 'Forms in the morning fog and disappears by ten.',
  },
  {
    id: 'sproutling', name: 'Sproutling', type: 'earth', hp: 70, rarity: 'common',
    attacks: [
      { name: 'Vine Tap', cost: ['earth'], damage: 20 },
      { name: 'Composturn', cost: ['earth', 'earth'], damage: 30, text: 'Bench heals 10 HP.' },
    ],
    weakness: 'frost', retreat: 1,
    flavor: 'A baby bush. Hums when watered.',
  },
  {
    id: 'frostpint', name: 'Frostpint', type: 'frost', hp: 60, rarity: 'common',
    attacks: [
      { name: 'Cold Snap', cost: ['frost'], damage: 20 },
      { name: 'Hailstorm', cost: ['frost', 'frost'], damage: 30, text: 'Discard 1 energy.' },
    ],
    weakness: 'sun', retreat: 1,
    flavor: 'Lives in the freezer. Resents being thawed.',
  },
  {
    id: 'pintling', name: 'Pintling', type: 'earth', hp: 50, rarity: 'common',
    attacks: [
      { name: 'Tumble', cost: ['earth'], damage: 10 },
      { name: 'Stack Crash', cost: ['earth', 'earth'], damage: 30 },
    ],
    weakness: 'frost', retreat: 0,
    flavor: 'A tiny pint container that just figured out it has feet.',
  },
  {
    id: 'honeybeest', name: 'Honeybeest', type: 'sun', hp: 50, rarity: 'common',
    attacks: [
      { name: 'Pollen Dust', cost: ['sun'], damage: 10, text: 'Confuse target.' },
      { name: 'Sting', cost: ['sun', 'sun'], damage: 30 },
    ],
    weakness: 'frost', retreat: 0,
    flavor: 'Lives in the orchard. Considers all blossoms personal property.',
  },
  {
    id: 'biscuit', name: 'Biscuit', type: 'earth', hp: 80, rarity: 'common',
    attacks: [
      { name: 'Loyal Bark', cost: ['earth'], damage: 10, text: 'Search deck for a Sun card.' },
      { name: 'Tail Whomp', cost: ['earth', 'earth'], damage: 30 },
    ],
    weakness: 'wild', retreat: 1,
    flavor: 'A very serious farm dog. Has opinions about delivery vehicles.',
  },
  {
    id: 'rakespirit', name: 'Rakespirit', type: 'wild', hp: 40, rarity: 'common',
    attacks: [
      { name: 'Tine Stab', cost: ['wild'], damage: 20 },
    ],
    weakness: 'earth', retreat: 1,
    flavor: 'The ghost of a rake left out in the rain too long.',
  },

  // ---- Uncommons (6) ----
  {
    id: 'berrysaur', name: 'Berrysaur', type: 'earth', hp: 110, rarity: 'uncommon',
    attacks: [
      { name: 'Bramble Bash', cost: ['earth'], damage: 30 },
      { name: 'Cluster Burst', cost: ['earth', 'earth', 'earth'], damage: 70, text: 'Discard 1 Earth energy.' },
    ],
    weakness: 'frost', retreat: 2,
    flavor: 'Carries a permanent harvest on its back. Smells fantastic.',
  },
  {
    id: 'jamspike', name: 'Jamspike', type: 'wild', hp: 90, rarity: 'uncommon',
    attacks: [
      { name: 'Sticky Slash', cost: ['wild'], damage: 20, text: 'Target may not retreat next turn.' },
      { name: 'Quill Storm', cost: ['wild', 'wild'], damage: 50 },
    ],
    weakness: 'sweet', retreat: 1,
    flavor: 'Half hedgehog, half open jar of preserves. Do not pet.',
  },
  {
    id: 'frostflake', name: 'Frostflake', type: 'frost', hp: 90, rarity: 'uncommon',
    attacks: [
      { name: 'Glaze', cost: ['frost'], damage: 20, text: 'Target sleeps if a coin flips heads.' },
      { name: 'Blizzard Bite', cost: ['frost', 'frost'], damage: 50 },
    ],
    weakness: 'sun', retreat: 1,
    flavor: 'Snowflake the size of a salad plate. Surprisingly social.',
  },
  {
    id: 'compostix', name: 'Compostix', type: 'earth', hp: 100, rarity: 'uncommon',
    attacks: [
      { name: 'Loam Coil', cost: ['earth'], damage: 20, text: 'Heal 20 HP.' },
      { name: 'Burrow Strike', cost: ['earth', 'earth'], damage: 40 },
    ],
    weakness: 'frost', retreat: 2,
    flavor: 'Eats kitchen scraps, dreams of soil structure.',
  },
  {
    id: 'sunbear', name: 'Sunbear', type: 'sun', hp: 110, rarity: 'uncommon',
    attacks: [
      { name: 'Berry Bonk', cost: ['sun'], damage: 30 },
      { name: 'Solar Slam', cost: ['sun', 'sun', 'sun'], damage: 80, text: 'Recoil 20.' },
    ],
    weakness: 'rain', retreat: 3,
    flavor: 'Wakes for one thing, and one thing only.',
  },
  {
    id: 'puddleduck', name: 'Puddleduck', type: 'rain', hp: 80, rarity: 'uncommon',
    attacks: [
      { name: 'Quack Quake', cost: ['rain'], damage: 20 },
      { name: 'Tide Pool', cost: ['rain', 'rain'], damage: 40, text: 'Heal 10 HP.' },
    ],
    weakness: 'sun', retreat: 1,
    flavor: 'Migrates between irrigation puddles. Very particular.',
  },

  // ---- Rares (4) ----
  {
    id: 'chandling', name: 'Chandling', type: 'sweet', hp: 130, rarity: 'rare',
    attacks: [
      { name: 'Sugar Pulse', cost: ['sweet'], damage: 30, text: 'Heal 20 HP.' },
      { name: 'Crown Bloom', cost: ['sweet', 'sweet'], damage: 70, text: 'Bench gains +20 HP.' },
    ],
    weakness: 'wild', retreat: 2,
    flavor: 'The Chandler variety, ascended. Each berry bigger than a quarter.',
  },
  {
    id: 'rekadrake', name: 'Rekadrake', type: 'wild', hp: 140, rarity: 'rare',
    attacks: [
      { name: 'Reka Roar', cost: ['wild'], damage: 20, text: 'Opponent reveals their hand.' },
      { name: 'Vine Maw', cost: ['wild', 'wild', 'wild'], damage: 90 },
    ],
    weakness: 'sweet', retreat: 3,
    flavor: 'Born of an early-season variety that just kept growing.',
  },
  {
    id: 'sequimite', name: 'Sequimite', type: 'earth', hp: 150, rarity: 'rare',
    attacks: [
      { name: 'Stone Wall', cost: ['earth'], damage: 10, text: 'Reduce damage to 0 next turn.' },
      { name: 'Quartz Quake', cost: ['earth', 'earth'], damage: 60 },
    ],
    weakness: 'wild', retreat: 4,
    flavor: 'A boulder from the Olympic foothills. Older than the farm.',
  },
  {
    id: 'pinkasaur', name: 'Pinkasaur', type: 'sweet', hp: 120, rarity: 'rare',
    attacks: [
      { name: 'Lemonade Spritz', cost: ['sweet'], damage: 20, text: 'Heal 10 HP.' },
      { name: 'Pink Tantrum', cost: ['sweet', 'sweet', 'sweet'], damage: 100 },
    ],
    weakness: 'wild', retreat: 2,
    flavor: 'The Pink Lemonade variety, but a dinosaur. Tartly sweet.',
  },

  // ---- Ultra Rares (2) ----
  {
    id: 'liberty', name: 'Liberty Phoenix', type: 'sun', hp: 180, rarity: 'ultra',
    attacks: [
      { name: 'Sunrise', cost: ['sun'], damage: 30, text: 'Recover one Knocked Out card.' },
      { name: 'Solstice Flare', cost: ['sun', 'sun', 'sun'], damage: 130, text: 'Discard all Sun energy.' },
    ],
    weakness: 'rain', retreat: 2,
    flavor: 'Rumored to nest in the late-season Liberty bushes. Burns blue.',
  },
  {
    id: 'dukerodactyl', name: 'Dukerodactyl', type: 'wild', hp: 160, rarity: 'ultra',
    attacks: [
      { name: 'Talon Pluck', cost: ['wild'], damage: 30, text: 'Steal one of opponent\'s energy.' },
      { name: 'Dawn Dive', cost: ['wild', 'wild'], damage: 100 },
    ],
    weakness: 'frost', retreat: 1,
    flavor: 'Eldest of the orchard. Predates the cultivar.',
  },

  // ---- Legendary ----
  {
    id: 'sunblossom', name: 'Sun Blossom', type: 'sweet', hp: 220, rarity: 'legendary',
    attacks: [
      { name: 'Bloom', cost: ['sweet'], damage: 0, text: 'All your benched Berries heal fully.' },
      { name: 'Year of Plenty', cost: ['sun', 'rain', 'earth'], damage: 200, text: 'Once per game.' },
    ],
    weakness: 'wild', retreat: 4,
    flavor: 'The first bush. Still planted in row one. Still bearing.',
  },
];

export const BY_ID = Object.fromEntries(CARDS.map((card) => [card.id, card]));
export const BY_RARITY = CARDS.reduce((map, card) => {
  (map[card.rarity] = map[card.rarity] || []).push(card);
  return map;
}, {});
