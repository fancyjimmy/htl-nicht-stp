// src/routes/profile/+page.ts
import type {PageLoad} from './$types';
import {redirect} from '@sveltejs/kit';

export const load: PageLoad = async ({parent, params}) => {
    const {supabase, session} = await parent();
    if (!session) {
        throw redirect(303, '/');
    }
    const {data: profile, error} = await supabase
        .from('profile_user_view')
        .select('*, test(*, subject(*), teacher(*)), quote(*, teacher(*))')
        .eq('id', params.id)
        .single();

    if (error) {
        console.error(error);
    }
    return {
        profile
    };
};
