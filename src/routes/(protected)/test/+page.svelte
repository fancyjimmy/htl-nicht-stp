<script>
    import {A, Heading} from "flowbite-svelte";
    import QuickList from "$lib/components/QuickList.svelte";

    export let data;
</script>

<div class="p-4 w-full flex flex-col gap-3 h-full">

    <Heading tag="h2">Test</Heading>

    <QuickList items={data.tests} let:item={test} class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white">
        <a href="/test/{test.id}" class="p-2 flex justify-between" style="background-color: #{test.subject.color };">
            <div>
                <p class="font-extrabold uppercase">{test.grade}. {test.subject.name}-Test  {test.year}</p>
                <p class="text-sm italic text-slate-700 uppercase font-semibold">{test.teacher.name}</p>
            </div>
            <div class="relative w-10 h-10">
                <span class="absolute text-4xl inset-0">📄</span>
                <span class="absolute top-0.5 left-1.5 font-extrabold">{test.file.length}</span>
            </div>
        </a>
    </QuickList>
    <A href="/new/test">Neuer Test</A>
</div>
