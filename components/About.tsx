
import React from 'react';
import { Award, BookOpen, ShieldCheck, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 relative bg-navy-950/50 overflow-hidden" aria-labelledby="about-title">
      {/* Elementos Decorativos de Background de Alta Fidelidade */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Lado Esquerdo: Composição da Imagem de Perfil */}
          <div className="lg:col-span-5 fade-in flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-[340px] md:max-w-sm">
              {/* Sombra Dinâmica e Brilho de Fundo */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-sky-500/20 via-sky-500/10 to-transparent rounded-[2.2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Moldura Principal com efeito Glassmorphism Refinado */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:translate-y-[-8px]">
                
                {/* Imagem do Dr. Pulini com enquadramento focado */}
                <img 
                  src="https://i.postimg.cc/Y23xGLCb/profile.jpg" 
                  alt="Dr. Vitor Pulini - Especialista em Direito Digital e LGPD" 
                  title="Dr. Vitor Pulini | Head da Pulini Advocacia"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay de Identificação com Gradiente Profundo */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent">
                  <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-display font-bold text-2xl tracking-tight leading-none mb-2">Dr. Vitor Pulini</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-[1.5px] bg-sky-500 rounded-full"></div>
                      <p className="text-sky-400 text-[9px] uppercase tracking-[0.4em] font-black">OAB/SP 460.464</p>
                    </div>
                  </div>
                </div>

                {/* Camada de Reflexo de Borda Superior */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[2rem]"></div>
              </div>
              
              {/* Badge de Destaque Flutuante */}
              <div className="absolute -bottom-4 -right-4 md:-right-6 bg-navy-900 border border-sky-500/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl hidden md:block fade-in delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="text-sky-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[10px] uppercase tracking-wider">Advocacia 4.0</p>
                    <p className="text-slate-500 text-[8px] uppercase tracking-widest font-medium">Foco em Resultados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Conteúdo de Autoridade */}
          <article className="lg:col-span-7 fade-in">
            <header className="mb-8">
              <span className="section-header-badge">Especialista de Elite</span>
              <h2 id="about-title" className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-[1.15]">
                Engenharia Jurídica para <br />
                <span className="text-gradient">a Nova Economia Digital.</span>
              </h2>
            </header>

            <div className="space-y-6 max-w-2xl">
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed font-light">
                O <span className="text-white font-semibold">Dr. Vitor Pulini</span> lidera a convergência entre tecnologia e conformidade legal, atuando como o braço jurídico estratégico para empresas que não aceitam a burocracia tradicional.
              </p>
              
              <p className="text-slate-500 text-sm leading-relaxed font-light italic">
                "Não apenas revisamos contratos; nós blindamos modelos de negócio escaláveis através de uma consultoria pragmática e orientada a dados."
              </p>

              {/* Pilares de Atuação Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Award, label: "Expertise LGPD", desc: "Adequação Técnica ANPD" },
                  { icon: BookOpen, label: "SaaS & Contratos", desc: "Blindagem de Software" },
                  { icon: Target, label: "M&A & VC", desc: "Corporate Venture Law" },
                  { icon: ShieldCheck, label: "Compliance Digital", desc: "Gestão de Ativos e Risco" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-5 rounded-2xl border border-white/5 bg-navy-900/30 hover:bg-navy-900/50 hover:border-sky-500/20 transition-all group">
                    <div className="shrink-0 p-3 bg-sky-500/5 rounded-xl group-hover:bg-sky-500/10 transition-colors">
                      <item.icon className="text-sky-500 group-hover:scale-110 transition-transform" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-[11px] uppercase tracking-widest mb-0.5">{item.label}</h4>
                      <p className="text-slate-500 text-[10px] font-medium leading-none">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <a 
                href="https://wa.me/5514997912815" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Agendar Diagnóstico Individual"
                className="group inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-sky-400 hover:text-white transition-all"
              >
                <span>Agendar Diagnóstico Estratégico</span>
                <div className="relative flex items-center">
                  <span className="w-10 h-[1.5px] bg-sky-500 group-hover:w-16 transition-all duration-500"></span>
                  <span className="text-lg ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </div>
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default About;
