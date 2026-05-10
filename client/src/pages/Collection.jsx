import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../cards/Card';
import { CARDS, RARITIES } from '../cards/data';
import { loadCollection, totalOwned, uniqueOwned } from '../cards/pack';

export default function Collection() {
  const [owned, setOwned] = useState(() => loadCollection());

  useEffect(() => {
    const refresh = () => setOwned(loadCollection());
    window.addEventListener('sbf-collection-change', refresh);
    return () => window.removeEventListener('sbf-collection-change', refresh);
  }, []);

  const total = totalOwned();
  const unique = uniqueOwned();
  const completion = Math.round((unique / CARDS.length) * 100);

  // Group by rarity for display
  const buckets = ['common', 'uncommon', 'rare', 'ultra', 'legendary'];

  return (
    <div className="container container--wide section">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <p className="eyebrow">BerryDex</p>
          <h1>Your collection.</h1>
          <p>Every card you've pulled, plus the ones still missing. Click a card to give it a tilt.</p>
        </div>
        <div className="pack-stats">
          <div><strong>{total}</strong><span>cards owned</span></div>
          <div><strong>{unique}/{CARDS.length}</strong><span>unique</span></div>
          <div><strong>{completion}%</strong><span>complete</span></div>
        </div>
      </header>

      {total === 0 && (
        <div className="banner banner--soft" style={{ marginBottom: 32 }}>
          You haven't opened any packs yet. <Link to="/pack">Open your first pack →</Link>
        </div>
      )}

      {buckets.map((bucket) => {
        const cards = CARDS.filter((c) => c.rarity === bucket);
        if (cards.length === 0) return null;
        const ownedHere = cards.filter((c) => owned[c.id]).length;
        return (
          <section key={bucket} className="dex-section">
            <div className="dex-section__head">
              <h2>
                {RARITIES[bucket].label}
                <span className="dex-section__count">{ownedHere} / {cards.length}</span>
              </h2>
            </div>
            <div className="dex-grid">
              {cards.map((card) => {
                const count = owned[card.id] || 0;
                return (
                  <div key={card.id} className={`dex-tile ${count === 0 ? 'dex-tile--locked' : ''}`}>
                    <Card card={card} />
                    {count > 1 && <span className="dex-tile__count">×{count}</span>}
                    {count === 0 && <span className="dex-tile__locked">Not yet</span>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link to="/pack" className="btn btn--primary">Open another pack</Link>
      </div>
    </div>
  );
}
