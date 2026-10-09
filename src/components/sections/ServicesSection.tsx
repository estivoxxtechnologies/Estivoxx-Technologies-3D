import React, { useState } from 'react';
import { ArrowUpRight, Code, Globe, Cog, Palette, Network, Check } from 'lucide-react';
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
    headline: 'Engineered for resilience, high throughput, and mission-critical workflows.',
    description:
      'We design and build bespoke software applications engineered to your precise operational specifications. From complex backends to multi-tenant architectures, our solutions eliminate operational friction and scale effortlessly.',
    deliverables: [
      'Modular Microservice Architecture',
      'High-Throughput Distributed Backends',
      'Custom Workflow & Logic Engines',
      'Role-Based Access Control (RBAC)',
      'Type-Safe API Contracts (REST / GraphQL / gRPC)',
    ],
    techStack: ['Node.js', 'Go', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    timeline: '6 — 14 weeks typical delivery',
    iconName: 'Code',
  },
  {
    id: 'web-development',
    number: '02',
    title: 'Web Application & Platform Engineering',
    headline: 'Modern, high-performance web experiences with sub-second responsiveness.',
    description:
      'We craft progressive web applications, client portals, and corporate digital ecosystems using modern frameworks. Every platform is optimized for accessibility, search performance, and responsive fluidity across devices.',
    deliverables: [
      'Server-Rendered React & Next.js Platforms',
      'Real-Time Collaborative Dashboards',
      'Headless CMS & Commerce Architectures',
      'Zero-Latency Client-Side Routing',
      'Enterprise WCAG Accessibility Compliance',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Vite'],
    timeline: '4 — 10 weeks typical delivery',
    iconName: 'Globe',
  },
  {
    id: 'business-automation',
    number: '03',
    title: 'Business Automation & Digital Workflows',
    headline: 'Eliminating repetitive manual tasks with reliable computational pipelines.',
    description:
      'Transform disorganized manual processes into synchronized, automated systems. We integrate your core tools, streamline data ingestion, and orchestrate automated communications across your entire organization.',
    deliverables: [
      'Automated Multi-System Data Synchronization',
      'Custom Webhook & Event-Driven Processors',
      'Document & Invoice Processing Pipelines',
      'Automated Inbound Lead & Customer Routing',
      'Intelligent Notification & Alert Systems',
    ],
    techStack: ['Python', 'Node.js', 'PostgreSQL', 'Cloud Run', 'AWS Lambda', 'Pub/Sub'],
    timeline: '3 — 8 weeks typical delivery',
    iconName: 'Cog',
  },
  {
    id: 'ui-ux-design',
    number: '04',
    title: 'UI/UX Design Systems & Product Strategy',
    headline: 'Intuitive, aesthetically restrained interfaces that reduce cognitive friction.',
    description:
      'We design digital user experiences backed by rigorous user research and systematic component architecture. Our design systems provide reusable UI tokens that maintain visual harmony and accelerate development velocity.',
    deliverables: [
      'Atomic Design Systems & Reusable Token Libraries',
      'High-Fidelity Interactive Wireframes & Prototypes',
      'User Journey Mapping & Ergonomic Audits',
      'Comprehensive Design-to-Code Documentation',
      'Light/Dark Adaptive Design Specs',
    ],
    techStack: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Storybook', 'Motion'],
    timeline: '3 — 6 weeks typical delivery',
    iconName: 'Palette',
  },
  {
    id: 'tech-consulting',
    number: '05',
    title: 'Technology Consulting & Systems Integration',
    headline: 'Strategic architectural guidance to future-proof your digital operations.',
    description:
      'Our senior engineers partner with your leadership to audit existing software, modernize legacy codebases, strengthen cloud security, and plan pragmatic technology roadmaps aligned with business objectives.',
    deliverables: [
      'Comprehensive Architecture & Codebase Audits',
      'Legacy Modernization & Cloud Migration Strategies',
      'Database Query Profiling & Performance Tuning',
      'Security Posture & Vulnerability Hardening',
      'Third-Party Enterprise API Orchestration',
    ],
    techStack: ['GCP', 'AWS', 'Kubernetes', 'Terraform', 'PostgreSQL', 'Docker'],
    timeline: 'Flexible retainer or scoped advisory sprints',
    iconName: 'Network',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>(servicesData[0].id);
  const currentService = servicesData.find((s) => s.id === activeTab) || servicesData[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-sky-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Cog':
        return <Cog className="w-5 h-5 text-sky-500" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-sky-500" />;
      case 'Network':
      default:
        return <Network className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section id="services" className="relative py-32 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-4 uppercase">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>Services & Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-balance">
            Specialized engineering disciplines for ambitious enterprises.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            We operate across five interconnected domains, bridging the gap between strategic concept and production-grade software deployment.
          </p>
        </div>

        {/* Interactive Services Grid & Focus Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of 5 Services */}
          <div className="lg:col-span-5 space-y-3">
            {servicesData.map((service) => {
              const isSelected = activeTab === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-sky-500/80 shadow-md translate-x-1'
                      : 'bg-white/60 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800/80 hover:bg-white/90 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-semibold">
                        {service.number}.
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-mono text-sky-500 font-medium">Viewing</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Focus Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xl space-y-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800">
                    {getIcon(currentService.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                      Discipline {currentService.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {currentService.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(currentService)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-md hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors shrink-0"
                >
                  <span>Detailed Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {currentService.headline}
              </p>

              {/* Dedicated Interactive 3D Model for Selected Service */}
              <ServiceModel3D serviceId={currentService.id} />

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentService.description}
              </p>

              {/* Core Deliverables */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Key Production Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentService.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metadata: Tech Stack & Typical Delivery */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Primary Technologies:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {currentService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Engagement Timeline:
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
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
