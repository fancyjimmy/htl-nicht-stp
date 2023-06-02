// src/routes/profile/+page.ts
import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async ({ parent }) => {
    const { supabase, session } = await parent()
    if (!session) {
        throw redirect(303, '/')
    }
    const { data: tests, error  } = await supabase.from('test').select('*, file(id), teacher(name), subject(color, name)')
    console.log(error);

    return {
        user: session.user,
        tests,
    }
}