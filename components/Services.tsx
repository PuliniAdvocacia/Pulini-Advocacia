
import React from 'react';
import { Database, FileCode, Scale, Rocket, Copyright, ShoppingCart } from 'lucide-react';

const services = [
  { title: 'Adequação à LGPD', desc: 'Implementação de governança de dados para evitar multas da ANPD e incidentes.', icon: Database },
  { title: 'Arquitetura de SaaS', desc: 'Termos de Uso, SLAs e EULAs robustos para proteger sua IP e recorrente.', icon: FileCode },
  { title: 'Cybersecurity Law', desc: 'Gestão jurídica de incidentes críticos, vazamentos e resposta a Ransomware.', icon: Scale },
  { title: 'M&A Tech & Startups', desc: 'Blindagem em rodadas de investimento, Equity, Vesting e Due Diligence.', icon: Rocket },
  { title: 'Propriedade Intelectual', desc: 'Proteção de algoritmos, marcas e registro de software no INPI.', icon: Copyright },
  { title: 'E-commerce & Ads', desc: 'Compliance jurídico para checkout, logística digital e direito do consumidor.', icon: ShoppingCart },
];

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-16 bg-navy-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <header className="max-w-xl mb-12 fade-in">
          <span className="section-header-badge">Expertise Especializada</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
            Serviços de <span className="text-gradient">Alta Especialidade.</span>
          </h2>
          <p className="text-slate-400 font-light text-xs md:text-sm">
            Soluções jurídicas preventivas e contenciosas focadas no ecossistema de tecnologia.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={i}
              className="fade-in group relative glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 flex flex-col border border-white/5 hover:border-sky-500/30"
            >
              <div className="w-12 h-12 bg-sky-500/5 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/10 group-hover:bg-sky-500/20 group-hover:rotate-6 transition-all">
                <s.icon className="text-sky-400" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-3 tracking-tight">{s.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light group-hover:text-slate-300 transition-colors">{s.desc}</p>
              
              <div className="mt-8 flex items-center text-sky-400 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver detalhes do serviço</span>
                <div className="ml-2 w-4 h-px bg-sky-400 transition-all group-hover:w-8"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
