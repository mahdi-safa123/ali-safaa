// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'YOUR_PROJECT_URL';  //https://viatktunarcrxoriblao.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'; //sb_publishable_rGzb8PJ0CQ-sMC8xBFGJqg_FaQJpqEN

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
