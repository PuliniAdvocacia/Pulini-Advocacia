
import React from 'react';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const stats = [
  { label: 'Projetos de LGPD', value: '+80' },
  { label: 'Startups Protegidas', value: '+45' },
  { label: 'Contratos Tech', value: '+200' },
  { label: 'Atendimento Digital', value: '100%' },
];

const features = [
  { 
    icon: Zap, 
    title: 'Velocidade de Resposta', 
    desc: 'SLA de resposta prioritário para incidentes críticos e vazamentos.' 
  },
  { 
    icon: Shield, 
    title: 'Blindagem Patrimonial', 
    desc: 'Estruturação jurídica para proteger sócios e ativos tecnológicos.' 
  },
  { 
    icon: Globe, 
    title: 'Alcance Global', 
    desc: 'Expertise em GDPR e leis internacionais de proteção de dados.' 
  },
  { 
    icon: Cpu, 
    title: 'DNA Tecnológico', 
    desc: 'Entendemos o código por trás da lei. Falamos a língua dos devs.' 
  }
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-12 bg-navy-950/80 relative overflow-hidden border-y border-sky-500/5">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start fade-in group">
              {/* Valor - Agora todos com 1 linha garantida */}
              <div className="text-3xl md:text-5xl font-display font-bold text-white leading-none tracking-tighter mb-4">
                {stat.value}
              </div>
              
              {/* Linha Decorativa e Label - Alinhamento fixo */}
              <div className="w-full">
                <div className="h-px bg-sky-500/20 w-full mb-3 group-hover:bg-sky-500/50 transition-colors"></div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold text-center md:text-left">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="fade-in group glass-panel p-6 rounded-2xl hover:border-sky-500/30 transition-all">
              <f.icon className="text-sky-500 mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h4 className="text-white font-display font-bold text-sm mb-2 uppercase tracking-wider">{f.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default TrustSection;
