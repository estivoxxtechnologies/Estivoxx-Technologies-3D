
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Phone,
  Building2,
  MessageSquare,
} from 'lucide-react';
import { SignalNode3D } from '../canvas/SignalNode3D';

interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  projectType: 'Website Development',
  message: '',
};

const CONTACT_EMAIL = 'support@estivoxx.com';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] =
    useState<ContactFormData>(INITIAL_FORM);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const updateField = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: '',
    }));

    setSubmitError('');
  };

  const validate = () => {
    const nextErrors: Partial<
      Record<keyof ContactFormData, string>
    > = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (
      formData.phone.trim() &&
      !/^[+()\d\s.-]{7,20}$/.test(formData.phone.trim())
    ) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.projectType) {
      nextErrors.projectType = 'Please select a project type.';
    }

    if (formData.message.trim().length < 15) {
      nextErrors.message =
        'Please describe your project in at least 15 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await emailjs.send(
        'support_estivoxx',
        'support_estivoxx_2026',
        {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || 'Not Provided',
          phone: formData.phone.trim() || 'Not Provided',
          project_type: formData.projectType,
          message: formData.message.trim(),
          date: new Date().toLocaleString(),
        },
        'HtMOlIdlJcgS15sIB'
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error('EmailJS Error:', error);

      setSubmitError(
        'Unable to send your inquiry right now. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);

      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setSubmitError(
        'Unable to copy the email address. Please copy it manually.'
      );
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmitError('');
    setIsSubmitted(false);
  };

  const inputClass = (field: keyof ContactFormData) =>
    `w-full px-4 py-3 rounded-xl text-sm
    bg-white dark:bg-slate-950/80
    border ${errors[field]
      ? 'border-rose-500'
      : 'border-slate-300 dark:border-slate-800 focus:border-sky-500'
    }
    text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-600
    focus:outline-none focus:ring-2
    ${errors[field]
      ? 'focus:ring-rose-500/20'
      : 'focus:ring-sky-500/20'
    }
    transition-colors`;

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

        {/* Contact information */}
        <div className="space-y-8 lg:col-span-5">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <span>06</span>
              <span aria-hidden="true">·</span>
              <span>Get in Touch</span>
            </div>

            <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Let’s build something exceptional together.
            </h2>

            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Have an idea, a business challenge, or a digital
              product in mind? Tell us what you need, and the
              Estivoxx Technologies team will get in touch.
            </p>
          </div>

          <div className="space-y-4">
            <SignalNode3D
              isTyping={Boolean(
                formData.message || formData.fullName
              )}
            />

            {/* Email */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sky-600 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                    Email Us
                  </p>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="break-all text-sm font-semibold text-slate-900 transition-colors hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                title="Copy email address"
                className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Company */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sky-600 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-400">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                    Company
                  </p>

                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Estivoxx Technologies
                  </p>


                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Part of{' '}
                    <a
                      href="https://www.estusciagroup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      Estuscia Group
                      <span className="ml-1" aria-hidden="true">↗</span>
                    </a>
                  </p>

                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sky-600 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-400">
                  <MessageSquare className="h-5 w-5" />
                </div>

                <div>
                  <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                    Let's Discuss Your Project
                  </p>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Clear communication. Practical solutions.
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Send us your requirements to start the conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-black/20 sm:p-10">

            {isSubmitted ? (
              <div
                className="space-y-6 py-10 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div>
                  <h3 className="mb-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>

                  <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Thank you for contacting Estivoxx Technologies.
                    Your inquiry has been submitted, and we look
                    forward to discussing your project.
                  </p>
                </div>

                <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-4 text-left dark:border-slate-800 dark:bg-slate-950">
                  <p className="mb-1 text-xs text-slate-500">
                    Submitted email
                  </p>
                  <p className="break-all text-sm font-semibold text-slate-900 dark:text-white">
                    {formData.email}
                  </p>

                  <p className="mb-1 mt-4 text-xs text-slate-500">
                    Project type
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {formData.projectType}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Tell Us About Your Project
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Fill in the details below and send us a message.
                    </p>
                  </div>

                  <Mail className="h-6 w-6 shrink-0 text-sky-500" />
                </div>

                {/* Name and email */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-full-name"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Full Name *
                    </label>

                    <input
                      id="contact-full-name"
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      value={formData.fullName}
                      onChange={(e) =>
                        updateField('fullName', e.target.value)
                      }
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.fullName)}
                      className={inputClass('fullName')}
                    />

                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Email Address *
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) =>
                        updateField('email', e.target.value)
                      }
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className={inputClass('email')}
                    />

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company and phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Company / Organization
                    </label>

                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      maxLength={150}
                      value={formData.company}
                      onChange={(e) =>
                        updateField('company', e.target.value)
                      }
                      placeholder="Your company name"
                      className={inputClass('company')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Phone Number
                    </label>

                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={30}
                      value={formData.phone}
                      onChange={(e) =>
                        updateField('phone', e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      aria-invalid={Boolean(errors.phone)}
                      className={inputClass('phone')}
                    />

                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-rose-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label
                    htmlFor="contact-project-type"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Project Type *
                  </label>

                  <select
                    id="contact-project-type"
                    value={formData.projectType}
                    onChange={(e) =>
                      updateField('projectType', e.target.value)
                    }
                    className={inputClass('projectType')}
                  >
                    <option value="Website Development">
                      Website Development
                    </option>
                    <option value="Custom Software Development">
                      Custom Software Development
                    </option>
                    <option value="Web Application Development">
                      Web Application Development
                    </option>
                    <option value="Business Automation">
                      Business Automation
                    </option>
                    <option value="UI/UX Design">
                      UI/UX Design
                    </option>
                    <option value="Technology Consulting">
                      Technology Consulting
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Project Details / Message *
                  </label>

                  <textarea
                    id="contact-message"
                    rows={5}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) =>
                      updateField('message', e.target.value)
                    }
                    placeholder="Tell us about your idea, requirements, goals, or the challenges you want to solve..."
                    aria-invalid={Boolean(errors.message)}
                    className={`${inputClass('message')} resize-y`}
                  />

                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    {errors.message ? (
                      <p className="text-xs text-rose-500">
                        {errors.message}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Please provide at least 15 characters.
                      </p>
                    )}

                    <span className="shrink-0 text-xs text-slate-400">
                      {formData.message.length}/5000
                    </span>
                  </div>
                </div>

                {/* Submission error */}
                {submitError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                  >
                    {submitError}
                    <p className="mt-1">
                      You can also email us at{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-semibold underline underline-offset-2"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="space-y-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-600 dark:hover:bg-sky-500"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Your Inquiry
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Your information will be used to respond to
                    your inquiry.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
