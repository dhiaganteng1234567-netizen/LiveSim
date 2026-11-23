// ==========================================
// LIVESIM
// SUPABASE CLIENT
// VERSION 0.0.1
// ==========================================


import {

    createClient

} from "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// CONFIGURATION
// ==========================================


const SUPABASE_URL =

"https://lwslyhxyrvquvxhsxdsn.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =

"sb_publishable_aAbCwTTWsnSsKyaZgJgs5Q_6VuG0qAG";


// ==========================================
// AUTH CONFIGURATION
// ==========================================


export const supabase = createClient(

    SUPABASE_URL,

    SUPABASE_PUBLISHABLE_KEY,

    {

        auth: {

            autoRefreshToken: true,

            persistSession: true,

            detectSessionInUrl: true,

            flowType: "pkce"

        }

    }

);


// ==========================================
// PROJECT CONFIG
// ==========================================


export const LiveSimConfig = {

    name: "LiveSim",

    version: "0.0.1",

    authDomain: "accounts.livesim.invalid",

    defaultLanguage: "id",

    defaultTheme: "dark"

};
