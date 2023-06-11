<script lang="ts">
    export let link: string;
    export let value: any;
    export let substitute;
</script>

<a href={link}>
    {#if substitute}
        {substitute}
    {:else}
        {value}
    {/if}
</a>
