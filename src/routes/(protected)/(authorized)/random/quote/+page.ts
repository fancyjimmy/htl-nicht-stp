// src/routes/profile/+page.ts
import type {PageLoad} from './$types'
import {redirect} from '@sveltejs/kit'

export const load: PageLoad = async ({parent}) => {
    const {supabase, session} = await parent()
    if (!session) {
        throw redirect(303, '/')
    }
    const {data: quote} = await supabase.from('random_quote').select('*, teacher(*)').limit(1).single();


    return {
        user: session.user,
        quote
    }
}