import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { Sparkles, ChevronRight, Filter, Clock, ArrowRight } from 'lucide-react';

interface ServicesIndexViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: (serviceSlug?: string) => void;
}

const CATEGORIES = [
  'All Disciplines',
  'Cinematic & Motion',
  'Web Architecture & Care',
  'Automations & Brand',
];

export const ServicesIndexView: React.FC<ServicesIndexViewProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Disciplines');

  const filteredServices = SERVICES_DATA.filter((srv) => {
    if (selectedCategory === 'All Disciplines') return true;
    return srv.category === selectedCategory;
  });

  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
          <Sparkles size={12} />
          <span>Full Service Directory · {SERVICES_DATA.length} Focused Practices</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white silver-gradient-text">
          Bespoke Web Design, Motion & Automations
        </h1>
        <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
          We focus purely on what we do best: cinematic web design, 60 FPS animations, 3D experiences,
          bulletproof edge hosting, domain management, and sales automations. Every website includes a
          complimentary one-time technical SEO run.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-md font-semibold'
                  : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, idx) => (
          <div
            key={service.id}
            onClick={() => onNavigate('service-detail', service.slug)}
            className="group cursor-pointer rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 font-mono mb-3">
                <span>{service.category}</span>
                <span className="text-white/40 group-hover:text-white transition-colors">
                  Standalone Page →
                </span>
              </div>

              <h2 className="text-xl font-medium text-white group-hover:silver-gradient-text transition-colors">
                {service.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                {service.summary}
              </p>

              {/* Deliverable preview */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">
                  Signature Highlights:
                </span>
                <div className="text-[11px] text-white/80 truncate">
                  • {service.deliverables[0]?.name}
                </div>
                <div className="text-[11px] text-white/80 truncate">
                  • {service.deliverables[1]?.name}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-white/60">
                {service.estimatedTimeline}
              </span>
              <span className="text-white font-medium group-hover:underline flex items-center gap-1">
                Explore Standalone Page <ChevronRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Consultation Strip */}
      <div className="mt-16 rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-md">
        <h3 className="text-2xl font-semibold text-white">Need a Complete Studio Transformation?</h3>
        <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">
          Most clients combine Cinematic Web Design with Custom Animations, Edge Hosting, and Web Automations.
          Let us engineer a custom proposal for your business in a fixed 2-3 week sprint.
        </p>
        <button
          onClick={() => onOpenConsultation()}
          className="mt-6 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-lg cursor-pointer"
        >
          Request Studio Proposal
        </button>
      </div>
    </div>
  );
};
