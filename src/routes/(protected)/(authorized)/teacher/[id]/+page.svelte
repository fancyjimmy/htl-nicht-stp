<script lang="ts">
    import QuoteList from '$lib/components/QuoteList.svelte';
    import QuickList from "$lib/components/QuickList.svelte";

    export let data;

    $: teacher = data.teacher;
</script>

{#if !teacher}
    <p>Lehrer nicht gefunden</p>
{:else}
    <div class="w-full h-full grid-cols-2 grid grid-rows-2 p-6 gap-3">
        <div>
            <p>{teacher.name}</p>
            <p>{teacher.abbreviation}</p>
        </div>


        <div class="row-span-2 overflow-y-auto scrollbar-hidden">
            <h3 class="text-xl font-bold">Zitate</h3>
            <QuoteList quotes={teacher.quote} showTeacher={false}/>
        </div>
        <div class="overflow-y-auto scrollbar-hidden">
            <QuickList items={teacher.test} let:item={test}
                       class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white">
                <a href="/test/{test?.id}" class="p-2 flex justify-between"
                   style="background-color: #{test.subject?.color };">
                    <div>
                        <p class="font-extrabold uppercase">{test.grade}. {test.subject?.name}-Test {test.year}</p>
                    </div>
                    <div class="relative w-10 h-10">
                        <span class="absolute text-4xl inset-0">📄</span>
                    </div>
                </a>
            </QuickList>
        </div>
    </div>
{/if}
