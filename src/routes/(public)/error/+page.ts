// src/routes/profile/+page.ts
import type {PageLoad} from './$types'
import {redirect} from '@sveltejs/kit'

export const load: PageLoad = async ({url}) => {
    const message = url.searchParams.get('message');

    return {
        message
    }
}