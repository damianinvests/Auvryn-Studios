import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ContactFormData } from '../types/index.ts';
import { validateContactForm, FormValidationErrors } from '../utils/rules.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const BUDGET_OPTIONS = [
  '$99/month Maintenance Hosting (Includes FREE 1-Page Website Offer)',
  '$3,500 – $5,000 (Sprint Starter: Web Design & Hosting)',
  '$5,000 – $10,000 (Core Cinematic Design & 60 FPS Animations)',
  '$10,000 – $20,000 (Full-Stack 3D, Web Architecture & Automations)',
  '$20,000+ (Multi-Brand / Custom Enterprise Interactive Platform)',
];

const TIMELINE_OPTIONS = [
  'Immediate (Sprint in 2-3 Weeks)',
  'Within 30–60 Days',
  'Quarter 1 2027 Planning',
  'Flexible / Exploring Options',
];

const GOAL_OPTIONS = [
  'Cinematic Website Design for Small Business',
  'Custom 60 FPS Animations & Micro-Interactions',
  '3D WebGL & Interactive Product Showcase',
  'Website Redesign & Modernization',
  'Managed Edge Hosting, Domains & DNS Setup',
  'Automated Lead Intake & CRM Webhooks',
  'Include One-Time Technical SEO & Schema Run',
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    currentWebsite: '',
    selectedServices: preselectedService ? [preselectedService] : ['cinematic-website-design'],
    budgetRange: BUDGET_OPTIONS[1],
    timeline: TIMELINE_OPTIONS[0],
    businessGoals: ['Cinematic Website Design for Small Business'],
    projectDetails: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: Array.from(new Set([...prev.selectedServices, preselectedService])),
      }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(slug);
      let updated: string[];
      if (exists) {
        updated = prev.selectedServices.filter((s) => s !== slug);
        if (updated.length === 0) updated = [slug]; // Keep at least one
      } else {
        updated = [...prev.selectedServices, slug];
      }
      return { ...prev, selectedServices: updated };
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => {
      const exists = prev.businessGoals.includes(goal);
      return {
        ...prev,
        businessGoals: exists
          ? prev.businessGoals.filter((g) => g !== goal)
          : [...prev.businessGoals, goal],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedId = `AUV-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketId('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#0d0f12] p-6 sm:p-10 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full border border-white/20 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-1">
                Intake Confirmed · Ticket #{ticketId}
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Proposal Request Received
              </h2>
              <p className="mt-3 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Damian Romero
                and the Auvryn engineering team have received your specifications for{' '}
                <strong className="text-white">{formData.businessName}</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Selected Focus:</span>
                <span className="text-white font-medium text-right">
                  {formData.selectedServices.length} Disciplines
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Budget Allocation:</span>
                <span className="text-white">{formData.budgetRange.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Direct Response SLA:</span>
                <span className="text-emerald-400">Within 4 Business Hours</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/50">Studio Line:</span>
                <a href="tel:+13214195434" className="text-white hover:underline">
                  +1 (321) 419-5434
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Location:</span>
                <span className="text-white/80">3232 Albin Lane, Orlando, FL 32817</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/85 transition-colors cursor-pointer"
              >
                Close & Return to Studio
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
                <Sparkles size={12} />
                <span>Union Park, Orlando, FL & Nationwide</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white silver-gradient-text">
                Start Your Web Project
              </h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                We design and engineer bespoke websites, 60 FPS animations, automations, and edge hosting
                in fixed 2 to 3-week sprints. Direct phone:{' '}
                <a href="tel:+13214195434" className="text-white hover:underline font-mono">
                  +1 (321) 419-5434
                </a>{' '}
                · Email:{' '}
                <a href="mailto:auvrynstudios@gmail.com" className="text-white hover:underline font-mono">
                  auvrynstudios@gmail.com
                </a>
              </p>
            </div>

            {/* Step 1: Contact Identity */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">
                01 / Primary Contact & Business Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1.5">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1.5">
                    Business Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. marcus@vanguardestates.com"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1.5">
                    Business Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Vanguard Modern Estates"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 407-555-0199"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Current Website URL (if redesigning)
                </label>
                <input
                  type="text"
                  value={formData.currentWebsite}
                  onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                  placeholder="e.g. https://mycompany.com"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Step 2: Selected Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">
                  02 / Focus Disciplines (Select all that apply)
                </h3>
                <span className="font-mono text-[10px] text-white/40">
                  {formData.selectedServices.length} Selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES_DATA.map((srv) => {
                  const isChecked = formData.selectedServices.includes(srv.slug);
                  return (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => toggleService(srv.slug)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-white bg-white/15 text-white'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                          isChecked ? 'border-white bg-white text-black' : 'border-white/30'
                        }`}
                      >
                        {isChecked && <CheckCircle2 size={12} />}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{srv.title}</div>
                        <div className="text-[10px] text-white/50 line-clamp-1">{srv.tagline}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.selectedServices && (
                <p className="mt-1 text-xs text-rose-400 font-mono">{errors.selectedServices}</p>
              )}
            </div>

            {/* Step 3: Goals */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">
                03 / Strategic Goals
              </h3>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((goal) => {
                  const isSelected = formData.businessGoals.includes(goal);
                  return (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'border border-white bg-white text-black font-semibold'
                          : 'border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Anticipated Investment Tier <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-[#14161a] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#14161a] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budgetRange && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{errors.budgetRange}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Target Launch Sprint
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-[#14161a] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors"
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#14161a] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Project Details */}
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                Project Details, Animations & Integrations <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.projectDetails}
                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                placeholder="Tell us about your brand, what animations or 3D elements you want, what tools you need integrated (CRM, Calendly, Stripe), or your domain/hosting needs..."
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
              />
              {errors.projectDetails && (
                <p className="mt-1 text-xs text-rose-400 font-mono">{errors.projectDetails}</p>
              )}
            </div>

            {/* Trust Footer & Submit */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>NDA & Client IP Ownership Guaranteed</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial rounded-full bg-white px-8 py-2.5 text-xs font-semibold text-black hover:bg-white/85 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Request Project Scope'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
