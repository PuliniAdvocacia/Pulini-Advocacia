
import React from 'react';
import { ArrowRight } from 'lucide-center';
import { WhatsAppIcon, WHATSAPP_URL } from '../constants';
import { ArrowRight as LucideArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[50vh] flex items-center justify-center pt-20 pb-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-gradient pointer-events-none"></div>
      
      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="fade-in">
          <span className="section-header-badge">OAB/SP 460.464 • Consultoria Digital</span>
        </div>

        {/* SEO: H1 com as palavras-chave principais do escritório */}
        <h1 className="fade-in text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-2 leading-tight tracking-tight text-white max-w-2xl">
          Especialista em <br />
          <span className="text-gradient">Direito Digital & LGPD</span>
        </h1>

        <p className="fade-in text-[10px] md:text-sm text-slate-400 max-w-md mb-5 leading-relaxed font-light">
          Advocacia estratégica de alta performance para a economia digital. Blindagem institucional e segurança jurídica para escalar sua startup ou SaaS.
        </p>

        <div className="fade-in flex flex-col sm:flex-row items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            title="Agendar Consultoria Jurídica via WhatsApp"
            className="group relative px-4 py-2.5 bg-sky-500 text-navy-950 font-bold text-[8px] uppercase tracking-wider rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-sky-500/20"
          >
            <WhatsAppIcon className="w-3 h-3" />
            <span>Consultoria Estratégica</span>
          </a>
          
          <a
            href="#servicos"
            className="group px-4 py-2.5 border border-white/10 hover:border-sky-500/50 text-white font-bold text-[8px] uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 glass-panel"
          >
            <span>Nossas Soluções</span>
            <LucideArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
