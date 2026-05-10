import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Photo from '../components/Photo';
import { api, formatMoney } from '../api';
import { useCart } from '../cart';
import { photos, fallbackGradients } from '../photos';

const CATEGORY_LABELS = {
  fresh: 'Fresh berries',
  frozen: 'Frozen',
  pantry: 'From the kitchen',
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
        <p className="eyebrow">Shop</p>
        <h1>The harvest, delivered.</h1>
        <p>
          Fresh berries ship in season, June through September. Everything else is available year-round.
          Berry Club members save 10–20% on every order.
        </p>
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
          <div className="shop-section__head">
            <h2 className="shop-section__title">{CATEGORY_LABELS[category] || category}</h2>
            <span className="shop-section__count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          </div>
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={() => add(product.id, 1)} />
            ))}
          </div>
        </section>
      ))}

      {grouped && (
        <p className="shop-foot">
          Heading to checkout? <Link to="/cart">Review your cart →</Link>
        </p>
      )}
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const photoUrl = photos.products[product.id];
  return (
    <article className="product-card">
      <Photo
        className="product-card__photo"
        src={photoUrl}
        fallback={fallbackGradients.product}
        alt={product.name}
      />
      <div className="product-card__body">
        <div className="product-card__head">
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__price">{formatMoney(product.priceCents)}</span>
        </div>
        <p className="product-card__desc">{product.description}</p>
        <button className="btn btn--ghost btn--small product-card__add" onClick={onAdd}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
