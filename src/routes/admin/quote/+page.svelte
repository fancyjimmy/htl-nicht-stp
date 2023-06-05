<script>
    import Table from "$lib/components/Table.svelte";

    export let data;
    $: quotes = data.quotes;
</script>

<Table values={[...quotes]} attributes={Object.keys(quotes[0])}></Table>