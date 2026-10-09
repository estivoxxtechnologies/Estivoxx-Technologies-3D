import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Search, Compass, Terminal, ShieldAlert, Rocket } from 'lucide-react';
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
    keyPractices: ['Stakeholder discovery sessions', 'Risk-first scoping', 'Clear acceptance criteria'],
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
    keyPractices: ['WCAG AA compliance', 'Atomic component design', 'Zero-pill metadata discipline'],
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
    keyPractices: ['Strict TypeScript typing', 'Clean architecture separation', 'Git-flow code reviews'],
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
    keyPractices: ['Automated test suites', 'Lighthouse 95+ performance targets', 'Penetration screening'],
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
    keyPractices: ['Zero-downtime blue/green releases', 'Proactive log aggregation', 'Dedicated support channels'],
  },
];

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = approachSteps[activeStepIndex];

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-sky-500" />;
      case 1:
        return <Compass className="w-5 h-5 text-sky-500" />;
      case 2:
        return <Terminal className="w-5 h-5 text-sky-500" />;
      case 3:
        return <ShieldAlert className="w-5 h-5 text-sky-500" />;
      case 4:
      default:
        return <Rocket className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section id="approach" className="relative py-32 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-4 uppercase">
            <span>03</span>
            <span aria-hidden="true">·</span>
            <span>Delivery Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-balance">
            A disciplined engineering lifecycle from concept to deployment.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Software projects succeed through predictable milestones and transparent collaboration. Here is how Estivoxx Technologies turns complex briefs into dependable digital products.
          </p>
        </div>

        {/* Step Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {approachSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-sky-600 dark:text-white border-transparent shadow-md'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-sky-300' : 'text-sky-600 dark:text-sky-400'}`}>
                    {step.step}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </div>
                <div className="text-xs font-semibold truncate">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800">
                  {getStepIcon(activeStepIndex)}
                </div>
                <div>
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                    Stage {currentStep.step} of 05
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentStep.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Key Practices
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStep.keyPractices.map((practice, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* Dedicated 3D Stage Visual Geometry */}
              <ApproachModel3D stageIndex={activeStepIndex} />

              <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Verified Deliverables
                </h4>
                <div className="space-y-3">
                  {currentStep.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Milestone Verification</span>
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
                    Client Signed Off
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-8 mt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : approachSteps.length - 1))}
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ← Previous Phase
            </button>

            <div className="flex items-center gap-1.5">
              {approachSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStepIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeStepIndex ? 'w-6 bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Jump to stage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStepIndex((prev) => (prev < approachSteps.length - 1 ? prev + 1 : 0))}
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
            >
              <span>Next Phase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
