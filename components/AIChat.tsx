
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Zap, Lock, Cpu, RefreshCw, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const QUICK_ACTIONS = [
  { label: "Análise de Termos de Uso", icon: Zap, color: "text-yellow-400" },
  { label: "Checklist LGPD", icon: Lock, color: "text-sky-400" },
  { label: "Contrato de Vesting", icon: ShieldCheck, color: "text-emerald-400" }
];

const MessageContent = ({ text }: { text: string }) => {
  if (!text) return null;

  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ') || /^\d+\./.test(line.trim());
        
        // Renderização básica de negrito
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') ? 
          <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
        );

        if (isBullet) {
          return (
            <div key={i} className="flex items-start space-x-2 my-1.5 ml-1">
              <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 shrink-0 shadow-[0_0_5px_rgba(14,165,233,0.5)]"></div>
              <span className="text-slate-300 text-[13px] leading-relaxed">{formattedLine}</span>
            </div>
          );
        }

        if (line.startsWith('#')) {
          return <h5 key={i} className="text-sky-400 font-bold text-[10px] uppercase tracking-widest mt-4 mb-2">{line.replace(/#/g, '').trim()}</h5>;
        }

        return (
          <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-2 leading-relaxed text-[13px] text-slate-300'}>
            {formattedLine}
          </p>
        );
      })}
    </>
  );
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Dr. Pulini AI **ativo**. Pronto para processar seu diagnóstico jurídico estratégico. Qual o desafio da sua operação tech hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const handleSend = async (forcedText?: string) => {
    const textToSend = (forcedText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    const historyWithUser = [...messages, userMsg];
    
    setMessages(historyWithUser);
    setInput('');
    setIsLoading(true);

    // Adiciona bolha de resposta vazia para preencher com streaming
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    let accumulatedText = '';

    try {
      await geminiService.sendMessageStream(historyWithUser, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: accumulatedText };
          return newMsgs;
        });
      });
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { 
          role: 'model', 
          text: 'Falha no processamento neural. Por favor, conecte-se diretamente via **WhatsApp Business** para prosseguir com sua consulta.' 
        };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[1000] flex flex-col items-end pointer-events-none">
      {/* Chat Box */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-2rem)] md:w-[400px] h-[70vh] md:h-[600px] glass-panel rounded-[2rem] flex flex-col overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 animate-in zoom-in-95 fade-in duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="p-5 border-b border-white/5 bg-navy-900/90 backdrop-blur-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <Cpu size={20} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-navy-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-sm tracking-tight">DR. PULINI <span className="text-sky-400">AI</span></h4>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Estrategista Jurídico Digital</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setMessages([{role: 'model', text: 'Histórico limpo. Pronto para nova análise.'}])}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-sky-400 transition-colors"
                title="Reiniciar conversa"
              >
                <RefreshCw size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-navy-950/20 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex max-w-[90%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-md ${
                    msg.role === 'user' ? 'bg-navy-700' : 'bg-sky-500/10 border border-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={12} className="text-slate-400" /> : <Bot size={14} className="text-sky-400" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-navy-900/90 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text ? <MessageContent text={msg.text} /> : (
                      <div className="flex items-center space-x-1.5 py-1.5">
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Input */}
          <div className="p-5 bg-navy-900/98 border-t border-white/5">
            {/* Quick Actions (only if low message count) */}
            {messages.length < 3 && (
              <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar">
                {QUICK_ACTIONS.map((action, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(action.label)}
                    className="flex items-center space-x-2 whitespace-nowrap px-4 py-2 bg-navy-950/50 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all active:scale-95"
                  >
                    <action.icon size={12} className={action.color} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Descreva seu desafio jurídico..."
                className="w-full bg-navy-950/50 border border-white/10 rounded-xl pl-5 pr-14 py-4 text-white text-[13px] focus:outline-none focus:border-sky-500/50 transition-all placeholder:text-slate-600"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-navy-950 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-lg shadow-sky-500/20"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-4 pt-4 border-t border-white/5">
               <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                className="flex items-center space-x-2 text-[10px] font-bold text-sky-400 uppercase tracking-widest hover:text-white transition-colors group"
              >
                <MessageSquare size={14} />
                <span>Consultoria Humana Prioritária</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
            isOpen ? 'bg-navy-800 rotate-90' : 'bg-gradient-to-br from-sky-500 to-indigo-600 hover:scale-110'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Cpu size={28} className="text-white group-hover:rotate-12 transition-transform" />}
          
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-4 border-sky-500"></span>
            </span>
          )}
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AIChat;
