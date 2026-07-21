"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BombStatic from "./BombStatic";

const Bomb3D = dynamic(() => import("./Bomb3D"), { ssr: false });

/** three.js is ~900KB — only worth loading on a screen big enough to see it,
 *  when the hero is actually in view, and when motion is welcome. */
export default function BombCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wideEnough || !wantsMotion) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow3D(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {show3D ? <Bomb3D /> : <BombStatic className="h-full w-full" />}
    </div>
  );
}
