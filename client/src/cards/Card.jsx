import { useEffect, useRef, useState } from 'react';
import { TYPES, RARITIES } from './data';
import CardArt from './CardArt';

const ENERGY_GLYPH = (type) => TYPES[type]?.glyph || '·';

export default function Card({ card, faceDown = false, interactive = true, onClick, gyro = false }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50 });

  const type = TYPES[card.type] || TYPES.wild;
  const rarity = RARITIES[card.rarity] || RARITIES.common;
  const isHolo = card.rarity === 'rare' || card.rarity === 'ultra' || card.rarity === 'legendary';
  const isLegendary = card.rarity === 'legendary';

  useEffect(() => {
    if (!gyro) return;
    let last = 0;
    function handler(e) {
      const now = Date.now();
      if (now - last < 32) return;
      last = now;
      const beta = Math.max(-30, Math.min(30, e.beta || 0));
      const gamma = Math.max(-30, Math.min(30, e.gamma || 0));
      setTilt({
        x: -(beta - 20) * 0.4,
        y: gamma * 0.5,
        mx: 50 + gamma * 1.6,
        my: 50 + (beta - 20) * 1.4,
      });
    }
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, [gyro]);

  function handleMove(event) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    const px = (point.clientX - rect.left) / rect.width;
    const py = (point.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -18,
      y: (px - 0.5) * 18,
      mx: px * 100,
      my: py * 100,
    });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0, mx: 50, my: 50 });
  }

  return (
    <div
      ref={ref}
      className={`tcg-card tcg-card--${card.type} tcg-card--${card.rarity} ${isHolo ? 'tcg-card--holo' : ''} ${faceDown ? 'tcg-card--down' : ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
      onClick={onClick}
      style={{
        '--rx': `${tilt.x}deg`,
        '--ry': `${tilt.y}deg`,
        '--mx': `${tilt.mx}%`,
        '--my': `${tilt.my}%`,
      }}
    >
      <div className="tcg-card__inner">
        <div className="tcg-card__face">
          <header className="tcg-card__head">
            <div className="tcg-card__name-wrap">
              {isLegendary && <span className="tcg-card__legend-mark">☀</span>}
              <span className="tcg-card__name">{card.name}</span>
            </div>
            <span className="tcg-card__hp">
              <span className="tcg-card__hp-label">HP</span> {card.hp}
              <span className="tcg-card__type" style={{ background: type.color, color: type.deep }}>{type.glyph}</span>
            </span>
          </header>

          <div className="tcg-card__art-frame" style={{ '--type-color': type.color, '--type-deep': type.deep }}>
            <div className="tcg-card__art">
              <CardArt id={card.id} />
            </div>
            {isHolo && (
              <>
                <div className="tcg-card__shimmer" aria-hidden="true" />
                <div className="tcg-card__chromatic" aria-hidden="true" />
                <div className="tcg-card__sheen" aria-hidden="true" />
              </>
            )}
            <div className="tcg-card__art-stripe">
              <span>BerryDex No. {card.id.slice(0, 3).toUpperCase()}</span>
              <span>{type.label}</span>
            </div>
          </div>

          <div className="tcg-card__attacks">
            {card.attacks.map((attack) => (
              <div key={attack.name} className="tcg-card__attack">
                <span className="tcg-card__attack-cost">
                  {attack.cost.map((c, i) => (
                    <span key={i} className="energy" style={{ background: TYPES[c]?.color, color: TYPES[c]?.deep }}>
                      {ENERGY_GLYPH(c)}
                    </span>
                  ))}
                </span>
                <span className="tcg-card__attack-name">{attack.name}</span>
                <span className="tcg-card__attack-dmg">{attack.damage > 0 ? attack.damage : '—'}</span>
                {attack.text && <p className="tcg-card__attack-text">{attack.text}</p>}
              </div>
            ))}
          </div>

          <footer className="tcg-card__foot">
            <div className="tcg-card__stats">
              {card.weakness && (
                <span>
                  Weak <span className="energy" style={{ background: TYPES[card.weakness]?.color, color: TYPES[card.weakness]?.deep }}>{TYPES[card.weakness]?.glyph}</span> ×2
                </span>
              )}
              <span>
                Retreat {card.retreat > 0
                  ? Array.from({ length: card.retreat }).map((_, i) => <span key={i} className="energy energy--blank">·</span>)
                  : <span style={{ opacity: 0.5 }}>Free</span>}
              </span>
            </div>
            <p className="tcg-card__flavor">{card.flavor}</p>
            <div className="tcg-card__rarity">
              {Array.from({ length: rarity.stars }).map((_, i) => (
                <span key={i} className={`star star--${card.rarity}`}>★</span>
              ))}
              <span className="tcg-card__set">SBF · 01</span>
            </div>
          </footer>

          {isHolo && <div className="tcg-card__edge" aria-hidden="true" />}
        </div>

        <div className="tcg-card__back" aria-hidden="true">
          <CardBack />
        </div>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <svg viewBox="0 0 100 140" width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="backBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1d4f" />
          <stop offset="100%" stopColor="#1a0f33" />
        </linearGradient>
        <radialGradient id="backVignette" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="rgba(244, 201, 93, 0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </radialGradient>
      </defs>
      <rect width="100" height="140" fill="url(#backBg)" />
      <rect width="100" height="140" fill="url(#backVignette)" />
      <g opacity="0.8">
        <circle cx="50" cy="60" r="18" fill="#7d5dd6" />
        <circle cx="38" cy="56" r="13" fill="#5a3fa0" />
        <circle cx="58" cy="50" r="11" fill="#9678e0" />
        <circle cx="50" cy="70" r="10" fill="#3a2a6a" />
        <circle cx="34" cy="50" r="3" fill="rgba(255,255,255,0.7)" />
        <circle cx="55" cy="46" r="2.5" fill="rgba(255,255,255,0.7)" />
        <path d="M50 38 Q54 28 64 26 Q56 32 52 40" fill="#4d8044" />
      </g>
      <rect x="6" y="6" width="88" height="128" rx="8" fill="none" stroke="rgba(244, 201, 93, 0.4)" strokeWidth="0.5" />
      <text x="50" y="108" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="9" fill="#f4c95d" textAnchor="middle" letterSpacing="2">SUN BLOSSOM</text>
      <text x="50" y="120" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="500" fontSize="8" fill="#ffe39a" textAnchor="middle">Berry Battle</text>
      <text x="50" y="130" fontFamily="Inter, sans-serif" fontSize="4" fill="rgba(255,255,255,0.4)" textAnchor="middle" letterSpacing="2">SERIES 01</text>
    </svg>
  );
}
