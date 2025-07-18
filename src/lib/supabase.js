import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://mvwgklqgyzeycbvimmtm.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12d2drbHFneXpleWNidmltbXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzAxMDAsImV4cCI6MjA2ODMwNjEwMH0.QlLQ25LdESxCR4hNVfs2GaRjrZTF1Mu6Q9ixf1ULoaA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 