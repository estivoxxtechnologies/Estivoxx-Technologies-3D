import React, { useState } from 'react';
import {
  ArrowUpRight,
  Code,
  Globe,
  Cog,
  Palette,
  Network,
  Check,
} from 'lucide-react';

import { ServiceItem } from '../../types';
import { ServiceModel3D } from '../canvas/ServiceModel3D';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software Development',
    headline:
      'Engineered for resilience, high throughput, and mission-critical workflows.',
    description:
      'We design and build bespoke software applications engineered to your precise operational specifications. From complex backends to multi-tenant architectures, our solutions eliminate operational friction and scale effortlessly.',
    deliverables: [
      'Modular Microservice Architecture',
      'High-Throughput Distributed Backends',
      'Custom Workflow & Logic Engines',
      'Role-Based Access Control (RBAC)',
      'Type-Safe API Contracts (REST / GraphQL / gRPC)',
    ],
    techStack: [
      'Node.js',
      'Go',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    timeline: '6 — 14 weeks typical delivery',
    iconName: 'Code',
  },
  {
    id: 'web-development',
    number: '02',
    title: 'Web Application & Platform Engineering',
    headline:
      'Modern, high-performance web experiences with sub-second responsiveness.',
    description:
      'We craft progressive web applications, client portals, and corporate digital ecosystems using modern frameworks. Every platform is optimized for accessibility, search performance, and responsive fluidity across devices.',
    deliverables: [
      'Server-Rendered React & Next.js Platforms',
      'Real-Time Collaborative Dashboards',
      'Headless CMS & Commerce Architectures',
      'Zero-Latency Client-Side Routing',
      'Enterprise WCAG Accessibility Compliance',
    ],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Three.js',
      'Vite',
    ],
    timeline: '4 — 10 weeks typical delivery',
    iconName: 'Globe',
  },
  {
    id: 'business-automation',
    number: '03',
    title: 'Business Automation & Digital Workflows',
    headline:
      'Eliminating repetitive manual tasks with reliable computational pipelines.',
    description:
      'Transform disorganized manual processes into synchronized, automated systems. We integrate your core tools, streamline data ingestion, and orchestrate automated communications across your entire organization.',
    deliverables: [
      'Automated Multi-System Data Synchronization',
      'Custom Webhook & Event-Driven Processors',
      'Document & Invoice Processing Pipelines',
      'Automated Inbound Lead & Customer Routing',
      'Intelligent Notification & Alert Systems',
    ],
    techStack: [
      'Python',
      'Node.js',
      'PostgreSQL',
      'Cloud Run',
      'AWS Lambda',
      'Pub/Sub',
    ],
    timeline: '3 — 8 weeks typical delivery',
    iconName: 'Cog',
  },
  {
    id: 'ui-ux-design',
    number: '04',
    title: 'UI/UX Design Systems & Product Strategy',
    headline:
      'Intuitive, aesthetically restrained interfaces that reduce cognitive friction.',
    description:
      'We design digital user experiences backed by rigorous user research and systematic component architecture. Our design systems provide reusable UI tokens that maintain visual harmony and accelerate development velocity.',
    deliverables: [
      'Atomic Design Systems & Reusable Token Libraries',
      'High-Fidelity Interactive Wireframes & Prototypes',
      'User Journey Mapping & Ergonomic Audits',
      'Comprehensive Design-to-Code Documentation',
      'Light/Dark Adaptive Design Specs',
    ],
    techStack: [
      'Figma',
      'Design Tokens',
      'Tailwind CSS',
      'Storybook',
      'Motion',
    ],
    timeline: '3 — 6 weeks typical delivery',
    iconName: 'Palette',
  },
  {
    id: 'tech-consulting',
    number: '05',
    title: 'Technology Consulting & Systems Integration',
    headline:
      'Strategic architectural guidance to future-proof your digital operations.',
    description:
      'Our senior engineers partner with your leadership to audit existing software, modernize legacy codebases, strengthen cloud security, and plan pragmatic technology roadmaps aligned with business objectives.',
    deliverables: [
      'Comprehensive Architecture & Codebase Audits',
      'Legacy Modernization & Cloud Migration Strategies',
      'Database Query Profiling & Performance Tuning',
      'Security Posture & Vulnerability Hardening',
      'Third-Party Enterprise API Orchestration',
    ],
    techStack: [
      'GCP',
      'AWS',
      'Kubernetes',
      'Terraform',
      'PostgreSQL',
      'Docker',
    ],
    timeline: 'Flexible retainer or scoped advisory sprints',
    iconName: 'Network',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const [activeTab, setActiveTab] = useState<string>(servicesData[0].id);

  const currentService =
    servicesData.find((service) => service.id === activeTab) ||
    servicesData[0];

  const getIcon = (iconName: string) => {
    const iconClass =
      'h-5 w-5 text-sky-700 dark:text-sky-400';

    switch (iconName) {
      case 'Code':
        return <Code className={iconClass} />;
      case 'Globe':
        return <Globe className={iconClass} />;
      case 'Cog':
        return <Cog className={iconClass} />;
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'Network':
      default:
        return <Network className={iconClass} />;
    }
  };

  return (
    <section
      id="services"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 pointer-events-none"
    >
      <div className="pointer-events-auto">

        {/* Section Header */}
        <div className="relative z-20 mb-16 max-w-3xl rounded-2xl bg-white/80 px-3 py-5 backdrop-blur-[3px] sm:px-5 sm:py-6 dark:bg-transparent dark:backdrop-blur-none">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>Services & Solutions</span>
          </div>

          <h2 className="mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 text-balance sm:text-5xl dark:text-white">
            Specialized engineering disciplines for ambitious enterprises.
          </h2>

          <p className="text-base font-medium leading-relaxed text-slate-800 text-balance sm:text-lg dark:text-slate-300">
            We operate across five interconnected domains, bridging the gap
            between strategic concept and production-grade software deployment.
          </p>
        </div>

        {/* Interactive Services Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

          {/* Left Column: Service Selector */}
          <div className="space-y-3 lg:col-span-5">
            {servicesData.map((service) => {
              const isSelected = activeTab === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveTab(service.id)}
                  aria-pressed={isSelected}
                  className={`
                    w-full rounded-xl border p-5 text-left
                    transition-all duration-200
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-sky-500
                    focus-visible:ring-offset-2
                    dark:focus-visible:ring-offset-slate-950
                    ${
                      isSelected
                        ? 'translate-x-1 border-sky-600 bg-white shadow-md ring-1 ring-sky-500/20 dark:border-sky-500/80 dark:bg-slate-900'
                        : 'border-slate-300 bg-white/90 hover:border-sky-400 hover:bg-white dark:border-slate-800/80 dark:bg-slate-950/80 dark:hover:border-slate-700 dark:hover:bg-slate-900/80'
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="shrink-0 font-mono text-xs font-bold text-sky-800 dark:text-sky-400">
                        {service.number}.
                      </span>

                      <h3 className="text-sm font-bold leading-relaxed text-slate-950 dark:text-white">
                        {service.title}
                      </h3>
                    </div>

                    {isSelected && (
                      <span className="shrink-0 text-xs font-semibold text-sky-800 dark:text-sky-400">
                        Viewing
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Service Details */}
          <div className="lg:col-span-7">
            <div
              className="
                space-y-8 rounded-2xl border border-slate-200
                bg-white/95 p-6 shadow-xl backdrop-blur-md
                sm:p-10
                dark:border-slate-800/90 dark:bg-slate-900/85
              "
            >
              {/* Service Heading */}
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="shrink-0 rounded-lg border border-sky-200 bg-sky-50 p-3 dark:border-sky-800 dark:bg-sky-950/50">
                    {getIcon(currentService.iconName)}
                  </div>

                  <div className="min-w-0">
                    <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400">
                      Discipline {currentService.number}
                    </span>

                    <h3 className="text-xl font-extrabold leading-snug text-slate-950 sm:text-2xl dark:text-white">
                      {currentService.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(currentService)}
                  className="
                    inline-flex shrink-0 items-center gap-1.5 rounded-md
                    border border-sky-300 bg-white px-3.5 py-2
                    text-xs font-bold text-sky-800 transition-colors
                    hover:bg-sky-50
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-sky-500
                    dark:border-sky-800 dark:bg-slate-900
                    dark:text-sky-400 dark:hover:bg-sky-950/50
                  "
                >
                  <span>Detailed Specs</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Service Headline */}
              <p className="text-base font-semibold leading-relaxed text-slate-900 dark:text-slate-200">
                {currentService.headline}
              </p>

              {/* Interactive 3D Service Model */}
              <ServiceModel3D serviceId={currentService.id} />

              {/* Service Description */}
              <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-400">
                {currentService.description}
              </p>

              {/* Deliverables */}
              <div>
                <h4 className="mb-4 text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                  Key Production Deliverables
                </h4>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentService.deliverables.map((deliverable) => (
                    <div
                      key={deliverable}
                      className="flex items-start gap-2 text-xs leading-relaxed text-slate-800 dark:text-slate-300"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700 dark:text-sky-400" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack & Timeline */}
              <div className="flex flex-col items-start justify-between gap-5 border-t border-slate-300 pt-6 sm:flex-row dark:border-slate-800/80">
                <div className="min-w-0">
                  <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-400">
                    Primary Technologies
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    {currentService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-md border border-slate-200 bg-slate-100
                          px-2 py-1 text-xs font-mono text-slate-800
                          dark:border-slate-700 dark:bg-slate-800
                          dark:text-slate-300
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sm:max-w-[45%] sm:text-right">
                  <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-400">
                    Engagement Timeline
                  </span>

                  <span className="text-xs font-bold leading-relaxed text-slate-950 dark:text-white">
                    {currentService.timeline}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};