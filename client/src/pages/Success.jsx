import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, formatMoney } from '../api';
import { useCart } from '../cart';

export default function Success() {
  const [params] = useSearchParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const sessionId = params.get('session_id');
  const { clear } = useCart();

  useEffect(() => {
    if (!sessionId) return;
    api.getCheckoutSession(sessionId)
      .then((data) => {
        setSession(data);
        clear();
      })
      .catch((err) => setError(err.message));
  }, [sessionId, clear]);

  return (
    <div className="container container--narrow section celebrate">
      <h1>Thank you berry much.</h1>
      <p>Your order is in. We'll send a confirmation to your email shortly.</p>
      {!sessionId && <p>(No session ID on this page — if you got here by accident, head back to the <Link to="/shop">shop</Link>.)</p>}
      {error && <p className="banner banner--error">{error}</p>}
      {session && session.amountTotal && (
        <p className="receipt">
          We charged <strong>{formatMoney(session.amountTotal, (session.currency || 'usd').toUpperCase())}</strong>
          {session.email && <> to <strong>{session.email}</strong></>}.
        </p>
      )}
      <div className="celebrate__cta">
        <Link to="/shop" className="btn btn--ghost">Keep shopping</Link>
        <Link to="/membership" className="btn btn--primary">Make it a habit — join the club</Link>
      </div>
    </div>
  );
}
