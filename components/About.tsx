
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

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
        <div className="max-w-3xl mx-auto text-center md:text-left flex flex-col items-center md:items-start">
          {/* Coluna de Texto Centralizada */}
          <div className="fade-in w-full">
            <header className="mb-8">
              <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] text-sky-400 uppercase mb-4">
                Sobre o Fundador
              </h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Advocacia de Alta Performance.
              </h3>
            </header>

            <div className="space-y-6 text-slate-400 leading-relaxed text-sm lg:text-base mb-10">
              <p>
                Liderado pelo Dr. Pulini, o escritório nasceu da necessidade de alinhar segurança jurídica com a velocidade da economia digital.
              </p>
              <p>
                Entendemos que códigos de programação e códigos de leis precisam coexistir harmoniosamente. Nossa atuação é focada em blindar negócios digitais, garantindo que a inovação não seja freada pela burocracia, mas impulsionada pela estratégia legal correta.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 group justify-center md:justify-start">
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
