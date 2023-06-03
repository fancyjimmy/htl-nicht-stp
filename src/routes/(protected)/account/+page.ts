import type {PageLoad} from './$types'
import {redirect} from '@sveltejs/kit'

export const load: PageLoad = async ({parent}) => {
    const {supabase, session} = await parent()
    if (!session) {
        throw redirect(303, '/')
    }
    const {data: profile} = await supabase.from('profile').select('*').eq('id', session.user.id).single();
    return {
        user: session.user,
        profile,
    }
}