
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles, ArrowRight, Zap, Lock, Cpu } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const TRIGGERS = [
  { label: "Blindagem de Infoproduto", icon: Zap, color: "text-yellow-400" },
  { label: "Compliance SaaS/App", icon: Cpu, color: "text-sky-400" },
  { label: "Vazamento de Dados", icon: Lock, color: "text-red-400" }
];

const formatText = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, j) => 
      part.startsWith('**') && part.endsWith('**') ? 
      <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
    );

    if (isBullet) {
      return (
        <div key={i} className="flex items-start space-x-2 my-1 animate-in slide-in-from-left-2 duration-300">
          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 flex-shrink-0 shadow-[0_0_5px_#0ea5e9]"></div>
          <span className="text-slate-200 text-[13px] leading-relaxed">{content}</span>
        </div>
      );
    }
    return <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-2 leading-relaxed text-[13px]'}>{content}</p>;
  });
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Dr. Pulini AI online. **Diagnóstico técnico** em tempo real. Qual o seu desafio estratégico hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom('auto');
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = async (override?: string) => {
    const msgText = override || input.trim();
    if (!msgText || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: msgText };
    const history = [...messages, userMsg];
    
    setMessages(history);
    setInput('');
    setIsLoading(true);

    let streamText = '';
    // Adiciona o placeholder para a resposta da IA
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      await geminiService.sendMessageStream(history, (chunk) => {
        streamText += chunk;
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'model', text: streamText };
          return next;
        });
      });
    } catch {
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { role: 'model', text: 'Instabilidade técnica detectada. Recomendo **migrar para o WhatsApp** para atendimento imediato.' };
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] md:w-[420px] max-h-[75vh] md:max-h-[600px] glass rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-sky-500/20 animate-in zoom-in-95 fade-in duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="p-4 border-b border-sky-500/10 flex items-center justify-between bg-navy-900/80 backdrop-blur-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                <Bot size={20} className="text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-xs tracking-wider flex items-center uppercase">
                  Assistente Pulini <Sparkles size={10} className="ml-2 text-sky-400 animate-pulse" />
                </h4>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                  <span className="text-[9px] text-sky-400/70 font-mono uppercase tracking-[0.2em]">SISTEMA ATIVO</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-500 hover:text-white transition-all p-2 hover:bg-white/5 rounded-lg active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-navy-950/40"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-400`}>
                <div className={`flex max-w-[90%] items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
                    msg.role === 'user' ? 'bg-navy-700' : 'bg-navy-800 border border-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-slate-400" /> : <Cpu size={16} className="text-sky-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-lg transition-all ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none' 
                      : 'bg-navy-900/90 text-slate-200 rounded-tl-none border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                  }`}>
                    {msg.text ? formatText(msg.text) : (
                      <div className="flex space-x-1.5 py-1.5 px-1">
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
                      </div>
                    )}
                    
                    {msg.role === 'model' && (msg.text.includes('Diagnóstico') || msg.text.includes('WhatsApp') || msg.text.includes('Consultoria')) && !isLoading && (
                      <a 
                        href={WHATSAPP_URL} 
                        target="_blank" 
                        className="mt-4 flex items-center justify-center space-x-2 w-full bg-white text-navy-900 font-bold p-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-sky-400 transition-all shadow-xl group/btn active:scale-[0.98]"
                      >
                        <span>Atendimento Prioritário</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-navy-900/95 backdrop-blur-xl border-t border-sky-500/10">
            {messages.length < 5 && !isLoading && (
              <div className="flex overflow-x-auto gap-2 mb-4 no-scrollbar pb-1 mask-fade-right">
                {TRIGGERS.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(t.label)} 
                    className="whitespace-nowrap text-[10px] bg-navy-950/60 border border-white/5 px-4 py-2.5 rounded-full text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-navy-900 transition-all flex items-center space-x-2 shrink-0 active:scale-95"
                  >
                    <t.icon size={12} className={t.color} />
                    <span className="uppercase tracking-widest font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="relative flex items-center group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Qual seu desafio jurídico?"
                className="w-full bg-navy-950/50 border border-white/10 rounded-2xl pl-4 pr-14 py-4 text-white text-[13px] focus:outline-none focus:border-sky-500/50 focus:bg-navy-950 transition-all placeholder:text-slate-600 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 w-10 h-10 bg-sky-500 text-navy-900 rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-20 shadow-[0_4px_10px_rgba(14,165,233,0.3)] disabled:shadow-none active:scale-90"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
            <div className="flex justify-between items-center mt-3 px-1">
               <p className="text-[8px] text-slate-600 uppercase tracking-[0.2em]">IA Estratégica v2.5</p>
               <div className="flex items-center space-x-1">
                 <Lock size={8} className="text-slate-700" />
                 <span className="text-[8px] text-slate-700 uppercase tracking-tighter">Conexão Criptografada</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-sky-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_15px_40px_rgba(14,165,233,0.4)] text-white hover:scale-110 active:scale-95 transition-all duration-300 group ring-4 ring-navy-950"
        aria-label="Abrir Chat"
      >
        {isOpen ? <X size={28} /> : <Cpu size={28} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 border-2 border-navy-950"></span>
          </span>
        )}
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-right {
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(56, 189, 248, 0.1); 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: rgba(56, 189, 248, 0.2); 
        }
      `}</style>
    </div>
  );
};

export default AIChat;
