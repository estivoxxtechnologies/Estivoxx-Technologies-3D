import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface HeroExperience3DProps {
  scrollProgress: number; // 0 to 1
  isInteracting?: boolean;
}

export const HeroExperience3D: React.FC<HeroExperience3DProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [hasWebGl, setHasWebGl] = useState(true);
  const [isOrbiting, setIsOrbiting] = useState(false);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const conduitsRef = useRef<THREE.LineSegments | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    dirLight1: THREE.DirectionalLight;
    dirLight2: THREE.DirectionalLight;
    pointLight: THREE.PointLight;
  } | null>(null);

  // Mouse & touch tracking with lerp
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, lastX: 0, lastY: 0 });
  const manualRotRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGl(false);
      }
    } catch {
      setHasWebGl(false);
    }
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!hasWebGl || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isDark = theme === 'dark';
    const bgColor = isDark ? 0x050811 : 0xf8fafc;
    const fogColor = isDark ? 0x050811 : 0xf8fafc;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(fogColor, 0.045);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.15 : 0.95;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTING
    const ambient = new THREE.AmbientLight(isDark ? 0x1e293b : 0xe2e8f0, isDark ? 1.2 : 1.8);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, isDark ? 3.0 : 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(isDark ? 0x6366f1 : 0x2563eb, isDark ? 2.2 : 1.5);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(isDark ? 0x00f0ff : 0x0369a1, isDark ? 4.5 : 2.5, 12);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    lightsRef.current = { ambient, dirLight1, dirLight2, pointLight };

    // MASTER ROOT GROUP
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. CORE ARCHITECTURAL OBJECT
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // Inner Geometric Polyhedral Crystal
    const innerGeom = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0f172a : 0x1e293b,
      metalness: 0.85,
      roughness: 0.2,
      reflectivity: 0.9,
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    // Outer Geodesic Architectural Wireframe Cage
    const wireGeom = new THREE.IcosahedronGeometry(1.48, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.9,
      roughness: 0.2,
      metalness: 0.9,
    });
    const wireCage = new THREE.Mesh(wireGeom, wireMat);
    coreGroup.add(wireCage);

    // Quantum Light Nucleus
    const nucleusGeom = new THREE.SphereGeometry(0.48, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: false,
    });
    const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
    coreGroup.add(nucleus);

    // 2. CONCENTRIC GYROSCOPE RINGS
    const ringsGroup = new THREE.Group();
    rootGroup.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: isDark ? 0x64748b : 0x334155,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.025, 16, 90), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringsGroup.add(ring1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0284c7 : 0x1d4ed8,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 16, 100), ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringsGroup.add(ring2);

    // 3. MODULAR SATELLITE NODES (Representing the 5 Service Pillars)
    const nodesGroup = new THREE.Group();
    rootGroup.add(nodesGroup);
    nodesGroupRef.current = nodesGroup;

    const nodeCount = 6;
    const nodeGeom = new THREE.OctahedronGeometry(0.2, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x0369a1,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodeMeshes: THREE.Mesh[] = [];
    const baseNodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4;
      const x = Math.cos(angle) * radius;
      const y = (Math.sin(i * 1.5) * 0.8);
      const z = Math.sin(angle) * radius;
      const node = new THREE.Mesh(nodeGeom, nodeMat.clone());
      node.position.set(x, y, z);
      nodesGroup.add(node);
      nodeMeshes.push(node);
      baseNodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Dynamic Conduits / Connection Beams connecting Core to Satellite Nodes
    const conduitPositions = new Float32Array(nodeCount * 2 * 3);
    const conduitGeometry = new THREE.BufferAttribute(conduitPositions, 3);
    const conduitBufferGeom = new THREE.BufferGeometry();
    conduitBufferGeom.setAttribute('position', conduitGeometry);

    const conduitMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x0284c7 : 0x2563eb,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const conduits = new THREE.LineSegments(conduitBufferGeom, conduitMat);
    nodesGroup.add(conduits);
    conduitsRef.current = conduits;

    // 4. FLOATING DATA CONSTELLATION PARTICLES
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      size: 0.035,
      transparent: true,
      opacity: isDark ? 0.55 : 0.4,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    rootGroup.add(particles);
    particlesRef.current = particles;

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // MOUSE & TOUCH LISTENERS
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;

      if (mouseRef.current.isDown && isOrbiting) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        manualRotRef.current.y += deltaX * 0.005;
        manualRotRef.current.x += deltaY * 0.005;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handlePointerUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // WebGL Context Lost / Restored listeners
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
    };

    const handleContextRestored = () => {
      console.info('WebGL context restored');
      handleResize();
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const scroll = scrollRef.current; // 0 to 1

      // Mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // SCROLL-DRIVEN TRANSFORMATIONS
      // Stage 0 (0.0 to 0.18): Hero Centerpiece
      // Stage 1 (0.18 to 0.40): About Estivoxx - Object translates to right side, camera rotates
      // Stage 2 (0.40 to 0.62): Services - Node constellation expands outwards, conduits glow
      // Stage 3 (0.62 to 0.82): Delivery Approach - Longitudinal alignment
      // Stage 4 (0.82 to 1.0): Enterprise Scale & Contact
      
      const isMobile = window.innerWidth < 768;

      let targetX = 0;
      let targetY = 0;
      let targetZ = 7.5;
      let targetRotX = 0;
      let targetRotY = 0;
      let targetExpansion = 1.0;

      if (scroll < 0.2) {
        // Hero
        const t = scroll / 0.2;
        targetX = isMobile ? 0 : 0.8 * t;
        targetY = 0;
        targetZ = isMobile ? 8.5 : 7.2;
        targetRotX = elapsedTime * 0.2 + mouseY * 0.3;
        targetRotY = elapsedTime * 0.25 + mouseX * 0.3;
        targetExpansion = 1.0;
      } else if (scroll < 0.45) {
        // About Section (Shift 3D structure to right side to frame the editorial copy)
        const t = (scroll - 0.2) / 0.25;
        targetX = isMobile ? 0 : 1.9;
        targetY = 0.2;
        targetZ = isMobile ? 8.2 : 6.8;
        targetRotX = 0.4 + mouseY * 0.4;
        targetRotY = (elapsedTime * 0.3) + (t * Math.PI) + mouseX * 0.4;
        targetExpansion = 1.0 + (t * 0.3);
      } else if (scroll < 0.7) {
        // Services Section (Nodes expand into distinct clusters)
        const t = (scroll - 0.45) / 0.25;
        targetX = isMobile ? 0 : -1.8 + (t * 3.6);
        targetY = -0.3;
        targetZ = isMobile ? 8.8 : 7.0;
        targetRotX = (t * 0.6) + mouseY * 0.3;
        targetRotY = (elapsedTime * 0.35) + mouseX * 0.3;
        targetExpansion = 1.35 + Math.sin(t * Math.PI) * 0.3;
      } else if (scroll < 0.88) {
        // Approach Section (Process flow)
        const t = (scroll - 0.7) / 0.18;
        targetX = isMobile ? 0 : 1.5 - (t * 1.5);
        targetY = 0.4 - (t * 0.8);
        targetZ = 7.4;
        targetRotX = 0.6 + mouseY * 0.2;
        targetRotY = elapsedTime * 0.25 + mouseX * 0.3;
        targetExpansion = 1.1;
      } else {
        // Contact Section (Stable, centered low-profile foundation)
        targetX = 0;
        targetY = -0.6;
        targetZ = 7.6;
        targetRotX = 0.2 + mouseY * 0.15;
        targetRotY = elapsedTime * 0.15 + mouseX * 0.2;
        targetExpansion = 1.0;
      }

      // Smooth Camera & Group Lerping
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.lookAt(targetX * 0.4, targetY * 0.4, 0);

      // Core rotation with manual orbit offset if interacting
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.x = targetRotX + manualRotRef.current.x;
        coreGroupRef.current.rotation.y = targetRotY + manualRotRef.current.y;
        
        // Inner core breathing scale
        const scale = 1.0 + Math.sin(elapsedTime * 1.5) * 0.04;
        innerCore.scale.set(scale, scale, scale);
        wireCage.rotation.y -= 0.005;
        wireCage.rotation.z += 0.003;
      }

      // Gyroscope Rings rotation
      if (ringsGroupRef.current) {
        ring1.rotation.x += 0.006;
        ring1.rotation.y += 0.004;
        ring2.rotation.y += 0.008;
        ring2.rotation.z += 0.005;
      }

      // Satellite Nodes orbiting & expanding
      if (nodesGroupRef.current && conduitsRef.current) {
        nodesGroupRef.current.rotation.y += 0.004;

        const posAttr = conduitsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < nodeCount; i++) {
          const node = nodeMeshes[i];
          const basePos = baseNodePositions[i];
          const nodeAngle = (i / nodeCount) * Math.PI * 2 + (elapsedTime * 0.3);
          const currentRadius = 2.3 * targetExpansion;

          const nx = Math.cos(nodeAngle) * currentRadius;
          const ny = basePos.y + Math.sin(elapsedTime * 2 + i) * 0.25;
          const nz = Math.sin(nodeAngle) * currentRadius;

          node.position.set(nx, ny, nz);
          node.rotation.x += 0.02;
          node.rotation.y += 0.03;

          // Update conduit line segments from center (0,0,0) to node position
          const lineIndex = i * 6;
          positions[lineIndex] = 0;
          positions[lineIndex + 1] = 0;
          positions[lineIndex + 2] = 0;
          positions[lineIndex + 3] = nx;
          positions[lineIndex + 4] = ny;
          positions[lineIndex + 5] = nz;
        }

        posAttr.needsUpdate = true;
      }

      // Subtle particle drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.03;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);

      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);

      // Dispose geometries & materials
      innerGeom.dispose();
      innerMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      nucleusGeom.dispose();
      nucleusMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      conduitBufferGeom.dispose();
      conduitMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container && container.contains(canvasEl)) {
        container.removeChild(canvasEl);
      }
    };
  }, [hasWebGl, theme, isOrbiting]);

  // Update theme colors dynamically on existing scene if theme changes without full rebuild
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current || !lightsRef.current) return;
    const isDark = theme === 'dark';
    const bgColor = isDark ? 0x050811 : 0xf8fafc;
    const fogColor = isDark ? 0x050811 : 0xf8fafc;

    sceneRef.current.background = new THREE.Color(bgColor);
    sceneRef.current.fog = new THREE.FogExp2(fogColor, 0.045);
    rendererRef.current.toneMappingExposure = isDark ? 1.15 : 0.95;

    const { ambient, dirLight1, dirLight2, pointLight } = lightsRef.current;
    ambient.color.setHex(isDark ? 0x1e293b : 0xe2e8f0);
    ambient.intensity = isDark ? 1.2 : 1.8;

    dirLight1.color.setHex(isDark ? 0x38bdf8 : 0x0284c7);
    dirLight1.intensity = isDark ? 3.0 : 2.0;

    dirLight2.color.setHex(isDark ? 0x6366f1 : 0x2563eb);
    dirLight2.intensity = isDark ? 2.2 : 1.5;

    pointLight.color.setHex(isDark ? 0x00f0ff : 0x0369a1);
    pointLight.intensity = isDark ? 4.5 : 2.5;
  }, [theme]);

  if (!hasWebGl) {
    // Elegant fallback container when WebGL is unavailable
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-40">
        <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-sky-500/20 via-blue-600/10 to-indigo-700/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div ref={containerRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
      
      {/* Subtle indicator of interactive spatial capability */}
      {/* <div className="absolute bottom-6 right-6 z-10 pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-slate-950/70 border border-slate-700/40 dark:border-slate-800 backdrop-blur-md text-xs text-slate-300 dark:text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        <span>Computational Spatial Spine</span>
        <button
          onClick={() => setIsOrbiting((prev) => !prev)}
          className="ml-2 underline text-sky-400 hover:text-sky-300 transition-colors"
          title="Toggle free orbit inspection"
        >
          {isOrbiting ? 'Resume Story' : 'Free Inspect'}
        </button>
      </div> */}
    </div>
  );
};
