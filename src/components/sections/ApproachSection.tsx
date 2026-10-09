import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Search,
  Compass,
  Terminal,
  ShieldAlert,
  Rocket,
} from 'lucide-react';

import { ApproachStep } from '../../types';
import { ApproachModel3D } from '../canvas/ApproachModel3D';

export const approachSteps: ApproachStep[] = [
  {
    step: '01',
    title: 'Discover & Understand',
    subtitle: 'System Modeling & Objective Alignment',
    description:
      'We conduct deep technical discovery to understand your operational workflow, data flows, infrastructure constraints, and strategic business goals. We document clear architectural non-negotiables before writing code.',
    deliverables: [
      'Technical Scope & Feasibility Matrix',
      'System Architecture Blueprint',
      'Data Entity & Relationship Models',
      'Security & Compliance Requirements',
    ],
    keyPractices: [
      'Stakeholder discovery sessions',
      'Risk-first scoping',
      'Clear acceptance criteria',
    ],
  },
  {
    step: '02',
    title: 'Plan & Design',
    subtitle: 'Interactive UI & Scalable Schema Design',
    description:
      'We transform structural requirements into ergonomic, accessible user interfaces and normalized database architectures. Design tokens and reusable component libraries ensure rapid execution without design drift.',
    deliverables: [
      'Interactive High-Fidelity Prototypes',
      'Comprehensive Design Token System',
      'API Contract Specifications (OpenAPI / GraphQL)',
      'Database Schema Migration Scripts',
    ],
    keyPractices: [
      'WCAG AA compliance',
      'Atomic component design',
      'Zero-pill metadata discipline',
    ],
  },
  {
    step: '03',
    title: 'Develop & Integrate',
    subtitle: 'Precision Full-Stack Engineering',
    description:
      'Our engineers write modular, type-safe code with automated linting and continuous integration. Every feature is committed alongside automated unit and integration tests to prevent regression.',
    deliverables: [
      'Modular TypeScript Codebase',
      'Automated CI/CD Delivery Pipeline',
      'Secure Authentication & Authorization (RBAC)',
      'Third-Party Enterprise API Connectors',
    ],
    keyPractices: [
      'Strict TypeScript typing',
      'Clean architecture separation',
      'Git-flow code reviews',
    ],
  },
  {
    step: '04',
    title: 'Test & Refine',
    subtitle: 'Performance Benchmarking & Hardening',
    description:
      'Before release, each build undergoes rigorous stress testing, edge-case validation, cross-browser compatibility tests, and latency profiling under simulated real-world conditions.',
    deliverables: [
      'Load & Concurrency Profiling Report',
      'Security & Vulnerability Audit',
      'Cross-Device & Cross-Browser Verification',
      'User Acceptance Testing Sign-off',
    ],
    keyPractices: [
      'Automated test suites',
      'Lighthouse 95+ performance targets',
      'Penetration screening',
    ],
  },
  {
    step: '05',
    title: 'Launch & Support',
    subtitle: 'Zero-Downtime Deployment & Proactive Scale',
    description:
      'We execute controlled production deployments with rollback safety nets and real-time telemetry. Post-launch, we provide ongoing maintenance SLAs, security updates, and performance monitoring.',
    deliverables: [
      'Production Cloud Infrastructure Deployment',
      'Comprehensive Admin & API Documentation',
      'Real-Time System Health Monitoring & Alerts',
      'Long-Term Maintenance SLA Agreement',
    ],
    keyPractices: [
      'Zero-downtime blue/green releases',
      'Proactive log aggregation',
      'Dedicated support channels',
    ],
  },
];

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = approachSteps[activeStepIndex];

  const getStepIcon = (index: number) => {
    const iconClass = 'h-5 w-5 text-sky-700 dark:text-sky-400';

    switch (index) {
      case 0:
        return <Search className={iconClass} />;
      case 1:
        return <Compass className={iconClass} />;
      case 2:
        return <Terminal className={iconClass} />;
      case 3:
        return <ShieldAlert className={iconClass} />;
      case 4:
      default:
        return <Rocket className={iconClass} />;
    }
  };

  const goToPreviousStep = () => {
    setActiveStepIndex((prev) =>
      prev > 0 ? prev - 1 : approachSteps.length - 1
    );
  };

  const goToNextStep = () => {
    setActiveStepIndex((prev) =>
      prev < approachSteps.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <section
      id="approach"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 pointer-events-none"
    >
      <div className="pointer-events-auto">

        {/* Section Header */}
        <div className="relative z-20 mb-16 max-w-3xl rounded-2xl bg-white/80 px-3 py-5 backdrop-blur-[3px] sm:px-5 sm:py-6 dark:bg-transparent dark:backdrop-blur-none">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400">
            <span>03</span>
            <span aria-hidden="true">·</span>
            <span>Delivery Methodology</span>
          </div>

          <h2 className="mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 text-balance sm:text-5xl dark:text-white">
            A disciplined engineering lifecycle from concept to deployment.
          </h2>

          <p className="text-base font-medium leading-relaxed text-slate-800 text-balance sm:text-lg dark:text-slate-300">
            Software projects succeed through predictable milestones and
            transparent collaboration. Here is how Estivoxx Technologies turns
            complex briefs into dependable digital products.
          </p>
        </div>

        {/* Five-Stage Selector */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {approachSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                aria-pressed={isActive}
                className={`
                  rounded-xl border p-4 text-left transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-sky-500 focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-slate-950
                  ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-md dark:border-sky-500 dark:bg-sky-600'
                      : 'border-slate-300 bg-white/90 text-slate-800 hover:border-sky-400 hover:bg-white dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-900'
                  }
                `}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive
                        ? 'text-sky-300'
                        : 'text-sky-800 dark:text-sky-400'
                    }`}
                  >
                    {step.step}
                  </span>

                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="text-xs font-bold leading-relaxed">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Details */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-10 dark:border-slate-800/90 dark:bg-slate-900/85">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

            {/* Left Column: Stage Information */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-lg border border-sky-200 bg-sky-50 p-3 dark:border-sky-800 dark:bg-sky-950/50">
                  {getStepIcon(activeStepIndex)}
                </div>

                <div className="min-w-0">
                  <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400">
                    Stage {currentStep.step} of 05
                  </span>

                  <h3 className="text-2xl font-extrabold leading-snug text-slate-950 dark:text-white">
                    {currentStep.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-400">
                    {currentStep.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-base font-medium leading-relaxed text-slate-800 dark:text-slate-300">
                {currentStep.description}
              </p>

              {/* Key Practices */}
              <div>
                <h4 className="mb-3 text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                  Key Practices
                </h4>

                <div className="flex flex-wrap gap-2">
                  {currentStep.keyPractices.map((practice) => (
                    <span
                      key={practice}
                      className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Stage & Deliverables */}
            <div className="space-y-4 lg:col-span-5">

              {/* Interactive 3D Stage Model */}
              <ApproachModel3D stageIndex={activeStepIndex} />

              {/* Deliverables Card */}
              <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 dark:border-slate-800/80 dark:bg-slate-950/70">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                  Verified Deliverables
                </h4>

                <div className="space-y-3">
                  {currentStep.deliverables.map((deliverable) => (
                    <div
                      key={deliverable}
                      className="flex items-start gap-2.5 text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-sky-700 dark:text-sky-400" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-300 pt-4 dark:border-slate-800">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-400">
                    Milestone Verification
                  </span>

                  <span className="text-xs font-mono font-semibold text-sky-800 dark:text-sky-400">
                    Client Sign-off
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-300 pt-8 dark:border-slate-800/80">
            <button
              type="button"
              onClick={goToPreviousStep}
              className="text-xs font-semibold text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            >
              ← Previous Phase
            </button>

            <div className="flex items-center gap-1.5">
              {approachSteps.map((step, idx) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  aria-label={`Jump to stage ${idx + 1}`}
                  aria-current={idx === activeStepIndex ? 'step' : undefined}
                  className={`
                    h-2 rounded-full transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-sky-500 focus-visible:ring-offset-2
                    ${
                      idx === activeStepIndex
                        ? 'w-6 bg-sky-600 dark:bg-sky-400'
                        : 'w-2 bg-slate-400 hover:bg-sky-500 dark:bg-slate-700'
                    }
                  `}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-800 transition-colors hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>Next Phase</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};