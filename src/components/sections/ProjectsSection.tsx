import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCaseStudy } from '../../types';

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
    image: '/src/assets/images/estivoxx_enterprise_platform_1791524466995.jpg',
    impact: 'Consolidated 6 legacy internal tools into a unified low-latency operations interface.',
    metrics: [
      { label: 'Latency Reduction', value: '-65%' },
      { label: 'System Concurrency', value: '10,000+ ops/sec' },
      { label: 'Uptime Reliability', value: '99.99%' },
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
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
    image: '/src/assets/images/estivoxx_cloud_infrastructure_1791524481696.jpg',
    impact: 'Eliminated single points of failure with automated self-healing container clusters.',
    metrics: [
      { label: 'Cold Start Latency', value: '<40ms' },
      { label: 'Deployment Velocity', value: '15min / release' },
      { label: 'Traffic Resilience', value: '3.5x peak burst' },
    ],
    technologies: ['Kubernetes', 'Docker', 'Google Cloud', 'Terraform', 'Prometheus', 'Go'],
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
    image: '/src/assets/images/estivoxx_digital_experience_1791524497798.jpg',
    impact: 'Increased client self-service adoption by +140% while cutting support load.',
    metrics: [
      { label: 'Lighthouse Score', value: '98 / 100' },
      { label: 'Client Onboarding', value: '-50% time' },
      { label: 'Mobile Engagement', value: '+78%' },
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion'],
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
    image: '/src/assets/images/estivoxx_automation_systems_1791524509712.jpg',
    impact: 'Replaced manual spreadsheet coordination with audited deterministic event queues.',
    metrics: [
      { label: 'Hours Saved / Month', value: '280+ hrs' },
      { label: 'Error Rate', value: '0.001%' },
      { label: 'Event Throughput', value: '250k / day' },
    ],
    technologies: ['Python', 'Node.js', 'Cloud Pub/Sub', 'PostgreSQL', 'FastAPI'],
    architectureDetails: [
      'Idempotent webhook receivers with dead-letter queue retry mechanisms',
      'Structured audit logging with cryptographic hash verification',
      'Real-time Slack and email notification triggers on priority escalations',
      'Automated reconciliation pipelines with discrepancy alerting',
    ],
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="work" className="relative py-32 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-4 uppercase">
            <span>05</span>
            <span aria-hidden="true">·</span>
            <span>Selected Solutions & Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-balance">
            Engineered systems powering real business operations.
          </h2>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-balance">
            Explore recent software architectures delivered by Estivoxx Technologies across enterprise operations, cloud infrastructure, and modern web platforms.
          </p>
        </div>

        {/* 2x2 Editorial Grid with Generated Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group p-6 sm:p-8 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800/90 backdrop-blur-md shadow-md hover:shadow-2xl hover:border-sky-500/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Media Container with Zero-Broken-Image Fallback */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gracefully if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white/95 truncate">
                    {project.category}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/60 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  {project.summary}
                </p>
              </div>

              <div>
                {/* Metrics strip */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200/80 dark:border-slate-800/80 mb-4">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">{m.label}</span>
                      <span className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono text-slate-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
