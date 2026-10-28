import React, { useState } from 'react';
import { AuvrynLogo } from './AuvrynLogo.tsx';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ChevronDown, Menu, X, ArrowUpRight, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: (preselectedService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenConsultation,
}) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/15 bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-5 sm:px-8 md:px-12">
        {/* Left: Brand Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg p-1 text-left"
          aria-label="Auvryn Studios Home"
        >
          <AuvrynLogo size={32} />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/85"
          aria-label="Main Navigation"
        >
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => onNavigate('services-index')}
              className={`flex items-center gap-1.5 transition-colors duration-300 hover:text-white py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded ${
                currentView.startsWith('service') ? 'text-white font-medium' : 'text-white/80'
              }`}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-white/50 ${
                  isServicesOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div className="absolute top-full -left-20 w-[480px] rounded-2xl border border-white/15 bg-[#0d0f12]/95 backdrop-blur-xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 grid grid-cols-2 gap-2">
                <div className="col-span-2 pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/50">
                    Design, Motion & Systems ({SERVICES_DATA.length})
                  </span>
                  <button
                    onClick={() => {
                      setIsServicesOpen(false);
                      onNavigate('services-index');
                    }}
                    className="text-[11px] text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    View All Directory <ArrowUpRight size={12} />
                  </button>
                </div>
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setIsServicesOpen(false);
                      onNavigate('service-detail', srv.slug);
                    }}
                    className="text-left p-2.5 rounded-lg hover:bg-white/10 transition-colors group flex flex-col"
                  >
                    <span className="text-xs font-medium text-white group-hover:text-white flex items-center justify-between">
                      {srv.shortTitle}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60">
                        →
                      </span>
                    </span>
                    <span className="text-[10px] text-white/50 truncate mt-0.5">
                      {srv.tagline}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('work')}
            className={`flex items-center gap-1 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded ${
              currentView === 'work' ? 'text-white font-medium' : 'text-white/80'
            }`}
          >
            <span>Projects</span>
            <sup className="font-mono text-[10px] text-white/60">4</sup>
          </button>

          <button
            onClick={() => onNavigate('competitor-gap')}
            className={`transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded ${
              currentView === 'competitor-gap' ? 'text-white font-medium' : 'text-white/80'
            }`}
          >
            The Agency Gap
          </button>

          <button
            onClick={() => onNavigate('blog-index')}
            className={`flex items-center gap-1 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded ${
              currentView.startsWith('blog') ? 'text-white font-medium' : 'text-white/80'
            }`}
          >
            <span>Insights</span>
            <sup className="font-mono text-[10px] text-white/60">5</sup>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded ${
              currentView === 'about' ? 'text-white font-medium' : 'text-white/80'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right: CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Direct Phone CTA Button */}
          <a
            href="tel:+13214195434"
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-mono text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:text-white"
            title="Call Auvryn Studios Direct"
          >
            <PhoneCall size={12} className="text-emerald-400" />
            <span>+1 (321) 419-5434</span>
          </a>

          <button
            onClick={() => onOpenConsultation()}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Start Project</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/15 bg-[#0a0a0a]/95 backdrop-blur-xl px-5 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-sm">
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 pb-1 border-b border-white/10">
              Navigation
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="text-left py-1.5 text-white/80 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('services-index');
              }}
              className="text-left py-1.5 text-white/80 hover:text-white flex items-center justify-between"
            >
              <span>Services Directory ({SERVICES_DATA.length})</span>
              <ArrowUpRight size={14} className="text-white/50" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('work');
              }}
              className="text-left py-1.5 text-white/80 hover:text-white"
            >
              Case Studies & Projects
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('competitor-gap');
              }}
              className="text-left py-1.5 text-white/80 hover:text-white"
            >
              The Agency Gap & Comparison
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('blog-index');
              }}
              className="text-left py-1.5 text-white/80 hover:text-white"
            >
              Strategic Insights & Guides
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('about');
              }}
              className="text-left py-1.5 text-white/80 hover:text-white"
            >
              About Damian Romero & Studio
            </button>

            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <a
                href="tel:+13214195434"
                className="flex items-center justify-center gap-2 w-full rounded-full border border-white/20 bg-white/10 py-2.5 text-center text-xs font-mono font-medium text-white hover:bg-white/20 transition-colors"
              >
                <PhoneCall size={13} className="text-emerald-400" />
                <span>Call Studio: +1 (321) 419-5434</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full rounded-full bg-white py-3 text-center text-xs font-semibold text-black hover:bg-white/85 transition-colors cursor-pointer shadow-lg"
              >
                Book 15-Minute Project Call
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
