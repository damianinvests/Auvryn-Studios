import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Zap, Monitor, Smartphone, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import { Testimonial } from '../types/index.ts';

interface MockWebsiteModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const MockWebsiteModal: React.FC<MockWebsiteModalProps> = ({
  testimonial,
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'features' | 'tech'>('preview');
  const [activeMaterial, setActiveMaterial] = useState<string>('Brushed Silver');
  const [isSimulatingScroll, setIsSimulatingScroll] = useState<boolean>(false);

  if (!isOpen || !testimonial) return null;

  const { mockWebsitePreview } = testimonial;

  const handleSimulateScroll = () => {
    setIsSimulatingScroll(true);
    setTimeout(() => {
      setIsSimulatingScroll(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/20 bg-[#0d0f12] text-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-3.5 bg-black/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/70">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>https://{mockWebsitePreview.domain}</span>
            </div>
            <span className="font-mono text-xs text-white/50 hidden md:inline">
              · {testimonial.businessName} (Auvryn Engineered)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport Toggles */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  deviceMode === 'desktop' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  deviceMode === 'mobile' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone size={14} />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Subnav & Simulator Controls */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-2 bg-black/40 text-xs font-mono">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'preview' ? 'border-white text-white font-medium' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Cinematic Preview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'features' ? 'border-white text-white font-medium' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Engineered Features
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'tech' ? 'border-white text-white font-medium' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Tech & Performance Specs
            </button>
          </div>

          <button
            onClick={handleSimulateScroll}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[11px]"
          >
            <RotateCw size={11} className={isSimulatingScroll ? 'animate-spin' : ''} />
            <span>Simulate Motion</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0a]">
          {activeTab === 'preview' && (
            <div className={`mx-auto transition-all duration-300 ${deviceMode === 'mobile' ? 'max-w-xs' : 'w-full'}`}>
              {/* Browser Screen Simulation Container */}
              <div
                className={`rounded-xl border border-white/15 bg-gradient-to-b from-[#14171c] to-[#0b0c0e] p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-700 ${
                  isSimulatingScroll ? 'ring-2 ring-white/50 translate-y-1' : ''
                }`}
              >
                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                {/* Simulated Site Top Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-gradient-to-br from-white via-white/80 to-white/40 flex items-center justify-center text-black font-bold text-xs">
                      {testimonial.businessName.charAt(0)}
                    </div>
                    <span className="font-semibold text-sm tracking-tight text-white">
                      {testimonial.businessName}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-white/70 font-mono">
                    <span>Portfolio</span>
                    <span>Craft</span>
                    <span>About</span>
                    <span className="px-2.5 py-1 rounded-full border border-white/20 text-white">
                      Inquire
                    </span>
                  </div>
                </div>

                {/* Simulated Hero Section */}
                <div className="py-10 sm:py-16">
                  <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 mb-4">
                    <Sparkles size={11} />
                    <span>{mockWebsitePreview.tagline}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white silver-gradient-text leading-tight mb-4">
                    {mockWebsitePreview.heroHeadline}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed mb-6">
                    Bespoke digital architecture engineered by Auvryn Studios. Featuring 60 FPS motion,
                    instantaneous page loads, and automated consultation routing.
                  </p>

                  {/* Interactive Simulation Specifics */}
                  {mockWebsitePreview.previewType === 'luxury-craft' && (
                    <div className="p-4 rounded-xl border border-white/15 bg-white/5 mb-6 max-w-md">
                      <span className="font-mono text-[11px] text-white/60 block mb-2">
                        Interactive 3D Material Switcher Simulation:
                      </span>
                      <div className="flex gap-2">
                        {['Brushed Silver', 'Obsidian Bronze', 'Nordic Ash'].map((mat) => (
                          <button
                            key={mat}
                            onClick={() => setActiveMaterial(mat)}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                              activeMaterial === mat
                                ? 'bg-white text-black font-bold shadow'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {mat}
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 text-[11px] text-white/70 font-mono">
                        Active Surface: <span className="text-white font-medium">{activeMaterial}</span> (60 FPS WebGL Shading)
                      </div>
                    </div>
                  )}

                  {mockWebsitePreview.previewType === 'architectural' && (
                    <div className="p-4 rounded-xl border border-white/15 bg-white/5 mb-6 max-w-md">
                      <span className="font-mono text-[11px] text-white/60 block mb-2">
                        Spatial Scrollytelling Demo:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 rounded bg-black/40 border border-white/10">
                          <span className="text-white/50 block text-[10px]">Elevation 01:</span>
                          <span className="text-white">Cantilever Villa</span>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10">
                          <span className="text-white/50 block text-[10px]">View Mode:</span>
                          <span className="text-emerald-400">Cinematic Flyover</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {mockWebsitePreview.previewType === 'aerospace' && (
                    <div className="p-4 rounded-xl border border-white/15 bg-white/5 mb-6 max-w-md">
                      <span className="font-mono text-[11px] text-white/60 block mb-2">
                        Telemetry & Stress Test Simulation:
                      </span>
                      <div className="flex items-center justify-between text-xs font-mono bg-black/40 p-2.5 rounded border border-white/10">
                        <span>Yield Strength: 4,850 MPa</span>
                        <span className="text-emerald-400">PASSED 100%</span>
                      </div>
                    </div>
                  )}

                  {/* Simulated Metrics Strip */}
                  <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                    {mockWebsitePreview.stats.map((stat, i) => (
                      <div key={i} className="text-left">
                        <div className="text-base sm:text-xl font-bold text-white silver-gradient-text">
                          {stat.value}
                        </div>
                        <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>© {new Date().getFullYear()} {testimonial.businessName}. All rights reserved.</span>
                  <span>Engineered by Auvryn Studios</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-2xl mx-auto py-6 space-y-4">
              <h4 className="text-lg font-semibold text-white">Engineered Systems for {testimonial.businessName}</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Here is what Auvryn Studios architected to turn this client’s digital presence into an automated sales engine:
              </p>
              <div className="space-y-3 pt-2">
                {mockWebsitePreview.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border border-white/15 bg-white/5">
                    <CheckCircle2 size={16} className="text-white mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-white">{feat}</span>
                      <p className="text-xs text-white/60 mt-0.5">
                        Handcrafted with zero bloated plugins, custom CSS GPU acceleration, and reliable webhooks.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="max-w-2xl mx-auto py-6 space-y-4">
              <h4 className="text-lg font-semibold text-white">Technical & Infrastructure Specifications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/15 bg-white/5">
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">Frontend Stack</span>
                  <span className="text-sm font-medium text-white">React 19 + TypeScript + Vite + Tailwind</span>
                </div>
                <div className="p-4 rounded-xl border border-white/15 bg-white/5">
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">Animation Engine</span>
                  <span className="text-sm font-medium text-white">Hardware GPU Composite (60 FPS Lerp)</span>
                </div>
                <div className="p-4 rounded-xl border border-white/15 bg-white/5">
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">Hosting & CDN</span>
                  <span className="text-sm font-medium text-white">Global Edge Cloud CDN with Auto-SSL</span>
                </div>
                <div className="p-4 rounded-xl border border-white/15 bg-white/5">
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-1">Lead Automation</span>
                  <span className="text-sm font-medium text-white">Instant Webhook Dispatch & SMS Telemetry</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 px-4 sm:px-6 py-4 bg-black/80">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="font-semibold text-white">{testimonial.clientName}</span>
            <span>·</span>
            <span>{testimonial.clientRole}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="flex-1 sm:flex-initial rounded-full bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-white/85 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Build A Similar Cinematic Site</span>
              <Sparkles size={13} />
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-white/20 px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
