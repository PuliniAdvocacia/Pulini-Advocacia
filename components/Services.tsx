
import React from 'react';
import { Database, FileText, Scale, Rocket, Copyright, ShoppingCart } from 'lucide-react';

const services = [
  {
    title: 'Adequação à LGPD',
    description: 'Implementação completa de programas de governança em privacidade e proteção de dados pessoais.',
    icon: Database,
  },
  {
    title: 'Contratos de TI',
    description: 'Elaboração e revisão de contratos de software (SaaS), licenciamento e prestação de serviços tecnológicos.',
    icon: FileText,
  },
  {
    title: 'Crimes Digitais',
    description: 'Atuação especializada em fraudes eletrônicas, vazamentos de dados e crimes cibernéticos.',
    icon: Scale,
  },
  {
    title: 'Startups',
    description: 'Assessoria jurídica 360º para empresas inovadoras, desde a fundação até o exit.',
    icon: Rocket,
  },
  {
    title: 'Propriedade Intelectual',
    description: 'Proteção de marcas, patentes, direitos autorais e segredos de negócio no ambiente digital.',
    icon: Copyright,
  },
  {
    title: 'E-commerce',
    description: 'Estruturação jurídica para lojas virtuais, termos de uso, políticas de privacidade e CDC digital.',
    icon: ShoppingCart,
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-16 bg-navy-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-400 uppercase mb-3">Especialidades</h2>
          <h3 className="text-3xl font-serif font-bold text-white">Nossas Áreas de Atuação</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="fade-in group bg-navy-800 p-8 rounded-2xl border border-transparent hover:border-sky-500/30 hover:-translate-y-1.5 transition-all duration-300 shadow-lg"
            >
              <div className="w-12 h-12 bg-navy-700 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="text-sky-400" size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{service.title}</h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
