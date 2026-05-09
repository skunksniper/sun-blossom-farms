import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, formatMoney } from '../api';
import { useCart } from '../cart';

const CATEGORY_LABELS = {
  fresh: 'Fresh berries',
  frozen: 'Frozen',
  pantry: 'Pantry',
  experiences: 'On the farm',
};

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [params] = useSearchParams();
  const { add } = useCart();

  const canceled = params.get('canceled') === '1';

  useEffect(() => {
    let cancelled = false;
    api.getProducts()
      .then((data) => { if (!cancelled) setProducts(data.products); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, []);

  const grouped = useMemo(() => {
    if (!products) return null;
    const map = new Map();
    for (const product of products) {
      if (!map.has(product.category)) map.set(product.category, []);
      map.get(product.category).push(product);
    }
    return map;
  }, [products]);

  return (
    <div className="container section">
      <header className="page-header">
        <p className="eyebrow">The farm store</p>
        <h1>Shop the harvest</h1>
        <p>Fresh berries ship in season; everything else is available year-round. Berry Club members save on every order.</p>
      </header>

      {canceled && (
        <div className="banner banner--soft">
          Your checkout was canceled — your cart is right where you left it.
        </div>
      )}

      {error && <p className="banner banner--error">Couldn't load products: {error}</p>}
      {!products && !error && <p>Loading the farm stand…</p>}

      {grouped && Array.from(grouped.entries()).map(([category, items]) => (
        <section key={category} className="shop-section">
          <h2 className="shop-section__title">{CATEGORY_LABELS[category] || category}</h2>
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={() => add(product.id, 1)} />
            ))}
          </div>
        </section>
      ))}

      <p className="shop-foot">
        Heading to checkout? <Link to="/cart">Review your cart →</Link>
      </p>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-card__art" aria-hidden="true">
        <ProductArt category={product.category} />
      </div>
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__foot">
          <span className="price">{formatMoney(product.priceCents)}</span>
          <button className="btn btn--primary btn--small" onClick={onAdd}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}

function ProductArt({ category }) {
  if (category === 'fresh') {
    return (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <rect x="20" y="60" width="80" height="46" rx="4" fill="#d8c8a8" />
        <rect x="20" y="58" width="80" height="6" fill="#b9a382" />
        <Cluster cx={45} cy={60} />
        <Cluster cx={75} cy={56} />
        <Cluster cx={60} cy={68} />
      </svg>
    );
  }
  if (category === 'frozen') {
    return (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <path d="M30 30h60v70H30z" fill="#e8f0fb" stroke="#a8c0e0" strokeWidth="2" />
        <Cluster cx={50} cy={60} />
        <Cluster cx={75} cy={75} />
        <path d="M40 22 L50 36 M70 22 L60 36" stroke="#a8c0e0" strokeWidth="2" />
      </svg>
    );
  }
  if (category === 'pantry') {
    return (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <rect x="42" y="22" width="36" height="14" rx="3" fill="#7d5dd6" />
        <rect x="36" y="36" width="48" height="64" rx="6" fill="#3a2a6a" />
        <rect x="44" y="58" width="32" height="22" fill="#f5f0e6" />
        <text x="60" y="74" textAnchor="middle" fontSize="9" fill="#3a2a6a" fontFamily="serif">SBF</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <path d="M20 90 Q60 60 100 90 L100 100 L20 100 Z" fill="#cfe1c5" />
      <rect x="48" y="40" width="24" height="40" fill="#b8915c" />
      <ellipse cx="60" cy="38" rx="20" ry="10" fill="#3a2a6a" />
      <Cluster cx={52} cy={36} />
      <Cluster cx={68} cy={36} />
    </svg>
  );
}

function Cluster({ cx, cy }) {
  return (
    <g>
      <circle cx={cx - 6} cy={cy} r="6" fill="#3a2a6a" />
      <circle cx={cx + 6} cy={cy} r="6" fill="#5a3fa0" />
      <circle cx={cx} cy={cy - 6} r="6" fill="#7d5dd6" />
      <circle cx={cx} cy={cy + 4} r="6" fill="#4a338a" />
    </g>
  );
}
