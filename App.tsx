
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TrustSection from './components/TrustSection';
import Services from './components/Services';
import Blog from './components/Blog';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import CookieBanner from './components/CookieBanner';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { OFFICE_PHONE, OFFICE_EMAIL } from './constants';

const App: React.FC = () => {
  const containerRef = useIntersectionObserver();

  useEffect(() => {
    // Injeção de Dados Estruturados (JSON-LD) de Ultra Performance
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulini.adv.br" },
            { "@type": "ListItem", "position": 2, "name": "Serviços Jurídicos", "item": "https://pulini.adv.br/#servicos" },
            { "@type": "ListItem", "position": 3, "name": "Direito Digital & LGPD", "item": "https://pulini.adv.br/#sobre" }
          ]
        },
        {
          "@type": "LegalService",
          "@id": "https://pulini.adv.br/#organization",
          "name": "Pulini Advocacia",
          "alternateName": ["Vitor Pulini Advocacia", "Pulini Digital Law", "Especialista LGPD SP"],
          "description": "Boutique jurídica líder em Direito Digital, LGPD e Blindagem para Startups em São Paulo. Especialistas em Contratos SaaS e Compliance de Dados.",
          "url": "https://pulini.adv.br",
          "logo": "https://i.postimg.cc/Y23xGLCb/profile.jpg",
          "telephone": OFFICE_PHONE,
          "email": OFFICE_EMAIL,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "addressCountry": "BR"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "O que faz um advogado de Direito Digital?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Um advogado de Direito Digital atua na interseção entre tecnologia e leis, cuidando de privacidade (LGPD), termos de uso de aplicativos, contratos SaaS, e crimes cibernéticos."
              }
            },
            {
              "@type": "Question",
              "name": "Como adequar minha startup à LGPD?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A adequação exige mapeamento de dados (Data Mapping), revisão de contratos com fornecedores, criação de políticas de privacidade robustas e treinamento da equipe."
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-structured-data';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('seo-structured-data');
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
        <Blog />
      </main>
      
      <Footer />
      
      {/* Elementos Flutuantes Otimizados */}
      <WhatsAppFloating />
      <CookieBanner />
    </div>
  );
};

export default App;
