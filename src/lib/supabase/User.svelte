<script lang="ts">
import {user} from "$lib/supabase.js";
</script>

{#if $user}
    <slot user={$user}/>
{:else}
    <slot name="signedOut"/>
{/if}
