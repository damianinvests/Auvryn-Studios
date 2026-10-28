import React, { useState } from 'react';
import { BLOGS_DATA } from '../data/blogsData.ts';
import { matchesKeyword } from '../utils/rules.ts';
import { Search, Sparkles, Clock, Calendar, ArrowRight, ChevronRight, ShieldAlert } from 'lucide-react';

interface BlogIndexViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: () => void;
}

export const BlogIndexView: React.FC<BlogIndexViewProps> = ({ onNavigate, onOpenConsultation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = BLOGS_DATA.filter((b) =>
    matchesKeyword(searchQuery, `${b.title} ${b.summary} ${b.category}`, b.targetLongtailKeywords)
  );

  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
          <Sparkles size={12} />
          <span>Research & Industry Intelligence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white silver-gradient-text">
          Strategic Blueprints for Small Business
        </h1>
        <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
          In-depth research on solving real customer pain points: escaping the WordPress template trap,
          dominating Generative AI Search (GEO), and deploying high-speed 3D web experiences.
        </p>

        {/* Search & Longtail Filter Bar */}
        <div className="mt-8 relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles or long-tail topics (e.g. GEO, 3D, WordPress, speed)..."
            className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:border-white focus:bg-white/10 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog, idx) => (
          <article
            key={blog.id}
            onClick={() => onNavigate('blog-detail', blog.slug)}
            className="group cursor-pointer rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-3">
                <span>{blog.category}</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {blog.readTime}
                </span>
              </div>

              <h2 className="text-xl font-medium text-white group-hover:silver-gradient-text transition-colors leading-snug">
                {blog.title}
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                {blog.summary}
              </p>

              {/* Target Longtail Keywords */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1">
                  Keywords Targeted:
                </span>
                <div className="flex flex-wrap gap-1">
                  {blog.targetLongtailKeywords.slice(0, 2).map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] text-white/60 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
              <span className="font-mono text-[11px] text-white/50">{blog.date}</span>
              <span className="text-white font-medium group-hover:underline flex items-center gap-1">
                Read Research <ChevronRight size={13} />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-white/60 text-sm">No articles matched "{searchQuery}".</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs text-white underline"
          >
            Clear Search Filter
          </button>
        </div>
      )}

      {/* Inquiry Callout */}
      <div className="mt-16 rounded-2xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-md">
        <h3 className="text-2xl font-semibold text-white">Have a Specific Question About Your Site?</h3>
        <p className="mt-2 text-sm text-white/70 max-w-lg mx-auto">
          Our team provides complimentary architectural audits examining your mobile page speed,
          AI search readiness (GEO), and conversion drop-offs.
        </p>
        <button
          onClick={onOpenConsultation}
          className="mt-6 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-lg cursor-pointer"
        >
          Request Free Site Architecture Audit
        </button>
      </div>
    </div>
  );
};
