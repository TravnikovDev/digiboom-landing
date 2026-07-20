"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Outlines } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const INK = "#1B1712";
const OUTLINE = 0.05;

function Bomb() {
  const group = useRef<THREE.Group>(null);
  const spark = useRef<THREE.Group>(null);
  const sparkLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.4) * 0.16;
      group.current.rotation.z = Math.sin(t * 0.7) * 0.05;
      group.current.rotation.y = Math.sin(t * 0.45) * 0.14;
    }
    const flicker = 0.8 + Math.random() * 0.5;
    if (spark.current) {
      spark.current.scale.setScalar(flicker);
      spark.current.rotation.z += 0.15;
    }
    if (sparkLight.current) sparkLight.current.intensity = 14 * flicker;
  });

  const fuseCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.24, 1.4, 0),
        new THREE.Vector3(0.52, 1.72, 0.06),
        new THREE.Vector3(0.88, 1.78, 0),
      ]),
    []
  );

  return (
    <group ref={group}>
      {/* body */}
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshToonMaterial color="#575F69" />
        <Outlines thickness={OUTLINE} color={INK} />
      </mesh>

      {/* cap */}
      <group position={[0.1, 0.98, 0]} rotation={[0, 0, -0.28]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.36, 0.46, 0.3, 32]} />
          <meshToonMaterial color="#343A42" />
          <Outlines thickness={OUTLINE} color={INK} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.24, 0.3, 0.2, 32]} />
          <meshToonMaterial color="#4E555F" />
          <Outlines thickness={OUTLINE} color={INK} />
        </mesh>
      </group>

      {/* fuse */}
      <mesh>
        <tubeGeometry args={[fuseCurve, 24, 0.055, 10, false]} />
        <meshToonMaterial color={INK} />
      </mesh>

      {/* spark (white-hot, no yellow) */}
      <group position={[0.88, 1.78, 0]}>
        <group ref={spark}>
          <mesh>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.26, 0]} />
            <meshBasicMaterial color="#FFD9C2" transparent opacity={0.55} />
          </mesh>
        </group>
        <pointLight ref={sparkLight} color="#FFD9C2" distance={5} intensity={14} />
      </group>

      {/* face */}
      <group position={[0, 0, 0]}>
        {/* eyes */}
        {[-0.36, 0.36].map((x) => (
          <group key={x} position={[x, 0.1, 1.06]}>
            <mesh scale={[1, 1.45, 0.45]}>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshBasicMaterial color={INK} />
            </mesh>
            <mesh position={[0.035, 0.07, 0.07]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        ))}
        {/* brows — outer ends up: confident, not worried */}
        <mesh position={[-0.38, 0.44, 1.0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.24, 0.05, 0.05]} />
          <meshBasicMaterial color={INK} />
        </mesh>
        <mesh position={[0.38, 0.44, 1.0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.24, 0.05, 0.05]} />
          <meshBasicMaterial color={INK} />
        </mesh>
        {/* smile */}
        <mesh position={[0, -0.2, 1.07]} rotation={[0.25, 0, Math.PI * 1.08]}>
          <torusGeometry args={[0.34, 0.05, 12, 40, Math.PI * 0.84]} />
          <meshBasicMaterial color={INK} />
        </mesh>
      </group>
    </group>
  );
}

export default function Bomb3D() {
  return (
    <Canvas camera={{ position: [0, 0.35, 4.8], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 4, 3]} intensity={1.25} />
      {/* orange bounce light from the scene */}
      <pointLight position={[2.6, -1.6, 2]} color="#FF6B1A" intensity={18} />
      <Bomb />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={6.5} blur={2.6} color={INK} />
    </Canvas>
  );
}
