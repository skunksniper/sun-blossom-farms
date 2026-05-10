import { useRef, useState } from 'react';
import { TYPES, RARITIES } from './data';
import CardArt from './CardArt';

const ENERGY_GLYPH = (type) => TYPES[type]?.glyph || '·';

export default function Card({ card, faceDown = false, interactive = true, onClick, size = 'normal' }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50 });

  const type = TYPES[card.type] || TYPES.wild;
  const rarity = RARITIES[card.rarity] || RARITIES.common;
  const isHolo = card.rarity === 'rare' || card.rarity === 'ultra' || card.rarity === 'legendary';
  const isLegendary = card.rarity === 'legendary';

  function handleMove(event) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -16,
      y: (px - 0.5) * 16,
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
      className={`tcg-card tcg-card--${card.type} tcg-card--${card.rarity} ${isHolo ? 'tcg-card--holo' : ''} ${faceDown ? 'tcg-card--down' : ''} ${size === 'small' ? 'tcg-card--small' : ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        '--rx': `${tilt.x}deg`,
        '--ry': `${tilt.y}deg`,
        '--mx': `${tilt.mx}%`,
        '--my': `${tilt.my}%`,
      }}
    >
      <div className="tcg-card__inner">
        {/* Face */}
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
            {isHolo && <div className="tcg-card__shimmer" aria-hidden="true" />}
            <div className="tcg-card__art-stripe">
              <span>BerryDex No. {String(card.id.length).padStart(0, '0')}{card.id.slice(0, 3).toUpperCase()}</span>
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
                Retreat {Array.from({ length: card.retreat || 0 }).map((_, i) => <span key={i} className="energy energy--blank">·</span>)}
                {(!card.retreat || card.retreat === 0) && <span style={{ opacity: 0.5 }}>Free</span>}
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
        </div>

        {/* Back */}
        <div className="tcg-card__back" aria-hidden="true">
          <svg viewBox="0 0 100 140" width="100%" height="100%" preserveAspectRatio="none">
            <rect width="100" height="140" fill="#1a0f33" />
            <g opacity="0.5">
              {[20, 50, 80].map((cy) => (
                [20, 50, 80].map((cx) => (
                  <g key={`${cx}-${cy}`}>
                    <circle cx={cx} cy={cy} r="6" fill="#5a3fa0" />
                    <circle cx={cx + 10} cy={cy + 5} r="5" fill="#3a2a6a" />
                    <circle cx={cx + 5} cy={cy - 4} r="4" fill="#7d5dd6" />
                  </g>
                ))
              ))}
            </g>
            <text x="50" y="120" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="12" fill="#f4c95d" textAnchor="middle">Sun Blossom</text>
            <text x="50" y="132" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="9" fill="#ffe39a" textAnchor="middle">Berry Battle</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
