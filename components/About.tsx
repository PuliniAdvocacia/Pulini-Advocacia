
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-8 relative bg-navy-950/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto fade-in">
          <span className="section-header-badge">Liderança Jurídica</span>
          
          <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
            Advocacia <span className="text-gradient">Tech-Native.</span>
          </h2>
          
          <div className="space-y-3 text-slate-400 text-[11px] md:text-sm leading-relaxed mb-0 font-light">
            <p>
              O Dr. Vitor Pulini (OAB/SP 460.464) estabeleceu o escritório com uma visão pragmática: a <span className="text-white font-medium">arquitetura jurídica</span> deve ser tão ágil e robusta quanto os sistemas que ela protege.
            </p>
            <p>
              Especializado na retaguarda de startups e grandes empresas de tecnologia, o foco recai sobre a mitigação de riscos sistêmicos e a transformação do compliance em diferencial competitivo real para operações digitais de alta escala.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
