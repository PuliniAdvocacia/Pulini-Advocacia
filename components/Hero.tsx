
import React from 'react';
import { WhatsAppIcon, WHATSAPP_URL } from '../constants';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-gradient pointer-events-none"></div>
      
      <div className="container relative z-10 flex flex-col items-center text-center px-6">
        <div className="fade-in">
          <span className="section-header-badge">OAB/SP 460.464 • Consultoria Digital de Elite</span>
        </div>

        {/* SEO: H1 com as palavras-chave principais do escritório */}
        <h1 className="fade-in text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-4 leading-tight tracking-tight text-white max-w-4xl">
          Estrategista em <br />
          <span className="text-gradient">Direito Digital & LGPD</span>
        </h1>

        <p className="fade-in text-xs md:text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed font-light">
          Advocacia de alta performance para o ecossistema de tecnologia. Protegemos sua inovação com blindagem jurídica estratégica para Startups, SaaS e Fintechs.
        </p>

        <div className="fade-in flex flex-col sm:flex-row items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            title="Agendar Consultoria Jurídica via WhatsApp"
            className="group relative px-8 py-4 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 text-navy-950 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] active:scale-95 flex items-center gap-3 shadow-lg shadow-sky-500/20"
          >
            <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Consultoria Estratégica</span>
          </a>
          
          <a
            href="#servicos"
            className="group px-8 py-4 border border-white/10 hover:border-sky-500/50 text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 flex items-center gap-3 glass-panel"
          >
            <span>Nossas Soluções</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-sky-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
