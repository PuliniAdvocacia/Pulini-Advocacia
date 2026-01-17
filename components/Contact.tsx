
import React, { useState } from 'react';
import { Mail, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon, OFFICE_EMAIL, OFFICE_PHONE } from '../constants';
import { supabase } from '../services/supabaseClient';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'Adequação à LGPD', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      // Mapeamento explícito para garantir que os nomes das colunas correspondam ao esperado na tabela 'contacts'
      const { error } = await supabase.from('contacts').insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }]);
      
      if (error) throw error;
      
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: 'Adequação à LGPD', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (err) {
      console.error('Supabase submission error:', err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <section id="contato" className="py-6 bg-navy-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="fade-in">
            <span className="section-header-badge">Contato</span>
            <h3 className="text-xl font-display font-bold text-white mb-2">Conecte-se.</h3>
            <p className="text-slate-400 mb-4 text-[10px] leading-relaxed max-w-xs">
              Atendimento 100% digital com agilidade técnica.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: WhatsAppIcon, label: "Whats", val: OFFICE_PHONE, href: `https://wa.me/55${OFFICE_PHONE.replace(/\D/g, '')}` },
                { icon: Mail, label: "E-mail", val: OFFICE_EMAIL, href: `mailto:${OFFICE_EMAIL}` }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-7 h-7 glass flex items-center justify-center rounded">
                    <item.icon className="w-3 h-3 text-sky-400" />
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[6px] uppercase font-bold tracking-widest leading-none">{item.label}</span>
                    <a href={item.href} className="text-xs text-white font-medium hover:text-sky-400 transition-colors">{item.val}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in">
            <div className="glass p-4 rounded-lg border border-white/5">
              {formStatus === 'success' ? (
                <div className="text-center py-2 flex items-center justify-center space-x-2">
                  <CheckCircle2 className="text-green-400" size={14} />
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest">Recebido!</p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="text-center py-2 flex items-center justify-center space-x-2 text-red-400">
                  <AlertCircle size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Erro no envio</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input required name="name" value={formData.name} onChange={handleChange} placeholder="Nome" className="bg-navy-950/50 border border-white/10 rounded px-2 py-1.5 text-white text-[10px] focus:border-sky-500/50 outline-none" />
                    <input required name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" type="email" className="bg-navy-950/50 border border-white/10 rounded px-2 py-1.5 text-white text-[10px] focus:border-sky-500/50 outline-none" />
                  </div>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Sua dúvida estratégica..." className="w-full bg-navy-950/50 border border-white/10 rounded px-2 py-1.5 text-white text-[10px] focus:border-sky-500/50 outline-none"></textarea>
                  <button className="w-full bg-sky-500 text-navy-900 font-bold py-1.5 rounded text-[8px] uppercase tracking-widest hover:bg-sky-400 transition-all flex items-center justify-center space-x-2">
                    {formStatus === 'sending' ? <Loader2 className="animate-spin" size={12} /> : <span>Enviar Diagnóstico</span>}
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
