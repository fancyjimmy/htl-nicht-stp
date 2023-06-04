<script lang="ts">
    import {user, profile} from '$lib/supabase';
    import type {Role} from '../type';

    export let roles: Role[] | null = null;
</script>

{#if $user}
    {#if roles === null}
        <slot user={$user} profile={$profile}/>
    {:else if roles.includes($profile.role)}
        <slot user={$user} profile={$profile}/>
    {:else}
        <slot name="unauthorized" user={$user} profile={$profile}/>
    {/if}
{:else}
    <slot name="signedOut"/>
{/if}
