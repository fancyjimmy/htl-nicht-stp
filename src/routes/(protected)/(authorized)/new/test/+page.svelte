<script lang="ts">
    import {A, P, Spinner} from 'flowbite-svelte';
    import NewTestComponent from './NewTestComponent.svelte';
    import {supabase} from '$lib/supabase';
    import {user} from '$lib/supabase.js';
    import {goto} from '$app/navigation';

    export let data;

    async function uploadFile(file: File, id: string) {
        // TODO move this to backend;
        const filename = `${crypto.randomUUID()}.${getExtension(file.name)}`;

        const {data, error} = await $supabase.storage
            .from('test-files')
            .upload(`test-files/${filename}`, file);
        if (error) {
            console.error(error);
            return;
        } else {
            console.log(data);
        }

        const {data: test, error: insertError} = await $supabase
            .from('file')
            .insert({
                name: file.name,
                filename: filename,
                testId: id
            })
            .select();
    }

    function getExtension(filename: string): string {
        return filename.split('.').pop();
    }

    let uploading = false;
</script>

{#if uploading}
    <div class="h-full w-full flex items-center justify-center">
        <div class="flex items-center justify-center flex-col">
            <P class="font-semibold text-lg">Uploading</P>
            <Spinner size="xl"/>
        </div>
    </div>
{:else}
    <div class="">
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
					creatorId: $user.id,
					count: event.detail.count === '' ? undefined : event.detail.count,
					description: event.detail.description,
					test_type: event.detail.testType
				};

				uploading = true;
				const response = await $supabase.from('test').insert(test).select();

				if (response.error) {
					console.error(response.error);
					return;
				} else {
					console.log(response.data);
				}

				for (let i = 0; i < event.detail.files.length; i++) {
					const file = await uploadFile(event.detail.files[i], response.data[0].id);
				}
				await goto(`/test/${response.data[0].id}`);
			}}
        />
        <A href="/test">zurück</A>
    </div>
{/if}
