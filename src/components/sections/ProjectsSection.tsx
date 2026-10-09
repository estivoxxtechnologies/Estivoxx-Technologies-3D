import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCaseStudy } from '../../types';

import enterpriseImage from '../../assets/images/estivoxx_enterprise_platform_1791524466995.jpg';
import cloudImage from '../../assets/images/estivoxx_cloud_infrastructure_1791524481696.jpg';
import digitalImage from '../../assets/images/estivoxx_digital_experience_1791524497798.jpg';
import automationImage from '../../assets/images/estivoxx_automation_systems_1791524509712.jpg';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'enterprise-ops',
    title: 'Enterprise Data Ecosystem & Operations Platform',
    category: 'Enterprise Software & Core Architecture',
    summary:
      'Engineered a centralized multi-tenant operations platform aggregating legacy operational databases into unified real-time telemetry dashboards for executive decision makers.',
    image: enterpriseImage,
    impact:
      'Consolidated 6 legacy internal tools into a unified low-latency operations interface.',
    metrics: [
      { label: 'Latency Reduction', value: '-65%' },
      { label: 'System Concurrency', value: '10,000+ ops/sec' },
      { label: 'Uptime Reliability', value: '99.99%' },
    ],
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    architectureDetails: [
      'De-normalized read models powered by in-memory Redis cluster',
      'Row-level security enforcement with role-based policies',
      'Automated background data normalization workers in Go',
      'Sub-100ms dashboard widget re-computation pipeline',
    ],
  },
  {
    id: 'cloud-infrastructure',
    title: 'High-Throughput Optical Cloud Infrastructure',
    category: 'Cloud Engineering & Systems Reliability',
    summary:
      'Architected resilient microservice orchestration on Kubernetes with automated failover, distributed logging, and multi-region routing across distributed server nodes.',
    image: cloudImage,
    impact:
      'Eliminated single points of failure with automated self-healing container clusters.',
    metrics: [
      { label: 'Cold Start Latency', value: '<40ms' },
      { label: 'Deployment Velocity', value: '15min / release' },
      { label: 'Traffic Resilience', value: '3.5x peak burst' },
    ],
    technologies: [
      'Kubernetes',
      'Docker',
      'Google Cloud',
      'Terraform',
      'Prometheus',
      'Go',
    ],
    architectureDetails: [
      'Multi-zone cluster deployments with automated node auto-scaling',
      'Zero-downtime canary rollout orchestration with automated rollbacks',
      'Distributed telemetry monitoring using Prometheus and Grafana alerts',
      'Hardened private VPC networking with strict mTLS service mesh',
    ],
  },
  {
    id: 'digital-portal',
    title: 'Executive Web Application & Digital Portal',
    category: 'Web Applications & Design Systems',
    summary:
      'Created an ultra-responsive client web portal combining rigorous WCAG AA accessibility, sub-second page loads, and a unified tokenized design system.',
    image: digitalImage,
    impact:
      'Increased client self-service adoption by +140% while cutting support load.',
    metrics: [
      { label: 'Lighthouse Score', value: '98 / 100' },
      { label: 'Client Onboarding', value: '-50% time' },
      { label: 'Mobile Engagement', value: '+78%' },
    ],
    technologies: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'Motion',
    ],
    architectureDetails: [
      'Server-side streaming of initial HTML payloads for zero layout shift',
      'Fine-grained client-side caching with optimistic UI state updates',
      'Comprehensive design token tokens for automated light/dark themes',
      'Modular form stepper with inline schema validation and auto-save',
    ],
  },
  {
    id: 'workflow-automation',
    title: 'Autonomous Event Pipeline & Automation Engine',
    category: 'Business Automation & Integration',
    summary:
      'Built an event-driven automation bridge linking inbound enterprise webhooks, invoice processing pipelines, and internal business logic without human intervention.',
    image: automationImage,
    impact:
      'Replaced manual spreadsheet coordination with audited deterministic event queues.',
    metrics: [
      { label: 'Hours Saved / Month', value: '280+ hrs' },
      { label: 'Error Rate', value: '0.001%' },
      { label: 'Event Throughput', value: '250k / day' },
    ],
    technologies: [
      'Python',
      'Node.js',
      'Cloud Pub/Sub',
      'PostgreSQL',
      'FastAPI',
    ],
    architectureDetails: [
      'Idempotent webhook receivers with dead-letter queue retry mechanisms',
      'Structured audit logging with cryptographic hash verification',
      'Real-time Slack and email notification triggers on priority escalations',
      'Automated reconciliation pipelines with discrepancy alerting',
    ],
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  return (
    <section
      id="work"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 pointer-events-none"
    >
      <div className="pointer-events-auto">
        {/* Section Header — matches ApproachSection */}
        <div className="relative z-20 mb-16 max-w-3xl rounded-2xl bg-white/80 px-3 py-5 backdrop-blur-[3px] sm:px-5 sm:py-6 dark:bg-transparent dark:backdrop-blur-none">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-800 dark:text-sky-400">
            <span>05</span>
            <span aria-hidden="true">·</span>
            <span>Selected Solutions & Architecture</span>
          </div>

          <h2 className="mb-6 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Engineered systems powering real business operations.
          </h2>

          <p className="text-balance text-base font-medium leading-relaxed text-slate-800 sm:text-lg dark:text-slate-300">
            Explore recent software architectures delivered by Estivoxx
            Technologies across enterprise operations, cloud infrastructure,
            and modern web platforms.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              aria-label={`View project: ${project.title}`}
              className="group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-300/80 bg-white/95 p-6 text-left shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/60 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 sm:p-8 dark:border-slate-800/90 dark:bg-slate-900/90 dark:focus-visible:ring-offset-slate-950"
            >
              <div className="w-full">
                {/* Project Image */}
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 truncate text-xs font-mono text-white">
                    {project.category}
                  </div>
                </div>

                {/* Project Title */}
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-slate-950 transition-colors group-hover:text-sky-800 dark:text-white dark:group-hover:text-sky-400">
                    {project.title}
                  </h3>

                  <div className="shrink-0 rounded-lg bg-slate-100 p-2 transition-colors group-hover:bg-sky-50 dark:bg-slate-800 dark:group-hover:bg-sky-950/60">
                    <ArrowUpRight className="h-4 w-4 text-slate-700 transition-colors group-hover:text-sky-700 dark:text-slate-300 dark:group-hover:text-sky-400" />
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {project.summary}
                </p>
              </div>

              <div className="w-full">
                {/* Project Metrics */}
                <div className="mb-4 grid grid-cols-3 gap-2 border-y border-slate-200 py-3 dark:border-slate-800">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="min-w-0">
                      <span className="mb-1 block truncate text-xs text-slate-600 dark:text-slate-400">
                        {metric.label}
                      </span>

                      <span className="block break-words text-sm font-bold font-mono tabular-nums text-slate-950 dark:text-white">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span
                      key={technology}
                      className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}

                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};