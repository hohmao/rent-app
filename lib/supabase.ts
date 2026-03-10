import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://tontbolszlmgwlslinma.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvbnRib2xzemxtZ3dsc2xpbm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMTY4MTAsImV4cCI6MjA4ODY5MjgxMH0.H0bugub9mLDLJ9X1y7rfeXTF4LkF2h2XXuufKM__L6o"

export const supabase = createClient(supabaseUrl, supabaseKey)