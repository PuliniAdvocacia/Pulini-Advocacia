
import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { WhatsAppIcon, OFFICE_EMAIL, OFFICE_PHONE, WHATSAPP_URL } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-20 bg-navy-800 relative overflow-hidden">
      {/* Elemento de brilho de fundo para profundidade */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-gradient pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-in mb-12">
            <span className="section-header-badge">Atendimento Exclusivo</span>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Inicie sua <span className="text-gradient">Blindagem Digital.</span>
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light mx-auto max-w-xl">
              Atendimento 100% digital, ágil e personalizado. Conecte-se diretamente com nossa equipe jurídica para um diagnóstico estratégico do seu negócio.
            </p>
          </div>

          <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Canal: WhatsApp */}
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group glass-panel p-8 rounded-3xl border border-white/5 hover:border-whatsapp/30 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-whatsapp/10 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-7 h-7 text-whatsapp" />
              </div>
              <span className="text-sky-500 text-[9px] uppercase font-bold tracking-[0.25em] mb-2">Atendimento Imediato</span>
              <span className="text-lg text-white font-bold mb-1">{OFFICE_PHONE}</span>
              <span className="text-xs text-slate-500 font-light mb-6">Consultoria via WhatsApp Business</span>
              
              <div className="flex items-center gap-2 text-[10px] text-whatsapp font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                <span>Enviar Mensagem</span>
                <ArrowRight size={12} />
              </div>
            </a>

            {/* Canal: E-mail */}
            <a 
              href={`mailto:${OFFICE_EMAIL}`} 
              className="group glass-panel p-8 rounded-3xl border border-white/5 hover:border-sky-500/30 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-sky-500/10 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-sky-400" />
              </div>
              <span className="text-sky-500 text-[9px] uppercase font-bold tracking-[0.25em] mb-2">Formalização & Docs</span>
              <span className="text-lg text-white font-bold mb-1 truncate w-full px-2">{OFFICE_EMAIL}</span>
              <span className="text-xs text-slate-500 font-light mb-6">Canal para propostas e ofícios</span>

              <div className="flex items-center gap-2 text-[10px] text-sky-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                <span>Enviar E-mail</span>
                <ArrowRight size={12} />
              </div>
            </a>
          </div>
          
          <div className="fade-in mt-16 flex flex-col items-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
