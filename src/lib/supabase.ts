import {get, writable} from "svelte/store";
import type {SupabaseClient, Session, User} from "@supabase/supabase-js";


export const user = writable<User | null>();
export const supabase = writable<SupabaseClient>();
export const session = writable<Session>();
export async function register(name: string, email: string, password: string){
    const { data, error } = await get(supabase).auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: "confirm-email",
            data: {name}
        }
    });


    if (error) throw error;

    return data;

}
export async function login(email: string, password: string){
    const { data, error } = await get(supabase).auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    return data;
}

export async function logout(){
    const { error } = await get(supabase).auth.signOut();

    if (error) throw error;
}