
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bem-vindo à Pulini Advocacia! Sou o Assistente Virtual Pulini. Como posso te ajudar hoje com suas dúvidas sobre Direito Digital e LGPD?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Desculpe, estou enfrentando uma instabilidade técnica momentânea. Para garantir seu atendimento imediato, por favor utilize nosso formulário de contato ou fale conosco via WhatsApp.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-2xl text-navy-900 hover:scale-110 transition-transform glow-blue"
      >
        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-sky-500/20">
          {/* Header */}
          <div className="bg-navy-900 p-4 border-b border-sky-500/20 flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-500/10 rounded-full flex items-center justify-center">
              <Bot className="text-sky-400" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Assistente Pulini</h4>
              <span className="text-[10px] text-sky-400 font-mono flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                IA ONLINE
              </span>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 h-96 overflow-y-auto p-4 space-y-4 bg-navy-900/40">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-navy-700' : 'bg-sky-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-slate-400" /> : <Bot size={14} className="text-sky-400" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-sky-500 text-navy-900 rounded-tr-none font-medium' : 'bg-navy-800 text-slate-200 rounded-tl-none border border-sky-500/10 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="w-8 h-8 bg-sky-500/10 rounded-full flex items-center justify-center">
                  <Loader2 className="text-sky-400 animate-spin" size={14} />
                </div>
                <div className="p-3 bg-navy-800 rounded-2xl text-xs text-slate-400 italic">
                  Pensando...
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-4 bg-navy-900/80 border-t border-sky-500/10 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-navy-800 border border-sky-500/10 rounded-lg px-4 py-2 text-white text-xs focus:outline-none focus:border-sky-500/50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-sky-500 text-navy-900 p-2 rounded-lg hover:bg-sky-400 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
