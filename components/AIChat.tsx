
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles, ArrowRight, Zap, Lock, Cpu, RefreshCw, MessageSquare } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const TRIGGERS = [
  { label: "Blindagem de Infoproduto", icon: Zap, color: "text-yellow-400", bg: "hover:bg-yellow-400/10" },
  { label: "Compliance SaaS/App", icon: Cpu, color: "text-sky-400", bg: "hover:bg-sky-400/10" },
  { label: "Vazamento de Dados", icon: Lock, color: "text-red-400", bg: "hover:bg-red-400/10" }
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
        <div key={i} className="flex items-start space-x-2 my-1.5 animate-in slide-in-from-left-2 duration-300">
          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_#0ea5e9]"></div>
          <span className="text-slate-200 text-[13px] leading-relaxed">{content}</span>
        </div>
      );
    }
    return <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-2.5 leading-relaxed text-[13px]'}>{content}</p>;
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
      const timer = setTimeout(() => {
        scrollToBottom('auto');
        if (window.innerWidth > 768) inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleClear = () => {
    setMessages([{ role: 'model', text: 'Histórico limpo. Como posso ajudar agora?' }]);
  };

  const handleSend = async (override?: string) => {
    const msgText = override || input.trim();
    if (!msgText || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: msgText };
    const history = [...messages, userMsg];
    
    setMessages(history);
    setInput('');
    setIsLoading(true);

    let streamText = '';
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
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-2rem)] md:w-[420px] h-[80vh] md:h-[600px] glass rounded-[2rem] flex flex-col overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] border border-sky-500/20 animate-in zoom-in-95 fade-in duration-500 origin-bottom-right">
          
          {/* Header */}
          <div className="p-4 md:p-5 border-b border-sky-500/10 flex items-center justify-between bg-navy-900/90 backdrop-blur-2xl z-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                <Bot size={20} className="text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-[11px] tracking-widest flex items-center uppercase">
                  Assistente Pulini <Sparkles size={10} className="ml-2 text-sky-400 animate-pulse" />
                </h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  <span className="text-[8px] text-sky-400/80 font-mono uppercase tracking-[0.25em]">Criptografia Ponta-a-Ponta</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={handleClear}
                title="Limpar Conversa"
                className="text-slate-500 hover:text-white transition-all p-2 hover:bg-white/5 rounded-lg active:scale-90"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-500 hover:text-white transition-all p-2 hover:bg-white/5 rounded-lg active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-5 md:p-6 space-y-8 custom-scrollbar bg-navy-950/40 relative"
          >
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-navy-950/80 to-transparent pointer-events-none z-10"></div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-500`}>
                <div className={`flex max-w-[92%] items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mb-1 shadow-sm border ${
                    msg.role === 'user' ? 'bg-navy-700 border-white/5' : 'bg-navy-800 border-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={12} className="text-slate-400" /> : <Cpu size={14} className="text-sky-400" />}
                  </div>
                  <div className={`relative px-4 py-3.5 rounded-2xl transition-all shadow-xl ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-br-none font-medium' 
                      : 'bg-navy-900/90 text-slate-200 rounded-bl-none border border-white/5'
                  }`}>
                    {msg.text ? formatText(msg.text) : (
                      <div className="flex space-x-2 py-2 px-1">
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
                      </div>
                    )}
                    
                    {msg.role === 'model' && (msg.text.includes('Diagnóstico') || msg.text.includes('WhatsApp') || msg.text.includes('Consultoria')) && !isLoading && (
                      <a 
                        href={WHATSAPP_URL} 
                        target="_blank" 
                        className="mt-4 flex items-center justify-center space-x-2 w-full bg-white text-navy-900 font-bold p-3.5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-sky-400 transition-all shadow-lg group/btn active:scale-[0.98]"
                      >
                        <MessageSquare size={14} />
                        <span>Falar com Especialista</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="h-4"></div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-navy-900/98 backdrop-blur-2xl border-t border-sky-500/10 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
            {messages.length < 5 && !isLoading && (
              <div className="flex overflow-x-auto gap-2 mb-5 no-scrollbar pb-1">
                {TRIGGERS.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(t.label)} 
                    className={`whitespace-nowrap text-[10px] bg-navy-950/60 border border-white/5 px-4 py-3 rounded-full text-slate-400 hover:text-white hover:border-sky-500/40 transition-all flex items-center space-x-2 shrink-0 active:scale-95 ${t.bg}`}
                  >
                    <t.icon size={12} className={t.color} />
                    <span className="uppercase tracking-[0.15em] font-semibold">{t.label}</span>
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
                className="w-full bg-navy-950/50 border border-white/10 rounded-2xl pl-5 pr-16 py-4 md:py-5 text-white text-[13px] focus:outline-none focus:border-sky-500/50 focus:bg-navy-950 transition-all placeholder:text-slate-600 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2.5 w-11 h-11 bg-sky-500 text-navy-900 rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-10 shadow-[0_4px_15px_rgba(14,165,233,0.3)] disabled:shadow-none active:scale-90"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>
            <div className="flex justify-between items-center mt-4 px-2">
               <div className="flex items-center space-x-1">
                 <Cpu size={10} className="text-sky-500/50" />
                 <p className="text-[8px] text-slate-600 uppercase tracking-[0.25em] font-mono">IA Estratégica v2.5.4</p>
               </div>
               <div className="flex items-center space-x-1.5">
                 <Lock size={9} className="text-slate-700" />
                 <span className="text-[8px] text-slate-700 uppercase tracking-tighter">Secure Connection</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button Container */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(14,165,233,0.4)] text-white hover:scale-110 active:scale-95 transition-all duration-500 group ring-4 ring-navy-950 ${
            isOpen ? 'bg-navy-800 rotate-90 border border-sky-500/20' : 'bg-gradient-to-br from-sky-500 to-indigo-700'
          }`}
          aria-label={isOpen ? "Fechar Chat" : "Abrir Assistente Jurídico"}
        >
          {isOpen ? <X size={28} /> : <Cpu size={28} className="group-hover:rotate-[30deg] transition-transform duration-500" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 border-2 border-navy-950"></span>
            </span>
          )}
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(56, 189, 248, 0.1); 
          border-radius: 10px; 
          border: 1px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: rgba(56, 189, 248, 0.3); 
        }
      `}</style>
    </div>
  );
};

export default AIChat;
