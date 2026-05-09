import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api';

export default function Welcome() {
  const [params] = useSearchParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const sessionId = params.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    api.getCheckoutSession(sessionId)
      .then(setSession)
      .catch((err) => setError(err.message));
  }, [sessionId]);

  const tier = session?.metadata?.tier;

  return (
    <div className="container section narrow celebrate">
      <h1>Welcome to the Berry Club.</h1>
      <p>
        You're in. The first newsletter goes out next Tuesday, and your first Berry Box ships at the start
        of the next quarter.
      </p>
      {error && <p className="banner banner--error">{error}</p>}
      {tier && (
        <p className="receipt">
          Tier: <strong style={{ textTransform: 'capitalize' }}>{tier}</strong>
          {session?.email && <> · confirmation sent to <strong>{session.email}</strong></>}
        </p>
      )}
      <div className="celebrate__cta">
        <Link to="/shop" className="btn btn--ghost">Use your discount in the shop</Link>
        <Link to="/" className="btn btn--primary">Back to the farm</Link>
      </div>
      <p className="celebrate__tag">Thank you berry much.</p>
    </div>
  );
}
