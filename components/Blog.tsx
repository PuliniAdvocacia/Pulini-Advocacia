
import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { X, Clock, Calendar, ArrowUpRight, ChevronRight, Loader2 } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await blogService.getPosts();
    setPosts(data);
    setLoading(false);
  };

  return (
    <section id="blog" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="max-w-3xl mb-16 fade-in">
          <span className="section-header-badge">Inteligência Jurídica</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Insights para a <span className="text-gradient">Economia Digital.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light max-w-xl">
            Análises profundas sobre leis, tecnologia e estratégias para founders e executivos que operam na fronteira da inovação.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-sky-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="fade-in group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="glass-panel h-full rounded-[2rem] overflow-hidden border border-white/5 hover:border-sky-500/30 transition-all duration-500 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-navy-900/80 backdrop-blur-md border border-sky-500/20 rounded-full text-[8px] font-bold text-sky-400 uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[9px] text-slate-500 uppercase tracking-widest mb-4 font-bold">
                      <div className="flex items-center gap-1"><Calendar size={10} /> {post.date}</div>
                      <div className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</div>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-sky-400 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs leading-relaxed font-light mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                        Ler Artigo <ChevronRight size={14} className="text-sky-500" />
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-500 transition-all">
                        <ArrowUpRight size={14} className="text-slate-400 group-hover:text-navy-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-20 p-10 glass-panel rounded-[2.5rem] border border-sky-500/10 flex flex-col md:flex-row items-center justify-between gap-8 fade-in">
          <div className="max-w-lg">
            <h4 className="text-xl font-display font-bold text-white mb-2">Assine o Radar Pulini</h4>
            <p className="text-slate-400 text-xs font-light">Receba atualizações jurídicas cruciais para o seu negócio tech diretamente no seu e-mail.</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="bg-navy-950/50 border border-white/10 rounded-xl px-5 py-3 text-xs text-white focus:outline-none focus:border-sky-500 transition-all w-full md:w-64"
            />
            <button className="bg-sky-500 text-navy-900 text-[10px] font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-sky-400 transition-all whitespace-nowrap">
              Inscrever
            </button>
          </div>
        </div>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-xl" onClick={() => setSelectedPost(null)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 bg-navy-900/50">
              <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.3em]">{selectedPost.category}</span>
              <button onClick={() => setSelectedPost(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-6 text-[10px] text-slate-500 uppercase tracking-widest mb-8 font-bold">
                  <div className="flex items-center gap-1.5"><Calendar size={12} className="text-sky-500" /> {selectedPost.date}</div>
                  <div className="flex items-center gap-1.5"><Clock size={12} className="text-sky-500" /> {selectedPost.readTime} de leitura</div>
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 leading-tight">{selectedPost.title}</h1>
                <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12 border border-white/5">
                  <img src={selectedPost.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div 
                  className="prose prose-invert prose-sky max-w-none prose-p:text-slate-400 prose-p:text-base prose-p:leading-relaxed prose-p:font-light prose-headings:text-white prose-headings:font-display prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src="https://i.postimg.cc/Y23xGLCb/profile.jpg" className="w-12 h-12 rounded-full border border-sky-500/20 p-1" alt="" />
                    <div>
                      <p className="text-white font-bold text-sm">Dr. Vitor Pulini</p>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Autor do Artigo</p>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedPost(null); window.location.href = "#contato"; }} className="bg-white text-navy-950 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 transition-all">
                    Dúvidas sobre este tema?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
