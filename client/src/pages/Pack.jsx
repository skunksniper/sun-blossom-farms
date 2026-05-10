import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../cards/Card';
import { openPack, addToCollection, isNew, totalOwned, uniqueOwned } from '../cards/pack';
import { CARDS } from '../cards/data';

const STAGE = {
  IDLE: 'idle',       // pack sealed, button to open
  RIPPING: 'ripping', // animation playing
  REVEAL: 'reveal',   // cards face down, click to flip
  DONE: 'done',       // all flipped, fan layout
};

export default function Pack() {
  const [stage, setStage] = useState(STAGE.IDLE);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(new Set());
  const [stats, setStats] = useState(() => ({ total: totalOwned(), unique: uniqueOwned() }));

  useEffect(() => {
    const refresh = () => setStats({ total: totalOwned(), unique: uniqueOwned() });
    window.addEventListener('sbf-collection-change', refresh);
    return () => window.removeEventListener('sbf-collection-change', refresh);
  }, []);

  function handleOpen() {
    if (stage !== STAGE.IDLE) return;
    setStage(STAGE.RIPPING);
    const pulled = openPack();
    setCards(pulled);
    setFlipped(new Set());
    addToCollection(pulled);
    setTimeout(() => setStage(STAGE.REVEAL), 1100);
  }

  function flipCard(index) {
    if (stage === STAGE.IDLE || stage === STAGE.RIPPING) return;
    setFlipped((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === cards.length) setStage(STAGE.DONE);
      return next;
    });
  }

  function flipAll() {
    setFlipped(new Set(cards.map((_, i) => i)));
    setStage(STAGE.DONE);
  }

  function reset() {
    setStage(STAGE.IDLE);
    setCards([]);
    setFlipped(new Set());
  }

  const completion = Math.round((stats.unique / CARDS.length) * 100);

  return (
    <div className="container container--wide section">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <p className="eyebrow">Berry Battle TCG</p>
          <h1>Open a pack.</h1>
          <p>Five cards per pack. Three commons, one uncommon, and one guaranteed rare or better. Hold for a Liberty Phoenix or a Sun Blossom — they're out there.</p>
        </div>
        <div className="pack-stats">
          <div><strong>{stats.total}</strong><span>cards owned</span></div>
          <div><strong>{stats.unique}/{CARDS.length}</strong><span>unique</span></div>
          <div><strong>{completion}%</strong><span>BerryDex</span></div>
        </div>
      </header>

      <div className="pack-stage">
        {stage === STAGE.IDLE && <SealedPack onOpen={handleOpen} />}
        {stage === STAGE.RIPPING && <RippingPack />}
        {(stage === STAGE.REVEAL || stage === STAGE.DONE) && (
          <PackResult
            cards={cards}
            flipped={flipped}
            stage={stage}
            onFlip={flipCard}
            onFlipAll={flipAll}
            onAgain={reset}
          />
        )}
      </div>

      <p className="pack-foot">
        Want to see what you've pulled? <Link to="/collection">Visit the BerryDex →</Link>
      </p>
    </div>
  );
}

function SealedPack({ onOpen }) {
  return (
    <div className="pack-wrapper">
      <button className="pack" onClick={onOpen} aria-label="Open pack">
        <PackArt />
        <span className="pack__cta">Click to open</span>
      </button>
      <p className="pack-hint">Each pack is on the house — open as many as you'd like.</p>
    </div>
  );
}

function RippingPack() {
  return (
    <div className="pack-wrapper">
      <div className="pack pack--ripping" aria-hidden="true">
        <div className="pack__half pack__half--top"><PackArt /></div>
        <div className="pack__half pack__half--bottom"><PackArt /></div>
        <div className="pack__sparkles">
          {Array.from({ length: 14 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}
        </div>
      </div>
    </div>
  );
}

function PackResult({ cards, flipped, stage, onFlip, onFlipAll, onAgain }) {
  return (
    <div className="pack-result">
      <div className="pack-result__cards">
        {cards.map((card, i) => {
          const isFlipped = flipped.has(i);
          const fresh = isNew(card.id) && card._isNew;
          return (
            <div
              key={i}
              className={`pack-slot ${isFlipped ? 'pack-slot--flipped' : ''}`}
              style={{ '--n': i }}
            >
              {fresh && isFlipped && <span className="pack-slot__new">NEW</span>}
              <Card card={card} faceDown={!isFlipped} onClick={() => onFlip(i)} />
            </div>
          );
        })}
      </div>
      <div className="pack-actions">
        {stage === 'reveal' ? (
          <>
            <p>Click each card to reveal — or flip them all.</p>
            <button className="btn btn--ghost" onClick={onFlipAll}>Reveal all</button>
          </>
        ) : (
          <>
            <p>Nice pull. Want another?</p>
            <button className="btn btn--primary" onClick={onAgain}>Open another pack</button>
            <Link to="/collection" className="btn btn--ghost">View BerryDex</Link>
          </>
        )}
      </div>
    </div>
  );
}

function PackArt() {
  return (
    <svg viewBox="0 0 200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="packBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3fa0" />
          <stop offset="50%" stopColor="#3a2a6a" />
          <stop offset="100%" stopColor="#2a1d4f" />
        </linearGradient>
        <linearGradient id="packShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="180" height="260" rx="14" fill="url(#packBg)" />
      <rect x="10" y="10" width="180" height="260" rx="14" fill="url(#packShine)" />
      {/* perforated rip line */}
      <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(244,201,93,0.7)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="100" y="40" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="14" fill="#f4c95d" letterSpacing="2">SUN BLOSSOM</text>
      {/* berry cluster */}
      <g transform="translate(100 140)">
        <circle cx="-22" cy="0" r="22" fill="#7d5dd6" />
        <circle cx="22" cy="-6" r="20" fill="#5a3fa0" />
        <circle cx="0" cy="-22" r="18" fill="#9678e0" />
        <circle cx="0" cy="14" r="16" fill="#3a2a6a" />
        <circle cx="-26" cy="-4" r="6" fill="rgba(255,255,255,0.5)" />
        <circle cx="20" cy="-10" r="5" fill="rgba(255,255,255,0.5)" />
      </g>
      <text x="100" y="220" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="500" fill="#fff">BERRY BATTLE</text>
      <text x="100" y="240" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="3" fill="#ffe39a">5-CARD BOOSTER</text>
      <text x="100" y="258" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="rgba(255,255,255,0.5)" letterSpacing="2">SERIES 01 · SEQUIM</text>
    </svg>
  );
}
