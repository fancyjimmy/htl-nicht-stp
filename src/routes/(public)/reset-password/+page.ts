// src/routes/profile/+page.ts
import type {PageLoad} from './$types'
import {redirect} from '@sveltejs/kit'

export const load: PageLoad = async ({parent, url}) => {
    const parentValue = await parent();
    const supabase = parentValue.supabase;
    let session = parentValue.session;

    const code = url.searchParams.get('code');

    if (code) {
        const response = await supabase.auth.exchangeCodeForSession(code);

        if (response.error) {
            console.log(response.error);
            redirect(303, '/error?message=invalid-password-reset-link')
        }

        session = response.data.session;
    }

    return {
        session
    }
}