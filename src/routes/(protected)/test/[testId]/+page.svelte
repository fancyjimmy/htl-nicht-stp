<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
    import {Spinner} from "flowbite-svelte";

	export let data;

	let imageUrls = [];

	onMount(async () => {
		const { data: value, error } = await $supabase.storage.from('test-files').createSignedUrls(
			data.test.file.map((file) => `test-files/${file.filename}`),
			60 * 5
		);

		imageUrls = value;
        loaded = true;
        console.log(imageUrls);
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
			{#each data.test.file as file, index}
				<div
					class="text-sm text-slate-700 uppercase font-semibold"
				>
					<p>
						{file.filename}
					</p>
                    {#if loaded}
					<img src='{imageUrls[index].signedUrl}' alt="test"/>
                    {:else}
                        <Spinner />

                    {/if}
				</div>
			{/each}
		</div>
	</div>
</div>
