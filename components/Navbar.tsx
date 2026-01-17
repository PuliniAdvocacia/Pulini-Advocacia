
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Lógica simples para detectar seção ativa
      const sections = ['home', 'sobre', 'servicos', 'contato'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', id: 'home', href: '#home' },
    { label: 'Sobre Nós', id: 'sobre', href: '#sobre' },
    { label: 'Serviços', id: 'servicos', href: '#servicos' },
    { label: 'Contato', id: 'contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-navy-900/90 backdrop-blur-lg py-3 border-b border-sky-500/10' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex flex-col items-center">
          <span className="text-2xl font-serif font-bold text-white tracking-tight leading-none">PULINI</span>
          <span className="text-[9px] font-sans tracking-[0.4em] uppercase text-sky-400 -mt-0.5 ml-1">ADVOCACIA</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeSection === link.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {/* Indicador de Seção Ativa (Sublinhado azul) */}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-sky-500 transition-transform duration-300 origin-left ${
                  activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </a>
            ))}
          </div>
          
          <a
            href="#contato"
            className="border-2 border-sky-500/40 text-sky-400 px-5 py-2 rounded font-bold text-[11px] uppercase tracking-wider hover:bg-sky-500 hover:text-navy-900 transition-all duration-300"
          >
            Agendar Consulta
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-900 border-b border-sky-500/10 flex flex-col p-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-sky-400 text-sm font-bold uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setIsMenuOpen(false)}
            className="bg-sky-500 text-navy-900 px-6 py-4 rounded text-center font-bold uppercase tracking-widest text-xs"
          >
            Agendar Consulta
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
