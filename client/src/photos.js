// Central place for site photography. Swap any URL with one of your own
// (e.g. an upload at "/images/your-photo.jpg" served from client/public)
// and the rest of the site just picks it up.
//
// Each image position has a gradient + texture fallback if the URL fails
// to load, so the layout stays intact while you find the right photos.

const u = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}&fit=crop` : ''}&q=80&auto=format`;

export const photos = {
  // Home
  hero:        u('1498557850523-fd3d118b962e', 2000, 1200),
  story:       u('1597474561103-0aebf2810ed4', 1400, 1000),
  field:       u('1559181567-c3190ca9959b',    1400, 900),
  membership:  u('1488459716781-31db52582fe9', 1800, 1000),
  galleryA:    u('1542838132-92c53300491e',    900, 900),
  galleryB:    u('1591287083773-9b8a96b05c61', 900, 900),
  galleryC:    u('1567402080879-8a76dd87c022', 900, 900),
  galleryD:    u('1571575173700-afb9492e6a50', 900, 900),

  // Shop — keyed by product id
  products: {
    'fresh-pint':  u('1498557850523-fd3d118b962e', 800, 800),
    'fresh-flat':  u('1567402080879-8a76dd87c022', 800, 800),
    'frozen-5lb':  u('1591287083773-9b8a96b05c61', 800, 800),
    'jam-classic': u('1597474561103-0aebf2810ed4', 800, 800),
    'syrup':       u('1542838132-92c53300491e',    800, 800),
    'upick-pass':  u('1571575173700-afb9492e6a50', 800, 800),
  },

  // Memberships — keyed by tier id
  tiers: {
    'sprout':  u('1488459716781-31db52582fe9', 700, 500),
    'harvest': u('1559181567-c3190ca9959b',    700, 500),
    'orchard': u('1542838132-92c53300491e',    700, 500),
  },

  // Section pages
  about:   u('1559181567-c3190ca9959b',    2000, 1100),
  team:    u('1488459716781-31db52582fe9', 1400, 1000),
  visit:   u('1571575173700-afb9492e6a50', 2000, 1100),
};

// Each gradient is paired with one of the photo slots above; if the photo
// URL fails to load we surface this gradient + SVG texture instead.
export const fallbackGradients = {
  hero:        'linear-gradient(135deg, #2a1d4f 0%, #5a3fa0 55%, #f4c95d 100%)',
  story:       'linear-gradient(135deg, #4d8044 0%, #2f5a2a 100%)',
  field:       'linear-gradient(135deg, #f4c95d 0%, #e0995b 100%)',
  membership:  'linear-gradient(135deg, #3a2a6a 0%, #7d5dd6 100%)',
  about:       'linear-gradient(135deg, #2a1d4f 0%, #4d8044 100%)',
  team:        'linear-gradient(135deg, #f4c95d 0%, #5a3fa0 100%)',
  visit:       'linear-gradient(135deg, #5a3fa0 0%, #2f5a2a 100%)',
  galleryA:    'linear-gradient(135deg, #3a2a6a, #7d5dd6)',
  galleryB:    'linear-gradient(135deg, #4d8044, #9bc290)',
  galleryC:    'linear-gradient(135deg, #f4c95d, #ffe39a)',
  galleryD:    'linear-gradient(135deg, #2a1d4f, #5a3fa0)',
  product:     'linear-gradient(135deg, #5a3fa0, #3a2a6a)',
  tier:        'linear-gradient(135deg, #3a2a6a, #5a3fa0)',
};
