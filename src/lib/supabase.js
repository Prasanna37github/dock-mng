import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mbimqsesaqajxbrxqqlm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iaW1xc2VzYXFhanhicnhxcWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3Mjk3NjEsImV4cCI6MjA2ODMwNTc2MX0.2VRL3iSIeatQVhm-OL-uZsexBI7yKWa0wdVJcEL7Eio'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 