
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles, ArrowRight, Zap, Lock, Cpu, RefreshCw, MessageSquare, ShieldCheck } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const TRIGGERS = [
  { label: "Termos de Uso SaaS", icon: Zap, color: "text-yellow-400" },
  { label: "Adequação LGPD", icon: Lock, color: "text-sky-400" },
  { label: "Contrato de Vesting", icon: ShieldCheck, color: "text-emerald-400" }
];

const formatText = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ') || /^\d+\./.test(line.trim());
    
    // Processamento de Negrito simples
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, j) => 
      part.startsWith('**') && part.endsWith('**') ? 
      <strong key={j} className="text-white font-extrabold">{part.slice(2, -2)}</strong> : part
    );

    if (isBullet) {
      return (
        <div key={i} className="flex items-start space-x-2 my-2 animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_#0ea5e9]"></div>
          <span className="text-slate-200 text-[13px] leading-relaxed">{content}</span>
        </div>
      );
    }
    
    const isHeader = line.startsWith('#');
    if (isHeader) {
      return <h5 key={i} className="text-sky-400 font-bold text-xs uppercase tracking-widest mt-4 mb-2">{line.replace(/#/g, '').trim()}</h5>;
    }

    return <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-3 leading-relaxed text-[13px] text-slate-300'}>{content}</p>;
  });
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Dr. Pulini AI **ativo**. Pronto para processar diagnóstico estratégico.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior 
      });
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
    const textToSend = (override || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    let fullResponse = '';
    // Adiciona a bolha da resposta da IA vazia para começar o streaming
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      await geminiService.sendMessageStream(newHistory, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullResponse };
          return updated;
        });
      });
    } catch (error) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { 
          role: 'model', 
          text: 'Erro de processamento. Por favor, utilize o **canal direto do WhatsApp** para sua consulta.' 
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-5 w-[calc(100vw-2rem)] md:w-[450px] h-[85vh] md:h-[650px] glass-panel rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 animate-in zoom-in-95 fade-in duration-500 origin-bottom-right">
          
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-navy-900/80 backdrop-blur-3xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                  <Cpu size={24} className="text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-navy-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-sm tracking-tight flex items-center">
                  DR. PULINI <span className="text-sky-400 ml-1">AI</span>
                </h4>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Diagnóstico Jurídico High-Tech</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setMessages([{role:'model', text:'Histórico reiniciado. Como posso ajudar?'}])} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white">
                <RefreshCw size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white">
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar bg-navy-950/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                    msg.role === 'user' ? 'bg-navy-700 border border-white/5' : 'bg-sky-500/10 border border-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-slate-400" /> : <Bot size={16} className="text-sky-400" />}
                  </div>
                  <div className={`relative px-5 py-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none' 
                      : 'bg-navy-900/90 text-slate-200 border border-white/5 rounded-tl-none shadow-xl'
                  }`}>
                    {msg.text ? formatText(msg.text) : (
                      <div className="flex space-x-1.5 py-2">
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* CTA Persuasivo no final de conversas longas */}
            {messages.length > 3 && !isLoading && (
              <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank"
                  className="flex items-center justify-between p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl group hover:bg-sky-500/10 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={20} className="text-sky-400" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">Formalizar tese via WhatsApp</span>
                  </div>
                  <ArrowRight size={16} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 bg-navy-900/95 border-t border-white/5">
            {/* Quick Triggers */}
            {messages.length < 3 && (
              <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar">
                {TRIGGERS.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(t.label)}
                    className="flex items-center space-x-2 whitespace-nowrap px-4 py-2.5 bg-navy-950/80 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-sky-500/40 transition-all shrink-0 active:scale-95"
                  >
                    <t.icon size={12} className={t.color} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Descreva seu desafio jurídico..."
                className="w-full bg-navy-950/80 border border-white/10 rounded-2xl pl-6 pr-16 py-5 text-white text-[13px] focus:outline-none focus:border-sky-500/50 transition-all placeholder:text-slate-600"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-sky-500 text-navy-900 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-[0_8px_20px_rgba(14,165,233,0.3)]"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            
            <p className="text-[8px] text-center text-slate-600 mt-4 uppercase tracking-[0.3em] font-mono">
              Secure Intelligence Engine • HIPAA/GDPR Ready
            </p>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 group relative overflow-hidden ${
            isOpen ? 'bg-navy-800 rotate-90 scale-90' : 'bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-700 hover:scale-110 hover:-translate-y-2'
          }`}
        >
          {isOpen ? <X size={32} className="text-white" /> : <Cpu size={36} className="text-white group-hover:rotate-12 transition-transform duration-500" />}
          
          {!isOpen && (
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
          
          {/* Badge de Atividade */}
          {!isOpen && (
            <span className="absolute top-4 right-4 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          )}
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(56, 189, 248, 0.1); 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(56, 189, 248, 0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIChat;
