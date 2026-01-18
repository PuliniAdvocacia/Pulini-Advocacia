
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Zap, Lock, Cpu, RefreshCw, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const TRIGGERS = [
  { label: "Termos de Uso SaaS", icon: Zap, color: "text-yellow-400" },
  { label: "Adequação LGPD", icon: Lock, color: "text-sky-400" },
  { label: "Vesting de Sócios", icon: ShieldCheck, color: "text-emerald-400" }
];

const formatText = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    // Detecção de listas
    const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ') || /^\d+\./.test(line.trim());
    
    // Processamento de Negrito (**texto**)
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, j) => 
      part.startsWith('**') && part.endsWith('**') ? 
      <strong key={j} className="text-white font-extrabold">{part.slice(2, -2)}</strong> : part
    );

    if (isBullet) {
      return (
        <div key={i} className="flex items-start space-x-2 my-2 ml-1">
          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 shrink-0"></div>
          <span className="text-slate-300 text-[13px] leading-relaxed">{content}</span>
        </div>
      );
    }
    
    if (line.startsWith('#')) {
      return <h5 key={i} className="text-sky-400 font-bold text-[11px] uppercase tracking-widest mt-4 mb-2">{line.replace(/#/g, '').trim()}</h5>;
    }

    return <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-2 leading-relaxed text-[13px] text-slate-300'}>{content}</p>;
  });
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Dr. Pulini AI **online**. Como posso auxiliar na sua estratégia jurídica digital hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Adiciona bolha de resposta vazia para o streaming
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    let accumulatedResponse = '';

    try {
      await geminiService.sendMessageStream(updatedMessages, (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: accumulatedResponse };
          return newMessages;
        });
      });
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: 'model', 
          text: 'Ocorreu um erro na conexão. Por favor, prossiga com seu diagnóstico via **WhatsApp Business** para atendimento prioritário.' 
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: 'model', text: 'Histórico reiniciado. Qual o seu novo desafio jurídico?' }]);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-2rem)] md:w-[420px] h-[75vh] md:h-[600px] glass-panel rounded-[2rem] flex flex-col overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] border border-white/10 animate-in zoom-in-95 fade-in duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="p-5 border-b border-white/5 bg-navy-900/90 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <Cpu size={20} className="text-navy-900" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-navy-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-sm tracking-tight">PULINI <span className="text-sky-400">AI</span></h4>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Inteligência Jurídica Ativa</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={resetChat} title="Reiniciar Chat" className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-sky-400 transition-colors">
                <RefreshCw size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-navy-950/30 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-md ${
                    msg.role === 'user' ? 'bg-navy-700' : 'bg-sky-500/10 border border-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={12} className="text-slate-400" /> : <Bot size={14} className="text-sky-400" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-navy-900/80 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text ? formatText(msg.text) : (
                      <div className="flex items-center space-x-1 py-1">
                        <span className="w-1 h-1 bg-sky-400 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1 h-1 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* CTA Contextual */}
            {!isLoading && messages.length > 3 && (
              <div className="pt-2 animate-in fade-in duration-700">
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  className="flex items-center justify-between p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl group hover:bg-sky-500/10 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={18} className="text-sky-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Continuar no WhatsApp</span>
                  </div>
                  <ArrowRight size={14} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>

          {/* Footer / Input */}
          <div className="p-5 bg-navy-900/95 border-t border-white/5">
            {/* Quick Triggers (visible only at start) */}
            {messages.length < 3 && (
              <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar">
                {TRIGGERS.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(t.label)}
                    className="flex items-center space-x-2 whitespace-nowrap px-4 py-2 bg-navy-950 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all active:scale-95"
                  >
                    <t.icon size={12} className={t.color} />
                    <span>{t.label}</span>
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
                placeholder="Qual sua dúvida jurídica?"
                className="w-full bg-navy-950 border border-white/10 rounded-xl pl-5 pr-14 py-4 text-white text-[13px] focus:outline-none focus:border-sky-500/40 transition-all placeholder:text-slate-600 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-navy-900 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:hover:scale-100 shadow-lg shadow-sky-500/20"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
            isOpen ? 'bg-navy-800 rotate-90' : 'bg-sky-500 hover:scale-110'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Cpu size={28} className="text-navy-900 group-hover:rotate-12 transition-transform" />}
          
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
