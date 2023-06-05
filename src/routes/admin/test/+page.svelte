<script>
    import Table from "$lib/components/Table.svelte";

    export let data;
    $: tests = data.tests;
</script>

<Table values={[...tests]} attributes={Object.keys(tests[0])} linking={true} link="/admin/test/%ID%"></Table>