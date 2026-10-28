import React from 'react';
import { Star, ShieldCheck, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData.ts';

interface TestimonialsSectionProps {
  onOpenConsultation: (preselectedService?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Trustpilot Official Trust Signal Banner */}
      <div className="mb-12 rounded-2xl border border-white/15 bg-black/60 p-5 sm:p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Trustpilot Green Emblem */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00b67a] text-white shadow-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">Trustpilot</span>
                <span className="rounded bg-[#00b67a]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00b67a] border border-[#00b67a]/30">
                  Excellent
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {/* 5 Green Trustpilot Star Boxes */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex h-4 w-4 items-center justify-center rounded-[2px] bg-[#00b67a] text-white">
                    <Star size={10} fill="currentColor" />
                  </div>
                ))}
                <span className="ml-2 font-mono text-xs text-white/90 font-medium">
                  TrustScore <strong className="text-white">4.9</strong> | 48+ Verified Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Callout */}
        <div className="flex items-center gap-3 text-xs font-mono text-white/70 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
          <ShieldCheck size={16} className="text-[#00b67a] flex-shrink-0" />
          <span>Independent 3rd-party verified client feedback. Zero filtered reviews.</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
            <Sparkles size={12} />
            <span>Verified 5-Star Client Results · Orlando, FL & Nationwide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-md">
            Built for Modern Leaders. Reviewed by Founders.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
            Every website we engineer is designed to the highest standard of speed, motion, and automation.
            Inspect verified 5-star reviews from business owners across Central Florida and the United States.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-end bg-black/50 border border-white/15 px-4 py-2 rounded-xl backdrop-blur-md">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <span className="font-mono text-xs text-white font-medium">5.0 / 5.0 Rating (All 5-Star Reviews)</span>
        </div>
      </div>

      {/* Testimonials Grid (Clean, Focused, High-Trust) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TESTIMONIALS_DATA.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl border border-white/20 bg-black/60 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/45 hover:bg-black/80 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Subtle Top Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors" />

            <div>
              {/* Review Card Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(item.rating)].map((_, starIdx) => (
                      <Star key={starIdx} size={16} fill="currentColor" />
                    ))}
                    <span className="ml-1.5 font-mono text-xs font-semibold text-white/90">
                      5.0 Verified Review
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:silver-gradient-text transition-colors">
                    {item.clientName}
                  </h3>
                  <div className="text-xs text-white/70 font-mono mt-0.5">
                    {item.clientRole} · <span className="text-white font-medium">{item.businessName}</span>
                  </div>
                  <div className="text-[11px] text-white/50 font-mono">
                    {item.location}
                  </div>
                </div>

                <div className="border border-white/20 bg-white/5 rounded-lg px-2.5 py-1 text-[10px] font-mono text-white/80 whitespace-nowrap">
                  {item.serviceUsed}
                </div>
              </div>

              {/* Review Quote */}
              <p className="text-sm sm:text-base text-white/85 leading-relaxed italic mb-6 border-l-2 border-white/30 pl-4 py-1">
                "{item.quote}"
              </p>

              {/* Key Verified Business Impact Metric */}
              {item.clientMetric && (
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span className="font-mono text-xs text-white/70 uppercase tracking-wider">
                      {item.clientMetric.label}
                    </span>
                  </div>
                  <span className="font-mono text-base font-bold text-white">
                    {item.clientMetric.value}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Card Action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">
                100% Client Sovereign Code Ownership
              </span>
              <button
                onClick={() => onOpenConsultation(item.serviceUsed)}
                className="text-white hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                Inquire Like This <ChevronRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
