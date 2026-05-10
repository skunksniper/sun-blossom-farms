// Stylized SVG portraits for every BerryDex card.
// All art uses a 100x100 viewBox so the card frame can crop them consistently.

const Berry = ({ cx, cy, r, fill = '#3a2a6a' }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={fill} />
    <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.25} fill="rgba(255,255,255,0.35)" />
  </g>
);

const Eyes = ({ cx, cy, gap = 8, r = 2.5, glow }) => (
  <g>
    <circle cx={cx - gap} cy={cy} r={r} fill="#fff" />
    <circle cx={cx + gap} cy={cy} r={r} fill="#fff" />
    <circle cx={cx - gap} cy={cy + 0.5} r={r * 0.55} fill={glow || '#14101e'} />
    <circle cx={cx + gap} cy={cy + 0.5} r={r * 0.55} fill={glow || '#14101e'} />
    <circle cx={cx - gap - 0.6} cy={cy - 0.6} r={0.6} fill="#fff" />
    <circle cx={cx + gap - 0.6} cy={cy - 0.6} r={0.6} fill="#fff" />
  </g>
);

const Smile = ({ cx, cy, w = 8, color = '#14101e' }) => (
  <path d={`M ${cx - w/2} ${cy} Q ${cx} ${cy + w/3} ${cx + w/2} ${cy}`} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
);

const ART = {
  bluechu: () => (
    <g>
      <ellipse cx="50" cy="60" rx="22" ry="20" fill="#5a3fa0" />
      <path d="M34 42 L30 22 L40 38 Z" fill="#5a3fa0" />
      <path d="M66 42 L70 22 L60 38 Z" fill="#5a3fa0" />
      <path d="M34 25 L30 22 L37 32 Z" fill="#3a2a6a" />
      <path d="M66 25 L70 22 L63 32 Z" fill="#3a2a6a" />
      <circle cx="38" cy="62" r="4" fill="#f4c95d" />
      <circle cx="62" cy="62" r="4" fill="#f4c95d" />
      <Eyes cx={50} cy={56} gap={8} r={3} />
      <Smile cx={50} cy={66} w={8} />
      <path d="M70 70 L82 78 L78 82 L70 76 Z" fill="#5a3fa0" />
    </g>
  ),
  mistling: () => (
    <g>
      <path d="M50 18 Q66 50 50 80 Q34 50 50 18 Z" fill="#7eb8e0" />
      <path d="M50 24 Q60 50 50 72 Q40 50 50 24 Z" fill="#a8d0eb" />
      <Eyes cx={50} cy={50} gap={6} r={2.5} />
      <Smile cx={50} cy={58} w={6} />
    </g>
  ),
  sproutling: () => (
    <g>
      <ellipse cx="50" cy="72" rx="22" ry="6" fill="rgba(0,0,0,0.18)" />
      <ellipse cx="50" cy="65" rx="18" ry="14" fill="#9bc290" />
      <path d="M50 50 Q42 32 36 36 Q40 46 50 50 Z" fill="#4d8044" />
      <path d="M50 50 Q58 30 64 36 Q60 46 50 50 Z" fill="#4d8044" />
      <Berry cx={50} cy={50} r={6} fill="#3a2a6a" />
      <Eyes cx={50} cy={64} gap={6} r={2.5} />
      <Smile cx={50} cy={70} w={6} />
    </g>
  ),
  frostpint: () => (
    <g>
      <rect x="32" y="38" width="36" height="36" rx="3" fill="#cfe7f0" stroke="#3a7d8e" strokeWidth="1.5" />
      <rect x="30" y="34" width="40" height="6" fill="#a8d0eb" />
      <path d="M34 38 L36 30 L40 38 M48 38 L50 28 L52 38 M60 38 L64 30 L66 38" stroke="#a8d0eb" strokeWidth="1.5" fill="none" />
      <Berry cx={42} cy={56} r={4} />
      <Berry cx={56} cy={62} r={4} fill="#5a3fa0" />
      <Eyes cx={50} cy={50} gap={7} r={2.5} />
      <Smile cx={50} cy={64} w={6} />
    </g>
  ),
  pintling: () => (
    <g>
      <path d="M34 40 L66 40 L62 78 L38 78 Z" fill="#d8c8a8" />
      <path d="M34 40 L66 40 L66 44 L34 44 Z" fill="#b9a382" />
      <Berry cx={50} cy={56} r={6} />
      <Eyes cx={50} cy={54} gap={6} r={2.5} />
      <Smile cx={50} cy={62} w={6} />
      <line x1="42" y1="78" x2="42" y2="86" stroke="#14101e" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="78" x2="58" y2="86" stroke="#14101e" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  honeybeest: () => (
    <g>
      <ellipse cx="50" cy="56" rx="20" ry="14" fill="#f4c95d" />
      <rect x="38" y="44" width="6" height="24" fill="#3a2a6a" />
      <rect x="56" y="44" width="6" height="24" fill="#3a2a6a" />
      <ellipse cx="36" cy="44" rx="10" ry="6" fill="rgba(255,255,255,0.6)" />
      <ellipse cx="64" cy="44" rx="10" ry="6" fill="rgba(255,255,255,0.6)" />
      <Eyes cx={50} cy={54} gap={6} r={2.8} />
      <Smile cx={50} cy={62} w={6} />
      <path d="M48 70 L50 76 L52 70 Z" fill="#3a2a6a" />
    </g>
  ),
  biscuit: () => (
    <g>
      <ellipse cx="50" cy="62" rx="22" ry="18" fill="#caa57a" />
      <ellipse cx="34" cy="48" rx="10" ry="14" fill="#a07c50" />
      <ellipse cx="66" cy="48" rx="10" ry="14" fill="#a07c50" />
      <ellipse cx="50" cy="58" rx="14" ry="11" fill="#dcbf99" />
      <Eyes cx={50} cy={56} gap={7} r={2.6} />
      <ellipse cx="50" cy="64" rx="3" ry="2" fill="#14101e" />
      <Smile cx={50} cy={70} w={8} />
      <path d="M70 60 Q80 64 76 76" stroke="#a07c50" strokeWidth="6" strokeLinecap="round" fill="none" />
    </g>
  ),
  rakespirit: () => (
    <g>
      <path d="M50 30 L50 60" stroke="#7a6750" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 28 L70 28 L70 34 L30 34 Z" fill="#9678e0" />
      <path d="M34 34 L34 42 M42 34 L42 42 M50 34 L50 42 M58 34 L58 42 M66 34 L66 42" stroke="#9678e0" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="68" rx="14" ry="10" fill="rgba(150,120,224,0.5)" />
      <Eyes cx={50} cy={66} gap={6} r={2.4} glow="#fff" />
    </g>
  ),
  berrysaur: () => (
    <g>
      <ellipse cx="50" cy="68" rx="28" ry="12" fill="#4d8044" />
      <path d="M22 64 Q30 40 50 40 Q70 40 78 64 Z" fill="#5a9650" />
      <Berry cx={36} cy={48} r={6} />
      <Berry cx={50} cy={42} r={7} fill="#5a3fa0" />
      <Berry cx={64} cy={48} r={6} fill="#3a2a6a" />
      <Berry cx={42} cy={56} r={5} fill="#7d5dd6" />
      <Berry cx={58} cy={56} r={5} />
      <ellipse cx="78" cy="68" rx="6" ry="4" fill="#5a9650" />
      <Eyes cx={78} cy={66} gap={3} r={1.6} />
      <line x1="38" y1="72" x2="38" y2="80" stroke="#2f5a2a" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="72" x2="62" y2="80" stroke="#2f5a2a" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  jamspike: () => (
    <g>
      <ellipse cx="50" cy="62" rx="24" ry="16" fill="#5a3fa0" />
      {[24, 30, 36, 42, 50, 58, 64, 70, 76].map((x, i) => (
        <line key={i} x1={x} y1={50 - Math.sin(x/10) * 4} x2={x} y2={32 - Math.sin(x/10) * 4} stroke="#3a2a6a" strokeWidth="2" strokeLinecap="round" />
      ))}
      <ellipse cx="74" cy="60" rx="6" ry="5" fill="#7d5dd6" />
      <Eyes cx={74} cy={59} gap={3} r={1.4} />
      <path d="M50 70 Q56 76 60 70" stroke="#f0a8c8" strokeWidth="1.5" fill="none" />
    </g>
  ),
  frostflake: () => (
    <g>
      <g stroke="#cfe7f0" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="22" y1="50" x2="78" y2="50" />
        <line x1="30" y1="30" x2="70" y2="70" />
        <line x1="70" y1="30" x2="30" y2="70" />
      </g>
      <g stroke="#a8d0eb" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M50 28 L46 32 M50 28 L54 32 M50 72 L46 68 M50 72 L54 68" />
        <path d="M28 50 L32 46 M28 50 L32 54 M72 50 L68 46 M72 50 L68 54" />
      </g>
      <circle cx="50" cy="50" r="9" fill="#fff" />
      <Eyes cx={50} cy={48} gap={3.5} r={1.8} />
      <Smile cx={50} cy={54} w={5} />
    </g>
  ),
  compostix: () => (
    <g>
      <path d="M22 70 Q30 56 38 70 Q46 84 54 70 Q62 56 70 70 Q78 84 82 76" stroke="#7a5230" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M22 70 Q30 56 38 70 Q46 84 54 70 Q62 56 70 70 Q78 84 82 76" stroke="#a07c50" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="70" r="5" fill="#7a5230" />
      <Eyes cx={22} cy={69} gap={2.4} r={1.2} />
    </g>
  ),
  sunbear: () => (
    <g>
      <ellipse cx="50" cy="62" rx="24" ry="20" fill="#7a5230" />
      <circle cx="32" cy="42" r="9" fill="#7a5230" />
      <circle cx="68" cy="42" r="9" fill="#7a5230" />
      <circle cx="32" cy="42" r="4" fill="#a07c50" />
      <circle cx="68" cy="42" r="4" fill="#a07c50" />
      <ellipse cx="50" cy="58" rx="16" ry="14" fill="#caa57a" />
      <Berry cx={50} cy={50} r={5} fill="#3a2a6a" />
      <Eyes cx={50} cy={62} gap={7} r={2.6} />
      <ellipse cx="50" cy="68" rx="3" ry="2" fill="#14101e" />
      <Smile cx={50} cy={72} w={7} />
    </g>
  ),
  puddleduck: () => (
    <g>
      <ellipse cx="50" cy="68" rx="22" ry="10" fill="#7eb8e0" />
      <ellipse cx="44" cy="50" rx="14" ry="13" fill="#a8d0eb" />
      <path d="M56 50 L70 48 L70 54 L56 54 Z" fill="#f4c95d" />
      <Eyes cx={42} cy={48} gap={5} r={2.4} />
      <ellipse cx="38" cy="76" rx="6" ry="2" fill="#f4c95d" />
      <ellipse cx="56" cy="76" rx="6" ry="2" fill="#f4c95d" />
    </g>
  ),
  chandling: () => (
    <g>
      <Berry cx={50} cy={56} r={22} fill="#5a3fa0" />
      <circle cx="50" cy="56" r="22" fill="url(#chandLight)" opacity="0.7" />
      <defs>
        <radialGradient id="chandLight" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#f0a8c8" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <path d="M40 36 L50 24 L60 36 Z" fill="#f0a8c8" />
      <path d="M44 34 L50 28 L56 34 Z" fill="#fff" />
      <Eyes cx={50} cy={54} gap={7} r={2.8} glow="#fff" />
      <Smile cx={50} cy={62} w={7} color="#fff" />
      <Berry cx={28} cy={70} r={4} fill="#7d5dd6" />
      <Berry cx={72} cy={70} r={4} fill="#7d5dd6" />
    </g>
  ),
  rekadrake: () => (
    <g>
      <path d="M20 70 Q30 40 50 38 Q70 36 78 60 Q82 78 70 80 Q40 82 20 70 Z" fill="#5a3fa0" />
      <path d="M50 38 L46 22 L52 30 L58 18 L60 36 Z" fill="#3a2a6a" />
      <ellipse cx="22" cy="74" rx="10" ry="4" fill="#3a2a6a" />
      <Berry cx={50} cy={56} r={4} />
      <Berry cx={62} cy={62} r={4} fill="#7d5dd6" />
      <Eyes cx={32} cy={56} gap={5} r={2.4} glow="#f4c95d" />
      <path d="M22 64 L18 66 L22 68" stroke="#3a2a6a" strokeWidth="1.5" fill="none" />
      <path d="M28 60 Q30 64 28 66" stroke="#fff" strokeWidth="1.5" fill="none" />
    </g>
  ),
  sequimite: () => (
    <g>
      <path d="M22 78 L30 50 L42 38 L60 38 L74 52 L78 78 Z" fill="#7a7384" />
      <path d="M30 50 L42 38 L42 56 L30 56 Z" fill="#9da0a8" />
      <path d="M42 38 L60 38 L60 56 L42 56 Z" fill="#8a8d96" />
      <path d="M60 38 L74 52 L74 56 L60 56 Z" fill="#9da0a8" />
      <Berry cx={36} cy={70} r={5} />
      <Berry cx={64} cy={68} r={5} fill="#7d5dd6" />
      <Eyes cx={50} cy={50} gap={7} r={2.5} glow="#f4c95d" />
      <path d="M44 60 L46 64 L54 64 L56 60" stroke="#14101e" strokeWidth="1.5" fill="none" />
    </g>
  ),
  pinkasaur: () => (
    <g>
      <path d="M22 70 Q26 48 46 44 L60 32 L58 44 Q70 46 76 60 L82 78 L20 78 Z" fill="#f0a8c8" />
      <path d="M58 44 L52 38 L60 36 L62 32 Z" fill="#a04068" />
      <path d="M50 70 L46 78 L52 78 L54 70" fill="#a04068" />
      <path d="M64 70 L60 78 L66 78 L68 70" fill="#a04068" />
      <Berry cx={36} cy={56} r={4} fill="#7d5dd6" />
      <Berry cx={66} cy={58} r={4} />
      <Eyes cx={68} cy={50} gap={3} r={1.8} />
      <Smile cx={70} cy={56} w={5} />
    </g>
  ),
  liberty: () => (
    <g>
      <path d="M50 18 Q70 22 78 38 Q82 56 70 70 Q60 80 50 80 Q40 80 30 70 Q18 56 22 38 Q30 22 50 18 Z" fill="#f4c95d" />
      <path d="M50 24 Q66 28 72 42 Q76 56 66 66 Q58 74 50 74 Q42 74 34 66 Q24 56 28 42 Q34 28 50 24 Z" fill="#ffe39a" />
      <path d="M30 30 Q24 18 18 14 Q26 22 30 30 Z" fill="#f4c95d" />
      <path d="M70 30 Q76 18 82 14 Q74 22 70 30 Z" fill="#f4c95d" />
      <Berry cx={50} cy={48} r={9} fill="#3a2a6a" />
      <circle cx="46" cy="44" r="3" fill="rgba(255,255,255,0.7)" />
      <path d="M30 70 Q40 80 50 78 Q60 80 70 70 Q60 88 50 86 Q40 88 30 70 Z" fill="#f4c95d" />
      <Eyes cx={50} cy={64} gap={5} r={2} glow="#fff" />
    </g>
  ),
  dukerodactyl: () => (
    <g>
      <path d="M14 50 Q30 28 50 36 Q70 28 86 50 Q70 56 50 50 Q30 56 14 50 Z" fill="#3a2a6a" />
      <path d="M44 36 L50 22 L56 36 Z" fill="#5a3fa0" />
      <ellipse cx="50" cy="58" rx="14" ry="12" fill="#5a3fa0" />
      <path d="M40 60 L34 70 M50 70 L50 80 M60 60 L66 70" stroke="#3a2a6a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 50 L72 48 L62 56 Z" fill="#3a2a6a" />
      <Eyes cx={50} cy={56} gap={5} r={2.2} glow="#f4c95d" />
      <Berry cx={50} cy={64} r={3} fill="#7d5dd6" />
    </g>
  ),
  sunblossom: () => (
    <g>
      <g>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="30"
            rx="9"
            ry="16"
            fill="#f0a8c8"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
      <g>
        {[30, 90, 150, 210, 270, 330].map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="32"
            rx="6"
            ry="14"
            fill="#ffe39a"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="14" fill="#f4c95d" />
      <Berry cx={50} cy={50} r={9} fill="#3a2a6a" />
      <circle cx="46" cy="46" r="3" fill="rgba(255,255,255,0.85)" />
      <Eyes cx={50} cy={50} gap={3.5} r={1.4} glow="#fff" />
    </g>
  ),
};

export default function CardArt({ id }) {
  const Render = ART[id];
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {Render ? <Render /> : <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#3a2a6a">?</text>}
    </svg>
  );
}
