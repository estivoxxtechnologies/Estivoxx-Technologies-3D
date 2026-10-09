import React from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreSolutions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreSolutions,
}) => {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-16 pt-32 pointer-events-none">
      {/* Top Anchor Space */}
      <div />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div
          className="
            relative z-20 pointer-events-auto
            -mx-3 rounded-2xl px-3 py-5
            sm:mx-0 sm:px-5 sm:py-6
            bg-white/80
            backdrop-blur-[3px]
            dark:bg-transparent
            dark:backdrop-blur-none
            lg:col-span-8
          "
        >
          {/* Trust Kicker */}
          <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400">
            <span>Estuscia Group Ecosystem</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Custom Digital Systems</span>
          </div>

          {/* Hero Display Headline */}
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            <span className="text-sky-800 dark:text-sky-400">
              Architecting high-performance
            </span>{' '}
            software and digital ecosystems.
          </h1>

          {/* Value Proposition */}
          <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-slate-800 text-balance sm:text-xl dark:text-slate-300">
            Estivoxx Technologies engineers custom enterprise software,
            scalable web platforms, and automated workflows that transform
            computational complexity into dependable business advantage.
          </p>

          {/* Action CTAs */}
          <div className="mb-14 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="
                group inline-flex items-center gap-2 rounded-lg
                bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white
                shadow-md transition-all hover:bg-slate-800
                active:scale-95
                dark:bg-sky-600 dark:hover:bg-sky-500
              "
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onExploreSolutions}
              className="
                inline-flex items-center gap-2 rounded-lg
                border border-slate-300 bg-white px-6 py-3.5
                text-sm font-semibold text-slate-900
                transition-all hover:border-slate-400 hover:bg-slate-50
                dark:border-slate-700 dark:bg-slate-900/70
                dark:text-slate-200 dark:hover:bg-slate-900
              "
            >
              <span>Explore Capabilities</span>
            </button>
          </div>

          {/* Core Trust Vectors */}
          <div className="grid grid-cols-1 gap-6 border-t border-slate-300/90 pt-8 sm:grid-cols-3 dark:border-slate-800/80">
            {/* Modular Architecture */}
            <div className="flex items-start gap-3">
              <Layers className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-400" />
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Modular Architecture
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-700 dark:text-slate-400">
                  Maintainable systems built for multi-year scale.
                </p>
              </div>
            </div>

            {/* High-Throughput Speed */}
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-400" />
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  High-Throughput Speed
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-700 dark:text-slate-400">
                  Optimized latency with resilient cloud execution.
                </p>
              </div>
            </div>

            {/* Enterprise Security */}
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-400" />
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Enterprise Security
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-700 dark:text-slate-400">
                  Audited protocols, RBAC, and zero-trust engineering.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Computational HUD */}
        {/* Keep your existing optional HUD here if needed. */}
      </div>

      {/* Scroll Down Cue */}
      <div className="flex items-center justify-between gap-4 pt-12 pointer-events-auto">
        <button
          type="button"
          onClick={onExploreSolutions}
          className="
            group flex items-center gap-2 text-left
            text-xs font-mono uppercase tracking-wider
            text-slate-700 transition-colors hover:text-slate-950
            dark:text-slate-400 dark:hover:text-white
          "
        >
          <ArrowDown className="h-4 w-4 shrink-0 animate-bounce text-sky-600 dark:text-sky-500" />
          <span>Scroll down to navigate the digital environment</span>
        </button>

        <div className="hidden shrink-0 text-xs font-mono text-slate-600 sm:block dark:text-slate-500">
          Estivoxx Core Platform · Build 2026
        </div>
      </div>
    </section>
  );
};