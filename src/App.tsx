import React, { useState, useEffect } from 'react';
import { ScrollVideoBackground } from './components/ScrollVideoBackground.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';

import { HomeView } from './views/HomeView.tsx';
import { ServiceDetailView } from './views/ServiceDetailView.tsx';
import { ServicesIndexView } from './views/ServicesIndexView.tsx';
import { BlogDetailView } from './views/BlogDetailView.tsx';
import { BlogIndexView } from './views/BlogIndexView.tsx';
import { CompetitorGapView } from './views/CompetitorGapView.tsx';
import { WorkView } from './views/WorkView.tsx';
import { AboutView } from './views/AboutView.tsx';

import { SERVICES_DATA } from './data/servicesData.ts';
import { BLOGS_DATA } from './data/blogsData.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationPreselectedService, setConsultationPreselectedService] = useState<string | undefined>();

  // Hash-based simple router for deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentView('home');
        return;
      }

      if (hash.startsWith('service/')) {
        const slug = hash.replace('service/', '');
        const found = SERVICES_DATA.find((s) => s.slug === slug);
        if (found) {
          setCurrentView('service-detail');
          setActiveSlug(slug);
          return;
        }
      }

      if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        const found = BLOGS_DATA.find((b) => b.slug === slug);
        if (found) {
          setCurrentView('blog-detail');
          setActiveSlug(slug);
          return;
        }
      }

      if (['services', 'services-index'].includes(hash)) {
        setCurrentView('services-index');
        return;
      }

      if (['blog', 'blog-index'].includes(hash)) {
        setCurrentView('blog-index');
        return;
      }

      if (['competitor-gap', 'competitors'].includes(hash)) {
        setCurrentView('competitor-gap');
        return;
      }

      if (['work', 'portfolio', 'projects'].includes(hash)) {
        setCurrentView('work');
        return;
      }

      if (['about', 'agency', 'studio'].includes(hash)) {
        setCurrentView('about');
        return;
      }

      if (['contact', 'consultation'].includes(hash)) {
        setIsConsultationOpen(true);
        return;
      }

      setCurrentView('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string, detailId?: string) => {
    setCurrentView(view);
    if (detailId) {
      setActiveSlug(detailId);
    }

    if (view === 'home') {
      window.location.hash = '';
    } else if (view === 'service-detail' && detailId) {
      window.location.hash = `service/${detailId}`;
    } else if (view === 'blog-detail' && detailId) {
      window.location.hash = `blog/${detailId}`;
    } else if (view === 'services-index') {
      window.location.hash = 'services';
    } else if (view === 'blog-index') {
      window.location.hash = 'blog';
    } else if (view === 'competitor-gap') {
      window.location.hash = 'competitor-gap';
    } else if (view === 'work') {
      window.location.hash = 'work';
    } else if (view === 'about') {
      window.location.hash = 'about';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceSlug?: string) => {
    setConsultationPreselectedService(serviceSlug);
    setIsConsultationOpen(true);
  };

  // Find active service or blog if in detail view
  const currentService = SERVICES_DATA.find((s) => s.slug === activeSlug) || SERVICES_DATA[0];
  const currentBlog = BLOGS_DATA.find((b) => b.slug === activeSlug) || BLOGS_DATA[0];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      {/* 1. Cinematic Scroll-Scrubbed Video Background (fixed full-bleed layer z-0) */}
      <ScrollVideoBackground />

      {/* 2. Global Content Container (relative z-10) */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        {/* Fixed Top Navbar */}
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Dynamic Route View */}
        <main className="flex-1 w-full">
          {currentView === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onOpenConsultation={handleOpenConsultation}
            />
          )}

          {currentView === 'service-detail' && (
            <ServiceDetailView
              service={currentService}
              onNavigate={handleNavigate}
              onOpenConsultation={handleOpenConsultation}
            />
          )}

          {currentView === 'services-index' && (
            <ServicesIndexView
              onNavigate={handleNavigate}
              onOpenConsultation={handleOpenConsultation}
            />
          )}

          {currentView === 'blog-detail' && (
            <BlogDetailView
              blog={currentBlog}
              onNavigate={handleNavigate}
              onOpenConsultation={handleOpenConsultation}
            />
          )}

          {currentView === 'blog-index' && (
            <BlogIndexView
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}

          {currentView === 'competitor-gap' && (
            <CompetitorGapView
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}

          {currentView === 'work' && (
            <WorkView
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}

          {currentView === 'about' && (
            <AboutView
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenConsultation={handleOpenConsultation}
        />
      </div>

      {/* Interactive Web Design & Services Inquiry Modal */}
      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedService={consultationPreselectedService}
      />
    </div>
  );
}
