
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pulini_cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pulini_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[110] p-6 animate-slide-up">
      <div className="container mx-auto max-w-5xl glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-sky-500/20">
        <div className="flex-1">
          <h5 className="text-white font-bold text-sm mb-2">Respeitamos sua Privacidade (LGPD)</h5>
          <p className="text-slate-400 text-xs leading-relaxed">
            Utilizamos cookies para personalizar conteúdo e melhorar sua experiência em nosso site. Ao clicar em "Aceitar", você concorda com nossa política de proteção de dados.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white text-xs font-bold px-4 py-2 transition-colors"
          >
            Configurar
          </button>
          <button
            onClick={handleAccept}
            className="bg-sky-500 text-navy-900 font-bold px-8 py-2 rounded-lg text-sm hover:bg-sky-400 transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
