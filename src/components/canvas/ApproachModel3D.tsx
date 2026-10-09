import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface ApproachModel3DProps {
  stageIndex: number; // 0 to 4
}

export const ApproachModel3D: React.FC<ApproachModel3DProps> = ({ stageIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, rotX: 0.25, rotY: 0.35 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 240;

    const isDark = theme === 'dark';
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.2);

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

    const dirLight2 = new THREE.DirectionalLight(isDark ? 0x6366f1 : 0x1d4ed8, isDark ? 2.0 : 2.0);
    dirLight2.position.set(-4, -4, 3);
    scene.add(dirLight2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const primaryColor = isDark ? 0x0284c7 : 0x0369a1;
    const accentColor = isDark ? 0x38bdf8 : 0x0284c7;
    const darkBody = isDark ? 0x0f172a : 0x1e293b;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Distinct 3D model for each of the 5 delivery phases
    if (stageIndex === 0) {
      // 01 Discover & System Scoping: Octahedron sensor crystal & compass ring
      const octGeom = new THREE.OctahedronGeometry(1.2, 0);
      geometries.push(octGeom);
      const octMat = new THREE.MeshStandardMaterial({
        color: darkBody,
        metalness: 0.8,
        roughness: 0.2,
      });
      materials.push(octMat);
      rootGroup.add(new THREE.Mesh(octGeom, octMat));

      const wireOctMat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true });
      materials.push(wireOctMat);
      const wireOct = new THREE.Mesh(octGeom, wireOctMat);
      wireOct.scale.set(1.15, 1.15, 1.15);
      rootGroup.add(wireOct);

      const ringGeom = new THREE.TorusGeometry(1.7, 0.02, 16, 64);
      geometries.push(ringGeom);
      const ringMat = new THREE.MeshBasicMaterial({ color: accentColor });
      materials.push(ringMat);
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      rootGroup.add(ring);
    } else if (stageIndex === 1) {
      // 02 Plan & Design: Multi-tier architectural blueprint planes
      for (let i = 0; i < 3; i++) {
        const boxGeom = new THREE.BoxGeometry(1.8, 0.04, 1.3);
        geometries.push(boxGeom);
        const boxMat = new THREE.MeshStandardMaterial({
          color: i === 1 ? accentColor : darkBody,
          metalness: 0.7,
          roughness: 0.3,
          wireframe: i !== 1,
        });
        materials.push(boxMat);
        const box = new THREE.Mesh(boxGeom, boxMat);
        box.position.y = (i - 1) * 0.6;
        rootGroup.add(box);
      }
      rootGroup.rotation.x = 0.4;
      rootGroup.rotation.y = 0.5;
    } else if (stageIndex === 2) {
      // 03 Develop & Integrate: Precision code engine matrix & interlocking gears
      const coreGeom = new THREE.BoxGeometry(1.0, 1.0, 1.0);
      geometries.push(coreGeom);
      const coreMat = new THREE.MeshStandardMaterial({
        color: darkBody,
        metalness: 0.85,
        roughness: 0.2,
      });
      materials.push(coreMat);
      rootGroup.add(new THREE.Mesh(coreGeom, coreMat));

      const cageGeom = new THREE.BoxGeometry(1.3, 1.3, 1.3);
      geometries.push(cageGeom);
      const cageMat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true });
      materials.push(cageMat);
      rootGroup.add(new THREE.Mesh(cageGeom, cageMat));

      const ringGeom = new THREE.TorusGeometry(1.6, 0.025, 16, 64);
      geometries.push(ringGeom);
      const ringMat = new THREE.MeshBasicMaterial({ color: primaryColor });
      materials.push(ringMat);
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 3;
      rootGroup.add(ring);
    } else if (stageIndex === 3) {
      // 04 Test & Refine: Hardened diamond shield with laser verification perimeter
      const shieldGeom = new THREE.TetrahedronGeometry(1.3, 1);
      geometries.push(shieldGeom);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: darkBody,
        metalness: 0.9,
        roughness: 0.15,
      });
      materials.push(shieldMat);
      rootGroup.add(new THREE.Mesh(shieldGeom, shieldMat));

      const wireShieldMat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true });
      materials.push(wireShieldMat);
      const wireShield = new THREE.Mesh(shieldGeom, wireShieldMat);
      wireShield.scale.set(1.2, 1.2, 1.2);
      rootGroup.add(wireShield);

      const scanGeom = new THREE.TorusGeometry(1.8, 0.015, 16, 64);
      geometries.push(scanGeom);
      const scanMat = new THREE.MeshBasicMaterial({ color: accentColor });
      materials.push(scanMat);
      const scanRing = new THREE.Mesh(scanGeom, scanMat);
      scanRing.rotation.y = Math.PI / 2;
      rootGroup.add(scanRing);
    } else {
      // 05 Launch & Support: Kinetic orbital trajectory ring & central beacon
      const nucleusGeom = new THREE.SphereGeometry(0.7, 24, 24);
      geometries.push(nucleusGeom);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        metalness: 0.8,
        roughness: 0.2,
      });
      materials.push(nucleusMat);
      rootGroup.add(new THREE.Mesh(nucleusGeom, nucleusMat));

      for (let r = 0; r < 2; r++) {
        const ringGeom = new THREE.TorusGeometry(1.4 + r * 0.45, 0.02, 16, 64);
        geometries.push(ringGeom);
        const ringMat = new THREE.MeshBasicMaterial({
          color: r === 0 ? primaryColor : accentColor,
          wireframe: true,
        });
        materials.push(ringMat);
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = (r + 1) * (Math.PI / 4);
        ring.rotation.y = (r + 1) * (Math.PI / 3);
        rootGroup.add(ring);
      }
    }

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

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 240;
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

      if (!mouseRef.current.isDown) {
        mouseRef.current.rotY += delta * 0.5;
        mouseRef.current.rotX += delta * 0.2;
      }

      rootGroup.rotation.x = mouseRef.current.rotX;
      rootGroup.rotation.y = mouseRef.current.rotY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('resize', handleResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [stageIndex, theme]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-100/90 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-800 shadow-inner">
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Stage 0{stageIndex + 1} Visual Geometry
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-44 sm:h-52 cursor-grab active:cursor-grabbing"
        title="Interactive 3D model - drag to rotate"
      />

      <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span>Drag to orbit stage model</span>
        <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">Active WebGL</span>
      </div>
    </div>
  );
};
