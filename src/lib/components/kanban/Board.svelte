<script lang="ts">
    import Column from "$lib/components/kanban/Column.svelte";

    export let columns;
</script>


<div class="grid custom-cols" style:--cols={columns.length}>
    {#each columns as column}
        <Column {column} editable={column.editable} insertable={column.insertable}/>
    {/each}
</div>

<style>
    .custom-cols {
        --cols: 1;
        grid-template-columns: repeat(var(--cols), 1fr);
    }
</style>


