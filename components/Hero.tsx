
import React from 'react';
import { ShieldCheck, Lock, Wifi } from 'lucide-react';
import { WhatsAppIcon, WHATSAPP_URL } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-navy-900">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="fade-in">
          <h1 className="text-4xl lg:text-6xl font-serif font-black text-white leading-tight mb-4">
            Proteção Jurídica na <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Era dos Dados
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
            Combinamos excelência jurídica com profundo conhecimento técnico para blindar sua presença digital e assegurar conformidade com a LGPD.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-whatsapp text-white px-6 py-3 rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-whatsapp/20"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        <div className="hidden lg:flex justify-center fade-in">
          <div className="relative scale-90 lg:scale-100">
            {/* Main Decorative Card */}
            <div className="glass p-6 rounded-2xl w-72 glow-blue relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse"></span>
                  <span className="text-[9px] text-sky-400 font-mono">ENCRYPTED</span>
                </div>
              </div>
              
              <div className="mb-6">
                <ShieldCheck className="text-sky-400 w-10 h-10 mb-3" />
                <h3 className="text-white text-lg font-bold font-serif">Status: SECURE</h3>
                <p className="text-slate-400 text-[10px]">Security Protocol 4.1.0-A</p>
              </div>

              <div className="space-y-3">
                <div className="h-1 bg-navy-700 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[92%] animate-[width_2s_ease-out]"></div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>LGPD COMPLIANCE</span>
                  <span>92% ACTIVE</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sky-500/10 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Lock size={12} className="text-sky-500" />
                  <span className="text-[9px] font-mono">DATA BLIND</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi size={12} className="text-sky-500" />
                  <span className="text-[9px] font-mono">ACTIVE FEED</span>
                </div>
              </div>
            </div>

            {/* Back Elements */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-sky-500/20 rounded-2xl -z-10 rotate-2"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-indigo-500/10 rounded-2xl -z-10 -rotate-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
