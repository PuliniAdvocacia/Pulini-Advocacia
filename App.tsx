
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
    // Injeção de Dados Estruturados (JSON-LD) Ultra-Completos para Google Rich Snippets
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LegalService",
          "@id": "https://pulini.adv.br/#organization",
          "name": "Pulini Advocacia",
          "alternateName": ["Vitor Pulini Advocacia", "Pulini Digital Law"],
          "description": "Escritório de advocacia boutique especializado em Direito Digital, Proteção de Dados (LGPD) e Blindagem para Startups.",
          "url": "https://pulini.adv.br",
          "logo": {
            "@type": "ImageObject",
            "url": "https://i.postimg.cc/Y23xGLCb/profile.jpg"
          },
          "image": "https://i.postimg.cc/Y23xGLCb/profile.jpg",
          "telephone": OFFICE_PHONE,
          "email": OFFICE_EMAIL,
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-23.5505",
            "longitude": "-46.6333"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços Jurídicos Digitais",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Adequação à LGPD",
                  "description": "Implementação completa de governança e proteção de dados para empresas."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Blindagem de Startups",
                  "description": "Estruturação jurídica, contratos de investimento e vesting."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Direito SaaS",
                  "description": "Elaboração de Termos de Uso e Políticas de Privacidade para softwares."
                }
              }
            ]
          }
        },
        {
          "@type": "Person",
          "@id": "https://pulini.adv.br/#founder",
          "name": "Vitor Pulini",
          "jobTitle": "Advogado Especialista em Direito Digital",
          "nationality": "BR",
          "affiliation": { "@id": "https://pulini.adv.br/#organization" },
          "sameAs": [
            "https://www.linkedin.com/in/vitorpulini",
            "https://www.instagram.com/pulini.adv"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://pulini.adv.br/#website",
          "url": "https://pulini.adv.br",
          "name": "Pulini Advocacia",
          "publisher": { "@id": "https://pulini.adv.br/#organization" },
          "inLanguage": "pt-BR"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.head.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
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
      
      {/* Elementos Flutuantes Otimizados */}
      <WhatsAppFloating />
      <AIChat />
      <CookieBanner />
    </div>
  );
};

export default App;
