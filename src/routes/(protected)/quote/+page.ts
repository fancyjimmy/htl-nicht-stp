// src/routes/profile/+page.ts
import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async ({ parent }) => {
    const { supabase, session } = await parent()
    if (!session) {
        throw redirect(303, '/')
    }
    const { data: quotes } = await supabase.from('quote').select('*, teacher(*)');
    const { data: teachers  } = await supabase.from('teacher').select('*')

    return {
        user: session.user,
        quotes,
        teachers
    }
}