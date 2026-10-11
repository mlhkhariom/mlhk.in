"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * 3D chrome M, built from the logo's geometry as extruded polygons.
 * Coordinates are in a 100x80 design grid and centred on the origin.
 * Pointer movement tilts the mark; a warm key light and a blue rim light
 * reproduce the logo's amber and spark-blue lighting.
 */

const SILVER = "#c9ced6";
const AMBER = "#ff9f1c";

/** Each shape is one closed polygon of the logo's left stroke, centre V, right stroke and inner X. */
const SHAPES: [number, number][][] = [
  // outer V (top chevron)
  [[-40, 30], [-28, 30], [0, 2], [28, 30], [40, 30], [0, 18]],
  // left stem
  [[-42, 28], [-34, 28], [-34, -22], [-42, -22]],
  // right stem
  [[34, 28], [42, 28], [42, -22], [34, -22]],
  // inner left stem
  [[-22, 22], [-16, 22], [-16, -16], [-22, -16]],
  // inner right stem
  [[16, 22], [22, 22], [22, -16], [16, -16]],
  // inner X left arm
  [[-16, 16], [-6, 6], [0, 12], [-10, 20]],
  // inner X right arm
  [[16, 16], [6, 6], [0, 12], [10, 20]],
];

function buildShapeGeometry(points: [number, number][]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: 6,
    bevelEnabled: true,
    bevelThickness: 1.2,
    bevelSize: 1,
    bevelSegments: 3,
    curveSegments: 1,
  });
}

function ChromeMesh({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const geometries = useMemo(() => SHAPES.map(buildShapeGeometry), []);

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SILVER,
        metalness: 1,
        roughness: 0.18,
        envMapIntensity: 2.4,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometries.forEach((g) => g.dispose());
      chrome.dispose();
    };
  }, [geometries, chrome]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.35, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * 0.22, 4, delta);
  });

  return (
    <group ref={group} scale={0.034} position={[0, 0.2, 0]}>
      {geometries.map((geo, i) => (
        <mesh key={i} geometry={geo} material={chrome} castShadow receiveShadow />
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* warm key light, the logo's amber glow */}
      <pointLight position={[2.2, 2.4, 3]} intensity={140} color={AMBER} distance={30} decay={1.6} />
      {/* cool rim light, the logo's blue spark */}
      <pointLight position={[-2.6, -1.4, 2.4]} intensity={90} color="#3b82f6" distance={30} decay={1.6} />
    </>
  );
}

function Scene({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return (
    <>
      <Lights />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <ChromeMesh pointer={pointer} />
      </Float>
      <Sparkles count={36} scale={[5, 3.5, 3]} size={2.2} speed={0.4} color={AMBER} opacity={0.7} />
    </>
  );
}

export function ChromeMark3D() {
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVisibility = () => setActive(!document.hidden);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      {active && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          camera={{ position: [0, 0, 9], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Scene pointer={pointer} />
        </Canvas>
      )}
    </div>
  );
}
