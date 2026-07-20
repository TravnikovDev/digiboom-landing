"use client";

import dynamic from "next/dynamic";

const Bomb3D = dynamic(() => import("./Bomb3D"), { ssr: false });

export default function BombCanvas() {
  return <Bomb3D />;
}
