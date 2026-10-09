import React, { useState } from 'react';
import { Layers, Database, Cloud, ShieldCheck } from 'lucide-react';
import { TechCategory } from '../../types';
import { TechSphere3D } from '../canvas/TechSphere3D';

export const techCategories: TechCategory[] = [
  {
    name: 'Frontend & Spatial Interfaces',
    description:
      'High-responsiveness client-side frameworks with accessibility and fluid 3D interactions.',
    items: [
      {
        name: 'TypeScript',
        description: 'Strict type safety across complete UI workflows',
        badge: 'Language',
      },
      {
        name: 'React & Next.js',
        description: 'Server rendering, concurrent mode, and dynamic streaming',
        badge: 'Framework',
      },
      {
        name: 'Tailwind CSS',
        description: 'Atomic utility styling with strict design token governance',
        badge: 'Design System',
      },
      {
        name: 'Three.js & WebGL',
        description: 'Hardware-accelerated 3D graphics and spatial storytelling',
        badge: 'Spatial',
      },
      {
        name: 'Motion Engine',
        description: 'Physics-based micro-interactions and GPU compositor transforms',
        badge: 'Motion',
      },
    ],
  },
  {
    name: 'Backend & Distributed Services',
    description:
      'Scalable service architectures engineered for high concurrency and robust data integrity.',
    items: [
      {
        name: 'Node.js & Express',
        description: 'High-throughput asynchronous I/O and RESTful microservices',
        badge: 'Runtime',
      },
      {
        name: 'Go (Golang)',
        description: 'Low-latency background processing and concurrency pipelines',
        badge: 'Systems',
      },
      {
        name: 'Python',
        description: 'Automation algorithms, data parsing, and machine intelligence',
        badge: 'Automation',
      },
      {
        name: 'GraphQL & gRPC',
        description: 'Efficient typed data fetching and inter-service RPC protocol',
        badge: 'API Protocol',
      },
      {
        name: 'Event-Driven Pub/Sub',
        description: 'Decoupled asynchronous event brokers and queue handling',
        badge: 'Messaging',
      },
    ],
  },
  {
    name: 'Data Architecture & Storage',
    description:
      'ACID-compliant relational storage, lightning caches, and reliable document models.',
    items: [
      {
        name: 'PostgreSQL',
        description: 'Relational data modeling, jsonb storage, and indexed query scale',
        badge: 'Primary RDBMS',
      },
      {
        name: 'Redis',
        description: 'In-memory caching, rate limiting, and real-time session state',
        badge: 'In-Memory Cache',
      },
      {
        name: 'Cloud Firestore',
        description: 'Real-time multi-device synchronization and reactive collections',
        badge: 'Document Store',
      },
      {
        name: 'Automated Backups',
        description: 'Point-in-time recovery and geographically distributed snapshots',
        badge: 'Disaster Recovery',
      },
    ],
  },
  {
    name: 'Cloud Infrastructure & DevOps',
    description:
      'Automated CI/CD pipelines, containerization, and zero-downtime blue/green deployments.',
    items: [
      {
        name: 'Docker & OCI',
        description: 'Deterministic container packaging across staging and production',
        badge: 'Containers',
      },
      {
        name: 'Kubernetes',
        description: 'Automated cluster orchestration, self-healing, and scaling',
        badge: 'Orchestration',
      },
      {
        name: 'Google Cloud (GCP)',
        description: 'Cloud Run, VPC networks, and global CDN edge routing',
        badge: 'Cloud Provider',
      },
      {
        name: 'AWS Infrastructure',
        description: 'S3 storage, CloudFront edge delivery, and Lambda functions',
        badge: 'Cloud Provider',
      },
      {
        name: 'GitHub Actions',
        description: 'Automated linting, test suites, and zero-downtime release triggers',
        badge: 'CI / CD',
      },
    ],
  },
];

export const TechnologySection: React.FC = () => {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const currentCategory = techCategories[selectedCatIndex];

  const getCategoryIcon = (index: number) => {
    const iconClass = 'h-5 w-5 text-sky-700 dark:text-sky-400';

    switch (index) {
      case 0:
        return <Layers className={iconClass} />;
      case 1:
        return <Cloud className={iconClass} />;
      case 2:
        return <Database className={iconClass} />;
      case 3:
      default:
        return <ShieldCheck className={iconClass} />;
    }
  };

  return (
    <section
      id="technology"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 pointer-events-none"
    >
      <div className="pointer-events-auto">
        {/* Section Header — styled like ApproachSection */}
        <div className="relative z-20 mb-16 max-w-3xl rounded-2xl bg-white/80 px-3 py-5 backdrop-blur-[3px] sm:px-5 sm:py-6 dark:bg-transparent dark:backdrop-blur-none">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-800 dark:text-sky-400">
            <span>04</span>
            <span aria-hidden="true">·</span>
            <span>Technology & Architecture</span>
          </div>

          <h2 className="mb-6 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Production-proven stacks selected for longevity and speed.
          </h2>

          <p className="text-balance text-base font-medium leading-relaxed text-slate-800 sm:text-lg dark:text-slate-300">
            We avoid speculative tooling in production. Every technology in our
            stack is battle-tested, actively maintained, and architected to
            safeguard your enterprise investment.
          </p>
        </div>

        {/* Technology Category Tabs */}
        <div className="relative z-10 mb-10 grid grid-cols-1 gap-3 border-b border-slate-300 pb-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800">
          {techCategories.map((cat, idx) => {
            const isSelected = selectedCatIndex === idx;

            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCatIndex(idx)}
                aria-pressed={isSelected}
                className={`flex min-h-16 items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md dark:border-sky-500 dark:bg-sky-600'
                    : 'border-slate-300 bg-white/90 text-slate-800 hover:border-sky-400 hover:bg-white dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
              >
                <span className="shrink-0">{getCategoryIcon(idx)}</span>

                <span className="text-xs font-bold leading-relaxed">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Description */}
        <div className="relative z-10 mb-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-md backdrop-blur-md sm:items-center dark:border-slate-800/90 dark:bg-slate-900/85">
          <div className="shrink-0 rounded-lg border border-sky-200 bg-sky-50 p-2.5 dark:border-sky-800 dark:bg-sky-950/50">
            {getCategoryIcon(selectedCatIndex)}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
              {currentCategory.name}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {currentCategory.description}
            </p>
          </div>
        </div>

        {/* 3D Visualizer and Technology Cards */}
        <div className="relative z-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Left Column: 3D Constellation Sphere */}
          <div className="relative z-0 min-w-0 lg:col-span-4">
            <TechSphere3D selectedCategoryName={currentCategory.name} />
          </div>

          {/* Right Column: Technology Cards */}
          <div className="relative z-10 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {currentCategory.items.map((item) => (
              <article
                key={item.name}
                className="group rounded-xl border border-slate-300 bg-white/95 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-sky-500/60"
              >
                <div className="mb-2.5 flex flex-wrap items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-950 transition-colors group-hover:text-sky-800 dark:text-white dark:group-hover:text-sky-400">
                    {item.name}
                  </h4>

                  <span className="rounded border border-slate-300 bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};