import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { api, formatMoney } from '../api';
import { useCart } from '../cart';
import { photos, fallbackGradients } from '../photos';

export default function Cart() {
  const { cart, setQty, remove, clear } = useCart();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getProducts()
      .then((data) => setProducts(Object.fromEntries(data.products.map((p) => [p.id, p]))))
      .catch((err) => setError(err.message));
  }, []);

  const lineItems = products
    ? cart.map((item) => ({ ...item, product: products[item.id] })).filter((item) => item.product)
    : [];
  const subtotal = lineItems.reduce((sum, item) => sum + item.product.priceCents * item.qty, 0);

  async function checkout() {
    setSubmitting(true);
    setError(null);
    try {
      const { url } = await api.startCartCheckout(cart);
      window.location.href = url;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container container--narrow section">
        <p className="eyebrow">Cart</p>
        <h1>Your cart is empty.</h1>
        <p>Looks like you haven't added any berries yet.</p>
        <Link to="/shop" className="btn btn--primary">Visit the shop</Link>
      </div>
    );
  }

  return (
    <div className="container container--narrow section">
      <p className="eyebrow">Cart</p>
      <h1>Almost yours.</h1>
      {error && <p className="banner banner--error">{error}</p>}
      <ul className="cart-list">
        {lineItems.map((item) => (
          <li key={item.id} className="cart-row">
            <Photo
              className="cart-row__photo"
              src={photos.products[item.id]}
              fallback={fallbackGradients.product}
              alt={item.product.name}
            />
            <div className="cart-row__name">
              <strong>{item.product.name}</strong>
              <span>{formatMoney(item.product.priceCents)} each</span>
            </div>
            <div className="cart-row__qty">
              <button aria-label="Decrease quantity" onClick={() => setQty(item.id, item.qty - 1)}>−</button>
              <span aria-live="polite">{item.qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
            </div>
            <div className="cart-row__total">{formatMoney(item.product.priceCents * item.qty)}</div>
            <button className="link-btn cart-row__remove" onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="cart-totals">
        <div className="cart-totals__row">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <p className="cart-totals__note">Shipping is calculated at checkout. Members save up to 20%.</p>
      </div>

      <div className="cart-actions">
        <button className="link-btn" onClick={clear}>Clear cart</button>
        <button className="btn btn--primary" onClick={checkout} disabled={submitting || lineItems.length === 0}>
          {submitting ? 'Heading to Stripe…' : `Checkout · ${formatMoney(subtotal)}`}
        </button>
      </div>
    </div>
  );
}
