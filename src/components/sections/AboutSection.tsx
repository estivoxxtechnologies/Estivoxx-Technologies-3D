import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AboutModel3D } from '../canvas/AboutModel3D';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 pointer-events-none"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

        {/* Left Column: Editorial Narrative */}
        <div
          className="
            relative z-20 pointer-events-auto
            -mx-3 rounded-2xl px-3 py-5
            sm:mx-0 sm:px-5 sm:py-6
            bg-white/80 backdrop-blur-[3px]
            dark:bg-transparent dark:backdrop-blur-none
            lg:col-span-7
          "
        >
          {/* Section Kicker */}
          <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400">
            <span>01</span>
            <span aria-hidden="true">·</span>
            <span>About Estivoxx Technologies</span>
          </div>

          {/* Section Heading */}
          <h2 className="mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 text-balance sm:text-5xl dark:text-white">
            Turning technical complexity into dependable, scalable enterprise
            systems.
          </h2>

          {/* Introduction */}
          <p className="mb-6 text-base font-medium leading-relaxed text-slate-800 text-balance sm:text-lg dark:text-slate-300">
            Estivoxx Technologies is an advanced engineering firm operating
            within the global Estuscia Group ecosystem. We design and deliver
            custom software, web platforms, and digital automation systems that
            allow growing organizations and established enterprises to operate
            with speed and precision.
          </p>

          <p className="mb-8 text-base font-medium leading-relaxed text-slate-800 text-balance sm:text-lg dark:text-slate-300">
            Rather than relying on generic templates or superficial trends, we
            apply rigorous software engineering standards—prioritizing
            performance, type safety, modular microservice architecture, and
            intuitive human interfaces that endure over years of growth.
          </p>

          {/* Engineering Pillars */}
          <div className="mb-10 space-y-5">

            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-400" />
              <div>
                <strong className="text-sm font-bold text-slate-950 dark:text-white">
                  Precision Full-Stack Engineering:
                </strong>{' '}
                <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  Resilient backend services, type-safe API contracts, and
                  high-performance client interfaces.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-400" />
              <div>
                <strong className="text-sm font-bold text-slate-950 dark:text-white">
                  Cloud Architecture & Automation:
                </strong>{' '}
                <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  Automated deployments, elastic scaling, containerization, and
                  proactive uptime monitoring.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-400" />
              <div>
                <strong className="text-sm font-bold text-slate-950 dark:text-white">
                  Enterprise Ecosystem Integration:
                </strong>{' '}
                <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  Custom connectors for legacy databases, third-party payment
                  gateways, and enterprise CRMs.
                </span>
              </div>
            </div>

          </div>

          {/* Engineering Metrics */}
          <div className="grid grid-cols-2 gap-6 border-t border-slate-300/90 pt-8 sm:grid-cols-4 dark:border-slate-800/80">

            <div>
              <div className="font-mono text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl dark:text-white">
                99.98%
              </div>
              <div className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-400">
                Platform Uptime
              </div>
            </div>

            <div>
              <div className="font-mono text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl dark:text-white">
                45+
              </div>
              <div className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-400">
                Production Releases
              </div>
            </div>

            <div>
              <div className="font-mono text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl dark:text-white">
                &lt;120ms
              </div>
              <div className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-400">
                Edge Response Latency
              </div>
            </div>

            <div>
              <div className="font-mono text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl dark:text-white">
                5
              </div>
              <div className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-400">
                Engineering Disciplines
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive 3D Model & Architecture */}
        <div className="relative z-10 space-y-6 pointer-events-auto lg:col-span-5">

          {/* Interactive 3D Model */}
          <AboutModel3D />

          {/* Architectural Framework Card */}
          <div
            className="
              space-y-4 rounded-2xl border border-slate-200
              bg-white/90 p-6 shadow-lg backdrop-blur-md
              dark:border-slate-800/90 dark:bg-slate-900/70
            "
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800/80">
              <span className="text-xs font-mono uppercase text-slate-700 dark:text-slate-400">
                Architectural Framework
              </span>
              <span className="text-right text-xs font-mono font-semibold text-sky-800 dark:text-sky-400">
                Production Systems
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                <span className="mb-1 block font-bold text-slate-950 dark:text-white">
                  Microservices
                </span>
                <span className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-400">
                  Decoupled event queues
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                <span className="mb-1 block font-bold text-slate-950 dark:text-white">
                  Edge Delivery
                </span>
                <span className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-400">
                  Global low-latency CDN
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                <span className="mb-1 block font-bold text-slate-950 dark:text-white">
                  Type Safety
                </span>
                <span className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-400">
                  End-to-end contracts
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700/50 dark:bg-slate-800/50">
                <span className="mb-1 block font-bold text-slate-950 dark:text-white">
                  Container Scale
                </span>
                <span className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-400">
                  Kubernetes & Cloud Run
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};