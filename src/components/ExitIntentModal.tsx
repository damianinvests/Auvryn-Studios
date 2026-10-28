import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Gift, Phone } from 'lucide-react';

interface ExitIntentModalProps {
  onOpenConsultation?: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoTicket, setPromoTicket] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Check if dismissed in this browser session
    const isDismissed = sessionStorage.getItem('auvryn_exit_dismissed');
    if (isDismissed) {
      setHasTriggered(true);
      return;
    }

    // 1. Desktop: trigger when cursor moves up toward browser chrome/tabs (clientY <= 10)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    // 2. Mobile / Inactivity fallback: trigger after 40 seconds of active browsing if still unread
    const mobileTimer = setTimeout(() => {
      if (!hasTriggered && !sessionStorage.getItem('auvryn_exit_dismissed')) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    }, 40000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('auvryn_exit_dismissed', 'true');
  };

  const handleOpenManually = () => {
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid business email.');
      return;
    }

    if (!businessName.trim()) {
      setErrorMsg('Please enter your business or project name.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedId = `PROMO-${Math.floor(1000 + Math.random() * 9000)}`;
      setPromoTicket(generatedId);
    }, 600);
  };

  return (
    <>
      {/* Floating Re-Open Badge (Subtle persistent corner anchor) */}
      {!isOpen && (
        <button
          onClick={handleOpenManually}
          className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-black/85 px-4 py-2 text-xs font-mono text-white backdrop-blur-xl shadow-2xl transition-all hover:bg-white hover:text-black hover:scale-105 cursor-pointer group"
          aria-label="Claim Promotional Website Offer"
        >
          <Gift size={14} className="text-amber-400 group-hover:text-black transition-colors" />
          <span>Special Offer: Free 1-Page Website</span>
        </button>
      )}

      {/* Exit Intent Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/30 bg-[#0d0f12] p-6 sm:p-10 text-white shadow-[0_0_80px_rgba(255,255,255,0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 rounded-full border border-white/20 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Close promotion dialog"
            >
              <X size={18} />
            </button>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-1">
                    Promotional Allocation Reserved · Ticket #{promoTicket}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-white">
                    Free Website Offer Claimed
                  </h3>
                  <p className="mt-3 text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{fullName}</strong>. Your spot for the{' '}
                    <strong className="text-white">FREE ONE-PAGE WEBSITE</strong> (with the $99/mo maintenance
                    hosting plan) has been locked in for <strong className="text-white">{businessName}</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left max-w-md mx-auto space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Selected Promotion:</span>
                    <span className="text-white font-medium">Free 1-Page Custom Website</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Hosting & Care Plan:</span>
                    <span className="text-emerald-400 font-bold">$99 / month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Studio Contact:</span>
                    <a href="tel:+13214195434" className="text-white hover:underline">
                      +1 (321) 419-5434
                    </a>
                  </div>
                </div>

                <p className="text-xs text-white/60 max-w-md mx-auto">
                  Damian Romero or a studio director from our Union Park / Orlando office will contact you
                  shortly to begin your design sprint.
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/85 transition-colors cursor-pointer shadow-lg"
                  >
                    Return to Studio
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Sale Tag */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300">
                    <Zap size={13} className="text-amber-400" />
                    <span>Limited Time Client Incentive</span>
                  </div>
                </div>

                {/* Promotional Offer Heading & Subheading Per Exact Prompt */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-md">
                    FREE ONE-PAGE WEBSITE
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 font-mono mt-2 font-medium">
                    with the purchase of our $99/month maintenance hosting plan
                  </p>
                </div>

                {/* Offer Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <div className="text-white font-semibold text-sm">Bespoke Design</div>
                    <div className="text-white/60 text-[10px] mt-0.5">Mobile-first, modernized UI</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <div className="text-white font-semibold text-sm">Edge Hosting</div>
                    <div className="text-white/60 text-[10px] mt-0.5">99.9% uptime SLA & SSL</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <div className="text-white font-semibold text-sm">Turnkey Care</div>
                    <div className="text-white/60 text-[10px] mt-0.5">Daily backups & domain DNS</div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-white/80 mb-1">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Damian Romero"
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/80 mb-1">
                        Business Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. contact@mybusiness.com"
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-white/80 mb-1">
                        Business / Company Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Vanguard Design Group"
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/80 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (321) 419-5434"
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400 font-mono text-center">{errorMsg}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-white py-3.5 px-6 text-sm font-bold text-black uppercase tracking-wider hover:bg-white/85 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Reserving Your Offer...' : 'Claim Free One-Page Website'}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Direct Phone Assistance CTA */}
                  <div className="text-center pt-2">
                    <span className="text-xs text-white/60">
                      Prefer to speak directly? Call our studio at{' '}
                      <a href="tel:+13214195434" className="text-white hover:underline font-mono font-medium">
                        +1 (321) 419-5434
                      </a>
                    </span>
                  </div>

                  {/* Fine Print Per Exact Prompt */}
                  <div className="pt-3 border-t border-white/10 text-center">
                    <p className="text-[10px] text-white/50 font-mono leading-relaxed">
                      limited time only. offer subject to change. cannot be combined with other offers.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
