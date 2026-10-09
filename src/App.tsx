import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HeroExperience3D } from './components/canvas/HeroExperience3D';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ApproachSection } from './components/sections/ApproachSection';
import { TechnologySection } from './components/sections/TechnologySection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { PolicyModal } from './components/modals/PolicyModal';
import { ServiceItem, ProjectCaseStudy } from './types';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquiryFromService = (serviceId: string) => {
    setSelectedService(null);
    scrollToContact();
    // Pre-select service in form if element is present
    setTimeout(() => {
      const selectEl = document.querySelector('select') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = serviceId;
      }
    }, 400);
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500/30 selection:text-sky-300 transition-colors duration-300">
        {/* Central 3D Spatial Canvas Spine */}
        <HeroExperience3D scrollProgress={scrollProgress} />

        {/* Global Navigation Bar */}
        <Navbar onStartProject={scrollToContact} />

        {/* Main Content Sections Flow */}
        <main className="relative z-10">
          <HeroSection
            onStartProject={scrollToContact}
            onExploreSolutions={scrollToServices}
          />
          <AboutSection />
          <ServicesSection onSelectService={setSelectedService} />
          <ApproachSection />
          <TechnologySection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <ContactSection />
        </main>

        {/* Quiet Professional Footer */}
        <Footer
          onOpenPrivacy={() => setPolicyType('privacy')}
          onOpenTerms={() => setPolicyType('terms')}
        />

        {/* Interactive Modals */}
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectForInquiry={handleInquiryFromService}
        />

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartSimilarProject={() => {
            setSelectedProject(null);
            scrollToContact();
          }}
        />

        <PolicyModal
          type={policyType}
          onClose={() => setPolicyType(null)}
        />
      </div>
    </ThemeProvider>
  );
}
