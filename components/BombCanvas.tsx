"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BombStatic from "./BombStatic";

const Bomb3D = dynamic(() => import("./Bomb3D"), { ssr: false });

/**
 * The static SVG bomb renders instantly and always stays as the base layer.
 * three.js (~900KB) loads only on a wide screen with motion allowed, deferred
 * past first paint so it never competes with the hero. The live canvas then
 * fades in ON TOP once its first frame is painted — no empty gap, no pop.
 * The hero is above the fold, so no scroll/intersection gate is needed.
 */
export default function BombCanvas() {
  const [mount3D, setMount3D] = useState(false);
  const [ready3D, setReady3D] = useState(false);
  const idle = useRef<number | undefined>(undefined);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wideEnough || !wantsMotion) return;

    const start = () => setMount3D(true);
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      idle.current = ric(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(idle.current!);
    }
    idle.current = window.setTimeout(start, 600);
    return () => clearTimeout(idle.current);
  }, []);

  // Reveal the canvas once it reports ready (onCreated); a fallback timer guarantees
  // the crossfade still happens if that signal is delayed.
  useEffect(() => {
    if (!mount3D) return;
    const t = window.setTimeout(() => setReady3D(true), 900);
    return () => clearTimeout(t);
  }, [mount3D]);

  return (
    <div className="relative h-full w-full">
      {/* base layer — always present, so the hero is never blank */}
      <BombStatic className="h-full w-full" />

      {/* live scene fades in over the static bomb once it's actually painted */}
      {mount3D && (
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: ready3D ? 1 : 0 }}
        >
          <Bomb3D onReady={() => setReady3D(true)} />
        </div>
      )}
    </div>
  );
}
