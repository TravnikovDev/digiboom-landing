/**
 * The DigiBoom bomb as a standalone SVG string.
 *
 * Used by the generated share card and app icons, where JSX-rendered SVG isn't
 * reliable — these embed it as a data URI instead. The on-page mascots live in
 * components/BombStatic.tsx (2D) and components/Bomb3D.tsx (realtime).
 */
export function bombMarkSvg({ spark = true }: { spark?: boolean } = {}): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 400">
  <defs>
    <radialGradient id="body" cx="0.34" cy="0.28" r="0.9">
      <stop offset="0%" stop-color="#AEB5BF"/>
      <stop offset="30%" stop-color="#7B838E"/>
      <stop offset="62%" stop-color="#565E68"/>
      <stop offset="88%" stop-color="#31363E"/>
      <stop offset="100%" stop-color="#23272D"/>
    </radialGradient>
    <radialGradient id="gloss" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6A727D"/>
      <stop offset="55%" stop-color="#3B414A"/>
      <stop offset="100%" stop-color="#1F2329"/>
    </linearGradient>
    <clipPath id="clip"><circle cx="165" cy="245" r="125"/></clipPath>
  </defs>
  ${
    spark
      ? `<path d="M262 36 L272 58 L294 50 L282 70 L304 80 L280 86 L288 108 L266 94 L254 114 L252 88 L230 92 L246 72 L228 60 L252 58 Z" fill="#FFD9C2" stroke="#1B1712" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="261" cy="79" r="7" fill="#FFFFFF"/>
  <path d="M196 122 Q210 96 240 88 Q252 84 258 80" fill="none" stroke="#1B1712" stroke-width="9" stroke-linecap="round"/>`
      : `<path d="M196 122 Q212 92 246 86" fill="none" stroke="#1B1712" stroke-width="9" stroke-linecap="round"/>`
  }
  <g transform="rotate(22 190 132)">
    <rect x="164" y="108" width="52" height="30" rx="8" fill="url(#cap)" stroke="#1B1712" stroke-width="5"/>
    <rect x="172" y="100" width="36" height="14" rx="6" fill="#4E555F" stroke="#1B1712" stroke-width="4"/>
  </g>
  <circle cx="165" cy="245" r="125" fill="url(#body)" stroke="#1B1712" stroke-width="9"/>
  <g clip-path="url(#clip)">
    <ellipse cx="238" cy="322" rx="105" ry="85" fill="#1B1712" opacity="0.28"/>
    <ellipse cx="258" cy="310" rx="26" ry="62" fill="#EE5C0B" opacity="0.22" transform="rotate(-38 258 310)"/>
    <ellipse cx="112" cy="186" rx="46" ry="33" fill="url(#gloss)" transform="rotate(-28 112 186)"/>
    <ellipse cx="118" cy="182" rx="26" ry="16" fill="#FFFFFF" opacity="0.9" transform="rotate(-28 118 182)"/>
  </g>
  <ellipse cx="132" cy="252" rx="13" ry="17" fill="#1B1712"/>
  <ellipse cx="196" cy="252" rx="13" ry="17" fill="#1B1712"/>
  <ellipse cx="136" cy="246" rx="4.5" ry="6" fill="#fff"/>
  <ellipse cx="200" cy="246" rx="4.5" ry="6" fill="#fff"/>
  <path d="M126 226 q6 -7 14 -4" stroke="#1B1712" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M188 222 q8 -4 14 2" stroke="#1B1712" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M138 288 Q164 306 190 288" stroke="#1B1712" stroke-width="7" fill="none" stroke-linecap="round"/>
</svg>`;
}

export function bombMarkDataUri(options?: { spark?: boolean }): string {
  return `data:image/svg+xml;base64,${Buffer.from(bombMarkSvg(options)).toString("base64")}`;
}
