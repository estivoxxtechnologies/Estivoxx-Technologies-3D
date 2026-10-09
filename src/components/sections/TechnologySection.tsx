import React, { useState } from 'react';
import { Layers, Database, Cloud, ShieldCheck } from 'lucide-react';
import { TechCategory } from '../../types';
import { TechSphere3D } from '../canvas/TechSphere3D';

export const techCategories: TechCategory[] = [
  {
    name: 'Frontend & Spatial Interfaces',
    description: 'High-responsiveness client-side frameworks with accessibility and fluid 3D interactions.',
    items: [
      { name: 'TypeScript', description: 'Strict type safety across complete UI workflows', badge: 'Language' },
      { name: 'React & Next.js', description: 'Server rendering, concurrent mode, and dynamic streaming', badge: 'Framework' },
      { name: 'Tailwind CSS', description: 'Atomic utility styling with strict design token governance', badge: 'Design System' },
      { name: 'Three.js & WebGL', description: 'Hardware-accelerated 3D graphics and spatial storytelling', badge: 'Spatial' },
      { name: 'Motion Engine', description: 'Physics-based micro-interactions and GPU compositor transforms', badge: 'Motion' },
    ],
  },
  {
    name: 'Backend & Distributed Services',
    description: 'Scalable service architectures engineered for high concurrency and robust data integrity.',
    items: [
      { name: 'Node.js & Express', description: 'High-throughput asynchronous I/O and RESTful microservices', badge: 'Runtime' },
      { name: 'Go (Golang)', description: 'Low-latency background processing and concurrency pipelines', badge: 'Systems' },
      { name: 'Python', description: 'Automation algorithms, data parsing, and machine intelligence', badge: 'Automation' },
      { name: 'GraphQL & gRPC', description: 'Efficient typed data fetching and inter-service RPC protocol', badge: 'API Protocol' },
      { name: 'Event-Driven Pub/Sub', description: 'Decoupled asynchronous event brokers and queue handling', badge: 'Messaging' },
    ],
  },
  {
    name: 'Data Architecture & Storage',
    description: 'ACID-compliant relational storage, lightning caches, and reliable document models.',
    items: [
      { name: 'PostgreSQL', description: 'Relational data modeling, jsonb storage, and indexed query scale', badge: 'Primary RDBMS' },
      { name: 'Redis', description: 'In-memory caching, rate limiting, and real-time session state', badge: 'In-Memory Cache' },
      { name: 'Cloud Firestore', description: 'Real-time multi-device synchronization and reactive collections', badge: 'Document Store' },
      { name: 'Automated Backups', description: 'Point-in-time recovery and geographically distributed snapshots', badge: 'Disaster Recovery' },
    ],
  },
  {
    name: 'Cloud Infrastructure & DevOps',
    description: 'Automated CI/CD pipelines, containerization, and zero-downtime blue/green deployments.',
    items: [
      { name: 'Docker & OCI', description: 'Deterministic container packaging across staging and production', badge: 'Containers' },
      { name: 'Kubernetes', description: 'Automated cluster orchestration, self-healing, and scaling', badge: 'Orchestration' },
      { name: 'Google Cloud (GCP)', description: 'Cloud Run, VPC networks, and global CDN edge routing', badge: 'Cloud Provider' },
      { name: 'AWS Infrastructure', description: 'S3 storage, CloudFront edge delivery, and Lambda functions', badge: 'Cloud Provider' },
      { name: 'GitHub Actions', description: 'Automated linting, test suites, and zero-downtime release triggers', badge: 'CI / CD' },
    ],
  },
];

export const TechnologySection: React.FC = () => {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const currentCategory = techCategories[selectedCatIndex];

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-5 h-5 text-sky-500" />;
      case 1:
        return <Cloud className="w-5 h-5 text-sky-500" />;
      case 2:
        return <Database className="w-5 h-5 text-sky-500" />;
      case 3:
      default:
        return <ShieldCheck className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section id="technology" className="relative py-32 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-4 uppercase">
            <span>04</span>
            <span aria-hidden="true">·</span>
            <span>Technology & Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-balance">
            Production-proven stacks selected for longevity and speed.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            We avoid speculative tooling in production. Every technology in our stack is battle-tested, actively maintained, and architected to safeguard your enterprise investment.
          </p>
        </div>

        {/* Tab Controls for Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          {techCategories.map((cat, idx) => {
            const isSelected = selectedCatIndex === idx;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCatIndex(idx)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-sm'
                    : 'bg-white/60 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="mb-8 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800">
            {getCategoryIcon(selectedCatIndex)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentCategory.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentCategory.description}
            </p>
          </div>
        </div>

        {/* 3D Visualizer & Tech Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 3D Constellation Sphere */}
          <div className="lg:col-span-4">
            <TechSphere3D selectedCategoryName={currentCategory.name} />
          </div>

          {/* Right Column: Tech Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.items.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-sm hover:border-sky-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
