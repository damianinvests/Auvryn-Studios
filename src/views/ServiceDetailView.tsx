import React, { useEffect } from 'react';
import { Service } from '../types/index.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ArrowLeft, CheckCircle2, Clock, DollarSign, Sparkles, ChevronRight, HelpCircle, ShieldAlert, Cpu } from 'lucide-react';

interface ServiceDetailViewProps {
  service: Service;
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: (serviceSlug: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  onNavigate,
  onOpenConsultation,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service.slug]);

  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-white/50 font-mono">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-white transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('services-index')}
          className="hover:text-white transition-colors"
        >
          Services
        </button>
        <span>/</span>
        <span className="text-white font-medium truncate">{service.shortTitle}</span>
      </nav>

      {/* Hero Section */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-4">
          <Sparkles size={12} />
          <span>Standalone Capability · {service.category}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] max-w-4xl">
          {service.heroHeading.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {idx === 0 ? line : <span className="silver-gradient-text block">{line}</span>}
            </React.Fragment>
          ))}
        </h1>

        <p className="mt-6 text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
          {service.heroSubheading}
        </p>

        {/* Quick Parameters Strip */}
        <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono">
          <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 flex items-center gap-2">
            <Clock size={14} className="text-white/60" />
            <span>Sprint: {service.estimatedTimeline}</span>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 flex items-center gap-2">
            <DollarSign size={14} className="text-white/60" />
            <span>Investment: {service.investmentTier}</span>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 flex items-center gap-2">
            <Cpu size={14} className="text-white/60" />
            <span>Delivery: Orlando Studio & Nationwide</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => onOpenConsultation(service.slug)}
            className="rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>Book Consultation for {service.shortTitle}</span>
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => onNavigate('services-index')}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs sm:text-sm text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            ← View All {SERVICES_DATA.length} Services
          </button>
        </div>
      </div>

      {/* Target SEO Longtail Keywords for this Standalone Page */}
      <div className="mb-16 rounded-xl border border-white/10 bg-white/5 p-4 text-xs">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-2">
          SEO & Search Grounding Signals:
        </span>
        <div className="flex flex-wrap gap-2">
          {service.longtailKeywords.map((kw) => (
            <span
              key={kw}
              className="bg-white/10 border border-white/10 rounded px-2.5 py-1 text-white/80 font-mono text-[11px]"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Grid: Pain Points Solved vs Auvryn Solution */}
      <div className="mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 mb-2">
            <ShieldAlert size={12} />
            <span>Problem vs. Engineered Solution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Customer Pain Points in This Industry & How We Eradicate Them
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {service.painPointsSolved.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400/90 block mb-1">
                  Bottleneck 0{idx + 1}
                </span>
                <h3 className="text-lg font-medium text-white mb-2">{item.problem}</h3>
                <p className="text-xs text-white/60 italic mb-4">"{item.agony}"</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 block mb-1">
                  The Auvryn Solution
                </span>
                <p className="text-xs text-white/80 leading-relaxed">{item.auvrynSolution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables Checklist */}
      <div className="mb-16 rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md">
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 block mb-1">
            Turnkey Deliverables
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            What is Included in This Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.deliverables.map((del, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-3.5 rounded-xl border border-white/10 bg-white/5"
            >
              <CheckCircle2 size={18} className="text-white flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-white flex items-center gap-2">
                  <span>{del.name}</span>
                  {del.badge && (
                    <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">
                      {del.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">{del.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Performance Specs & Competitor Gap */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Specs */}
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 block mb-2">
            Engineered Benchmarks
          </span>
          <h3 className="text-xl font-semibold text-white mb-6">Technical Specifications</h3>
          <div className="space-y-4">
            {service.technicalSpecs.map((spec, i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-3 border-b border-white/10 text-xs sm:text-sm"
              >
                <div>
                  <div className="text-white font-medium">{spec.metric}</div>
                  <div className="text-[11px] text-white/50">{spec.context}</div>
                </div>
                <div className="font-mono text-base font-bold text-white silver-gradient-text">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Gap */}
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 block mb-2">
              Market Intelligence
            </span>
            <h3 className="text-xl font-semibold text-white mb-4">Competitor Gap Analysis</h3>
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5">
                <span className="font-mono text-[10px] uppercase text-rose-400 block mb-1">
                  Typical Orlando & National Agencies:
                </span>
                <p className="text-white/70">{service.competitorGap.typicalAgency}</p>
              </div>
              <div className="p-3.5 rounded-lg border border-white/30 bg-white/10">
                <span className="font-mono text-[10px] uppercase text-white font-bold block mb-1">
                  The Auvryn Standard:
                </span>
                <p className="text-white">{service.competitorGap.auvrynStudios}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <span className="font-mono text-[10px] text-white/50 uppercase block">Expected ROI Impact:</span>
            <p className="text-xs text-white/90 font-medium mt-1">{service.roiImpact}</p>
          </div>
        </div>
      </div>

      {/* Service-Specific FAQs */}
      <div className="mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 mb-2">
            <HelpCircle size={12} />
            <span>Service Clarifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/15 bg-white/5 p-5">
              <h4 className="text-sm sm:text-base font-medium text-white mb-2">{faq.question}</h4>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky-Style Consultation Callout */}
      <div className="rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 text-center backdrop-blur-xl">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white silver-gradient-text">
          Ready to Deploy {service.title}?
        </h3>
        <p className="mt-2 text-sm text-white/70 max-w-lg mx-auto">
          Reserve your 2-to-3-week sprint with Auvryn Studios. Headquartered in Orlando, FL, delivering nationwide.
        </p>
        <button
          onClick={() => onOpenConsultation(service.slug)}
          className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-xl cursor-pointer"
        >
          Request Proposal for {service.shortTitle}
        </button>
      </div>
    </div>
  );
};
