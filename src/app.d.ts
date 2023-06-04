// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {Profile} from "./lib/type";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            supabase: import('@supabase/supabase-js').SupabaseClient,
            getSession: () => Promise<import('@supabase/supabase-js').Session | null>,
        }

        // interface PageData {}
        // interface Platform {}
	}
}

export {};
