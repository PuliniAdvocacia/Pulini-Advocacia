
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nbcumtbkzzyrfkmufhzf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gzxAShWFfS4FYYX6_UYpfw_spnOsvhO';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
