<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
    import {Spinner} from "flowbite-svelte";

	export let data;


    async function loadUrl(imageUrl: string){
        let {data, error} = await $supabase.storage.from("test-files").createSignedUrl(`test-files/${imageUrl}`, 60 * 3);
        if (error) {
            console.error(error);
            return {};
        }
        return data;
    }


    let files = [];
	onMount(async () => {

        files = data.test.file;

        files = files.map((file) => {

            if (file.filename.endsWith(".pdf")) {
                return {
                    ...file,
                    type: "pdf"
                }
            } else if (file.filename.endsWith(".png") || file.filename.endsWith(".jpg") || file.filename.endsWith(".jpeg")) {
                return {
                    ...file,
                    type: "image",
                    image: loadUrl(file.filename)
                }
            } else {
                return {
                    ...file,
                    type: "unknown"
                }
            }
        });




        loaded = true;
	});
    let loaded = false;
</script>

<div class="p-4 flex flex-col gap-3">
	<div class="p-2 justify-between" style="background-color: #{data.test.subject.color};">
		<div>
			<p class="font-extrabold uppercase">
				{data.test.grade}. {data.test.subject.name}-Test {data.test.year}
			</p>
			<p class="text-sm italic text-slate-700 uppercase font-semibold">{data.test.teacher.name}</p>
		</div>

		<div>
            {#if loaded}
                {#each files as file, index}
                    <div
                            class="text-sm text-slate-700 uppercase font-semibold"
                    >
                        <p>
                            {file.name}
                            {file.filename}
                        </p>
                        {#if file.type === "image"}
                            {#await file.image}
                                <Spinner size="sm" color="primary" />
                            {:then response}
                                <img src={response.signedUrl} alt={file.name} />
                            {:catch error}
                                <p>error</p>
                            {/await}
                        {/if}
                    </div>
                {/each}
            {/if}
		</div>
	</div>
</div>
