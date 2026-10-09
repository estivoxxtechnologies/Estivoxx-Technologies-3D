import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  // Scroll to the top without changing the URL.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll to a section without adding a hash to the URL.
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 border-b border-slate-200/80 pb-12 dark:border-slate-800/80 md:grid-cols-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-5">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-left text-lg font-bold tracking-tight text-slate-900 dark:text-white"
              aria-label="Estivoxx Technologies - Back to top"
            >
              <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" />
              <span>Estivoxx Technologies</span>
            </button>

            <p className="max-w-sm text-xs leading-relaxed text-slate-700 dark:text-slate-400">
              Advanced software engineering firm focused on custom enterprise
              systems, high-performance web platforms, and automated cloud
              workflows.
            </p>

            <div className="text-xs font-mono text-slate-600 dark:text-slate-500">
              Operating within the{' '}
              <a
                href="https://www.estusciagroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors hover:text-sky-500 hover:underline"
              >
                Estuscia Group
                <span className="ml-1" aria-hidden="true">
                  ↗
                </span>
              </a>{' '}
              global ecosystem.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="cursor-pointer text-left transition-colors hover:text-sky-500"
                >
                  01. About Estivoxx
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('services')}
                  className="cursor-pointer text-left transition-colors hover:text-sky-500"
                >
                  02. Services &amp; Solutions
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('approach')}
                  className="cursor-pointer text-left transition-colors hover:text-sky-500"
                >
                  03. Delivery Methodology
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('technology')}
                  className="cursor-pointer text-left transition-colors hover:text-sky-500"
                >
                  04. Technology &amp; Architecture
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('work')}
                  className="cursor-pointer text-left transition-colors hover:text-sky-500"
                >
                  05. Selected Solutions
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="cursor-pointer text-left transition-colors hover:text-sky-500"
                >
                  06. Contact &amp; Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Communications */}
          <div className="space-y-3 md:col-span-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Direct Contact
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              General &amp; Architecture Inquiries:
            </p>

            <a
              href="mailto:support@estivoxx.com"
              className="block text-xs font-mono font-medium text-sky-600 transition-colors hover:underline dark:text-sky-400"
            >
              support@estivoxx.com
            </a>

            <p className="pt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-500">
              Parent Website:{' '}
              <a
                href="https://www.estusciagroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-slate-700 transition-colors hover:text-sky-500 hover:underline dark:text-slate-300"
              >
                www.estivoxx.com
                <span className="ml-1" aria-hidden="true">
                  ↗
                </span>
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Estivoxx Technologies. All rights
            reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={onOpenTerms}
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Terms of Engagement
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="rounded-md p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};