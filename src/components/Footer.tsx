import React from 'react';
import { AuvrynLogo } from './AuvrynLogo.tsx';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { BLOGS_DATA } from '../data/blogsData.ts';
import { MapPin, Mail, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: (serviceSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="relative z-10 border-t border-white/20 bg-[#0a0a0a]/50 backdrop-blur-xl pt-16 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        {/* Top Callout Strip */}
        <div className="mb-14 rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 block mb-1">
              Ready to transcend the template?
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white silver-gradient-text">
              Commission your bespoke cinematic web experience.
            </h3>
            <p className="mt-1.5 text-sm text-white/70">
              Serving ambitious small businesses across Union Park, Orlando, Central Florida, and all 50 states nationwide.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation()}
            className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-white/85 shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Sparkles size={14} />
            <span>Schedule Studio Discovery Call</span>
          </button>
        </div>

        {/* 4-Column Navigation Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Studio Location */}
          <div className="lg:col-span-2 space-y-4">
            <AuvrynLogo size={36} />
            <p className="text-sm text-white/70 leading-relaxed max-w-sm pt-2">
              Auvryn Studios is an architectural digital agency engineering cinematic web design,
              3D interactive spatial experiences, 60 FPS animations, and sales workflow automations
              for high-growth small businesses.
            </p>
            <div className="space-y-2 text-xs text-white/60 pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400" />
                <span>Central Florida Studio: 3232 Albin Lane, Orlando, FL 32817 (Union Park)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400" />
                <span>
                  Direct Line:{' '}
                  <a href="tel:+13214195434" className="text-white hover:underline font-mono">
                    +1 (321) 419-5434
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400" />
                <span>
                  Studio Email:{' '}
                  <a href="mailto:auvrynstudios@gmail.com" className="text-white hover:underline font-mono">
                    auvrynstudios@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Standalone Services: Cinematic & Motion */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80 mb-3">
              Cinematic & Motion
            </h4>
            <ul className="space-y-2 text-xs text-white/65">
              {SERVICES_DATA.filter((s) => s.category === 'Cinematic & Motion').map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onNavigate('service-detail', srv.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Standalone Services: Architecture & Automations */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80 mb-3">
              Architecture & Automations
            </h4>
            <ul className="space-y-2 text-xs text-white/65">
              {SERVICES_DATA.filter((s) => s.category !== 'Cinematic & Motion').map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onNavigate('service-detail', srv.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Thought Leadership */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80 mb-3">
              Research & Insights
            </h4>
            <ul className="space-y-2.5 text-xs text-white/65">
              {BLOGS_DATA.map((blog) => (
                <li key={blog.id}>
                  <button
                    onClick={() => {
                      onNavigate('blog-detail', blog.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left line-clamp-1 group"
                    title={blog.title}
                  >
                    <span className="group-hover:underline">{blog.title}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('blog-index');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white hover:text-white/80 flex items-center gap-1 font-medium"
                >
                  View All 5 Articles <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Studio Technical Baseline Commitment */}
        <div className="py-6 border-b border-white/10 text-[11px] text-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="max-w-2xl leading-relaxed">
            <strong className="text-white/80 font-mono">Our Studio Standard:</strong> Every website we build includes a complimentary one-time technical SEO run (clean meta tags, Schema.org entities, fast mobile caching, and XML sitemaps). We focus purely on design, motion, and automation rather than selling speculative monthly ranking retainers.
          </div>
          <span className="font-mono text-white/40 whitespace-nowrap">Orlando, FL & Nationwide</span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            © {new Date().getFullYear()} Auvryn Studios LLC. All rights reserved. Built with precision for screen performance.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('competitor-gap')} className="hover:text-white">
              The Agency Gap
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white">
              Orlando Studio
            </button>
            <button onClick={() => onOpenConsultation()} className="hover:text-white">
              Project Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
