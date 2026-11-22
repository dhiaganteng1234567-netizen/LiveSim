// ==========================================
// LIVESIM
// SUPABASE CONNECTION
// VERSION 0.0.1
// ==========================================


import {
    createClient
} from "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// PROJECT CONFIGURATION
// ==========================================


const SUPABASE_URL =

"https://lwslyhxyrvquvxhsxdsn.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =

"sb_publishable_aAbCwTTWsnSsKyaZgJgs5Q_6VuG0qAG";


// ==========================================
// INITIALIZE CLIENT
// ==========================================


export const supabase = createClient(

    SUPABASE_URL,

    SUPABASE_PUBLISHABLE_KEY,

    {

        auth: {

            autoRefreshToken: true,

            persistSession: true,

            detectSessionInUrl: true

        }

    }

);


// ==========================================
// EXPORT CONFIGURATION
// ==========================================


export const LiveSimConfig = {

    name: "LiveSim",

    version: "0.0.1",

    language: "id"

};
