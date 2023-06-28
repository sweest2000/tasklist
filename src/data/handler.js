import { createClient } from '@supabase/supabase-js';

export const db = createClient(
  'https://iqtsptfitoeapbmotenf.supabase.co',
  process.env.REACT_APP_SUPABASE_KEY
);

export default db;
