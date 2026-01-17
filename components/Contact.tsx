
import React, { useState } from 'react';
import { Mail, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon, OFFICE_EMAIL, OFFICE_PHONE } from '../constants';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'Diagnóstico Jurídico Digital', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      /**
       * Integração com Formspree para envio direto ao e-mail pulini@adv.oabsp.org.br
       * Para ativar, basta criar o formulário em formspree.io e substituir o ID abaixo.
       */
      const FORMSPREE_ID = "xldgqjbe"; // Substitua pelo seu ID real do Formspree
      
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Novo Lead Jurídico: ${formData.name} - ${formData.subject}`
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: 'Diagnóstico Jurídico Digital', message: '' });
        setTimeout(() => setFormStatus('idle'), 6000);
      } else {
        throw new Error("Falha no servidor de e-mail");
      }
    } catch (err) {
      console.error('Contact error:', err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <section id="contato" className="py-16 bg-navy-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="fade-in">
            <span className="section-header-badge">Canais de Atendimento</span>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">
              Inicie sua <span className="text-gradient">Blindagem Digital.</span>
            </h3>
            <p className="text-slate-400 mb-10 text-xs md:text-sm leading-relaxed max-w-sm font-light">
              Atendimento 100% digital e ágil. Preencha o formulário para um diagnóstico preliminar ou use nossos canais diretos.
            </p>

            <div className="space-y-8">
              {[
                { 
                  icon: WhatsAppIcon, 
                  label: "WhatsApp Business", 
                  val: OFFICE_PHONE, 
                  href: `https://wa.me/55${OFFICE_PHONE.replace(/\D/g, '')}`,
                  desc: "Consultoria imediata e urgências técnicas."
                },
                { 
                  icon: Mail, 
                  label: "E-mail Institucional", 
                  val: OFFICE_EMAIL, 
                  href: `mailto:${OFFICE_EMAIL}`,
                  desc: "Envio de documentação e propostas formais."
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 glass-panel flex items-center justify-center rounded-2xl border border-sky-500/10 group-hover:border-sky-500/40 transition-all shadow-lg">
                    <item.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <span className="block text-sky-500 text-[9px] uppercase font-bold tracking-[0.25em] mb-1">{item.label}</span>
                    <a href={item.href} className="text-base text-white font-bold hover:text-sky-400 transition-colors block tracking-tight">{item.val}</a>
                    <span className="text-[11px] text-slate-500 font-light mt-1 block">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in relative">
            {/* Ambient Glow behind the form */}
            <div className="absolute -inset-10 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative z-10 shadow-2xl">
              {formStatus === 'success' ? (
                <div className="text-center py-16 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <CheckCircle2 className="text-green-400" size={40} />
                  </div>
                  <h4 className="text-white font-display font-bold text-xl mb-3 uppercase tracking-tight">Recebido com Sucesso!</h4>
                  <p className="text-slate-400 text-sm font-light max-w-[250px] mx-auto leading-relaxed">
                    Sua solicitação foi enviada diretamente ao Dr. Pulini. Retornaremos em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Nome ou Empresa</label>
                      <input 
                        required 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Nome completo" 
                        className="w-full bg-navy-950/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-xs focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">E-mail para Retorno</label>
                      <input 
                        required 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="contato@exemplo.com" 
                        type="email" 
                        className="w-full bg-navy-950/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-xs focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-700" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Área de Interesse</label>
                    <div className="relative">
                      <select 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                        className="w-full bg-navy-950/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-xs focus:border-sky-500/50 outline-none appearance-none transition-all cursor-pointer"
                      >
                        <option className="bg-navy-900">Adequação à LGPD</option>
                        <option className="bg-navy-900">SaaS & Apps Compliance</option>
                        <option className="bg-navy-900">Propriedade Intelectual Tech</option>
                        <option className="bg-navy-900">Startups & M&A</option>
                        <option className="bg-navy-900">Crimes Digitais / Incidentes</option>
                        <option className="bg-navy-900">Outros</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Mensagem ou Caso</label>
                    <textarea 
                      required 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows={4} 
                      placeholder="Descreva brevemente seu desafio jurídico..." 
                      className="w-full bg-navy-950/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-xs focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 outline-none transition-all resize-none placeholder:text-slate-700"
                    ></textarea>
                  </div>

                  {formStatus === 'error' && (
                    <div className="flex items-center space-x-3 text-red-400 bg-red-400/5 p-4 rounded-xl border border-red-400/20 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={18} />
                      <p className="text-[11px] font-bold uppercase tracking-wider">Falha no envio. Por favor, tente via WhatsApp.</p>
                    </div>
                  )}

                  <button 
                    disabled={formStatus === 'sending'}
                    className="w-full bg-sky-500 text-navy-900 font-bold py-5 rounded-2xl text-[11px] uppercase tracking-[0.25em] hover:bg-sky-400 hover:shadow-[0_10px_25px_rgba(14,165,233,0.3)] transition-all flex items-center justify-center space-x-3 active:scale-[0.98] disabled:opacity-50 group"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Enviando Dados...</span>
                      </>
                    ) : (
                      <>
                        <span>Solicitar Diagnóstico Jurídico</span>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
