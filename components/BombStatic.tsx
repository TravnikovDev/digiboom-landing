/**
 * Shaded SVG bomb: renders instantly, works without WebGL or JS, and is what
 * stays on screen when the 3D scene is skipped (small screens, reduced motion).
 */
export default function BombStatic({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 340 420"
      role="img"
      aria-label="The DigiBoom bomb mascot with a lit fuse"
    >
      <defs>
        <radialGradient id="bs-sphere" cx="0.34" cy="0.28" r="0.9">
          <stop offset="0%" stopColor="#AEB5BF" />
          <stop offset="30%" stopColor="#7B838E" />
          <stop offset="62%" stopColor="#565E68" />
          <stop offset="88%" stopColor="#31363E" />
          <stop offset="100%" stopColor="#23272D" />
        </radialGradient>
        <radialGradient id="bs-gloss" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity=".3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bs-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A727D" />
          <stop offset="55%" stopColor="#3B414A" />
          <stop offset="100%" stopColor="#1F2329" />
        </linearGradient>
        <radialGradient id="bs-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".9" />
          <stop offset="45%" stopColor="#FFD9C2" stopOpacity=".5" />
          <stop offset="100%" stopColor="#FFD9C2" stopOpacity="0" />
        </radialGradient>
        <clipPath id="bs-clip">
          <circle cx="165" cy="245" r="125" />
        </clipPath>
      </defs>

      <ellipse cx="165" cy="400" rx="102" ry="15" fill="#1B1712" opacity=".3" />

      <circle cx="264" cy="76" r="52" fill="url(#bs-glow)" />
      <path
        d="M262 36 L272 58 L294 50 L282 70 L304 80 L280 86 L288 108 L266 94 L254 114 L252 88 L230 92 L246 72 L228 60 L252 58 Z"
        fill="#FFD9C2"
        stroke="#1B1712"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="261" cy="79" r="7" fill="#FFFFFF" />

      <path d="M196 122 Q210 96 240 88 Q252 84 258 80" fill="none" stroke="#1B1712" strokeWidth="9" strokeLinecap="round" />
      <path
        d="M195 119 Q209 94 238 86"
        fill="none"
        stroke="#9AA1AB"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />

      <g transform="rotate(22 190 132)">
        <rect x="164" y="108" width="52" height="30" rx="8" fill="url(#bs-cap)" stroke="#1B1712" strokeWidth="5" />
        <rect x="172" y="100" width="36" height="14" rx="6" fill="#4E555F" stroke="#1B1712" strokeWidth="4" />
      </g>

      <circle cx="165" cy="245" r="125" fill="url(#bs-sphere)" stroke="#1B1712" strokeWidth="9" />
      <g clipPath="url(#bs-clip)">
        <ellipse cx="238" cy="322" rx="105" ry="85" fill="#1B1712" opacity=".28" />
        <ellipse cx="258" cy="310" rx="26" ry="62" fill="#EE5C0B" opacity=".22" transform="rotate(-38 258 310)" />
        <ellipse cx="112" cy="186" rx="46" ry="33" fill="url(#bs-gloss)" transform="rotate(-28 112 186)" />
        <ellipse cx="118" cy="182" rx="26" ry="16" fill="#FFFFFF" opacity=".9" transform="rotate(-28 118 182)" />
      </g>

      <ellipse cx="132" cy="252" rx="13" ry="17" fill="#1B1712" />
      <ellipse cx="196" cy="252" rx="13" ry="17" fill="#1B1712" />
      <ellipse cx="136" cy="246" rx="4.5" ry="6" fill="#fff" />
      <ellipse cx="200" cy="246" rx="4.5" ry="6" fill="#fff" />
      <path d="M126 226 q6 -7 14 -4" stroke="#1B1712" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M188 222 q8 -4 14 2" stroke="#1B1712" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M138 288 Q164 306 190 288" stroke="#1B1712" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}
