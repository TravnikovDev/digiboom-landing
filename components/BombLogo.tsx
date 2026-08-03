/**
 * The DigiBoom mark, used in the nav, the blog nav and the footer.
 *
 * It has to survive two very different sizes: 22px muted in the footer, and blown up on a
 * share card where every flat fill shows. The previous version was five flat primitives.
 * That reads fine at 22px and looks like clip art at any size above it.
 *
 * What carries the weight now is the sphere: a radial gradient offset up and left, a soft
 * gloss with a hard specular inside it, and a dark crescent bottom-right, so the body reads
 * as a ball rather than a disc. Everything else stays blunt on purpose, because detail below
 * roughly 1px of stroke turns to mud at footer size.
 *
 * The spark is warm white (#FFD9C2), never yellow. That is a brand rule, and it also makes
 * the burst read as heat rather than as a cartoon star.
 *
 * Gradient ids are derived from the variant rather than randomised, so the two marks on a
 * page cannot collide in a way that matters: same variant means an identical definition, and
 * `muted` flattens to solid greys with no gradients at all.
 */
export default function BombLogo({ size = 34, muted = false }: { size?: number; muted?: boolean }) {
  const outline = muted ? "#9AA1AB" : "#1B1712";
  const uid = muted ? "m" : "c";

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {!muted && (
        <defs>
          <radialGradient id={`bl-body-${uid}`} cx="0.34" cy="0.27" r="0.86">
            <stop offset="0%" stopColor="#9AA1AB" />
            <stop offset="38%" stopColor="#697079" />
            <stop offset="72%" stopColor="#4E555F" />
            <stop offset="100%" stopColor="#2B3037" />
          </radialGradient>
          <radialGradient id={`bl-gloss-${uid}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          {/*
            Shading has to be a gradient, not a shape. A flat ellipse clipped to the body
            reads as a blob with a visible edge once the mark is bigger than a favicon,
            which is exactly the clip-art look this rewrite is trying to leave behind.
            The faint warm stop is the orange background bouncing off the underside.
          */}
          <radialGradient id={`bl-shade-${uid}`} cx="0.70" cy="0.76" r="0.78">
            <stop offset="0%" stopColor="#14110E" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#1B1712" stopOpacity="0.22" />
            <stop offset="78%" stopColor="#7A3A12" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1B1712" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`bl-cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6A727D" />
            <stop offset="100%" stopColor="#2B3037" />
          </linearGradient>
          <clipPath id={`bl-clip-${uid}`}>
            <circle cx="11" cy="14" r="8" />
          </clipPath>
        </defs>
      )}

      {/* Fuse, drawn before the cap so the cap covers where it seats. */}
      <path
        d="M13.2 4.7 Q16.0 3.1 17.9 4.4"
        stroke={outline}
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />

      {/*
        Cap: one stroked shape, not two. The earlier version stacked a stroked band on a
        stroked plug, and at any size above the favicon their outlines collided into a lump
        with a notch in it. The band is now a fill inside the same silhouette, so there is
        only ever one outline to read.
      */}
      {/* Seated 0.4 deeper than it looks like it needs, so the rotated lower corners stay
          under the body stroke instead of leaving a wedge of background at the join. */}
      <g transform="rotate(16 11.5 6.1)">
        <rect
          x="9.35"
          y="4.3"
          width="4.35"
          height="3.6"
          rx="1.1"
          fill={muted ? "#9AA1AB" : `url(#bl-cap-${uid})`}
          stroke={outline}
          strokeWidth="1"
        />
        {!muted && <rect x="10" y="5.2" width="3.05" height="0.7" rx="0.35" fill="#8A929C" opacity="0.7" />}
      </g>

      <circle
        cx="11"
        cy="14"
        r="8"
        fill={muted ? "#C6CAD0" : `url(#bl-body-${uid})`}
        stroke={outline}
        strokeWidth="1.6"
      />

      {!muted && (
        <g clipPath={`url(#bl-clip-${uid})`}>
          {/* Shading, then gloss, then the hard specular inside the gloss. */}
          <circle cx="11" cy="14" r="8" fill={`url(#bl-shade-${uid})`} />
          <ellipse cx="7.9" cy="10.6" rx="3.4" ry="2.5" fill={`url(#bl-gloss-${uid})`} transform="rotate(-28 7.9 10.6)" />
          <ellipse cx="8.2" cy="10.3" rx="1.6" ry="1" fill="#FFFFFF" opacity="0.92" transform="rotate(-28 8.2 10.3)" />
        </g>
      )}

      {/* Spark: a burst rather than a dot. Warm white, never yellow. */}
      {!muted && (
        <>
          {/*
            Stroke stays thin. At 0.8 the outline was thicker than the star's own points, so
            the burst read as a black blob with a pale middle once scaled up.
          */}
          <path
            d="M18.6 1.9 L19.6 3.9 L21.8 4.2 L20.2 5.8 L20.6 7.9 L18.6 6.9 L16.7 7.9 L17.1 5.8 L15.5 4.2 L17.7 3.9 Z"
            fill="#FFD9C2"
            stroke={outline}
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="18.65" cy="4.95" r="1.05" fill="#FFFFFF" />
        </>
      )}
    </svg>
  );
}
