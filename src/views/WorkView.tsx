import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { Sparkles, ArrowUpRight, ChevronRight, CheckCircle2 } from 'lucide-react';

interface WorkViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: () => void;
}

export const WorkView: React.FC<WorkViewProps> = ({ onNavigate, onOpenConsultation }) => {
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = ['All', 'Cinematic Web', '3D WebGL', 'Custom Animations', 'Web Automations', 'Website Redesign'];

  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    if (selectedTag === 'All') return true;
    return item.tags.includes(selectedTag);
  });

  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
          <Sparkles size={12} />
          <span>Case Studies · Proven ROI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white silver-gradient-text">
          Cinematic Web Work & Documented Results
        </h1>
        <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
          Explore how we transformed small businesses into digital market leaders through
          scroll-scrubbed cinematography, interactive 3D WebGL, and sub-second React architecture.
        </p>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 font-mono mb-4">
                <span>{item.client}</span>
                <span>{item.location}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-white group-hover:silver-gradient-text transition-colors">
                {item.title}
              </h2>
              <div className="text-xs font-mono text-white/60 mt-1 mb-3">{item.industry}</div>

              <p className="text-sm text-white/80 leading-relaxed mb-6">{item.summary}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="pt-4 border-t border-white/10 text-xs">
                <span className="font-mono text-[10px] uppercase text-white/40 block mb-1">
                  Engineered With:
                </span>
                <span className="text-white/70">{item.techStack.join(' · ')}</span>
              </div>
            </div>

            {/* Results Callout */}
            <div className="mt-8 pt-6 border-t border-white/15 flex items-end justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white silver-gradient-text font-mono">
                  {item.resultMetric}
                </div>
                <div className="text-xs text-white/60 font-mono uppercase tracking-wider">
                  {item.resultLabel}
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/85 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Request Similar Build</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Banner */}
      <div className="mt-16 rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 text-center backdrop-blur-xl">
        <h3 className="text-2xl font-semibold text-white">Your Project Could Be Next</h3>
        <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">
          We accept only 3 new commissions per month to ensure intense architectural focus and 2-3 week sprint delivery.
        </p>
        <button
          onClick={onOpenConsultation}
          className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-xl cursor-pointer"
        >
          Check Studio Availability
        </button>
      </div>
    </div>
  );
};
