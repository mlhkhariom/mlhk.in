"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const MOUSE_SENSITIVITY = 0.0008;
const CAMERA_DAMPING = 0.04;

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null!);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const { geometry } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const colorA = new THREE.Color("#06b6d4");
    const colorB = new THREE.Color("#3b82f6");
    const colorC = new THREE.Color("#8b5cf6");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 3.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixColor = new THREE.Color().lerpColors(
        colorA,
        Math.random() > 0.5 ? colorB : colorC,
        Math.random()
      );
      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return { geometry: geo };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    currentRotation.current.x +=
      (mouseTarget.current.y * MOUSE_SENSITIVITY - currentRotation.current.x) *
      CAMERA_DAMPING;
    currentRotation.current.y +=
      (mouseTarget.current.x * MOUSE_SENSITIVITY - currentRotation.current.y) *
      CAMERA_DAMPING;
    meshRef.current.rotation.x = currentRotation.current.x + delta * 0.02;
    meshRef.current.rotation.y = currentRotation.current.y + delta * 0.03;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    currentRotation.current.x +=
      (mouseTarget.current.y * MOUSE_SENSITIVITY * 0.5 -
        currentRotation.current.x) *
      CAMERA_DAMPING;
    currentRotation.current.y +=
      (mouseTarget.current.x * MOUSE_SENSITIVITY * 0.5 -
        currentRotation.current.y) *
      CAMERA_DAMPING;
    meshRef.current.rotation.x = currentRotation.current.x + delta * 0.05;
    meshRef.current.rotation.y = currentRotation.current.y + delta * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 3]} />
      <meshBasicMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function Scene() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#06b6d4" />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          <ParticleField />
          <WireframeGlobe />
        </group>
      </Float>
      <Stars
        radius={50}
        depth={60}
        count={1200}
        factor={3}
        saturation={0.2}
        fade
        speed={0.5}
      />
    </>
  );
}

export function Hero3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className ?? ""}`}
      aria-hidden="true"
    >
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
}
