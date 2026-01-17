
import React from 'react';
import { WhatsAppIcon, WHATSAPP_URL } from '../constants';

const WhatsAppFloating: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[100] group">
      <div className="absolute -top-10 left-0 bg-navy-900 text-white text-[10px] px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-sky-500/20 font-sans tracking-wider uppercase">
        Fale conosco agora
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center text-white shadow-2xl relative animate-bounce-slow"
      >
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20"></span>
        <WhatsAppIcon className="w-8 h-8 relative z-10" />
      </a>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppFloating;
