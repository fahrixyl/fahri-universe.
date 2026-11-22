"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Stars({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 30, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(p) * Math.cos(t); a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); a[i * 3 + 2] = r * Math.cos(p);
    }
    return a;
  }, [count]);
  useFrame((s, d) => {
    const p = ref.current; if (!p) return;
    p.rotation.y += d * 0.015;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, s.pointer.y * 0.15, 0.03);
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.07} color="#cfe9ff" sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

function Planet() {
  const g = useRef<THREE.Group>(null);
  useFrame((s, d) => {
    const o = g.current; if (!o) return;
    o.rotation.y += d * 0.12;
    o.position.x = THREE.MathUtils.lerp(o.position.x, 2.4 + s.pointer.x * 0.4, 0.04);
    o.position.y = THREE.MathUtils.lerp(o.position.y, 0.4 + s.pointer.y * 0.3, 0.04);
  });
  return (
    <group ref={g} position={[2.4, 0.4, -2]} rotation={[0.3, 0, 0.2]}>
      <mesh><sphereGeometry args={[1.5, 48, 48]} /><meshStandardMaterial color="#0f2a6b" emissive="#0b1d4d" roughness={0.8} /></mesh>
      <mesh scale={1.012}><sphereGeometry args={[1.5, 24, 24]} /><meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.12} /></mesh>
      <mesh scale={1.12}><sphereGeometry args={[1.5, 32, 32]} /><meshBasicMaterial color="#2563EB" transparent opacity={0.1} side={THREE.BackSide} /></mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}><ringGeometry args={[2.1, 2.9, 96]} /><meshBasicMaterial color="#22D3EE" transparent opacity={0.22} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

export default function Galaxy() {
  const [ok, setOk] = useState<boolean | null>(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setOk(Boolean(gl) && !reduce);
    } catch { setOk(false); }
    setMobile(window.innerWidth < 768);
  }, []);
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 75% 30%, #2563EB33, transparent), radial-gradient(50% 40% at 15% 80%, #22D3EE1f, transparent), #05070D" }} />
      {ok === false && <div className="absolute inset-0 stars-css" />}
      {ok && (
        <Canvas dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, 0, 7], fov: 55 }} gl={{ antialias: !mobile, powerPreference: "low-power" }} style={{ pointerEvents: "none" }} eventSource={typeof document !== "undefined" ? document.body : undefined}>
          <ambientLight intensity={0.6} /><pointLight position={[5, 3, 4]} intensity={30} color="#22D3EE" />
          <Stars count={mobile ? 700 : 2200} /><Planet />
        </Canvas>
      )}
    </div>
  );
}
