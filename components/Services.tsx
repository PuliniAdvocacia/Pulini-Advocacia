
import React from 'react';
import { Database, FileCode, Scale, Rocket, Copyright, ShoppingCart } from 'lucide-react';

const services = [
  { title: 'Blindagem LGPD', desc: 'Implementação de governança para evitar multas da ANPD e vazamentos.', icon: Database },
  { title: 'Arquitetura de SaaS', desc: 'Termos de Uso e SLAs robustos para proteger sua propriedade intelectual.', icon: FileCode },
  { title: 'Gestão de Incidentes', desc: 'Resposta rápida a ataques cibernéticos e sequestros de dados (Ransomware).', icon: Scale },
  { title: 'Startups & M&A', desc: 'Blindagem em rodadas de investimento, Equity e contratos de Vesting.', icon: Rocket },
  { title: 'Proteção de Software', desc: 'Registro de código-fonte e algoritmos para garantir exclusividade de mercado.', icon: Copyright },
  { title: 'Direito no E-commerce', desc: 'Compliance jurídico para checkout, logística e direitos do consumidor digital.', icon: ShoppingCart },
];

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-16 bg-navy-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl mb-12 fade-in">
          <span className="section-header-badge">Soluções Estratégicas</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
            Ecosistema de <span className="text-gradient">Alta Performance.</span>
          </h2>
          <p className="text-slate-400 font-light text-xs md:text-sm">
            Soluções jurídicas desenhadas para quem opera no limite da inovação tecnológica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="fade-in group relative glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 flex flex-col border border-white/5 hover:border-sky-500/30"
            >
              <div className="w-12 h-12 bg-sky-500/5 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/10 group-hover:bg-sky-500/20 group-hover:rotate-6 transition-all">
                <s.icon className="text-sky-400" size={24} />
              </div>
              <h4 className="text-lg font-display font-bold text-white mb-3 tracking-tight">{s.title}</h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light group-hover:text-slate-300 transition-colors">{s.desc}</p>
              
              <div className="mt-8 flex items-center text-sky-400 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Saiba mais</span>
                <div className="ml-2 w-4 h-px bg-sky-400 transition-all group-hover:w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
