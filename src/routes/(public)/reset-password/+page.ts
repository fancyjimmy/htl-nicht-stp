// src/routes/profile/+page.ts
import type {PageLoad} from './$types'
import {redirect} from '@sveltejs/kit'

export const load: PageLoad = async ({parent, url}) => {
    const parentValue = await parent();
    const supabase = parentValue.supabase;

    const code = url.searchParams.get('code');

    if (code !== null) {
        try {
            const response = await supabase.auth.exchangeCodeForSession(code);

            if (response.error) {
                console.log(response.error);
                throw redirect(303, '/error?message=' + encodeURIComponent(JSON.stringify(response.error)));
            }
            throw redirect(303, '/reset-password?message=success');
        } catch (error) {
            console.log(error);
            throw redirect(303, '/error?message=' + encodeURIComponent(JSON.stringify(error)));
        }

    } else {
        return {};
    }
}