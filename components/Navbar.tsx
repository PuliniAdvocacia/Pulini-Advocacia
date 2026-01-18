
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
    { label: 'Home', id: 'home', href: '#home' },
    { label: 'Sobre', id: 'sobre', href: '#sobre' },
    { label: 'Serviços', id: 'servicos', href: '#servicos' },
    { label: 'Contato', id: 'contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-navy-900/95 backdrop-blur-md py-2 border-b border-sky-500/10' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center group">
          <Logo className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" color="white" />
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 text-[9px] font-bold tracking-widest uppercase transition-all ${
                  activeSection === link.id ? 'text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-sky-500 transition-transform duration-300 origin-left ${
                  activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </a>
            ))}
          </div>
          <a
            href="#contato"
            className="border border-sky-500/40 text-sky-400 px-3 py-1.5 rounded text-[8px] font-bold uppercase tracking-widest hover:bg-sky-500 hover:text-navy-900 transition-all"
          >
            Consulta
          </a>
        </div>

        <button className="md:hidden text-white p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-900/98 backdrop-blur-xl border-b border-sky-500/10 flex flex-col p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-sky-400 text-xs font-bold uppercase tracking-widest">{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
