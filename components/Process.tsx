
import React from 'react';
import { MessageCircle, FileSearch, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  { 
    icon: MessageCircle, 
    title: 'Diagnóstico', 
    desc: 'Reunião estratégica via Meet para entender seus gargalos e riscos.' 
  },
  { 
    icon: FileSearch, 
    title: 'Análise de Risco', 
    desc: 'Auditoria técnica profunda em seus ativos e fluxos de dados.' 
  },
  { 
    icon: Rocket, 
    title: 'Execução', 
    desc: 'Implementação ágil de soluções e blindagem contratual.' 
  },
  { 
    icon: CheckCircle, 
    title: 'Monitoramento', 
    desc: 'Suporte contínuo para manter sua operação em total compliance.' 
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-16 bg-navy-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in">
          <span className="section-header-badge">Metodologia Ágil</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
            Como Escalamos sua <span className="text-gradient">Segurança Jurídica</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-light">
            O fim da advocacia burocrática. Um processo transparente, digital e focado em resultados rápidos para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent -translate-y-8"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 text-center fade-in group">
              <div className="w-16 h-16 bg-navy-950 border border-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:border-sky-500 transition-all shadow-xl">
                <step.icon className="text-sky-400" size={24} />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-sky-500 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-navy-900">
                  0{i + 1}
                </div>
              </div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">{step.title}</h4>
              <p className="text-slate-500 text-[10px] leading-relaxed px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
