import { createClient } from '@supabase/supabase-js'
import {env} from "$env/dynamic/public";
import {writable} from "svelte/store";

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)

export const user = writable();
supabase.auth.onAuthStateChange((event, session) => {
    user.set(session?.user ?? null);
});
export async function register(name: string, email: string, password: string){
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) throw error;

    await supabase.auth.updateUser({data: {name}});
    return data;

}
export async function login(email: string, password: string){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    return data;
}