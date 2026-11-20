"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * 3D chrome MLHK monogram + precision machined orbital rings.
 * Uses software-WebGL detection so headless / low-end devices render on demand
 * without CPU stalls while GPU devices enjoy smooth 60fps interactive damping.
 */

const SILVER = "#d4d8e0";
const AMBER = "#ff9f1c";
const TITANIUM = "#6e7685";

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

function detectSoftwareWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function buildShapeGeometry(points: [number, number][]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: 7,
    bevelEnabled: true,
    bevelThickness: 1.4,
    bevelSize: 1.1,
    bevelSegments: 3,
    curveSegments: 1,
  });
}

function ChromeMesh({
  pointer,
  softwareGl,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  softwareGl: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const outerRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const geometries = useMemo(() => SHAPES.map(buildShapeGeometry), []);

  const chrome = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: SILVER,
        metalness: 0.96,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.12,
        envMapIntensity: 2.5,
      }),
    [],
  );

  const amberRingMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: AMBER,
        metalness: 0.88,
        roughness: 0.22,
        clearcoat: 0.8,
        envMapIntensity: 2.0,
      }),
    [],
  );

  const steelRingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: TITANIUM,
        metalness: 0.85,
        roughness: 0.35,
        envMapIntensity: 1.6,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometries.forEach((g) => g.dispose());
      chrome.dispose();
      amberRingMat.dispose();
      steelRingMat.dispose();
    };
  }, [geometries, chrome, amberRingMat, steelRingMat]);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      if (softwareGl) {
        g.rotation.y = pointer.current.x * 0.28 + 0.18;
        g.rotation.x = -pointer.current.y * 0.18 - 0.06;
      } else {
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.38, 4.5, delta);
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * 0.24, 4.5, delta);
      }
    }
    if (!softwareGl) {
      const t = state.clock.elapsedTime;
      if (outerRing.current) {
        outerRing.current.rotation.z = t * 0.18;
        outerRing.current.rotation.x = Math.PI * 0.36 + Math.sin(t * 0.4) * 0.06;
      }
      if (innerRing.current) {
        innerRing.current.rotation.z = -t * 0.24;
        innerRing.current.rotation.y = Math.PI * 0.22 + Math.cos(t * 0.35) * 0.08;
      }
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      <group ref={group} scale={0.034}>
        {geometries.map((geo, i) => (
          <mesh key={i} geometry={geo} material={chrome} castShadow={!softwareGl} receiveShadow={!softwareGl} />
        ))}
      </group>

      {/* Precision machined orbital rings */}
      <mesh ref={outerRing} rotation={[Math.PI * 0.36, 0.25, 0.4]} material={amberRingMat}>
        <torusGeometry args={[2.35, 0.022, 16, 96]} />
      </mesh>
      <mesh ref={innerRing} rotation={[Math.PI * 0.62, -0.35, -0.2]} material={steelRingMat}>
        <torusGeometry args={[1.92, 0.015, 14, 84]} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <hemisphereLight args={["#dbeafe", "#18181b", 0.55]} />
      <pointLight position={[2.4, 2.5, 3.2]} intensity={145} color={AMBER} distance={30} decay={1.6} />
      <pointLight position={[-2.8, -1.6, 2.5]} intensity={95} color="#3b82f6" distance={30} decay={1.6} />
      <directionalLight position={[0, 4, 4]} intensity={1.2} color="#fff7ed" />
    </>
  );
}

function Scene({
  pointer,
  softwareGl,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  softwareGl: boolean;
}) {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.12;
    gl.setPixelRatio(softwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    invalidate();
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, softwareGl, invalidate]);

  useEffect(() => {
    if (!softwareGl) return;
    const onMove = () => invalidate();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [softwareGl, invalidate]);

  return (
    <>
      <Lights />
      {softwareGl ? (
        <ChromeMesh pointer={pointer} softwareGl={softwareGl} />
      ) : (
        <Float speed={1.35} rotationIntensity={0.14} floatIntensity={0.38}>
          <ChromeMesh pointer={pointer} softwareGl={softwareGl} />
        </Float>
      )}
      <Sparkles count={28} scale={[5, 3.5, 3]} size={2.0} speed={softwareGl ? 0 : 0.35} color={AMBER} opacity={0.65} />
    </>
  );
}

export function ChromeMark3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [softwareGl, setSoftwareGl] = useState(false);

  useEffect(() => {
    setSoftwareGl(detectSoftwareWebGL());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMqChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMqChange);

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVisibility = () => setActive(!document.hidden);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) setVisible(entry.isIntersecting);
        },
        { rootMargin: "120px" },
      );
      observer.observe(containerRef.current);
    }

    return () => {
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  if (reducedMotion) {
    return (
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="flex size-52 items-center justify-center rounded-full border border-[#ff9f1c]/25 bg-gradient-to-br from-[#ff9f1c]/15 via-white/[0.03] to-[#3b82f6]/10 shadow-[0_0_80px_-20px_rgba(255,159,28,0.45)]">
          <span className="font-display text-6xl font-bold tracking-tight text-chrome">M</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} data-testid="hero-3d-canvas" className="absolute inset-0" aria-hidden>
      {active && (
        <Canvas
          dpr={softwareGl ? [1, 1] : [1, 1.75]}
          frameloop={!visible ? "never" : softwareGl ? "demand" : "always"}
          camera={{ position: [0, 0, 9], fov: 38 }}
          gl={{
            antialias: !softwareGl,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Scene pointer={pointer} softwareGl={softwareGl} />
        </Canvas>
      )}
    </div>
  );
}
