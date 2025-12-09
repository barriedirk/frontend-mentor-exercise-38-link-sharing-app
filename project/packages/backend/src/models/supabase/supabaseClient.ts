import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

export const supabase: SupabaseClient<Database> = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
);
