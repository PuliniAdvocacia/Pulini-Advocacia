
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Cpu, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const MessageContent = ({ text }: { text: string }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') ? 
          <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
        );

        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          return (
            <div key={i} className="flex items-start space-x-2 my-1.5 ml-1">
              <div className="w-1 h-1 bg-sky-500 rounded-full mt-2 shrink-0 shadow-[0_0_5px_rgba(14,165,233,0.5)]"></div>
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
    { role: 'model', text: 'Dr. Pulini AI **ativo**. Como posso auxiliar na estratégia jurídica da sua tech hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
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
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setError(false);
    const userMsg: ChatMessage = { role: 'user', text };
    
    // Atualiza mensagens com o input do usuário e um placeholder para a resposta
    setMessages(prev => [...prev, userMsg, { role: 'model', text: '' }]);
    setInput('');
    setIsLoading(true);

    let accumulatedResponse = '';

    try {
      await geminiService.sendMessageStream([...messages, userMsg], (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: accumulatedResponse };
          return newMsgs;
        });
      });
    } catch (err) {
      console.error("Chat Interaction Error:", err);
      setError(true);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { 
          role: 'model', 
          text: 'Falha na conexão neural. Recomendo prosseguir via **WhatsApp** para evitar perda de dados.' 
        };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end pointer-events-none">
      {/* Botão Launcher */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
            isOpen ? 'bg-navy-800 rotate-90' : 'bg-gradient-to-br from-sky-400 to-sky-600 hover:scale-110 active:scale-95'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Cpu size={28} className="text-navy-950 group-hover:rotate-12 transition-transform" />}
          
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-sky-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Janela de Chat */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] md:w-[380px] h-[70vh] md:h-[580px] glass-panel rounded-[2rem] flex flex-col overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="p-5 border-b border-white/5 bg-navy-900/95 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center">
                  <Bot size={18} className="text-sky-400" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-navy-900 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-xs tracking-tight uppercase">Dr. Pulini <span className="text-sky-400">AI</span></h4>
                <p className="text-[8px] text-slate-500 font-bold tracking-[0.1em] uppercase">Estrategista Digital</p>
              </div>
            </div>
            <button 
              onClick={() => setMessages([{role: 'model', text: 'Chat reiniciado. Como posso ajudar?'}])}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-600 hover:text-sky-400 transition-colors"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-navy-950/30 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex max-w-[90%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user' ? 'bg-navy-700' : 'bg-sky-500/10 border border-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={12} className="text-slate-500" /> : <Bot size={14} className="text-sky-400" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-navy-900/90 text-slate-300 border border-white/5 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text ? <MessageContent text={msg.text} /> : (
                      <div className="flex items-center space-x-1.5 py-2">
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {error && (
               <div className="flex justify-center animate-in fade-in duration-300">
                  <a href={WHATSAPP_URL} target="_blank" className="flex items-center space-x-2 bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-xl text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-400/20 transition-all">
                    <AlertCircle size={14} />
                    <span>Falar com Humano no WhatsApp</span>
                  </a>
               </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-4 bg-navy-900/98 border-t border-white/5">
            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Descreva seu desafio jurídico..."
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl pl-5 pr-12 py-4 text-white text-[13px] focus:outline-none focus:border-sky-500/40 transition-all placeholder:text-slate-600"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-navy-950 rounded-lg flex items-center justify-center hover:bg-sky-400 active:scale-90 transition-all disabled:opacity-20 shadow-lg shadow-sky-500/20"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center">
               <a href={WHATSAPP_URL} target="_blank" className="flex items-center space-x-2 text-[10px] font-bold text-sky-500 uppercase tracking-widest hover:text-white transition-colors">
                  <MessageSquare size={14} />
                  <span>Consultoria Prioritária</span>
               </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AIChat;
