// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rgzzdgjlywpdnzhbwvqx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnenpkZ2pseXdwZG56aGJ3dnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2Mzk4NTAsImV4cCI6MjA2MzIxNTg1MH0.R_ujsN-3zGZ7-UETJHOtKK4XS8Ypz4qhupHcN3Mgqjo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);