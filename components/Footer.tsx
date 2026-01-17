
import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 pt-16 pb-8 border-t border-sky-500/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-baseline space-x-2 mb-6">
              <span className="text-2xl font-serif font-bold text-white">Pulini</span>
              <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-sky-400">Advocacia</span>
            </a>
            <p className="text-slate-500 text-sm max-w-sm mb-6">
              Especialistas em navegar pelas águas complexas do Direito Digital. Nosso compromisso é com a transparência, inovação e segurança jurídica.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Links</h5>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li><a href="#home" className="hover:text-sky-400 transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-sky-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#servicos" className="hover:text-sky-400 transition-colors">Serviços</a></li>
              <li><a href="#contato" className="hover:text-sky-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Jurídico</h5>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Portal de Dados</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Complience</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-sky-500/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[9px] tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Pulini Advocacia. Todos os direitos reservados.</p>
          <p className="mt-3 md:mt-0">OAB/SP 000.000 | Dr. Pulini</p>
        </div>
      </div>
      <style>{`
        .bg-navy-950 { background-color: #050d1a; }
      `}</style>
    </footer>
  );
};

export default Footer;
