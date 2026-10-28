import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Local & Location' | 'Design & Aesthetics' | 'Pricing & Promo' | 'Hosting & Engineering';
}

export const FAQS_DATA: FAQItem[] = [
  {
    category: 'Local & Location',
    question: 'Where is Auvryn Studios located in Orlando, FL?',
    answer:
      'Auvryn Studios is headquartered at 3232 Albin Lane, Orlando, FL 32817 in Union Park, FL (an established sublet and suburb of East Orlando). We serve clients throughout Central Florida—including Union Park, Downtown Orlando, Winter Park, Lake Nona, Waterford Lakes, and the UCF Research Corridor—as well as high-growth small businesses nationwide across all 50 states.',
  },
  {
    category: 'Design & Aesthetics',
    question: 'Will our website have to look black and metallic silver like Auvryn Studios?',
    answer:
      'Not at all. The black and metallic silver aesthetic is the personal brand identity of Auvryn Studios. For our clients, we design bespoke, sleek, updated, and modernized interfaces tailored entirely to your specific company, industry, and target clientele. Whether your business calls for a crisp clinical white look, warm organic hospitality tones, high-contrast editorial minimalism, or vibrant lifestyle palettes, we engineer an identity that fits your market flawlessly.',
  },
  {
    category: 'Pricing & Promo',
    question: 'How does the "FREE ONE-PAGE WEBSITE" promotion with $99/mo maintenance hosting work?',
    answer:
      'For a limited time, we are offering a complimentary custom-designed one-page website with the purchase of our $99/month maintenance hosting plan. This includes mobile-responsive design, global edge cloud hosting, automated SSL, continuous security patches, daily offsite backups, domain DNS setup, and ongoing technical maintenance. Limited time only. Offer subject to change. Cannot be combined with other offers.',
  },
  {
    category: 'Hosting & Engineering',
    question: 'What is included in the $99/month website maintenance hosting plan?',
    answer:
      'Our $99/month plan is a full-service managed infrastructure package: high-performance global edge CDN hosting with a 99.9% uptime SLA, automated SSL certificates, domain management, daily automated backups, security monitoring, CMS/framework updates, and direct support via phone (+1 321-419-5434) and email (auvrynstudios@gmail.com).',
  },
  {
    category: 'Design & Aesthetics',
    question: 'What is cinematic website design for small businesses?',
    answer:
      'Cinematic web design replaces boring, static templates with interactive visual storytelling: scroll-scrubbed background motion that advances as visitors scroll down, butter-smooth 60 FPS transitions, interactive 3D product visualizers, and deliberate editorial typography that commands instant authority and stops user bounce rates.',
  },
  {
    category: 'Local & Location',
    question: 'Do you offer in-person discovery meetings in Union Park and Orlando, FL?',
    answer:
      'Yes. For Central Florida clients in Union Park, Orlando, Winter Park, and surrounding areas, Damian Romero and the Auvryn team offer in-person discovery and project strategy sessions at our 3232 Albin Lane studio or at your company office. For nationwide clients, we operate via high-definition video walkthroughs and dedicated client communication channels.',
  },
  {
    category: 'Hosting & Engineering',
    question: 'Do you sell ongoing monthly SEO ranking retainers?',
    answer:
      'No. We do not sell speculative monthly SEO retainers or promise arbitrary search engine rankings. We believe in transparency and pure design craftsmanship. Instead, every website we design includes a complimentary one-time technical SEO foundation—proper meta tags, Schema.org entities, fast mobile caching, and clean XML sitemaps—ensuring your website is clean, indexed, and high-performing from day one.',
  },
  {
    category: 'Hosting & Engineering',
    question: 'What website automations and integrations do you engineer?',
    answer:
      'We eliminate tedious administrative busywork by building automated lead intake funnels, instant SMS alerts to your smartphone when high-value leads submit inquiries, seamless CRM integrations (HubSpot, Salesforce, Zapier), dynamic quote calculators, and automated calendar self-scheduling.',
  },
  {
    category: 'Pricing & Promo',
    question: 'How fast can you design and launch our website?',
    answer:
      'Our typical bespoke small business website sprints are delivered in 2 to 3 weeks from kickoff to deployment. You receive full sovereign ownership of your code, domains, and assets upon project completion.',
  },
  {
    category: 'Local & Location',
    question: 'How do I contact Auvryn Studios to start a project?',
    answer:
      'You can call our direct line at +1 (321) 419-5434, email our team directly at auvrynstudios@gmail.com, or schedule a 15-minute discovery call using our online project inquiry form.',
  },
];

interface FAQSectionProps {
  onOpenConsultation?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Local & Location', 'Design & Aesthetics', 'Pricing & Promo', 'Hosting & Engineering'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS_DATA
    : FAQS_DATA.filter((f) => f.category === selectedCategory);

  // Generate valid Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Dynamic Injection of FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 mb-3">
            <HelpCircle size={12} />
            <span>Hyperlocal Knowledge Base & Schema FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-md">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
            Everything you need to know about our Union Park, Orlando studio, bespoke design customization,
            automations, hosting infrastructure, and the Free One-Page Website offer.
          </p>
        </div>

        {/* Quick Contact Badge */}
        <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-black/60 p-4 font-mono text-xs text-white/80 backdrop-blur-md self-start md:self-end">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-emerald-400" />
            <span>3232 Albin Lane, Orlando, FL 32817 (Union Park)</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={13} className="text-emerald-400" />
            <a href="tel:+13214195434" className="hover:text-white transition-colors">
              +1 (321) 419-5434
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={13} className="text-emerald-400" />
            <a href="mailto:auvrynstudios@gmail.com" className="hover:text-white transition-colors">
              auvrynstudios@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black font-semibold shadow-md'
                : 'border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Grid */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-white/40 bg-black/75 shadow-xl'
                  : 'border-white/15 bg-black/45 hover:border-white/30'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest hidden sm:inline-block">
                    {faq.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-medium text-white">
                    {faq.question}
                  </h3>
                </div>
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/20 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-white text-black border-transparent' : 'text-white/60'
                  }`}
                >
                  <ChevronDown size={14} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-white/80 leading-relaxed border-t border-white/10">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA for Unanswered Inquiries */}
      <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-semibold text-white">Have a specific question about your web project?</h4>
          <p className="text-xs text-white/70 mt-0.5">
            Call Damian Romero directly at{' '}
            <a href="tel:+13214195434" className="text-white hover:underline font-mono">
              +1 (321) 419-5434
            </a>{' '}
            or send a brief to{' '}
            <a href="mailto:auvrynstudios@gmail.com" className="text-white hover:underline font-mono">
              auvrynstudios@gmail.com
            </a>.
          </p>
        </div>
        {onOpenConsultation && (
          <button
            onClick={() => onOpenConsultation()}
            className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black hover:bg-white/85 transition-colors cursor-pointer whitespace-nowrap shadow-md"
          >
            Ask Us a Question
          </button>
        )}
      </div>
    </section>
  );
};
