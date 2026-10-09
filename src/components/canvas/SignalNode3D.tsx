import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface SignalNode3DProps {
  isTyping?: boolean;
}

export const SignalNode3D: React.FC<SignalNode3DProps> = ({ isTyping = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, rotX: 0.2, rotY: 0.3 });
  const isTypingRef = useRef(isTyping);

  useEffect(() => {
    isTypingRef.current = isTyping;
  }, [isTyping]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 200;

    const isDark = theme === 'dark';
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(isDark ? 0x334155 : 0x94a3b8, isDark ? 1.5 : 2.5);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, isDark ? 3.0 : 2.8);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const accentColor = isDark ? 0x38bdf8 : 0x0284c7;
    const bodyColor = isDark ? 0x0f172a : 0x1e293b;

    // 1. Quantum crystalline beacon
    const beaconGeom = new THREE.OctahedronGeometry(1.0, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: bodyColor,
      metalness: 0.85,
      roughness: 0.2,
    });
    const beacon = new THREE.Mesh(beaconGeom, beaconMat);
    rootGroup.add(beacon);

    const wireBeaconMat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true });
    const wireBeacon = new THREE.Mesh(beaconGeom, wireBeaconMat);
    wireBeacon.scale.set(1.15, 1.15, 1.15);
    rootGroup.add(wireBeacon);

    // 2. Pulse emitter rings
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeom = new THREE.TorusGeometry(1.4 + i * 0.35, 0.015, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.4 + i * 0.2,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      rootGroup.add(ring);
      rings.push(ring);
    }

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

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 200;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const speedMultiplier = isTypingRef.current ? 2.5 : 1.0;

      if (!mouseRef.current.isDown) {
        mouseRef.current.rotY += delta * 0.4 * speedMultiplier;
        mouseRef.current.rotX += delta * 0.2 * speedMultiplier;
      }

      rootGroup.rotation.x = mouseRef.current.rotX;
      rootGroup.rotation.y = mouseRef.current.rotY;

      // Pulse rings scale
      const time = clock.getElapsedTime();
      rings.forEach((ring, idx) => {
        const scale = 1.0 + Math.sin(time * 2 * speedMultiplier + idx) * 0.08;
        ring.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('resize', handleResize);

      beaconGeom.dispose();
      beaconMat.dispose();
      wireBeaconMat.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [theme]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-100/90 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-800 shadow-inner">
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-emerald-500 animate-ping' : 'bg-sky-500 animate-pulse'}`} />
        <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {isTyping ? 'Signal Active · Receiving Input' : 'Inquiry Signal Beacon'}
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-44 cursor-grab active:cursor-grabbing"
        title="Interactive Signal Beacon - drag to rotate"
      />

      <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span>Direct Transmission Node</span>
        <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">Active</span>
      </div>
    </div>
  );
};
