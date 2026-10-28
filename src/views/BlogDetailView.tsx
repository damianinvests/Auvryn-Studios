import React, { useEffect } from 'react';
import { BlogPost } from '../types/index.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { Clock, Calendar, User, ArrowLeft, ArrowRight, CheckSquare, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

interface BlogDetailViewProps {
  blog: BlogPost;
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: (serviceSlug?: string) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  onNavigate,
  onOpenConsultation,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blog.slug]);

  const relatedService = SERVICES_DATA.find((s) => s.slug === blog.relatedServiceSlug);

  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-white/50 font-mono">
        <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <span>/</span>
        <button onClick={() => onNavigate('blog-index')} className="hover:text-white transition-colors">
          Blog
        </button>
        <span>/</span>
        <span className="text-white font-medium truncate">{blog.category}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-4">
          <Sparkles size={12} />
          <span>{blog.category} · Research Report</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
          {blog.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-normal">
          {blog.subtitle}
        </p>

        {/* Author & Meta Row */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60 font-mono">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/damian_romero_headshot.jpg"
              alt="Damian Romero"
              className="w-8 h-8 rounded-full object-cover border border-white/30"
            />
            <div>
              <div className="text-white font-medium">{blog.author}</div>
              <div className="text-[10px] text-white/50">{blog.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {blog.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Longtail Keywords Indexing Banner */}
      <div className="mb-10 rounded-xl border border-white/15 bg-white/5 p-4 text-xs">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-2">
          Target Long-Tail SEO Keywords in This Guide:
        </span>
        <div className="flex flex-wrap gap-2">
          {blog.targetLongtailKeywords.map((kw) => (
            <span
              key={kw}
              className="bg-white/10 border border-white/15 rounded px-2.5 py-1 text-white/80 font-mono text-[11px]"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Pain Points Solved Callout */}
      <div className="mb-12 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6 backdrop-blur-md">
        <h3 className="font-mono text-xs uppercase tracking-wider text-rose-300 font-semibold mb-3">
          Small Business Pain Points Analyzed in This Research:
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-white/80 list-disc list-inside">
          {blog.painPointsAddressed.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10 text-white/85 leading-relaxed text-sm sm:text-base">
        {blog.contentSections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight pt-2 border-t border-white/10">
              {sec.heading}
            </h2>

            {sec.body.map((p, pIdx) => (
              <p key={pIdx} className="text-white/80 leading-relaxed">
                {p}
              </p>
            ))}

            {sec.callout && (
              <div
                className={`my-6 rounded-xl border p-5 backdrop-blur-md ${
                  sec.callout.type === 'stat'
                    ? 'border-white/30 bg-white/10 text-white font-medium'
                    : sec.callout.type === 'warning'
                    ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
                    : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {sec.callout.type === 'stat' && <Sparkles size={18} className="flex-shrink-0 mt-0.5 text-white" />}
                  {sec.callout.type === 'warning' && <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-amber-300" />}
                  {sec.callout.type === 'takeaway' && <Lightbulb size={18} className="flex-shrink-0 mt-0.5 text-emerald-300" />}
                  <p className="text-xs sm:text-sm leading-relaxed">{sec.callout.text}</p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Actionable Small Business Checklist */}
      <div className="mt-14 rounded-2xl border border-white/20 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider text-white">
          <CheckSquare size={16} className="text-emerald-400" />
          <span>Actionable Takeaways For Your Business</span>
        </div>
        <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
          {blog.actionableChecklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Standalone Service Card */}
      {relatedService && (
        <div className="mt-12 rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">
              Related Engineering Practice:
            </span>
            <h4 className="text-lg font-semibold text-white">{relatedService.title}</h4>
            <p className="text-xs text-white/70 mt-1 max-w-md">{relatedService.summary}</p>
          </div>
          <button
            onClick={() => onNavigate('service-detail', relatedService.slug)}
            className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-white/85 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View Service</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Author Bio Box */}
      <div className="mt-12 pt-8 border-t border-white/15 flex items-start gap-4">
        <img
          src="/assets/images/damian_romero_headshot.jpg"
          alt="Damian Romero"
          className="w-12 h-12 rounded-full object-cover border border-white/30 flex-shrink-0"
        />
        <div className="text-xs text-white/70 leading-relaxed">
          <span className="text-white font-medium text-sm block">Written by {blog.author}</span>
          <span className="text-white/50 block mb-2">{blog.authorRole}</span>
          Damian leads architectural and creative engineering at Auvryn Studios in Orlando, FL.
          He specializes in high-speed React engineering, scroll-scrubbed WebGL canvases, and Generative
          Engine Optimization (GEO) for high-growth small businesses nationwide.
        </div>
      </div>

      {/* Footer Navigation Back to Blog */}
      <div className="mt-12 flex justify-between items-center text-xs">
        <button
          onClick={() => onNavigate('blog-index')}
          className="text-white/70 hover:text-white flex items-center gap-1.5 font-mono"
        >
          <ArrowLeft size={14} /> Back to All Articles
        </button>
        <button
          onClick={() => onOpenConsultation(blog.relatedServiceSlug)}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Book Strategy Call on This Topic
        </button>
      </div>
    </div>
  );
};
