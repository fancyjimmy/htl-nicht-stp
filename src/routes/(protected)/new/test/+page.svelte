<script lang="ts">
	import { A } from 'flowbite-svelte';
	import NewTestComponent from './NewTestComponent.svelte';
	import { supabase } from '$lib/supabase';
    import {user} from "$lib/supabase.js";

	export let data;

	async function uploadFile(file: File, id: string): Promise<{ name: string; filename: string }> {
        // TODO move this to backend;
		const filename = `${crypto.randomUUID()}.${getExtension(file.name)}`;

        const { data, error } = await $supabase.storage.from('test-files').upload("test-files", file)
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }


        return {
            name: file.name,
            filename: filename
        }
	}

    function getExtension(filename: string): string {
        return filename.split('.').pop();
    }
</script>

<NewTestComponent
	subjects={data.subjects}
	teachers={data.teachers}
	on:created={async (event) => {
        const test = {
            subjectId: event.detail.subjectId,
            teacherId: event.detail.teacherId,
            grade: event.detail.grade,
            year: event.detail.year,
            className: event.detail.className,
            count: event.detail.count,
            description: event.detail.description,
            test_type: event.detail.testType
        }

        const {data, error} = await $supabase.from("test").insert(test);

        if (error) {
            console.error(error);
            return;
        } else {
            console.log(data);
        }


		for (let i = 0; i < event.detail.files.length; i++) {
			const file = uploadFile(event.detail.files[i], data.id);
            console.log(file);
		}


	}}
/>
<A href="/test">zurück</A>
