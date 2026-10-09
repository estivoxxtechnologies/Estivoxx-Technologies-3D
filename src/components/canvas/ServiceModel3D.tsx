import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface ServiceModel3DProps {
  serviceId: string;
}

export const ServiceModel3D: React.FC<ServiceModel3DProps> = ({ serviceId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, rotX: 0.2, rotY: 0.3 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 240;

    const isDark = theme === 'dark';
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(isDark ? 0x334155 : 0x94a3b8, isDark ? 1.5 : 2.5);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, isDark ? 3.0 : 2.5);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(isDark ? 0x6366f1 : 0x1d4ed8, isDark ? 2.0 : 1.8);
    dirLight2.position.set(-4, -4, 3);
    scene.add(dirLight2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const primaryColor = isDark ? 0x0284c7 : 0x0369a1;
    const secondaryColor = isDark ? 0x38bdf8 : 0x0284c7;
    const bodyColor = isDark ? 0x0f172a : 0x1e293b;

    // Disposables tracker
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Distinct 3D models per service
    if (serviceId === 'custom-software') {
      // 3D Distributed Microservice Matrix (Cluster of interconnected modular blocks)
      const gridSize = 3;
      const spacing = 0.75;
      const cubeGeom = new THREE.BoxGeometry(0.45, 0.45, 0.45);
      geometries.push(cubeGeom);

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            if (Math.random() > 0.45 || (x === 0 && y === 0 && z === 0)) {
              const isCenter = x === 0 && y === 0 && z === 0;
              const cubeMat = new THREE.MeshStandardMaterial({
                color: isCenter ? secondaryColor : bodyColor,
                metalness: 0.8,
                roughness: 0.2,
                wireframe: !isCenter && Math.random() > 0.6,
              });
              materials.push(cubeMat);
              const cube = new THREE.Mesh(cubeGeom, cubeMat);
              cube.position.set(x * spacing, y * spacing, z * spacing);
              rootGroup.add(cube);
            }
          }
        }
      }

      // Inter-service circuit ring
      const circuitGeom = new THREE.TorusGeometry(1.8, 0.015, 16, 64);
      geometries.push(circuitGeom);
      const circuitMat = new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true });
      materials.push(circuitMat);
      const circuit = new THREE.Mesh(circuitGeom, circuitMat);
      circuit.rotation.x = Math.PI / 2;
      rootGroup.add(circuit);
    } else if (serviceId === 'web-development') {
      // 3D Global Responsive Spherical Topology & Edge Halo
      const sphereGeom = new THREE.IcosahedronGeometry(1.2, 2);
      geometries.push(sphereGeom);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        metalness: 0.85,
        roughness: 0.2,
        wireframe: true,
      });
      materials.push(sphereMat);
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      rootGroup.add(sphere);

      const innerSphereGeom = new THREE.SphereGeometry(0.85, 24, 24);
      geometries.push(innerSphereGeom);
      const innerSphereMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        metalness: 0.9,
        roughness: 0.3,
      });
      materials.push(innerSphereMat);
      const innerSphere = new THREE.Mesh(innerSphereGeom, innerSphereMat);
      rootGroup.add(innerSphere);

      // Latitudinal client orbit ring
      const haloGeom = new THREE.TorusGeometry(1.7, 0.02, 16, 80);
      geometries.push(haloGeom);
      const haloMat = new THREE.MeshBasicMaterial({ color: secondaryColor });
      materials.push(haloMat);
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.rotation.x = Math.PI / 3;
      rootGroup.add(halo);
    } else if (serviceId === 'business-automation') {
      // 3D Continuous Workflow Loop (Torus Knot)
      const knotGeom = new THREE.TorusKnotGeometry(0.9, 0.2, 80, 16, 2, 3);
      geometries.push(knotGeom);
      const knotMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        metalness: 0.8,
        roughness: 0.2,
      });
      materials.push(knotMat);
      const knot = new THREE.Mesh(knotGeom, knotMat);
      rootGroup.add(knot);

      const wireKnotMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        wireframe: true,
      });
      materials.push(wireKnotMat);
      const wireKnot = new THREE.Mesh(knotGeom, wireKnotMat);
      wireKnot.scale.set(1.04, 1.04, 1.04);
      rootGroup.add(wireKnot);
    } else if (serviceId === 'ui-ux-design') {
      // 3D Layered Isometric UI System Planes
      const planeCount = 4;
      const planeGeom = new THREE.BoxGeometry(1.6, 0.05, 1.1);
      geometries.push(planeGeom);

      for (let i = 0; i < planeCount; i++) {
        const isTop = i === planeCount - 1;
        const planeMat = new THREE.MeshStandardMaterial({
          color: isTop ? secondaryColor : bodyColor,
          metalness: 0.75,
          roughness: 0.25,
          transparent: true,
          opacity: isTop ? 0.95 : 0.75 + i * 0.05,
        });
        materials.push(planeMat);
        const plane = new THREE.Mesh(planeGeom, planeMat);
        plane.position.y = (i - 1.5) * 0.45;
        rootGroup.add(plane);
      }
      rootGroup.rotation.x = 0.5;
      rootGroup.rotation.y = 0.6;
    } else {
      // Technology Consulting: 3D Geodesic System & Node Constellation
      const icosaGeom = new THREE.IcosahedronGeometry(1.2, 1);
      geometries.push(icosaGeom);
      const icosaMat = new THREE.MeshStandardMaterial({
        color: secondaryColor,
        wireframe: true,
      });
      materials.push(icosaMat);
      const icosa = new THREE.Mesh(icosaGeom, icosaMat);
      rootGroup.add(icosa);

      const centerCoreGeom = new THREE.OctahedronGeometry(0.7, 0);
      geometries.push(centerCoreGeom);
      const centerCoreMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        metalness: 0.85,
        roughness: 0.2,
      });
      materials.push(centerCoreMat);
      const centerCore = new THREE.Mesh(centerCoreGeom, centerCoreMat);
      rootGroup.add(centerCore);
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

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 240;
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
        mouseRef.current.rotY += delta * 0.45;
        mouseRef.current.rotX += delta * 0.15;
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
  }, [serviceId, theme]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-100/90 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-800 shadow-inner">
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          3D Architecture Model
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-44 sm:h-52 cursor-grab active:cursor-grabbing"
        title="Interactive 3D model - drag to rotate"
      />

      <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span>Click & drag to rotate</span>
        <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">Active WebGL</span>
      </div>
    </div>
  );
};
