import React from 'react';
import { CheckCircle2, Cpu, Globe, Server, Code } from 'lucide-react';
import { AboutModel3D } from '../canvas/AboutModel3D';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial narrative */}
        <div className="lg:col-span-7 pointer-events-auto">
          {/* Section Kicker */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-4 uppercase">
            <span>01</span>
            <span aria-hidden="true">·</span>
            <span>About Estivoxx Technologies</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-balance">
            Turning technical complexity into dependable, scalable enterprise systems.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-balance">
            Estivoxx Technologies is an advanced engineering firm operating within the global Estuscia Group ecosystem. We design and deliver custom software, web platforms, and digital automation systems that allow growing organizations and established enterprises to operate with speed and precision.
          </p>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-balance">
            Rather than relying on generic templates or superficial trends, we apply rigorous software engineering standards—prioritizing performance, type safety, modular microservice architecture, and intuitive human interfaces that endure over years of growth.
          </p>

          {/* Pillars List */}
          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-semibold text-slate-900 dark:text-white">Precision Full-Stack Engineering:</strong>{' '}
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Resilient backend services, type-safe API contracts, and high-performance client interfaces.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-semibold text-slate-900 dark:text-white">Cloud Architecture & Automation:</strong>{' '}
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Automated deployments, elastic scaling, containerization, and proactive uptime monitoring.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-semibold text-slate-900 dark:text-white">Enterprise Ecosystem Integration:</strong>{' '}
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Custom connectors for legacy databases, third-party payment gateways, and enterprise CRMs.
                </span>
              </div>
            </div>
          </div>

          {/* Quantified Rigor Strip (Tabular figures) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                99.98%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Platform Uptime</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                45+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Production Releases</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                &lt;120ms
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Edge Response Latency</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                5
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Engineering Disciplines</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Architecture Model + Structural Specs */}
        <div className="lg:col-span-5 pointer-events-auto space-y-6">
          {/* Dedicated 3D Interactive Model */}
          <AboutModel3D />

          <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Architectural Framework</span>
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400">Production Systems</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                <span className="font-semibold text-slate-900 dark:text-white block">Microservices</span>
                <span className="text-slate-500 text-[11px]">Decoupled event queues</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                <span className="font-semibold text-slate-900 dark:text-white block">Edge Delivery</span>
                <span className="text-slate-500 text-[11px]">Global low-latency CDN</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                <span className="font-semibold text-slate-900 dark:text-white block">Type Safety</span>
                <span className="text-slate-500 text-[11px]">End-to-end contracts</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                <span className="font-semibold text-slate-900 dark:text-white block">Container Scale</span>
                <span className="text-slate-500 text-[11px]">Kubernetes & Cloud Run</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

