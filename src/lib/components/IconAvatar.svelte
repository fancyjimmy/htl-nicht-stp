<script lang="ts">
    import {Avatar} from "flowbite-svelte";
    import {getSrc} from "$lib/utils";


    export let loggedIn = false;

    export let initial = "☠️";
    export let icon: string;
    export let border = false;

    export let size = "md";


</script>

{#if loggedIn}
    {#if icon}
        <Avatar {size} src={getSrc((icon))} {border}></Avatar>
    {:else}
        <Avatar {size} {border}><span class="uppercase">{initial}</span></Avatar>
    {/if}
{:else}
    <Avatar {size} {border}/>
{/if}