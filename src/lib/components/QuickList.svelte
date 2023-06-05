<script lang="ts">
    export let items = [];
</script>


<div class="{$$props.class}">
    <slot name="header"/>
    {#if items.length === 0 }
        <slot name="empty"/>
    {:else}
        {#each items as item, index}
            <slot item={item} index={index}/>
        {/each}
    {/if}
    <slot name="footer"/>
</div>

