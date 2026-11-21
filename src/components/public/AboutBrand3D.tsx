"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Interactive 3D architectural emblem for MLHK Infotech on /about.
 * Uses imperative Three.js with RoomEnvironment PBR reflections,
 * composite multi-part geometry, and automatic software-WebGL detection
 * (on-demand rendering on SwiftShader/CPU, smooth pointer-reactive orbit on GPU).
 */
export function AboutBrand3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglReady, setWebglReady] = useState(true);
  const [activeLayer, setActiveLayer] = useState<"all" | "core" | "network">("all");
  const layerRef = useRef<"all" | "core" | "network">("all");

  useEffect(() => {
    layerRef.current = activeLayer;
  }, [activeLayer]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const gl = renderer.getContext();
    const debugExt = gl.getExtension("WEBGL_debug_renderer_info");
    const rendererInfo = debugExt
      ? String(gl.getParameter(debugExt.UNMASKED_RENDERER_WEBGL) || "")
      : "";
    const isSoftwareGl = /SwiftShader|llvmpipe|Software|Mesa/i.test(rendererInfo);
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x090d16, 1);

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    renderer.setSize(width, height);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 6.2);
    camera.lookAt(0, 0, 0);

    // Warm key + cool sky/ground Hemisphere + amber rim contrast
    const hemi = new THREE.HemisphereLight(0x7cb3ff, 0x0b0d14, 1.05);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffe1b0, 2.1);
    keyLight.position.set(4.5, 5.5, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff9f1c, 1.35);
    rimLight.position.set(-4.5, -2.5, -3.5);
    scene.add(rimLight);

    // Composite multi-part architectural sculpture (10+ parts across 3 silhouette scales)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // 1. Primary Core: Faceted Obsidian Prism + Inner Warm Amber Core
    const coreGeo = new THREE.OctahedronGeometry(0.92, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111726,
      metalness: 0.72,
      roughness: 0.24,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);
    geometries.push(coreGeo);
    materials.push(coreMat);

    const innerGlowGeo = new THREE.IcosahedronGeometry(0.56, 1);
    const innerGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff9f1c,
      emissive: 0xff9f1c,
      emissiveIntensity: 0.65,
      metalness: 0.35,
      roughness: 0.3,
    });
    const innerGlowMesh = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    rootGroup.add(innerGlowMesh);
    geometries.push(innerGlowGeo);
    materials.push(innerGlowMat);

    // Wireframe architectural cage around core
    const cageGeo = new THREE.OctahedronGeometry(1.18, 0);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xffb84d,
      wireframe: true,
      metalness: 0.5,
      roughness: 0.4,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    rootGroup.add(cageMesh);
    geometries.push(cageGeo);
    materials.push(cageMat);

    // 2. Secondary Orbital Rings (3 distinct angles & roughness values)
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    const amberRingGeo = new THREE.TorusGeometry(1.62, 0.045, 20, 72);
    const amberRingMat = new THREE.MeshStandardMaterial({
      color: 0xff9f1c,
      metalness: 0.85,
      roughness: 0.2,
    });
    const amberRing = new THREE.Mesh(amberRingGeo, amberRingMat);
    amberRing.rotation.set(Math.PI * 0.34, Math.PI * 0.12, 0);
    ringGroup.add(amberRing);
    geometries.push(amberRingGeo);
    materials.push(amberRingMat);

    const cobaltRingGeo = new THREE.TorusGeometry(2.05, 0.032, 16, 72);
    const cobaltRingMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.5,
      roughness: 0.5,
    });
    const cobaltRing = new THREE.Mesh(cobaltRingGeo, cobaltRingMat);
    cobaltRing.rotation.set(-Math.PI * 0.28, Math.PI * 0.3, Math.PI * 0.15);
    ringGroup.add(cobaltRing);
    geometries.push(cobaltRingGeo);
    materials.push(cobaltRingMat);

    const titaniumRingGeo = new THREE.TorusGeometry(2.38, 0.022, 16, 72);
    const titaniumRingMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.78,
      roughness: 0.32,
    });
    const titaniumRing = new THREE.Mesh(titaniumRingGeo, titaniumRingMat);
    titaniumRing.rotation.set(Math.PI * 0.48, -Math.PI * 0.22, 0);
    ringGroup.add(titaniumRing);
    geometries.push(titaniumRingGeo);
    materials.push(titaniumRingMat);

    // 3. Accent Satellite Nodes (6 MLHK Pillars orbiting the structure)
    const nodeGeo = new THREE.IcosahedronGeometry(0.11, 0);
    const nodeAmberMat = new THREE.MeshStandardMaterial({
      color: 0xffb84d,
      emissive: 0xff9f1c,
      emissiveIntensity: 0.4,
      metalness: 0.65,
      roughness: 0.22,
    });
    const nodeBlueMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x2563eb,
      emissiveIntensity: 0.35,
      metalness: 0.6,
      roughness: 0.28,
    });
    geometries.push(nodeGeo);
    materials.push(nodeAmberMat, nodeBlueMat);

    const nodesGroup = new THREE.Group();
    rootGroup.add(nodesGroup);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = i % 2 === 0 ? 1.88 : 2.26;
      const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? nodeAmberMat : nodeBlueMat);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 0.55,
        Math.sin(angle) * radius,
      );
      nodesGroup.add(node);
    }

    // Subtle floor contact shadow disc beneath sculpture
    const shadowGeo = new THREE.CircleGeometry(1.9, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -2.25;
    scene.add(shadowDisc);
    geometries.push(shadowGeo);
    materials.push(shadowMat);

    // Pointer drag & hover state
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = 0.45;
    let targetRotX = 0.18;
    let curRotY = targetRotY;
    let curRotX = targetRotX;
    let rafId = 0;

    const applyLayerVisibility = () => {
      const mode = layerRef.current;
      coreMesh.visible = mode !== "network";
      innerGlowMesh.visible = mode !== "network";
      cageMesh.visible = mode !== "network";
      ringGroup.visible = mode !== "core";
      nodesGroup.visible = mode !== "core";
    };

    const renderOnce = () => {
      applyLayerVisibility();
      rootGroup.rotation.y = curRotY;
      rootGroup.rotation.x = curRotX;
      renderer.render(scene, camera);
    };

    // Initial crisp render
    renderOnce();

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.85, Math.min(0.85, targetRotX + dy * 0.006));
      if (isSoftwareGl || reducedMotion) {
        curRotY = targetRotY;
        curRotX = targetRotX;
        renderOnce();
      }
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 280);
      const h = Math.max(container.clientHeight, 280);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderOnce();
    };
    window.addEventListener("resize", onResize);

    // Expose re-render hook on layer toggle for software-WebGL
    const layerInterval = window.setInterval(() => {
      if (isSoftwareGl || reducedMotion) {
        renderOnce();
      }
    }, 650);

    if (!isSoftwareGl && !reducedMotion) {
      const clock = new THREE.Clock();
      const animate = () => {
        rafId = window.requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.05);
        if (!isDragging) {
          targetRotY += dt * 0.28;
        }
        curRotY += (targetRotY - curRotY) * (1 - Math.exp(-7 * dt));
        curRotX += (targetRotX - curRotX) * (1 - Math.exp(-7 * dt));
        amberRing.rotation.z += dt * 0.22;
        cobaltRing.rotation.x -= dt * 0.16;
        nodesGroup.rotation.y -= dt * 0.18;
        applyLayerVisibility();
        rootGroup.rotation.y = curRotY;
        rootGroup.rotation.x = curRotX;
        renderer.render(scene, camera);
      };
      rafId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearInterval(layerInterval);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#090d16] sm:h-[400px]">
      {webglReady ? (
        <div
          ref={mountRef}
          aria-label="Interactive 3D MLHK Infotech engineering architecture sculpture"
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#090d16] p-6 text-center text-xs text-zinc-400">
          MLHK Infotech Unified Engineering Architecture · Shajapur HQ &amp; Indore Studio
        </div>
      )}

      {/* Solid-fill HUD overlay (zero backdrop-filter over active WebGL canvas) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-2 px-4 py-3">
        <span className="rounded-lg border border-white/10 bg-[#090d16]/95 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
          3D Architecture Core · Drag to Orbit
        </span>
        <div className="pointer-events-auto inline-flex rounded-lg border border-white/10 bg-[#090d16]/95 p-0.5 text-[10px] font-semibold">
          {(
            [
              { id: "all", label: "Unified" },
              { id: "core", label: "Core" },
              { id: "network", label: "Edge" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLayer(tab.id)}
              className={`rounded-md px-2 py-0.5 transition-colors ${
                activeLayer === tab.id
                  ? "bg-[#ff9f1c] text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-[#080b12]/95 px-4 py-2 text-[11px] text-zinc-300">
        <span>INNOVATE. INTEGRATE. ELEVATE</span>
        <span className="font-mono text-[#ffb84d]">Make Your Life Digital</span>
      </div>
    </div>
  );
}
