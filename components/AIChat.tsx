
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User, Loader2, Cpu, RefreshCw, AlertCircle, Key, ExternalLink } from 'lucide-react';
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
              <div className="w-1 h-1 bg-sky-500 rounded-full mt-2 shrink-0"></div>
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
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Dr. Pulini AI **online**. Como posso auxiliar na sua estratégia jurídica hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio) {
        // @ts-ignore
        const active = await window.aistudio.hasSelectedApiKey();
        setHasKey(active);
      } else {
        setHasKey(!!process.env.API_KEY);
      }
    };
    if (isOpen) checkKey();
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleConnectKey = async () => {
    // @ts-ignore
    if (window.aistudio) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume sucesso conforme as regras da documentação
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading || !hasKey) return;

    setError(false);
    const userMsg: ChatMessage = { role: 'user', text };
    
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
    } catch (err: any) {
      console.error("Chat Interaction Error:", err);
      if (err.message?.includes("Requested entity was not found") || err.message?.includes("API key is missing")) {
        setHasKey(false);
      }
      setError(true);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { 
          role: 'model', 
          text: 'Falha na conexão neural. Por favor, conecte sua chave de API ou prossiga via **WhatsApp**.' 
        };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
            isOpen ? 'bg-navy-800 rotate-90' : 'bg-gradient-to-br from-sky-400 to-sky-600 hover:scale-110 active:scale-95'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Cpu size={28} className="text-navy-950" />}
          {!isOpen && <span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-sky-500"></span></span>}
        </button>
      </div>

      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] md:w-[380px] h-[580px] glass-panel rounded-[2rem] flex flex-col overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10">
          <div className="p-5 border-b border-white/5 bg-navy-900/95 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot size={18} className="text-sky-400" />
              <div>
                <h4 className="text-white font-display font-bold text-xs uppercase tracking-tight">Dr. Pulini <span className="text-sky-400">AI</span></h4>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Neural Law Engine</p>
              </div>
            </div>
            <button onClick={() => setMessages([{role: 'model', text: 'Reiniciado. Como posso ajudar?'}])} className="text-slate-600 hover:text-sky-400"><RefreshCw size={14} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-navy-950/30 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                  msg.role === 'user' ? 'bg-sky-600 text-white rounded-tr-none' : 'bg-navy-900 text-slate-300 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text ? <MessageContent text={msg.text} /> : <Loader2 size={14} className="animate-spin text-sky-400" />}
                </div>
              </div>
            ))}
            
            {hasKey === false && (
              <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-center space-y-3 animate-in fade-in zoom-in">
                <Key className="mx-auto text-sky-400" size={20} />
                <p className="text-[11px] text-sky-200 font-bold uppercase tracking-wider leading-relaxed">Conexão Neural Pendente</p>
                <p className="text-[10px] text-slate-400 font-light">Para interagir com o Dr. Pulini AI, é necessário habilitar a chave de API.</p>
                <button 
                  onClick={handleConnectKey}
                  className="w-full bg-sky-500 text-navy-900 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sky-400 transition-all flex items-center justify-center space-x-2"
                >
                  <Cpu size={14} />
                  <span>Conectar Gemini API</span>
                </button>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block text-[8px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Saiba mais sobre Billing</a>
              </div>
            )}
          </div>

          <div className="p-4 bg-navy-900/98 border-t border-white/5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                disabled={!hasKey}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={hasKey ? "Descreva seu desafio jurídico..." : "Conecte a API para começar..."}
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-5 py-4 text-white text-[13px] focus:outline-none focus:border-sky-500/40 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || !hasKey}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-navy-950 rounded-lg flex items-center justify-center hover:bg-sky-400 disabled:opacity-20"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="mt-4 flex justify-center">
               <a href={WHATSAPP_URL} target="_blank" className="flex items-center space-x-2 text-[10px] font-bold text-sky-500 uppercase tracking-widest hover:text-white transition-colors">
                  <AlertCircle size={14} />
                  <span>Atendimento Humano</span>
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
