
import React from 'react';
import { CheckCircle2, User } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    "Experiência em litígios envolvendo tecnologia",
    "Consultoria preventiva para startups e big tech",
    "Atuação 100% digital e ágil",
    "Foco em resultados e segurança jurídica"
  ];

  return (
    <section id="sobre" className="py-20 bg-navy-900 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Coluna da Foto (Espaço Reservado) */}
          <div className="fade-in order-2 lg:order-1">
            <div className="relative group">
              {/* Moldura Decorativa */}
              <div className="absolute -inset-4 border border-sky-500/10 rounded-3xl -z-10 group-hover:border-sky-500/20 transition-colors"></div>
              
              {/* Container para a Foto */}
              <div className="aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0 rounded-2xl bg-navy-800/50 border-2 border-dashed border-sky-500/20 flex flex-col items-center justify-center overflow-hidden shadow-2xl relative">
                <div className="text-sky-500/20 flex flex-col items-center p-8 text-center">
                  <User size={64} className="mb-4 opacity-20" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Espaço reservado para foto</span>
                </div>
                
                {/* Overlay de Vidro (Opcional, mantém a estética Cyber-Legal) */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none"></div>
              </div>

              {/* Detalhe Tecnológico */}
              <div className="absolute -bottom-6 -right-6 hidden lg:block">
                <div className="glass p-4 rounded-xl border-l-4 border-sky-500 shadow-xl">
                  <span className="block text-2xl font-bold text-white mb-0.5">10+</span>
                  <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold">Anos de Experiência</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna de Texto */}
          <div className="fade-in order-1 lg:order-2">
            <header className="mb-8">
              <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] text-sky-400 uppercase mb-4 text-center lg:text-left">
                Sobre o Fundador
              </h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight text-center lg:text-left">
                Advocacia de Alta Performance.
              </h3>
            </header>

            <div className="space-y-6 text-slate-400 leading-relaxed text-sm lg:text-base mb-10 text-center lg:text-left">
              <p>
                Liderado pelo Dr. Pulini, o escritório nasceu da necessidade de alinhar segurança jurídica com a velocidade da economia digital.
              </p>
              <p>
                Entendemos que códigos de programação e códigos de leis precisam coexistir harmoniosamente. Nossa atuação é focada em blindar negócios digitais, garantindo que a inovação não seja freada pela burocracia, mas impulsionada pela estratégia legal correta.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 group justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 size={18} className="text-sky-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium tracking-wide group-hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
