// src/routes/profile/+page.ts
import type {PageLoad} from './$types'
import {redirect} from '@sveltejs/kit'

export const load: PageLoad = async ({parent, params}) => {
    const {supabase, session} = await parent()
    if (!session) {
        throw redirect(303, '/')
    }
    const {data: profile} = await supabase.from('profile').select('*, test(*), quote(*)').eq('id', params.id).single();

    return {
        profile,
    }
}