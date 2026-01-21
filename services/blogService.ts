
import { supabase } from './supabaseClient';
import { BlogPost } from '../types';

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    return data || [];
  },

  async savePost(post: Partial<BlogPost>): Promise<boolean> {
    const isNew = !post.id;
    const { error } = isNew 
      ? await supabase.from('blog_posts').insert([post])
      : await supabase.from('blog_posts').update(post).eq('id', post.id);

    if (error) {
      console.error('Error saving post:', error);
      return false;
    }
    return true;
  },

  async deletePost(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }
    return true;
  }
};
