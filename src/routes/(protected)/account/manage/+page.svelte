<script lang="ts">
    import User from '$lib/supabase/User.svelte';
    import {ROLES} from '$lib/type';

    export let data;
</script>

<User let:user let:profile roles={[ROLES.ABTEILUNGSSPRECHER]}>
    <p>{JSON.stringify(data.profile)}</p>
    <p slot="unauthorized">Not authorized</p>
</User>
