// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type {PageLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const prerender = true;


export const load: PageLoad = async ({parent, params}) => {
    const {supabase, session} = await parent()

    /*
    const {data: kanban} = await supabase.from('simple_project_kanban').select('*, simple_kanban_states(*), profile(*)');

    const {data: states} = await supabase.from('simple_kanban_states').select('*');
    return {
        kanban,
        states
    }

     */
}