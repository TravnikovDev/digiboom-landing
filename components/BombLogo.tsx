export default function BombLogo({ size = 34, muted = false }: { size?: number; muted?: boolean }) {
  const outline = muted ? "#9AA1AB" : "#1B1712";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="14" r="8" fill="#4E555F" stroke={outline} strokeWidth="1.6" />
      <circle cx="8.5" cy="11.5" r="2.6" fill="#E8EAED" />
      <rect x="9.5" y="3.8" width="4" height="3" rx="1" fill={outline} transform="rotate(18 11.5 5.3)" />
      <path d="M14 4.5 Q16.5 3 18 4.8" stroke={outline} strokeWidth="1.4" fill="none" />
      {!muted && <circle cx="18.6" cy="4.6" r="1.7" fill="#fff" />}
    </svg>
  );
}
