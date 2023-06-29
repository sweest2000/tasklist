import { createClient } from '@supabase/supabase-js';

const { REACT_APP_SUPABASE_KEY } = process.env;

export const db = createClient(
  'https://iqtsptfitoeapbmotenf.supabase.co',
  REACT_APP_SUPABASE_KEY
);

export default db;
