
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, Loader2, Cpu, RefreshCw, AlertCircle, Key, ExternalLink, Globe } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../constants';

const MessageContent = ({ text, grounding }: { text: string, grounding?: any }) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const sources = grounding?.groundingChunks?.map((chunk: any) => chunk.web).filter(Boolean) || [];

  return (
    <div className="space-y-3">
      <div className="text-slate-300 text-[13px] leading-relaxed">
        {lines.map((line, i) => {
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedLine = parts.map((part, j) => 
            part.startsWith('**') && part.endsWith('**') ? 
            <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
          );

          if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            return (
              <div key={i} className="flex items-start space-x-2 my-1 ml-1">
                <div className="w-1 h-1 bg-sky-500 rounded-full mt-2 shrink-0"></div>
                <span>{formattedLine}</span>
              </div>
            );
          }
          return <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-1'}>{formattedLine}</p>;
        })}
      </div>

      {sources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-[9px] font-bold text-sky-400 uppercase tracking-widest">
            <Globe size={10} />
            <span>Fontes Verificadas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sources.map((src: any, idx: number) => (
              <a 
                key={idx} 
                href={src.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2 py-1 bg-sky-500/5 hover:bg-sky-500/10 border border-sky-500/10 rounded-md text-[9px] text-slate-400 hover:text-sky-400 transition-all truncate max-w-[180px]"
              >
                <ExternalLink size={8} />
                {src.title || 'Referência Jurídica'}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<(ChatMessage & { grounding?: any })[]>([
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

  const checkAndOpenKeySelector = async () => {
    // @ts-ignore
    if (window.aistudio) {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        return true; // Tentou abrir o seletor
      }
    }
    return false;
  };

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

    // Verifica se há chave antes de enviar
    // @ts-ignore
    const keyInjected = !!process.env.API_KEY;
    // @ts-ignore
    const hasSelected = window.aistudio ? await window.aistudio.hasSelectedApiKey() : false;

    if (!keyInjected && !hasSelected) {
      setNeedsKey(true);
      await handleActivateAPI();
      // Assume sucesso após o trigger do diálogo conforme regra de race condition
    }

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg, { role: 'model', text: '' }]);
    setInput('');
    setIsLoading(true);
    setNeedsKey(false);

    try {
      await geminiService.sendMessageStream([...messages, userMsg], (response, grounding) => {
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: response, grounding };
          return newMsgs;
        });
      });
    } catch (err: any) {
      console.error("Chat Error:", err);
      let errorMsg = 'Falha na conexão neural. Verifique sua rede ou prossiga via **WhatsApp**.';
      
      if (err.message === "API_KEY_MISSING" || err.message === "AUTH_ERROR") {
        setNeedsKey(true);
        errorMsg = 'Acesso não configurado. É necessário selecionar uma chave de API para utilizar o Dr. Pulini AI.';
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
            isOpen ? 'bg-navy-800 rotate-90' : 'bg-gradient-to-br from-sky-400 to-sky-600 hover:scale-110 active:scale-95 shadow-sky-500/20'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Cpu size={28} className="text-navy-950" />}
          {!isOpen && <span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-sky-500"></span></span>}
        </button>
      </div>

      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-3rem)] md:w-[400px] h-[600px] glass-panel rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10">
          <div className="p-6 border-b border-white/5 bg-navy-900/95 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20">
                <Bot size={16} className="text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-xs uppercase tracking-tight">Dr. Pulini <span className="text-sky-400">AI</span></h4>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1 h-1 rounded-full animate-pulse ${needsKey ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{needsKey ? 'Chave Ausente' : 'Grounding Ativo'}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setMessages([{role: 'model', text: 'Sessão reiniciada. Qual seu desafio?'}])} className="text-slate-600 hover:text-sky-400 p-2 transition-colors"><RefreshCw size={14} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-navy-950/30 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-4">
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl max-w-[90%] ${
                    msg.role === 'user' ? 'bg-sky-600 text-white rounded-tr-none shadow-lg' : 'bg-navy-900/80 text-slate-300 border border-white/5 rounded-tl-none shadow-md backdrop-blur-sm'
                  }`}>
                    {msg.text ? <MessageContent text={msg.text} grounding={msg.grounding} /> : <Loader2 size={16} className="animate-spin text-sky-400 my-1" />}
                  </div>
                </div>
                
                {/* Mostra o botão de ativação logo abaixo da mensagem de erro se necessário */}
                {idx === messages.length - 1 && needsKey && msg.role === 'model' && (
                  <div className="flex flex-col items-center p-6 bg-sky-500/5 border border-sky-500/20 rounded-2xl animate-in fade-in zoom-in-95 duration-500">
                    <Key size={32} className="text-sky-400 mb-4" />
                    <h5 className="text-white font-bold text-xs mb-2 uppercase">Conectar Inteligência</h5>
                    <p className="text-[10px] text-slate-400 text-center mb-5 leading-relaxed">
                      Este assistente requer uma chave do Google AI Studio com faturamento ativo para operar.
                    </p>
                    <button 
                      onClick={handleActivateAPI}
                      className="w-full bg-sky-500 text-navy-900 text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/10 active:scale-95"
                    >
                      Selecionar Chave de API
                    </button>
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      className="mt-4 text-[9px] text-slate-500 underline hover:text-sky-400 transition-colors"
                    >
                      Configurar faturamento da API
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 bg-navy-900/98 border-t border-white/5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={needsKey ? "Ative a chave para perguntar..." : "Ex: Como proteger meu código SaaS?"}
                className={`w-full bg-navy-950/80 border border-white/10 rounded-xl px-5 py-4 text-white text-[13px] focus:outline-none focus:border-sky-400/50 transition-all placeholder:text-slate-600 ${needsKey ? 'opacity-50' : ''}`}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 text-navy-900 rounded-lg flex items-center justify-center hover:bg-sky-400 disabled:opacity-20 transition-all shadow-inner shadow-white/20"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
               <div className="flex items-center space-x-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className={`w-1.5 h-1.5 rounded-full ${needsKey ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]'}`} />
                  <span>{needsKey ? 'Aguardando Chave' : 'Neural Core v4'}</span>
               </div>
               <a href={WHATSAPP_URL} target="_blank" className="flex items-center space-x-1.5 text-[9px] font-bold text-sky-500 uppercase tracking-widest hover:text-white transition-colors">
                  <AlertCircle size={10} />
                  <span>Advocacia Humana</span>
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
