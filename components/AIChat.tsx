
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, Loader2, Cpu, RefreshCw, AlertCircle, Key } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const MessageContent = ({ text }: { text: string }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (!line.trim() && i > 0) return <div key={i} className="h-2" />;
        
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') ? 
          <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
        );

        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          return (
            <div key={i} className="flex items-start space-x-2 ml-1">
              <div className="w-1 h-1 bg-sky-500 rounded-full mt-2 shrink-0"></div>
              <span className="text-slate-300 text-[13px] leading-relaxed">{formattedLine}</span>
            </div>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-[13px] text-slate-300">
            {formattedLine}
          </p>
        );
      })}
    </div>
  );
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Dr. Pulini AI **online**. Como posso auxiliar na sua estratégia jurídica hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      scrollToBottom();
    }
  }, [isOpen, messages, scrollToBottom]);

  const handleActivateAPI = async () => {
    // @ts-ignore
    if (window.aistudio) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setNeedsKey(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Antes de enviar, verifica se o usuário precisa selecionar uma chave (regra AI Studio)
    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey()) && !process.env.API_KEY) {
      await handleActivateAPI();
      // Não interrompemos o fluxo, deixamos a tentativa de envio prosseguir para disparar o erro amigável se necessário
    }

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg, { role: 'model', text: '' }]);
    setInput('');
    setIsLoading(true);
    setNeedsKey(false);

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
      console.error("Chat Interaction Failure:", err);
      
      let errorMsg = 'Falha na conexão neural. Verifique sua rede ou prossiga via **WhatsApp**.';
      
      if (err.message === "API_KEY_MISSING" || err.message === "AUTH_ERROR") {
        setNeedsKey(true);
        errorMsg = 'Acesso não autorizado. Para utilizar o Dr. Pulini AI, clique em **"Conectar API"** abaixo e selecione uma chave válida.';
      }

      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'model', text: errorMsg };
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
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Digital Strategist v3</p>
              </div>
            </div>
            <button onClick={() => setMessages([{role: 'model', text: 'Chat reiniciado. Como posso ajudar?'}])} className="text-slate-600 hover:text-sky-400 p-1"><RefreshCw size={14} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-navy-950/30 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                  msg.role === 'user' ? 'bg-sky-600 text-white rounded-tr-none shadow-lg' : 'bg-navy-900 text-slate-300 border border-white/5 rounded-tl-none shadow-md'
                }`}>
                  {msg.text ? <MessageContent text={msg.text} /> : <Loader2 size={14} className="animate-spin text-sky-400 my-1" />}
                </div>
              </div>
            ))}
            
            {needsKey && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <button 
                  onClick={handleActivateAPI}
                  className="w-full mt-2 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-xl p-4 flex flex-col items-center gap-2 transition-all group"
                >
                  <Key size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">Conectar API</span>
                  <p className="text-[9px] text-slate-500 font-medium">Selecione uma chave ativa no Google AI Studio</p>
                </button>
              </div>
            )}
          </div>

          <div className="p-4 bg-navy-900/98 border-t border-white/5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Descreva seu desafio jurídico..."
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-5 py-4 text-white text-[13px] focus:outline-none focus:border-sky-500/40 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-navy-950 rounded-lg flex items-center justify-center hover:bg-sky-400 disabled:opacity-20 transition-colors"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
               <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className={`w-1.5 h-1.5 rounded-full ${needsKey ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                  <span>{needsKey ? 'Conexão Necessária' : 'Sistema Operacional'}</span>
               </div>
               <a href={WHATSAPP_URL} target="_blank" className="flex items-center space-x-1.5 text-[9px] font-bold text-sky-500 uppercase tracking-widest hover:text-white transition-colors">
                  <AlertCircle size={10} />
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
