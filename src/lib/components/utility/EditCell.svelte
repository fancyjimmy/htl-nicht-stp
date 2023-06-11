<script lang="ts">
    import {Select} from "flowbite-svelte";

    export const type: 'string' | 'boolean' | 'select';
    export const options: undefined | { name: string, value: string }[];
    export let value: string;

    export let update: (value: string | string) => Promise<void>;
</script>

{#if type === "boolean"}
    <input type="checkbox" bind:checked={value} on:input={update}>
{:else if type === "select"}
    <Select items={options} bind:value on:change={update}/>
{:else}
    <input type="text" bind:value on:input={update}>
{/if}

