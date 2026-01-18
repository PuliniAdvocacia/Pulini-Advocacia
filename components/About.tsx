
import React from 'react';
import { Award, BookOpen, ShieldCheck, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-16 relative bg-navy-950/50 overflow-hidden" aria-labelledby="about-title">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-sky-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Lado Esquerdo: Foto Enquadrada */}
          <div className="lg:col-span-5 fade-in">
            <div className="relative group max-w-sm mx-auto lg:ml-0">
              {/* Brilho traseiro */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Container da Imagem */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 glass-panel shadow-2xl bg-navy-900">
                <img 
                  src="https://i.postimg.cc/Y23xGLCb/profile.jpg" 
                  alt="Dr. Vitor Pulini - Especialista em Direito Digital e LGPD em São Paulo" 
                  title="Dr. Vitor Pulini | Pulini Advocacia"
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay de Identificação */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-display font-bold text-xl leading-tight">Dr. Vitor Pulini</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-4 h-[1px] bg-sky-500"></div>
                      <p className="text-sky-400 text-[10px] uppercase tracking-[0.3em] font-bold">OAB/SP 460.464</p>
                    </div>
                  </div>
                </div>

                {/* Borda Interna de Acabamento (Enquadramento) */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[1.5rem]"></div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Descrição Qualificada */}
          <article className="lg:col-span-7 fade-in">
            <span className="section-header-badge">Sobre o Advogado</span>
            <h2 id="about-title" className="text-2xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
              Estratégia Jurídica <br />
              <span className="text-gradient">de Alta Performance em Direito Digital.</span>
            </h2>

            <div className="space-y-5">
              <p className="text-slate-400 text-xs md:text-base leading-relaxed font-light">
                O <span className="text-white font-medium">Dr. Vitor Pulini</span> é um advogado referência em <strong className="text-white">Direito Digital e Proteção de Dados (LGPD)</strong>, atuando como o braço jurídico estratégico de empresas que operam na economia digital em todo o Brasil.
              </p>
              
              <p className="text-slate-400 text-xs md:text-base leading-relaxed font-light">
                Com uma abordagem pragmática e focada em resultados, sua missão é transformar o Direito em um diferencial competitivo, garantindo que a inovação ocorra sob uma blindagem institucional sólida e segura para startups e empresas tech.
              </p>

              {/* Qualificações Grid Compacto */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Award, label: "Expertise LGPD", desc: "Consultoria Técnica ANPD" },
                  { icon: BookOpen, label: "SaaS & App", desc: "Compliance Digital" },
                  { icon: Target, label: "M&A Tech", desc: "Blindagem Startups" },
                  { icon: ShieldCheck, label: "Cybersecurity", desc: "Gestão de Incidentes" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 rounded-2xl border border-white/5 bg-navy-900/40 hover:bg-navy-900/60 transition-colors group">
                    <item.icon className="text-sky-500 shrink-0 group-hover:scale-110 transition-transform" size={18} aria-hidden="true" />
                    <div>
                      <h4 className="text-white font-bold text-[10px] md:text-[11px] uppercase tracking-wide">{item.label}</h4>
                      <p className="text-slate-500 text-[9px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex items-center">
              <a 
                href="https://wa.me/5514997912815" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Falar diretamente com Dr. Vitor Pulini"
                className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-sky-400 hover:text-white transition-all"
              >
                <span>Solicitar Consultoria Individual Especializada</span>
                <span className="w-8 h-[1px] bg-sky-500 group-hover:w-12 transition-all"></span>
                <span className="text-lg" aria-hidden="true">→</span>
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default About;
