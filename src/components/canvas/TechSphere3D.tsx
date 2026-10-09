import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface TechSphere3DProps {
  selectedCategoryName: string;
}

export const TechSphere3D: React.FC<TechSphere3DProps> = ({ selectedCategoryName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, rotX: 0.2, rotY: 0.3 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 260;

    const isDark = theme === 'dark';
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.5);

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

    const accentColor = isDark ? 0x38bdf8 : 0x0284c7;
    const bodyColor = isDark ? 0x0f172a : 0x1e293b;

    // 1. Geodesic Sphere
    const sphereGeom = new THREE.IcosahedronGeometry(1.4, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: bodyColor,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    rootGroup.add(sphere);

    // 2. Inner Polyhedral Core
    const coreGeom = new THREE.IcosahedronGeometry(0.8, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.9,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    rootGroup.add(core);

    // 3. Orbiting Data Nodes on the surface vertices
    const nodeGeom = new THREE.SphereGeometry(0.06, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: accentColor });
    const nodesGroup = new THREE.Group();
    rootGroup.add(nodesGroup);

    const pos = sphereGeom.attributes.position;
    const vertexCount = pos.count;
    for (let i = 0; i < vertexCount; i += 3) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      nodesGroup.add(node);
    }

    // 4. Dual Gyro rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.015, 16, 64),
      new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true })
    );
    ring1.rotation.x = Math.PI / 4;
    rootGroup.add(ring1);

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
      const h = container.clientHeight || 260;
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
        mouseRef.current.rotY += delta * 0.4;
        mouseRef.current.rotX += delta * 0.15;
      }

      rootGroup.rotation.x = mouseRef.current.rotX;
      rootGroup.rotation.y = mouseRef.current.rotY;

      ring1.rotation.z += delta * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('resize', handleResize);

      sphereGeom.dispose();
      sphereMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [theme, selectedCategoryName]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-100/90 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-800 shadow-inner">
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Spatial Stack Topography
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-56 sm:h-64 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Tech Sphere - drag to rotate"
      />

      <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span className="truncate">{selectedCategoryName}</span>
        <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold shrink-0">
          3D Constellation
        </span>
      </div>
    </div>
  );
};
