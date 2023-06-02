<script>
    import {A, Heading} from "flowbite-svelte";

    export let data;
</script>

<div class="p-4 flex flex-col gap-3">

    <Heading tag="h2">Test</Heading>

    <div class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-hidden bg-white">
        {#each data.tests as test}
            <div class="p-2 flex justify-between" style="background-color: #{test.subject.color };">
                <div>
                    <p class="font-extrabold uppercase">{test.grade}. {test.subject.name}-Test  {test.year}</p>
                    <p class="text-sm italic text-slate-700 uppercase font-semibold">{test.teacher.name}</p>
                </div>
                <div class="relative w-10 h-10">
                    <span class="absolute top-0.5 left-1.5 font-extrabold z-[10]">{test.file.length}</span>
                    <span class="absolute text-4xl inset-0">📄</span>
                </div>
            </div>
        {/each}
    </div>

    <A href="/new/test">Neuer Test</A>
</div>
