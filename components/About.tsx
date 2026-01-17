
import React from 'react';
import { Award, BookOpen, ShieldCheck, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-16 relative bg-navy-950/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-sky-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Lado Esquerdo: Foto Otimizada */}
          <div className="lg:col-span-5 fade-in">
            <div className="relative group max-w-sm mx-auto lg:ml-0">
              <div className="absolute -inset-3 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-[2rem] blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 glass-panel shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Dr. Vitor Pulini" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent">
                  <p className="text-white font-display font-bold text-lg leading-tight">Dr. Vitor Pulini</p>
                  <p className="text-sky-400 text-[9px] uppercase tracking-[0.2em] font-bold">OAB/SP 460.464</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Descrição Qualificada */}
          <div className="lg:col-span-7 fade-in">
            <span className="section-header-badge">Sobre o Advogado</span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-5 leading-tight">
              Estratégia Jurídica <br />
              <span className="text-gradient">de Alta Performance.</span>
            </h2>

            <div className="space-y-4">
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
                O <span className="text-white font-medium">Dr. Vitor Pulini</span> é especialista em Direito Digital e Proteção de Dados, atuando como o braço jurídico estratégico de empresas que operam na economia digital.
              </p>
              
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
                Com uma abordagem pragmática e focada em resultados, sua missão é transformar o Direito em um diferencial competitivo, garantindo que a inovação ocorra sob uma blindagem institucional sólida.
              </p>

              {/* Qualificações Grid Compacto */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Award, label: "Expertise LGPD", desc: "Consultoria Técnica" },
                  { icon: BookOpen, label: "SaaS & App", desc: "Compliance Digital" },
                  { icon: Target, label: "M&A Tech", desc: "Blindagem Startups" },
                  { icon: ShieldCheck, label: "Cybersecurity", desc: "Gestão de Riscos" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-xl border border-white/5 bg-navy-900/40">
                    <item.icon className="text-sky-500 shrink-0" size={16} />
                    <div>
                      <h4 className="text-white font-bold text-[10px] uppercase tracking-wide">{item.label}</h4>
                      <p className="text-slate-500 text-[8px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center space-x-4">
              <a 
                href="https://wa.me/5514997912815" 
                target="_blank" 
                className="text-[10px] font-bold uppercase tracking-widest text-sky-400 hover:text-white transition-colors"
              >
                Ver Curriculum Lattes →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
