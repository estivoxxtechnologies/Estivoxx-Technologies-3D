import React from 'react';
import { X, Shield } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-sky-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {isPrivacy ? 'Privacy & Data Governance Policy' : 'Terms of Engineering Engagement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                <strong>1. Data Confidentiality & Scope:</strong> Estivoxx Technologies respects your organizational privacy. Information submitted through our consultation forms is used exclusively for evaluating technical feasibility, engineering proposals, and establishing communication with your team.
              </p>
              <p>
                <strong>2. Zero Third-Party Monetization:</strong> We do not sell, rent, or trade client inquiries or contact information to any third-party marketing brokers. All inquiries are securely stored and handled in accordance with modern information security standards.
              </p>
              <p>
                <strong>3. Non-Disclosure Protection:</strong> Detailed architectural specifications, repository audits, and operational schemas shared during discovery discussions are treated under strict standard NDA terms.
              </p>
              <p>
                <strong>4. Inquiries & Requests:</strong> For data inquiries, removal requests, or privacy concerns, please contact our team at{' '}
                <a href="mailto:support@estivoxx.com" className="text-sky-500 underline font-mono text-xs">
                  support@estivoxx.com
                </a>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Engagement Framework:</strong> All engineering projects undertaken by Estivoxx Technologies proceed according to signed Statements of Work (SOW), containing explicit milestones, acceptance criteria, and delivery timelines.
              </p>
              <p>
                <strong>2. Intellectual Property Rights:</strong> Upon completion of milestones and receipt of agreed compensation, all custom source code, documentation, and digital assets developed exclusively for the client transfer to client ownership according to agreement terms.
              </p>
              <p>
                <strong>3. Warranty & Maintenance:</strong> We provide structured post-delivery warranty periods to rectify software regressions and ensure stable operation across agreed production environments.
              </p>
              <p>
                <strong>4. Governance:</strong> Estivoxx Technologies operates as an engineering enterprise within Estuscia Group.
              </p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
