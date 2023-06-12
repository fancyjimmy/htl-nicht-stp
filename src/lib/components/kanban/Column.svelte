<script lang="ts">
    export let column;
    export let editable;
    export let insertable = false;
</script>

<div class="flex flex-col bg-gray-200 p-2">
    <p class="text-sm font-bold ">{column.name}</p>
    {#each column.cards as entry}
        <div class="w-full bg-red-200">
            <p>
                {entry.todo}
            </p>
            <p>
                {entry.description}
            </p>
            {#if editable}
                <button on:click={() => {console.log("hi")}}>Delete</button>
            {/if}
        </div>

    {/each}

    {#if insertable}
        <button>Insert</button>
    {/if}
</div>
