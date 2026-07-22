/**
 * Ripped-paper divider between two bands — the comic alternative to a straight cut.
 *
 * Render it inside the *lower* section with `position: absolute; top: 0` and pass the
 * colour of that section, so the tear reads as this band ripping over the one above.
 */
const TEAR =
  "M0,44 L0,20 L38,27 L79,11 L124,24 L167,7 L219,21 L268,9 L321,25 L376,13 L432,27 L489,11 L543,23 L598,9 L657,25 L712,13 L768,27 L823,11 L879,23 L934,7 L991,21 L1046,11 L1101,25 L1157,13 L1214,27 L1269,11 L1325,23 L1381,9 L1440,22 L1440,44 Z";

export default function TornEdge({
  className = "",
  fill,
  flip = false,
}: {
  className?: string;
  /** Hex of the section this edge belongs to. */
  fill: string;
  /** Mirror the tear so repeated dividers don't look identical. */
  flip?: boolean;
}) {
  return (
    <svg
      className={`pointer-events-none absolute left-0 w-full ${className}`}
      viewBox="0 0 1440 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ height: 44, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d={TEAR} fill={fill} />
    </svg>
  );
}
