import React from 'react';
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2, Shield, Zap, Search, Eye, Layers, Star } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { BLOGS_DATA } from '../data/blogsData.ts';
import { COMPETITOR_BENCHMARKS } from '../data/competitorData.ts';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { TestimonialsSection } from '../components/TestimonialsSection.tsx';

interface HomeViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: (preselectedService?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="relative z-10 w-full text-white">
      {/* SECTION ONE — HERO (Full viewport flex column justify-between) */}
      <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col gap-8 sm:flex-row justify-between items-start">
          {/* Left — Service List */}
          <div className="flex flex-col gap-2 rounded-xl bg-black/40 backdrop-blur-md p-3.5 border border-white/10 shadow-lg">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white drop-shadow-md">
              / CINEMATIC WEBSITE DESIGN
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white drop-shadow-md">
              / 3D & IMMERSIVE EXPERIENCES
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white drop-shadow-md">
              / 60 FPS ANIMATIONS & AUTOMATIONS
            </span>
          </div>

          {/* Right — Intro */}
          <div className="max-w-xs sm:text-right rounded-xl bg-black/40 backdrop-blur-md p-3.5 border border-white/10 shadow-lg">
            <p className="text-base sm:text-lg leading-relaxed text-white drop-shadow-md">
              We design cinematic digital experiences that bring visual depth, buttery motion, and operational
              automation to high-growth small businesses.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col gap-8 md:flex-row items-end justify-between mt-auto pt-16">
          {/* Left Headline & Accent Badge */}
          <div className="max-w-2xl">
            <div className="border-l-2 border-white bg-black/50 px-3 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] mb-5 inline-block text-white border-y border-r border-white/15 shadow-xl">
              Orlando, FL & Nationwide · Fixed 2-3 Week Sprints
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] text-shadow-cinematic">
              Clear. Precise.
              <br />
              <span className="silver-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">Cinematic.</span>
            </h1>
          </div>

          {/* Right — Glass Contact Card */}
          <div className="flex items-center gap-4 rounded-xl bg-black/50 p-3.5 backdrop-blur-md border border-white/25 shadow-2xl">
            <img
              src="/assets/images/damian_romero_headshot.jpg"
              alt="Damian Romero, founder of Auvryn Studios"
              className="h-24 w-20 rounded-lg object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white">Talk with Damian</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                Founder of Auvryn Studios
              </span>
              <button
                onClick={() => onOpenConsultation()}
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors mt-1.5 flex items-center gap-1 cursor-pointer shadow-md"
              >
                <span>Book 15-mins call</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MID SPACER — CRITICAL FOR SCROLL VIDEO SCRUB LENGTH PER SPECIFICATION */}
      <div className="h-[80vh] w-full pointer-events-none" aria-hidden="true" />

      {/* SECTION TWO — CAPABILITY (Full viewport flex justify-between shell) */}
      <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <div className="border-l-2 border-white bg-black/50 px-3 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-white border-y border-r border-white/15 shadow-xl">
            Pure Design Craftsmanship
          </div>
          <div className="max-w-sm sm:text-right rounded-xl bg-black/40 backdrop-blur-md p-3.5 border border-white/10 shadow-lg">
            <p className="text-base sm:text-lg leading-relaxed text-white drop-shadow-md">
              We solely focus on designing websites that captivate: scroll-scrubbed cinematography,
              fluid 60 FPS animations, and seamless business automations.
            </p>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="flex-1 justify-end flex flex-col gap-12 md:flex-row items-end justify-between md:gap-16 mt-auto pt-16">
          {/* Left Column */}
          <div className="max-w-xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] text-shadow-cinematic">
              Learn to see
              <br />
              <span className="silver-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">brilliantly.</span>
            </h2>
            <div className="mt-6 max-w-md rounded-xl bg-black/40 backdrop-blur-md p-3.5 border border-white/10 shadow-lg">
              <p className="text-sm sm:text-base text-white/90 drop-shadow-md leading-relaxed">
                From the first storyboard to the final interactive canvas, Auvryn turns raw small business
                intent into undeniable digital authority. No generic templates, no empty ranking promises—just
                uncompromising design and engineering.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('services-index')}
                className="rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Explore All {SERVICES_DATA.length} Services</span>
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => onOpenConsultation()}
                className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                Free Studio Consultation
              </button>
            </div>
          </div>

          {/* Right — Frosted Capability Panel */}
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6">
            {/* Row 01 */}
            <div className="flex gap-5 py-5 border-b border-white/15 group">
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">01</span>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-medium text-white">
                    Scroll-Driven Vision
                  </h3>
                  <ChevronRight
                    size={16}
                    className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Advances with thumb scroll and pauses on stop, captivating high-value prospects
                  before they can bounce.
                </p>
              </div>
            </div>

            {/* Row 02 */}
            <div className="flex gap-5 py-5 border-b border-white/15 group">
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">02</span>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-medium text-white">
                    60 FPS Animations & Motion
                  </h3>
                  <ChevronRight
                    size={16}
                    className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  GPU-accelerated micro-interactions, magnetic cursor pull, and tactile spring physics
                  that make your interface feel luxurious.
                </p>
              </div>
            </div>

            {/* Row 03 */}
            <div className="flex gap-5 py-5 group">
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">03</span>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-medium text-white">
                    Web Automations & Hosting
                  </h3>
                  <ChevronRight
                    size={16}
                    className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Instant SMS lead alerts, CRM webhook ingestion, self-booking calendars, and global edge
                  CDN hosting with zero maintenance headaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION THREE — ALL DEDICATED SERVICES DIRECTORY SHOWCASE */}
      <section className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 mb-3">
              <Layers size={12} />
              <span>Dedicated Service Practices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-md">
              Focused on Design, Motion, Automations & Care
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/85 max-w-xl drop-shadow-sm">
              We never sell speculative SEO ranking packages. Instead, we build unforgettable cinematic websites
              with fluid animations and automated workflows, with a complimentary one-time technical SEO run included standard.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services-index')}
            className="text-xs font-mono uppercase tracking-[0.14em] text-white/80 hover:text-white flex items-center gap-1.5 self-start md:self-end"
          >
            <span>View All Directory</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              onClick={() => onNavigate('service-detail', service.slug)}
              className="group relative cursor-pointer rounded-2xl border border-white/20 bg-black/55 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-black/75 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                    0{idx + 1} · {service.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/50 group-hover:text-white transition-colors">
                    Standalone Page →
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white group-hover:silver-gradient-text transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
                  {service.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-white/60">
                  Sprint: {service.estimatedTimeline}
                </span>
                <span className="text-white/90 group-hover:underline flex items-center gap-1">
                  Explore Details
                  <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION FOUR — VERIFIED 5-STAR REVIEWS & MOCK CINEMATIC WEBSITE PREVIEWS */}
      <TestimonialsSection onOpenConsultation={onOpenConsultation} />

      {/* SECTION FIVE — THE ORLANDO & NATIONAL COMPETITOR BENCHMARK GAP */}
      <section className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 mb-3">
            <Eye size={12} />
            <span>Market Intelligence & The Agency Gap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-md">
            What Traditional Agencies Are Missing
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/85 leading-relaxed drop-shadow-sm">
            We examined what typical web design agencies in Orlando, Florida, and nationwide do well,
            and where their outdated methods cost small businesses revenue. Here is how Auvryn Studios bridges the gap.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/20 bg-black/40">
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70">
                  Feature / Discipline
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                  Typical Orlando & National Agencies
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white font-bold bg-white/10">
                  Auvryn Studios Craft
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
              {COMPETITOR_BENCHMARKS.map((bench, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{bench.category}</td>
                  <td className="py-4 px-6 text-white/70">{bench.typicalOrlandoAgency}</td>
                  <td className="py-4 px-6 text-white bg-white/5 font-medium">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-white flex-shrink-0 mt-0.5" />
                      <span>{bench.auvrynStudios}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION SIX — CASE STUDIES & LIVE WORK */}
      <section className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 mb-3">
              <Zap size={12} />
              <span>Proven Business Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-md">
              Selected Projects & Documented Metrics
            </h2>
          </div>
          <button
            onClick={() => onNavigate('work')}
            className="text-xs font-mono uppercase tracking-[0.14em] text-white/80 hover:text-white flex items-center gap-1.5 self-start md:self-end"
          >
            <span>View All Case Studies</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('work')}
              className="group cursor-pointer rounded-2xl border border-white/20 bg-black/55 p-6 sm:p-8 backdrop-blur-md transition-all hover:border-white/45 hover:bg-black/75 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 mb-3 font-mono">
                  <span>{item.client}</span>
                  <span className="font-mono text-[10px] text-white/50">{item.location}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white group-hover:silver-gradient-text transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/20 rounded-md px-2.5 py-1 text-[11px] text-white/90 font-mono bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-end justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white silver-gradient-text">
                    {item.resultMetric}
                  </div>
                  <div className="text-[11px] text-white/60 uppercase tracking-wider font-mono">
                    {item.resultLabel}
                  </div>
                </div>
                <span className="text-xs text-white font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Architecture <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION SEVEN — RESEARCH BLOGS (5 Published Articles) */}
      <section className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 mb-3">
              <Search size={12} />
              <span>Industry Pain Points & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-md">
              Published Insights & Blueprints
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/80 max-w-xl">
              Research-backed breakdowns of cinematic web design, 60 FPS motion, 3D performance, and sales automations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog-index')}
            className="text-xs font-mono uppercase tracking-[0.14em] text-white/80 hover:text-white flex items-center gap-1.5 self-start md:self-end"
          >
            <span>Read All 5 Articles</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS_DATA.slice(0, 3).map((blog) => (
            <article
              key={blog.id}
              onClick={() => onNavigate('blog-detail', blog.slug)}
              className="group cursor-pointer rounded-2xl border border-white/20 bg-black/55 p-6 backdrop-blur-md transition-all hover:border-white/45 hover:bg-black/75 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mb-3">
                  <span>{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-lg font-medium text-white group-hover:silver-gradient-text transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>

                {/* Pain Points Solved Badge */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 block mb-1.5">
                    Pain Points Analyzed:
                  </span>
                  <div className="text-[11px] text-white/70 line-clamp-1 italic">
                    {blog.painPointsAddressed[0]}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 flex items-center justify-between text-xs text-white/80 font-mono">
                <span>{blog.date}</span>
                <span className="text-white group-hover:underline flex items-center gap-1">
                  Read Guide <ChevronRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION EIGHT — DIRECT INQUIRY CTA STRIP */}
      <section className="py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl border border-white/25 bg-black/60 p-8 sm:p-12 text-center max-w-4xl mx-auto backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-4">
            <Sparkles size={12} />
            <span>Studio Consultation & Strategy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight silver-gradient-text">
            Start Your Small Business Cinematic Journey
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/70 leading-relaxed">
            Whether you are in Orlando, Central Florida, or anywhere across the nation, we deliver
            turnkey cinematic web experiences in 2 to 3-week fixed sprints.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-xl cursor-pointer"
            >
              Request Web Design Proposal
            </button>
            <button
              onClick={() => onNavigate('services-index')}
              className="w-full sm:w-auto rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              Browse Standalone Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
