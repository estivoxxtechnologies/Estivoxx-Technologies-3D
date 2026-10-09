import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { RotateCw, Eye } from 'lucide-react';

export const AboutModel3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [wireframeMode, setWireframeMode] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'all' | 'core' | 'mesh'>('all');

  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, rotX: 0.3, rotY: 0.4 });
  const meshesRef = useRef<{
    core?: THREE.Mesh;
    cage?: THREE.Mesh;
    ring1?: THREE.Mesh;
    ring2?: THREE.Mesh;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 280;

    const isDark = theme === 'dark';
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(isDark ? 0x334155 : 0x94a3b8, isDark ? 1.5 : 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, isDark ? 3.0 : 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDark ? 0x6366f1 : 0x1d4ed8, isDark ? 2.0 : 2.0);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Polyhedron (High contrast in both light and dark modes)
    const coreGeom = new THREE.DodecahedronGeometry(1.1, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f172a : 0x1e293b,
      metalness: 0.8,
      roughness: 0.25,
      wireframe: wireframeMode,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // 2. Geodesic Cage
    const cageGeom = new THREE.IcosahedronGeometry(1.45, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.8 : 0.9,
    });
    const cage = new THREE.Mesh(cageGeom, cageMat);
    group.add(cage);

    // 3. Gyroscope rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: isDark ? 0x818cf8 : 0x2563eb,
      metalness: 0.7,
      roughness: 0.3,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.02, 16, 64), ringMat1);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x0ea5e9,
      metalness: 0.7,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.018, 16, 64), ringMat2);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    meshesRef.current = { core, cage, ring1, ring2 };

    // Drag interaction
    const handleDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMove = (e: MouseEvent) => {
      if (!mouseRef.current.isDown) return;
      const deltaX = e.clientX - mouseRef.current.lastX;
      const deltaY = e.clientY - mouseRef.current.lastY;
      mouseRef.current.rotY += deltaX * 0.01;
      mouseRef.current.rotX += deltaY * 0.01;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleUp = () => {
      mouseRef.current.isDown = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleDown);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!mouseRef.current.isDown) {
        mouseRef.current.rotY += delta * 0.4;
        mouseRef.current.rotX += delta * 0.15;
      }

      group.rotation.x = mouseRef.current.rotX;
      group.rotation.y = mouseRef.current.rotY;

      ring1.rotation.z += delta * 0.5;
      ring2.rotation.z -= delta * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('resize', handleResize);

      coreGeom.dispose();
      coreMat.dispose();
      cageGeom.dispose();
      cageMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [theme, wireframeMode]);

  // Update visibility based on active layer
  useEffect(() => {
    const { core, cage, ring1, ring2 } = meshesRef.current;
    if (core && cage && ring1 && ring2) {
      if (activeLayer === 'all') {
        core.visible = true;
        cage.visible = true;
        ring1.visible = true;
        ring2.visible = true;
      } else if (activeLayer === 'core') {
        core.visible = true;
        cage.visible = false;
        ring1.visible = false;
        ring2.visible = false;
      } else if (activeLayer === 'mesh') {
        core.visible = false;
        cage.visible = true;
        ring1.visible = true;
        ring2.visible = true;
      }
    }
  }, [activeLayer]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-100/90 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-800 shadow-inner">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
        <span className="text-[11px] font-mono font-semibold text-slate-800 dark:text-slate-200">
          Interactive Architecture Model
        </span>
      </div>

      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <button
          onClick={() => setWireframeMode((prev) => !prev)}
          className={`p-1.5 rounded-md text-[10px] font-mono flex items-center gap-1 transition-colors border ${
            wireframeMode
              ? 'bg-sky-500 text-white border-sky-400'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
          }`}
          title="Toggle wireframe topology"
        >
          <Eye className="w-3 h-3" />
          <span>Wireframe</span>
        </button>

        <button
          onClick={() => {
            mouseRef.current.rotX = 0.3;
            mouseRef.current.rotY = 0.4;
          }}
          className="p-1.5 rounded-md text-[10px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100"
          title="Reset orientation"
        >
          <RotateCw className="w-3 h-3" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full h-64 sm:h-72 cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D model"
      />

      <div className="p-3 bg-white/95 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
          Drag to inspect topology
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
              activeLayer === 'all'
                ? 'bg-slate-900 text-white dark:bg-sky-600'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setActiveLayer('core')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
              activeLayer === 'core'
                ? 'bg-slate-900 text-white dark:bg-sky-600'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Core
          </button>
          <button
            onClick={() => setActiveLayer('mesh')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
              activeLayer === 'mesh'
                ? 'bg-slate-900 text-white dark:bg-sky-600'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Mesh
          </button>
        </div>
      </div>
    </div>
  );
};
