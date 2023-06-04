<script lang="ts">
    import User from '$lib/supabase/User.svelte';
    import {MINIMUM_ROLE} from '$lib/type.js';
    import CreateProfileFirstScreen from '$lib/components/CreateProfileFirstScreen.svelte';
    import ProfileDisabledScreen from "$lib/components/ProfileDisabledScreen.svelte";

    export let role = MINIMUM_ROLE.USER;
</script>

<User let:user let:profile {role} profileRequired>
    <slot name="noProfile" slot="noProfile" {profile} {user}/>

    <svelte:fragment>
        {#if !profile.enabled}
            <slot name="disabled" {profile} {user}>
                <ProfileDisabledScreen/>
            </slot>
        {:else}
            <slot {profile} {user}/>
        {/if}
    </svelte:fragment>

    <slot name="unauthorized" slot="unauthorized" {profile} {user}>
        <CreateProfileFirstScreen/>
    </slot>
    <slot name="signedOut" slot="signedOut" {profile} {user}/>
</User>
