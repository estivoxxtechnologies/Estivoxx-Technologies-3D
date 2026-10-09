export type Theme = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  iconName: string;
}

export interface ApproachStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  keyPractices: string[];
}

export interface TechCategory {
  name: string;
  description: string;
  items: {
    name: string;
    description: string;
    badge: string;
  }[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  impact: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  architectureDetails: string[];
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  serviceCategory: string;
  budgetRange: string;
  timeline: string;
  projectBrief: string;
}
