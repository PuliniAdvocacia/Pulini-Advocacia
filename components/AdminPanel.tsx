
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { X, Lock, Plus, Edit, Trash2, Save, LogOut, Loader2, Image as ImageIcon } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchPosts();
  }, [session]);

  const fetchPosts = async () => {
    const data = await blogService.getPosts();
    setPosts(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Acesso negado. Credenciais inválidas.');
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setLoading(true);
    const success = await blogService.savePost(editingPost);
    if (success) {
      setIsFormOpen(false);
      setEditingPost(null);
      fetchPosts();
    } else {
      alert('Erro ao salvar post.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;
    const success = await blogService.deletePost(id);
    if (success) fetchPosts();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/95 backdrop-blur-2xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 md:px-10 border-b border-white/5 bg-navy-900/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20">
              <Lock size={18} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-white font-display font-bold text-sm uppercase tracking-widest">Command Center</h2>
              <p className="text-slate-500 text-[9px] uppercase tracking-widest font-bold">Gestão de Autoridade Digital</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session && (
              <button onClick={() => supabase.auth.signOut()} className="text-slate-500 hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            )}
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-500/20 transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {!session ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Identificação</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="advogado@pulini.adv.br"
                    className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-sky-500 text-navy-900 font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-sky-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Autenticar Sistema'}
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard */
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-display font-bold text-xl">Artigos Publicados ({posts.length})</h3>
                <button 
                  onClick={() => {
                    setEditingPost({ category: 'Direito Digital', date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }), readTime: '5 min' });
                    setIsFormOpen(true);
                  }}
                  className="bg-white text-navy-900 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-sky-500 transition-all"
                >
                  <Plus size={14} /> Novo Artigo
                </button>
              </div>

              <div className="grid gap-4">
                {posts.map(post => (
                  <div key={post.id} className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-sky-500/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-navy-900 border border-white/5">
                        <img src={post.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{post.title}</h4>
                        <div className="flex items-center gap-3 text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                          <span className="text-sky-500">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingPost(post);
                          setIsFormOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Post Editor Modal */}
        {isFormOpen && editingPost && (
          <div className="absolute inset-0 z-50 bg-navy-950 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/5 bg-navy-900 flex justify-between items-center">
              <h3 className="text-white font-display font-bold uppercase tracking-widest text-xs">
                {editingPost.id ? 'Editar Artigo' : 'Novo Artigo'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Título do Artigo</label>
                  <input 
                    className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                    value={editingPost.title || ''}
                    onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">URL da Imagem (Unsplash)</label>
                  <input 
                    className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                    value={editingPost.image || ''}
                    onChange={e => setEditingPost({...editingPost, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Categoria</label>
                  <input 
                    className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                    value={editingPost.category || ''}
                    onChange={e => setEditingPost({...editingPost, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tempo de Leitura</label>
                  <input 
                    className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                    value={editingPost.readTime || ''}
                    onChange={e => setEditingPost({...editingPost, readTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Resumo (Excerpt)</label>
                <textarea 
                  className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm h-20 resize-none"
                  value={editingPost.excerpt || ''}
                  onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Conteúdo (HTML Permitido)</label>
                <textarea 
                  className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm h-64 font-mono"
                  value={editingPost.content || ''}
                  onChange={e => setEditingPost({...editingPost, content: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-sky-500 text-navy-900 font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Publicar Alterações</>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
