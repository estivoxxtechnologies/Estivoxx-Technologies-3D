import React from 'react';
import { ArrowDown, ArrowUpRight, Layers, ShieldCheck, Zap, Compass, RotateCw } from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreSolutions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreSolutions,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      {/* Top Anchor Space */}
      <div />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 pointer-events-auto">
          {/* Subtle, unboxed trust kicker (Zero-Pill compliant) */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-600 dark:text-slate-400 mb-6 uppercase">
            <span>Estuscia Group Ecosystem</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Custom Digital Systems</span>
          </div>

          {/* Hero Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] text-balance mb-6">
            Architecting high-performance software and digital ecosystems.
          </h1>

          {/* Value Proposition */}
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-10 text-balance">
            Estivoxx Technologies engineers custom enterprise software, scalable web platforms, and automated workflows that transform computational complexity into dependable business advantage.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-md transition-all group active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreSolutions}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg backdrop-blur-sm transition-all"
            >
              <span>Explore Capabilities</span>
            </button>
          </div>

          {/* 3 Core Trust Vectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Modular Architecture</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Maintainable systems built for multi-year scale.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">High-Throughput Speed</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Optimized latency with resilient cloud execution.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Enterprise Security</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Audited protocols, RBAC, and zero-trust engineering.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Computational HUD */}
        {/* <div className="lg:col-span-4 pointer-events-auto hidden lg:block">
          <div className="p-6 rounded-2xl bg-white/85 dark:bg-slate-900/75 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
              <span className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400">Computational Engine</span>
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">Live 3D Spine</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Geometry Type:</span>
                <span className="font-mono font-semibold">Geodesic Icosahedron</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Service Nodes:</span>
                <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">6 Dynamic Orbitals</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Conduit Beams:</span>
                <span className="font-mono font-semibold">Real-time Buffer Lines</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Spatial Interaction:</span>
                <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">Cursor & Scroll Inertia</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="text-[11px] text-slate-500 leading-relaxed">
                Click & drag anywhere on the canvas to rotate the central architectural core in 3D space.
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Scroll Down Cue */}
      <div className="flex items-center justify-between pt-12 pointer-events-auto">
        <button
          onClick={onExploreSolutions}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors group"
        >
          <ArrowDown className="w-4 h-4 text-sky-500 animate-bounce" />
          <span>Scroll down to navigate the digital environment</span>
        </button>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-500 hidden sm:block">
          Estivoxx Core Platform · Build 2026
        </div>
      </div>
    </section>
  );
};
