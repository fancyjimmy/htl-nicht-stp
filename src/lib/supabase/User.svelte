<script lang="ts">
    import {user, profile} from '$lib/supabase';
    import type {Role} from '../type';

    export let role: Role[] | null = null;

    export let profileRequired = false;
</script>

{#if $user !== null}
    {#if profileRequired}
        {#if !$profile}
            <slot name="noProfile"/>
        {:else if role === null}
            <slot user={$user} profile={$profile}/>
        {:else if role.includes($profile.role)}
            <slot user={$user} profile={$profile}/>
        {:else}
            <slot name="unauthorized" user={$user} profile={$profile}/>
        {/if}
    {:else}
        {#if role === null}
            <slot user={$user} profile={$profile}/>
        {:else if role.includes($profile.role)}
            <slot user={$user} profile={$profile}/>
        {:else}
            <slot name="unauthorized" user={$user} profile={$profile}/>
        {/if}
    {/if}
{:else}
    <slot name="signedOut"/>
{/if}
