import React from 'react';
import { COMPETITOR_BENCHMARKS, EASY_WIN_KEYWORDS } from '../data/competitorData.ts';
import { Eye, CheckCircle2, XCircle, TrendingUp, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface CompetitorGapViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: () => void;
}

export const CompetitorGapView: React.FC<CompetitorGapViewProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
          <Eye size={12} />
          <span>Market Intelligence · Orlando, FL & Nationwide</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white silver-gradient-text">
          Local Competitor Analysis & The Auvryn Bridge
        </h1>
        <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
          We analyzed what web design agencies in Central Florida and nationwide do well—and where
          their outdated practices fail small business owners. Here is how we engineer the advantage.
        </p>
      </div>

      {/* What Competitors Do Well vs What They Miss */}
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <CheckCircle2 size={16} />
            <span>What Local Agencies Do Well</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
            <li>
              • <strong className="text-white">Local Networking:</strong> Active presence in Orlando and Central Florida business networks.
            </li>
            <li>
              • <strong className="text-white">Basic Directory Setup:</strong> Standard creation of Google Business Profiles and local maps markers.
            </li>
            <li>
              • <strong className="text-white">Familiar CMS Platforms:</strong> Delivering basic WordPress admin panels that clients have seen before.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-rose-400 font-mono text-xs uppercase tracking-wider">
            <XCircle size={16} />
            <span>What They Are Doing Poorly (The Gap)</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
            <li>
              • <strong className="text-white">Bloated, Slow Templates:</strong> Heavy page builders (Divi/Elementor) with 30+ plugins causing 6-second load times on mobile.
            </li>
            <li>
              • <strong className="text-white">Zero Cinematic Motion or 60 FPS Animation:</strong> Static, uninspired brochure layouts with zero micro-interactions that bore visitors.
            </li>
            <li>
              • <strong className="text-white">Empty Ranking Retainers:</strong> Charging $1,500/month in speculative SEO retainers while leaving the actual website slow and ugly.
            </li>
            <li>
              • <strong className="text-white">Hostage Domain & Maintenance Models:</strong> Holding domains hostage and charging $350+/month retainers just to click plugin update buttons.
            </li>
          </ul>
        </div>
      </div>

      {/* The Comprehensive Benchmark Matrix */}
      <div className="mb-16">
        <div className="mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 block mb-1">
            Direct Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Feature & Architecture Comparison
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/15 bg-white/5">
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                  Engineering Domain
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                  Typical Orlando & Regional Agencies
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white font-bold bg-white/10">
                  The Auvryn Studios Advantage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
              {COMPETITOR_BENCHMARKS.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{item.category}</td>
                  <td className="py-4 px-6 text-white/60">{item.typicalOrlandoAgency}</td>
                  <td className="py-4 px-6 text-white bg-white/5 font-medium">{item.auvrynStudios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Easy-Win SEO Longtail Keywords for Small Business */}
      <div className="mb-16 rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="mb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 mb-2">
            <TrendingUp size={16} />
            <span>High-ROI Opportunities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Easy-Win Longtail Keywords to Win SEO Rankings Fast
          </h2>
          <p className="mt-2 text-sm text-white/70 max-w-xl">
            Rather than fighting over broad high-cost vanity terms, we target high-commercial-intent
            longtail queries where competitors have zero bespoke coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EASY_WIN_KEYWORDS.map((kw, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-white/50 block mb-1">Target Keyword #{i + 1}</span>
                <div className="text-sm font-semibold text-white mb-2 font-mono">{kw.keyword}</div>
                <div className="text-xs text-emerald-400 font-medium mb-1">{kw.difficulty}</div>
                <div className="text-[11px] text-white/60 mb-3">{kw.volume}</div>
              </div>
              <div className="pt-3 border-t border-white/10 text-[11px] text-white/80">
                <span className="text-white/40 block">Auvryn Strategy:</span>
                {kw.strategy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 text-center backdrop-blur-xl">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white silver-gradient-text">
          Want an Unfair Digital Advantage Over Local Rivals?
        </h3>
        <p className="mt-2 text-sm text-white/70 max-w-lg mx-auto">
          We will review your competitors' digital footprints and prepare a personalized roadmap showing where you can leapfrog them.
        </p>
        <button
          onClick={onOpenConsultation}
          className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-xl cursor-pointer"
        >
          Schedule Competitor Leapfrog Session
        </button>
      </div>
    </div>
  );
};
