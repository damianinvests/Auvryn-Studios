import React from 'react';
import { MapPin, Sparkles, Shield, Cpu, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuvrynLogo } from '../components/AuvrynLogo.tsx';

interface AboutViewProps {
  onNavigate: (view: string, detailId?: string) => void;
  onOpenConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="relative z-10 w-full text-white pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
          <Sparkles size={12} />
          <span>Agency Manifesto · Orlando, FL & Nationwide</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] max-w-3xl">
          We Believe Small Businesses Deserve{' '}
          <span className="silver-gradient-text">Cinematic Authority.</span>
        </h1>
        <p className="mt-4 text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed">
          For years, breathtaking scroll-driven motion and interactive 3D was reserved for Apple,
          Tesla, and Fortune 500 corporations with $200,000 budgets. We built Auvryn Studios to change that.
        </p>
      </div>

      {/* The Story & Leadership */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-white/80 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Headquartered in Orlando. Engineering Nationwide.
          </h2>
          <p>
            Auvryn Studios was founded in Orlando, Florida by Damian Romero, an architectural designer
            and systems engineer frustrated by the low standard of web agency output. The typical local
            agency pitch had become predictable: sell a $7,000 WordPress theme, load it with 40 plugins,
            and charge an ongoing retainer just to keep it from crashing.
          </p>
          <p>
            We tore up that entire playbook. At Auvryn Studios, every website is engineered as a
            custom digital film: scroll-scrubbed 60 FPS video canvases, tactile 3D WebGL models,
            sub-second React performance, fluid micro-interaction animations, and sales workflow automations
            that run your business on autopilot.
          </p>
          <p>
            We don’t sell speculative monthly SEO ranking retainers or make empty promises about rankings.
            Instead, we deliver world-class design, motion, and automations, with a complimentary one-time
            technical SEO and Schema run included as standard so your site is technically immaculate from day one.
          </p>
          <p>
            Whether we are designing for an architectural firm in Winter Park, a medical clinic in Lake Nona,
            or a luxury manufacturer in Manhattan or Los Angeles, our standard remains unchanged:
            uncompromising speed and cinematic beauty.
          </p>
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col items-center text-center">
          <img
            src="/assets/images/damian_romero_headshot.jpg"
            alt="Damian Romero, Founder & Creative Director of Auvryn Studios"
            className="w-32 h-36 rounded-2xl object-cover border border-white/25 shadow-2xl mb-4"
          />
          <h3 className="text-xl font-semibold text-white">Damian Romero</h3>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/60 mt-0.5">
            Founder & Creative Director
          </span>
          <p className="mt-3 text-xs text-white/70 leading-relaxed max-w-xs">
            "Your website is your company’s highest-traffic physical address. It should evoke the same
            pride, craftsmanship, and awe as stepping into a world-class architectural flagship."
          </p>
          <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-2 text-xs text-white/60">
            <MapPin size={14} className="text-white" />
            <span>Studio: Downtown Orlando, Florida</span>
          </div>
        </div>
      </div>

      {/* The 4 Principles of Auvryn Engineering */}
      <div className="mb-16">
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 block mb-1">
            Our Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            The Four Principles of Auvryn Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
            <div className="font-mono text-xs text-white/40 mb-2">01 / SPEED</div>
            <h3 className="text-lg font-medium text-white mb-2">Sub-Second Mobile</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              We target 98+ Google Lighthouse mobile scores. Zero bloated page builders, zero unnecessary dependencies.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
            <div className="font-mono text-xs text-white/40 mb-2">02 / CINEMA</div>
            <h3 className="text-lg font-medium text-white mb-2">Scroll-Scrubbed Motion</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Videos advance with user scroll, hold on stop, and reverse on backscroll. Digital film pacing for real-world products.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
            <div className="font-mono text-xs text-white/40 mb-2">03 / AUTOMATION</div>
            <h3 className="text-lg font-medium text-white mb-2">Autonomous Workflows</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Instant SMS lead alerts, CRM webhook ingestion, self-booking calendars, and automated intake that runs your business 24/7.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
            <div className="font-mono text-xs text-white/40 mb-2">04 / RESPECT</div>
            <h3 className="text-lg font-medium text-white mb-2">Zero Retainer Hostage</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              You own 100% of your code and assets upon delivery. Clean, documented, and delivered in 2-3 week fixed sprints.
            </p>
          </div>
        </div>
      </div>

      {/* Studio Location & Nationwide Reach */}
      <div className="mb-16 rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 block mb-2">
              Physical & Digital Footprint
            </span>
            <h3 className="text-2xl font-semibold text-white">Orlando Roots · Nationwide Impact</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              While our physical studio is rooted in downtown Orlando on Orange Avenue, over 65% of our
              client roster spans across New York, California, Texas, Colorado, and the Southeast.
            </p>
            <div className="mt-6 space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Downtown Orlando Studio: 200 S Orange Ave, Orlando, FL 32801</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Serving Clients Nationwide in All 50 States</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Fixed 2 to 3-Week Rapid Delivery Sprints</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-black/60 p-6 font-mono text-xs space-y-3">
            <div className="text-white/50 pb-2 border-b border-white/10 uppercase tracking-wider">
              Studio Operating Profile
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Core Focus:</span>
              <span className="text-white">Web Design, Animations, Automations & Hosting</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Technical Baseline:</span>
              <span className="text-white">Complimentary One-Time Technical SEO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Average Sprint:</span>
              <span className="text-white">14 to 21 Calendar Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Primary Architecture:</span>
              <span className="text-white">React 19 + TypeScript + Motion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Client Ownership:</span>
              <span className="text-emerald-400 font-bold">100% Sovereign Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 sm:p-12 text-center backdrop-blur-xl">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white silver-gradient-text">
          Ready to Elevate Your Small Business?
        </h3>
        <p className="mt-3 text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
          Book a 15-minute consultation directly with Damian Romero to audit your digital presence
          and outline your cinematic web roadmap.
        </p>
        <button
          onClick={onOpenConsultation}
          className="mt-6 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-white/85 transition-all shadow-xl cursor-pointer"
        >
          Book Discovery Consultation
        </button>
      </div>
    </div>
  );
};
