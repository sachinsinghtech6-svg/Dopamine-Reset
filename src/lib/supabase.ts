import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nfzhohkdpahytrrhvufp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'your-supabase-publishable-or-anon-key-here'
);

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
} else {
  console.info(
    '[Dopamine Reset] Supabase client initialized in pending configuration mode. Set VITE_SUPABASE_ANON_KEY in .env to connect to live Supabase backend.'
  );
}

export const supabase = clientInstance;
export { supabaseUrl };
