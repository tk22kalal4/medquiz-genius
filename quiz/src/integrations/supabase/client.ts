
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://bcxedciqvragvaofsshg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeGVkY2lxdnJhZ3Zhb2Zzc2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTIwODQsImV4cCI6MjA1NDA4ODA4NH0.ShMcbaxtwisxrXor5_zbHkvBMhNx4l_EDJ8iA2_3adU';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
