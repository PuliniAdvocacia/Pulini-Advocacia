
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Cpu, RefreshCw, MessageSquare, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const MessageContent = ({ text }: { text: string }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ') || /^\d+\./.test(line.trim());
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') ? 
          <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
        );

        if (isBullet) {
          return (
            <div key={i} className="flex items-start space-x-2 my-1.5 ml-1">
              <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 shrink-0 shadow-[0_0_8px_rgba(14,165,233,0.6)]"></div>
              <span className="text-slate-300 text-[13px] leading-relaxed">{formattedLine}</span>
            </div>
          );
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
    { role: 'model', text: 'Dr. Pulini AI **online**. Como posso auxiliar na proteção jurídica do seu negócio hoje?' }
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

    // Placeholder para a resposta em streaming
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
          text: 'Erro de conexão. Por favor, utilize o **WhatsApp** para atendimento humano prioritário.' 
        };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end pointer-events-none">
      {/* Launcher Button */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
            isOpen ? 'bg-navy-800 rotate-90 scale-90' : 'bg-gradient-to-br from-sky-500 to-sky-600 hover:scale-110'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Cpu size={28} className="text-navy-900 group-hover:rotate-12 transition-transform" />}
          
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-sky-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] md:w-[380px] h-[65vh] md:h-[550px] glass-panel rounded-[2rem] flex flex-col overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="p-5 border-b border-white/5 bg-navy-900/90 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center">
                <Bot size={18} className="text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-xs tracking-tight uppercase">Dr. Pulini <span className="text-sky-400">AI</span></h4>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Online para Diagnóstico</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setMessages([{role: 'model', text: 'Chat reiniciado. Qual o desafio jurídico atual?'}])}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-sky-400 transition-colors"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-navy-950/20 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
                <div className={`flex max-w-[88%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user' ? 'bg-navy-700' : 'bg-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={10} className="text-slate-400" /> : <Bot size={12} className="text-sky-400" />}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-navy-900/90 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text ? <MessageContent text={msg.text} /> : (
                      <div className="flex items-center space-x-1 py-2">
                        <span className="w-1.5 h-1.5 bg-sky-400/50 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-navy-900/98 border-t border-white/5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ex: Como proteger meu SaaS?"
                className="w-full bg-navy-950 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white text-xs focus:outline-none focus:border-sky-500/40 transition-all placeholder:text-slate-600 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-sky-500 text-navy-950 rounded-lg flex items-center justify-center hover:bg-sky-400 active:scale-95 transition-all disabled:opacity-20 shadow-lg shadow-sky-500/10"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              className="flex items-center justify-center space-x-2 mt-4 py-2 bg-sky-500/5 border border-sky-500/10 rounded-xl group hover:bg-sky-500/10 transition-all"
            >
              <MessageSquare size={12} className="text-sky-400" />
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-[0.15em]">WhatsApp Prioritário</span>
              <ArrowRight size={10} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AIChat;
