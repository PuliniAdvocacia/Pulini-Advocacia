
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TrustSection from './components/TrustSection';
import Services from './components/Services';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import WhatsAppFloating from './components/WhatsAppFloating';
import CookieBanner from './components/CookieBanner';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { OFFICE_PHONE, OFFICE_EMAIL } from './constants';

const App: React.FC = () => {
  const containerRef = useIntersectionObserver();

  useEffect(() => {
    // Injeção de Dados Estruturados (JSON-LD) para SEO Local e de Negócio
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Pulini Advocacia",
      "description": "Escritório de advocacia especializado em Direito Digital, LGPD e Contratos Tech.",
      "url": "https://pulini.adv.br",
      "telephone": OFFICE_PHONE,
      "email": OFFICE_EMAIL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "founder": {
        "@type": "Person",
        "name": "Vitor Pulini"
      },
      "knowsAbout": ["Direito Digital", "LGPD", "Proteção de Dados", "SaaS Compliance", "Startups Law"],
      "image": "https://i.postimg.cc/Y23xGLCb/profile.jpg"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef as any} className="selection:bg-sky-500/30 selection:text-white">
      <header>
        <Navbar />
      </header>
      
      <main>
        <Hero />
        <TrustSection />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>
      
      <Footer />
      
      {/* Floating UI Elements */}
      <WhatsAppFloating />
      <AIChat />
      <CookieBanner />
    </div>
  );
};

export default App;
