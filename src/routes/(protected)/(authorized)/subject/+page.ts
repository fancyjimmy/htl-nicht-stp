// src/routes/profile/+page.ts
import {redirect} from '@sveltejs/kit'
import type {PageLoad} from "./$types";

export const load: PageLoad = async ({parent}) => {
    const {supabase, session} = await parent()
    if (!session) {
        throw redirect(303, '/')
    }
    const {data: subjects} = await supabase.from('subject').select('*')

    return {
        user: session.user,
        subjects,
    }
}