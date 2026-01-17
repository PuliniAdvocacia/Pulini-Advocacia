
import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2, AlertCircle } from 'lucide-react';
import { WhatsAppIcon, OFFICE_EMAIL, OFFICE_PHONE } from '../constants';
import { supabase } from '../services/supabaseClient';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Adequação à LGPD',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            subject: formData.subject, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: 'Adequação à LGPD', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (err) {
      console.error('Erro ao enviar para o Supabase:', err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contato" className="py-16 bg-navy-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="fade-in">
            <h2 className="text-[11px] font-sans font-bold tracking-[0.2em] text-sky-400 uppercase mb-3">Contato</h2>
            <h3 className="text-3xl font-serif font-bold text-white mb-6">Vamos Conversar?</h3>
            <p className="text-slate-400 mb-10 text-sm leading-relaxed">
              Estamos prontos para atender sua demanda de forma rápida e eficiente. Nosso escritório é 100% digital, atendendo clientes em todo o Brasil e no exterior.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-5 group">
                <div className="w-10 h-10 glass flex items-center justify-center rounded-lg group-hover:bg-sky-500/20 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">WhatsApp</span>
                  <a href={`https://wa.me/55${OFFICE_PHONE.replace(/\D/g, '')}`} className="text-lg text-white font-medium hover:text-sky-400 transition-colors">{OFFICE_PHONE}</a>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="w-10 h-10 glass flex items-center justify-center rounded-lg group-hover:bg-sky-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">E-mail</span>
                  <a href={`mailto:${OFFICE_EMAIL}`} className="text-lg text-white font-medium hover:text-sky-400 transition-colors">{OFFICE_EMAIL}</a>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="w-10 h-10 glass flex items-center justify-center rounded-lg group-hover:bg-sky-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">Sede</span>
                  <span className="text-lg text-white font-medium">Escritório 100% Digital</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-in">
            <div className="glass p-8 rounded-2xl shadow-xl">
              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send className="text-sky-400" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Mensagem Enviada!</h4>
                  <p className="text-slate-400 text-sm">Dados salvos com sucesso em nosso sistema.</p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <AlertCircle className="text-red-400" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Erro no Envio</h4>
                  <p className="text-slate-400 text-sm">Não foi possível conectar ao banco de dados. Tente novamente.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-[11px] font-medium mb-1.5 uppercase tracking-wider">Nome</label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className="w-full bg-navy-900/50 border border-sky-500/20 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-sky-500 transition-colors"
                        placeholder="João da Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-[11px] font-medium mb-1.5 uppercase tracking-wider">E-mail</label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className="w-full bg-navy-900/50 border border-sky-500/20 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-sky-500 transition-colors"
                        placeholder="voce@empresa.com.br"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-[11px] font-medium mb-1.5 uppercase tracking-wider">Assunto</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-navy-900/50 border border-sky-500/20 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      <option>Adequação à LGPD</option>
                      <option>Contratos Digitais</option>
                      <option>Consultoria Geral</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-[11px] font-medium mb-1.5 uppercase tracking-wider">Mensagem</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-navy-900/50 border border-sky-500/20 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-sky-500 transition-colors"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>
                  <button
                    disabled={formStatus === 'sending'}
                    className="w-full bg-sky-500 text-navy-900 font-bold py-3 rounded-lg hover:bg-sky-400 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 text-xs uppercase tracking-widest"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
