
import React, { useState } from 'react';
import { Instagram, Youtube, Music2, Lock } from 'lucide-react';
import Logo from './Logo';
import AdminPanel from './AdminPanel';

const Footer: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <footer className="bg-navy-950 pt-10 pb-6 border-t border-sky-500/5">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Logo Centralizado */}
        <a href="#home" className="mb-8 opacity-80 hover:opacity-100 transition-opacity transform hover:scale-105 duration-300">
          <Logo className="h-8 w-auto" color="white" />
        </a>

        {/* Redes Sociais Centralizadas */}
        <div className="flex space-x-8 items-center mb-10">
          <a 
            href="https://www.youtube.com/@vitorpulini" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-500 hover:text-red-500 transition-all hover:-translate-y-1"
            title="Siga no YouTube"
          >
            <Youtube size={18} />
          </a>
          <a 
            href="https://www.tiktok.com/@drvitorpulini" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-500 hover:text-white transition-all hover:-translate-y-1"
            title="Siga no TikTok"
          >
            <Music2 size={16} />
          </a>
          <a 
            href="https://www.instagram.com/pulini.adv" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-500 hover:text-sky-400 transition-all hover:-translate-y-1"
            title="Siga no Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>

        {/* Linha de Copyright e Admin Centralizada */}
        <div className="w-full max-w-sm border-t border-sky-500/5 pt-6 flex flex-col items-center gap-4">
          <div className="flex justify-center items-center text-slate-600 text-[7px] tracking-[0.2em] uppercase font-bold">
            <p>© {new Date().getFullYear()} Pulini Advocacia</p>
          </div>
          
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 text-slate-700 hover:text-sky-500 transition-colors text-[6px] uppercase tracking-widest font-bold"
          >
            <Lock size={8} /> Acesso Restrito
          </button>
        </div>
      </div>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </footer>
  );
};

export default Footer;
