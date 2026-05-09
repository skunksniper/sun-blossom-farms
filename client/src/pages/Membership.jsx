import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, formatMoney } from '../api';

export default function Membership() {
  const [tiers, setTiers] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [params] = useSearchParams();
  const canceled = params.get('canceled') === '1';

  useEffect(() => {
    api.getMemberships()
      .then((data) => setTiers(data.memberships))
      .catch((err) => setError(err.message));
  }, []);

  async function join(tier) {
    setSubmitting(tier);
    setError(null);
    try {
      const { url } = await api.startMembershipCheckout(tier);
      window.location.href = url;
    } catch (err) {
      setError(err.message);
      setSubmitting(null);
    }
  }

  return (
    <div className="container section">
      <header className="page-header">
        <p className="eyebrow">Berry Club</p>
        <h1>Be a regular at the farm.</h1>
        <p>
          The Berry Club is the easiest way to keep blueberries in the kitchen all year. Pick a tier,
          we ship a Berry Box every quarter, and you save on everything we grow.
        </p>
      </header>

      {canceled && (
        <div className="banner banner--soft">
          You canceled before joining — no charge was made. Come back when you're ready.
        </div>
      )}
      {error && <p className="banner banner--error">{error}</p>}
      {!tiers && !error && <p>Loading membership tiers…</p>}

      {tiers && (
        <div className="tier-grid">
          {tiers.map((tier) => (
            <article key={tier.id} className={`tier ${tier.featured ? 'tier--featured' : ''}`}>
              {tier.featured && <p className="tier__badge">Most popular</p>}
              <h2 className="tier__name">{tier.name}</h2>
              <p className="tier__tag">{tier.tagline}</p>
              <p className="tier__price">
                <span>{formatMoney(tier.priceCents)}</span>
                <span className="tier__interval">/{tier.interval}</span>
              </p>
              <ul className="tier__perks">
                {tier.perks.map((perk) => <li key={perk}>{perk}</li>)}
              </ul>
              <button
                className={`btn ${tier.featured ? 'btn--primary' : 'btn--ghost'}`}
                onClick={() => join(tier.id)}
                disabled={submitting !== null}
              >
                {submitting === tier.id ? 'Heading to Stripe…' : `Join ${tier.name}`}
              </button>
            </article>
          ))}
        </div>
      )}

      <section className="faq">
        <h2>Membership FAQ</h2>
        <details>
          <summary>When does my Berry Box ship?</summary>
          <p>
            Boxes go out the second week of January, April, July, and October. July is the big one — fresh berries,
            shipped overnight on ice.
          </p>
        </details>
        <details>
          <summary>Can I cancel anytime?</summary>
          <p>
            Of course. Cancel from the email confirmation we send, or just write us. We'll honor any boxes you've
            already paid for, and stop the clock from there.
          </p>
        </details>
        <details>
          <summary>Do members really get a row reserved at the farm?</summary>
          <p>
            Orchard tier, yes. We hand-letter a wooden sign with your name and stake it at a row each spring.
            You can come pick it whenever it's open.
          </p>
        </details>
        <details>
          <summary>Where do you ship?</summary>
          <p>Anywhere in the contiguous US. Frozen and pantry items only outside of summer; fresh in season.</p>
        </details>
      </section>
    </div>
  );
}
