// src/routes/+layout.ts
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from '$env/static/public'
import {createSupabaseLoadClient} from '@supabase/auth-helpers-sveltekit'
import type {LayoutLoad} from './$types'
import type {Profile} from "../lib/type";
import type {SupabaseClient} from "@supabase/supabase-js";

//import type { Database } from '../DatabaseDefinitions'

const getProfile = async (supabase: SupabaseClient, userId: string) => {
    const {data: profile, error} = await supabase.from("profile").select("*").eq("id", userId).single()
    if (error) {
        //console.error(error);
        return null;
    }

    return profile as Profile;
}

export const load: LayoutLoad = async ({fetch, data, depends}) => {
    depends('supabase:auth')

    //
    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: {fetch},
        serverSession: data.session,
    })

    const {
        data: {session},
    } = await supabase.auth.getSession();

    const profile = session ? await getProfile(supabase, session?.user?.id) : null;

    return {supabase, session, profile};
}