<script lang="ts">
    import User from '$lib/supabase/User.svelte';
    import {ROLES} from '$lib/type';
    import {MINIMUM_ROLE} from "$lib/type.js";

    export let data;
</script>

<User let:user let:profile role={MINIMUM_ROLE.ABTEILUNGSSPRECHER}>
    <p>{JSON.stringify(data.profile)}</p>
    <p slot="unauthorized">Not authorized</p>
</User>
