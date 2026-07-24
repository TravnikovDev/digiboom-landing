"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Outlines } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const INK = "#1B1712";
const OUTLINE = 0.05;

function Bomb() {
  const group = useRef<THREE.Group>(null);
  const face = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const spark = useRef<THREE.Group>(null);
  const sparkLight = useRef<THREE.PointLight>(null);
  /** seconds until the next blink, and how far through the current one we are */
  const blink = useRef({ next: 2.5, closing: -1 });
  /** elapsed time of the signup celebration, or -1 when idle */
  const cheer = useRef(-1);

  useEffect(() => {
    const onSignup = () => {
      cheer.current = 0;
    };
    window.addEventListener("digiboom:signup", onSignup);
    return () => window.removeEventListener("digiboom:signup", onSignup);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // celebration: two quick hops with a squash, then back to idle
    let hop = 0;
    let squash = 0;
    if (cheer.current >= 0) {
      cheer.current += delta;
      const c = cheer.current;
      if (c > 1.5) {
        cheer.current = -1;
      } else {
        const decay = 1 - c / 1.5;
        hop = Math.abs(Math.sin(c * Math.PI * 2.4)) * 0.75 * decay;
        squash = Math.sin(c * Math.PI * 4.8) * 0.1 * decay;
      }
    }

    if (group.current) {
      group.current.position.y = Math.sin(t * 1.4) * 0.16 + hop;
      group.current.rotation.z = Math.sin(t * 0.7) * 0.05;
      // idle sway, plus a gentle lean toward the pointer (kept subtle so the flat
      // face doesn't foreshorten into a glitch)
      group.current.rotation.y = Math.sin(t * 0.45) * 0.1 + state.pointer.x * 0.1;
      group.current.rotation.x = -state.pointer.y * 0.05;
      group.current.scale.set(1 + squash, 1 - squash, 1 + squash);
    }

    // the face slides toward the pointer to "look" — the interaction we keep
    if (face.current) {
      face.current.position.x = THREE.MathUtils.lerp(face.current.position.x, state.pointer.x * 0.08, 0.08);
      face.current.position.y = THREE.MathUtils.lerp(face.current.position.y, state.pointer.y * 0.05, 0.08);
    }

    // blink: squash the eye group flat for a beat, at irregular intervals
    if (eyes.current) {
      const b = blink.current;
      if (b.closing < 0) {
        b.next -= delta;
        if (b.next <= 0) {
          b.closing = 0;
          b.next = 2.4 + Math.random() * 4;
        }
      } else {
        b.closing += delta * 9;
        if (b.closing >= Math.PI) b.closing = -1;
      }
      const openness = b.closing < 0 ? 1 : 1 - Math.sin(b.closing) * 0.92;
      eyes.current.scale.y = Math.max(0.08, openness);
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
      {/* body — toon banding for the comic read, a tight specular for the 3D read */}
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshToonMaterial color="#575F69" />
        <Outlines thickness={OUTLINE} color={INK} />
      </mesh>
      <mesh scale={1.001}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshPhysicalMaterial
          color="#8B939E"
          transparent
          opacity={0.35}
          roughness={0.28}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
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
        <Embers />
        <pointLight ref={sparkLight} color="#FFD9C2" distance={5} intensity={14} />
      </group>

      {/* face — features float just in front of the sphere surface so they never
          clip into it when the face shifts/turns (which was the shape glitch) */}
      <group ref={face} position={[0, 0, 0]}>
        {/* eyes — flat ovals proud of the surface */}
        <group ref={eyes}>
          {[-0.36, 0.36].map((x) => (
            <group key={x} position={[x, 0.1, 1.14]}>
              <mesh scale={[1, 1.45, 0.25]}>
                <sphereGeometry args={[0.13, 24, 24]} />
                <meshBasicMaterial color={INK} />
              </mesh>
              <mesh position={[0.035, 0.07, 0.05]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>
          ))}
        </group>
        {/* brows — outer ends up: confident, not worried */}
        <mesh position={[-0.38, 0.44, 1.05]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.24, 0.05, 0.05]} />
          <meshBasicMaterial color={INK} />
        </mesh>
        <mesh position={[0.38, 0.44, 1.05]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.24, 0.05, 0.05]} />
          <meshBasicMaterial color={INK} />
        </mesh>
        {/* smile */}
        <mesh position={[0, -0.2, 1.19]} rotation={[0.25, 0, Math.PI * 1.08]}>
          <torusGeometry args={[0.34, 0.05, 12, 40, Math.PI * 0.84]} />
          <meshBasicMaterial color={INK} />
        </mesh>
      </group>
    </group>
  );
}

/** Embers drifting up off the fuse — the detail that makes the spark read as burning. */
function Embers({ count = 14 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        offset: Math.random(),
        speed: 0.35 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 0.5,
        spin: (Math.random() - 0.5) * 4,
        scale: 0.018 + Math.random() * 0.03,
      })),
    [count]
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      // life runs 0 -> 1, then wraps: rise, drift sideways, shrink out
      const life = (t * s.speed + s.offset) % 1;
      dummy.position.set(s.drift * life + Math.sin(t * 2 + i) * 0.04, life * 1.15, s.drift * life * 0.6);
      dummy.rotation.set(t * s.spin, t * s.spin, 0);
      dummy.scale.setScalar(s.scale * (1 - life));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#FFE8D6" transparent opacity={0.9} />
    </instancedMesh>
  );
}

/** Digital products orbiting the bomb: file cards flying out to marketplaces. */
function ProductCards() {
  const orbit = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orbit.current) {
      orbit.current.rotation.y = t * 0.42;
      orbit.current.position.y = Math.sin(t * 1.4) * 0.08;
    }
  });

  const cards = [0, 1, 2].map((i) => {
    const angle = (i / 3) * Math.PI * 2;
    return {
      key: i,
      position: [Math.cos(angle) * 2.1, [0.5, -0.3, 0.1][i], Math.sin(angle) * 2.1] as [number, number, number],
      rotation: [0, -angle + Math.PI / 2, [0.12, -0.1, 0.06][i]] as [number, number, number],
    };
  });

  return (
    <group ref={orbit} rotation={[0.34, 0, 0]}>
      {cards.map((card) => (
        <group key={card.key} position={card.position} rotation={card.rotation}>
          {/* file card */}
          <mesh>
            <boxGeometry args={[0.78, 0.98, 0.05]} />
            <meshToonMaterial color="#F2F3F5" />
            <Outlines thickness={0.05} color={INK} />
          </mesh>
          {/* thumbnail block */}
          <mesh position={[0, 0.19, 0.035]}>
            <boxGeometry args={[0.56, 0.4, 0.02]} />
            <meshToonMaterial color="#EE5C0B" />
          </mesh>
          {/* metadata lines */}
          <mesh position={[-0.08, -0.13, 0.035]}>
            <boxGeometry args={[0.4, 0.07, 0.02]} />
            <meshToonMaterial color="#9AA1AB" />
          </mesh>
          <mesh position={[-0.15, -0.27, 0.035]}>
            <boxGeometry args={[0.26, 0.07, 0.02]} />
            <meshToonMaterial color="#C6CAD0" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Pulls the camera back until the whole scene fits — no clipping at any viewport size. */
function FitCamera({ radius = 2.5 }: { radius?: number }) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const vFov = (cam.fov * Math.PI) / 180;
    const aspect = size.width / size.height;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    cam.position.z = Math.max(radius / Math.tan(vFov / 2), radius / Math.tan(hFov / 2));
    cam.updateProjectionMatrix();
  }, [camera, size, radius]);

  return null;
}

export default function Bomb3D({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7.4], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      // renderer is up — let the parent crossfade the canvas in over the static bomb
      onCreated={() => onReady?.()}
      aria-label="The DigiBoom bomb mascot, with digital product cards orbiting it"
      role="img"
    >
      <FitCamera />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 4, 3]} intensity={1.25} />
      {/* tight rim highlight so the metal reads as metal */}
      <pointLight position={[-2.2, 2.4, 2.6]} color="#FFFFFF" intensity={26} distance={9} />
      {/* orange bounce light from the scene */}
      <pointLight position={[2.6, -1.6, 2]} color="#EE5C0B" intensity={18} />
      <group scale={0.82} position={[0, -0.05, 0]}>
        <Bomb />
        <ProductCards />
      </group>
      <ContactShadows position={[0, -1.75, 0]} opacity={0.4} scale={7} blur={2.6} color={INK} />
    </Canvas>
  );
}
