
import React from 'react';
import { Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 pt-4 pb-2 border-t border-sky-500/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-2">
          <a href="#home" className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
            <Logo className="h-6 w-auto" color="white" />
          </a>
          <div className="flex space-x-3">
            <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors"><Instagram size={12} /></a>
          </div>
        </div>
        <div className="border-t border-sky-500/5 pt-1.5 flex justify-between items-center text-slate-600 text-[6px] tracking-[0.1em] uppercase font-medium">
          <p>© {new Date().getFullYear()} Pulini Advocacia</p>
          <p>Digital Law Engine • OAB/SP 460.464</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
