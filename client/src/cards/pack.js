import { BY_ID, BY_RARITY } from './data';

const STORAGE_KEY = 'sbf-collection-v1';

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Roll 5 cards: 3 commons, 1 uncommon, 1 "hit" (rare/ultra/legendary).
export function openPack() {
  const cards = [];
  for (let i = 0; i < 3; i++) cards.push(pick(BY_RARITY.common));
  cards.push(pick(BY_RARITY.uncommon));

  const roll = Math.random();
  let hit;
  if (roll < 0.04) hit = pick(BY_RARITY.legendary);
  else if (roll < 0.22) hit = pick(BY_RARITY.ultra);
  else hit = pick(BY_RARITY.rare);
  cards.push(hit);

  return cards.map((card) => ({ ...card, _isNew: true }));
}

export function loadCollection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCollection(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event('sbf-collection-change'));
}

export function addToCollection(cards) {
  const map = loadCollection();
  for (const card of cards) {
    map[card.id] = (map[card.id] || 0) + 1;
  }
  saveCollection(map);
}

export function totalOwned() {
  const map = loadCollection();
  return Object.values(map).reduce((sum, n) => sum + n, 0);
}

export function uniqueOwned() {
  return Object.keys(loadCollection()).length;
}

export function isNew(cardId) {
  const map = loadCollection();
  return !map[cardId] || map[cardId] === 1;
}

export function getOwnedCount(cardId) {
  return loadCollection()[cardId] || 0;
}

export function ownedCardsList() {
  const map = loadCollection();
  return Object.entries(map)
    .map(([id, count]) => ({ card: BY_ID[id], count }))
    .filter((x) => x.card);
}
