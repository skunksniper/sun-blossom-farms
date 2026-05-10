import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../cards/Card';
import { openPack, addToCollection, isNew, totalOwned, uniqueOwned } from '../cards/pack';
import { CARDS } from '../cards/data';

const STAGE = {
  IDLE: 'idle',
  RIPPING: 'ripping',
  REVEAL: 'reveal',
  DONE: 'done',
};

export default function Pack() {
  const [stage, setStage] = useState(STAGE.IDLE);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(new Set());
  const [stats, setStats] = useState(() => ({ total: totalOwned(), unique: uniqueOwned() }));
  const [confetti, setConfetti] = useState(0);

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
    setTimeout(() => setStage(STAGE.REVEAL), 1300);
  }

  function flipCard(index) {
    if (stage === STAGE.IDLE || stage === STAGE.RIPPING) return;
    setFlipped((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      const card = cards[index];
      if (card?.rarity === 'legendary' || card?.rarity === 'ultra') {
        setConfetti((c) => c + 1);
      }
      if (next.size === cards.length) setStage(STAGE.DONE);
      return next;
    });
  }

  function flipAll() {
    setFlipped(new Set(cards.map((_, i) => i)));
    if (cards.some((c) => c.rarity === 'legendary' || c.rarity === 'ultra')) setConfetti((c) => c + 1);
    setStage(STAGE.DONE);
  }

  function reset() {
    setStage(STAGE.IDLE);
    setCards([]);
    setFlipped(new Set());
  }

  const completion = Math.round((stats.unique / CARDS.length) * 100);

  return (
    <div className="pack-page">
      <div className="container container--wide section--tight">
        <header className="pack-header">
          <div>
            <p className="eyebrow">Berry Battle TCG</p>
            <h1>Open a pack.</h1>
            <p className="pack-header__sub">Five cards. Three commons, one uncommon, one guaranteed rare or better. There's a Liberty Phoenix and a legendary Sun Blossom out there — go find them.</p>
          </div>
          <div className="pack-stats">
            <div><strong>{stats.total}</strong><span>owned</span></div>
            <div><strong>{stats.unique}/{CARDS.length}</strong><span>unique</span></div>
            <div><strong>{completion}%</strong><span>dex</span></div>
          </div>
        </header>
      </div>

      <div className={`pack-stage stage--${stage}`}>
        {(stage === STAGE.IDLE) && <SealedPack onOpen={handleOpen} />}
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

        {confetti > 0 && <Confetti key={confetti} />}
      </div>

      <div className="container container--wide" style={{ textAlign: 'center', paddingBottom: 64 }}>
        <p className="pack-foot">
          See everything you've pulled in the <Link to="/collection">BerryDex →</Link>
        </p>
      </div>
    </div>
  );
}

function SealedPack({ onOpen }) {
  return (
    <div className="pack-wrapper">
      <div className="pack-orbit" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}
      </div>
      <button className="pack" onClick={onOpen} aria-label="Open pack">
        <PackArt />
        <span className="pack__glow" aria-hidden="true" />
      </button>
      <span className="pack__cta">Tap to open</span>
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
          {Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ '--i': i }} />)}
        </div>
        <div className="pack__flash" />
      </div>
    </div>
  );
}

function PackResult({ cards, flipped, stage, onFlip, onFlipAll, onAgain }) {
  const trackRef = useRef(null);
  const totalFlipped = flipped.size;

  return (
    <div className="pack-result">
      <div className="pack-result__progress" aria-hidden="true">
        {cards.map((_, i) => (
          <span key={i} className={`pack-result__dot ${flipped.has(i) ? 'is-on' : ''}`} />
        ))}
      </div>

      <div className="pack-result__track" ref={trackRef}>
        {cards.map((card, i) => {
          const isFlipped = flipped.has(i);
          const fresh = isNew(card.id) && card._isNew;
          return (
            <div
              key={i}
              className={`pack-slot pack-slot--${card.rarity} ${isFlipped ? 'pack-slot--flipped' : ''}`}
              style={{ '--n': i }}
            >
              {fresh && isFlipped && <span className="pack-slot__new">NEW</span>}
              {(card.rarity === 'ultra' || card.rarity === 'legendary') && isFlipped && (
                <div className="pack-slot__rays" aria-hidden="true" />
              )}
              <Card card={card} faceDown={!isFlipped} onClick={() => onFlip(i)} />
            </div>
          );
        })}
      </div>

      <div className="pack-actions">
        {stage === STAGE.REVEAL ? (
          <>
            <p className="pack-actions__hint">
              {totalFlipped === 0 ? 'Tap to reveal — start anywhere' : `${totalFlipped} of ${cards.length} revealed`}
            </p>
            <button className="btn btn--ghost" onClick={onFlipAll}>Reveal all</button>
          </>
        ) : (
          <>
            <p className="pack-actions__hint">Nice pull. Want another?</p>
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
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <linearGradient id="packShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="packFoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4c95d" />
          <stop offset="33%" stopColor="#f0a8c8" />
          <stop offset="66%" stopColor="#7d5dd6" />
          <stop offset="100%" stopColor="#9bc290" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="180" height="260" rx="14" fill="url(#packBg)" />
      <rect x="10" y="10" width="180" height="260" rx="14" fill="url(#packShine)" opacity="0.65" />
      <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(244,201,93,0.7)" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="100" y="42" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="13" fontWeight="500" fill="url(#packFoil)" letterSpacing="3">SUN BLOSSOM</text>
      <g transform="translate(100 142)">
        <circle cx="-26" cy="2" r="26" fill="#7d5dd6" />
        <circle cx="26" cy="-6" r="22" fill="#5a3fa0" />
        <circle cx="0" cy="-26" r="20" fill="#9678e0" />
        <circle cx="2" cy="18" r="18" fill="#3a2a6a" />
        <circle cx="-30" cy="-4" r="6" fill="rgba(255,255,255,0.55)" />
        <circle cx="22" cy="-12" r="5" fill="rgba(255,255,255,0.55)" />
        <path d="M0 -50 Q4 -56 12 -56 Q6 -50 4 -42" fill="#4d8044" />
      </g>
      <text x="100" y="216" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="500" fill="#fff" letterSpacing="0">BERRY BATTLE</text>
      <text x="100" y="234" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="3" fill="#ffe39a">5-CARD BOOSTER</text>
      <text x="100" y="256" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="rgba(255,255,255,0.5)" letterSpacing="2">SERIES 01 · SEQUIM, WA</text>
    </svg>
  );
}

function Confetti() {
  // 60 particles bursting from the center
  const particles = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    const distance = 200 + Math.random() * 200;
    const size = 6 + Math.random() * 8;
    const colors = ['#f4c95d', '#f0a8c8', '#7d5dd6', '#9bc290', '#ffe39a'];
    const color = colors[i % colors.length];
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 80,
      rot: Math.random() * 360,
      size,
      color,
      delay: Math.random() * 80,
    };
  });
  return (
    <div className="confetti" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            '--x': `${p.x}px`,
            '--y': `${p.y}px`,
            '--rot': `${p.rot}deg`,
            '--size': `${p.size}px`,
            '--color': p.color,
            '--delay': `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
