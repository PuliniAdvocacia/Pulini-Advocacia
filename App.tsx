
import React from 'react';
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

const App: React.FC = () => {
  const containerRef = useIntersectionObserver();

  return (
    <div ref={containerRef as any} className="selection:bg-sky-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <TrustSection />
      <About />
      <Services />
      <Process />
      <Contact />
      <Footer />
      
      {/* Floating UI Elements */}
      <WhatsAppFloating />
      <AIChat />
      <CookieBanner />
    </div>
  );
};

export default App;
