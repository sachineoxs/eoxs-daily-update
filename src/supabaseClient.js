import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zkmkzhpgjmesnknvwdmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprbWt6aHBnam1lc25rbnZ3ZG1jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDA3ODU0OCwiZXhwIjoyMDY1NjU0NTQ4fQ.QsEDE7R-F52jBqZepOuuxq1ERCzbUhGbt0JR9WMt_N0'
export const supabase = createClient(supabaseUrl, supabaseKey); 