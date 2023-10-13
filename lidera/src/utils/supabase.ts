import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxjvodkxuoojeltttgkx.supabase.co'

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4anZvZGt4dW9vamVsdHR0Z2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxNzIwNjQsImV4cCI6MjAxMjc0ODA2NH0.4htyBLVILQUo9yG2JO5lRUHM2Kyb8Jb7JVmw1le1vIk"

export const supabase = createClient(supabaseUrl, supabaseKey)

