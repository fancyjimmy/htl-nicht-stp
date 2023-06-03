<script lang="ts">
    import {supabase} from '$lib/supabase';
    import {onMount} from 'svelte';
    import {A, Button, Modal, Spinner, TabItem, Tabs} from 'flowbite-svelte';
    import QuickList from '$lib/components/QuickList.svelte';
    import Icon from '@iconify/svelte';

    export let data;

    async function loadUrl(imageUrl: string) {
        let {data, error} = await $supabase.storage
            .from('test-files')
            .createSignedUrl(`test-files/${imageUrl}`, 60 * 3);
        if (error) {
            console.error(error);
            return {};
        }
        return data;
    }

    async function downloadUrl(url: string) {
        let {data, error} = await $supabase.storage.from('test-files').download(`test-files/${url}`);
        if (error) {
            console.error(error);
        }

        return data;
    }

    function downloadBlob(blob, name = 'file.txt') {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');

        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.download = name;

        // Append link to the body
        document.body.appendChild(link);

        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );

        // Remove link from body
        document.body.removeChild(link);
    }

    let files = [];
    onMount(async () => {
        files = data.test.file;

        files = files.map((file) => {
            if (file.filename.endsWith('.pdf')) {
                return {
                    ...file,
                    type: 'pdf'
                };
            } else if (
                file.filename.endsWith('.png') ||
                file.filename.endsWith('.jpg') ||
                file.filename.endsWith('.jpeg')
            ) {
                return {
                    ...file,
                    type: 'image'
                };
            } else if (file.filename.endsWith('.txt')) {
                return {
                    ...file,
                    type: 'text'
                };
            } else {
                return {
                    ...file,
                    type: 'unknown'
                };
            }
        });

        loaded = true;
    });
    let loaded = false;

    function enumConverter(testType: string) {
        switch (testType) {
            case 'TST':
                return 'Test';
            case 'PRF':
                return 'Prüfung';
            case 'HAU':
                return 'Hausaufgabe';
            case 'WDH':
                return 'Wiederholung';
            default:
                return 'Unbekannt';
        }
    }

    let showImages = false;
</script>

<div class="p-4 flex flex-col gap-3 h-full">
    <div
            class="p-4 justify-between border-2 border-black rounded-xl flex-1"
            style="background-color: #{data.test.subject.color};"
    >
        <div>
            <h1 class="font-extrabold text-3xl uppercase">
                {data.test.count + '.' ?? ''}{data.test.subject.name}
                {enumConverter(data.test.test_type)}
            </h1>

            <p>
                {data.test.grade}{data.test.className}
                {data.test.year}
            </p>
            <p class="text-sm italic text-slate-700 uppercase font-semibold">{data.test.teacher.name}</p>
        </div>

        <div>
            <QuickList
                    items={data.test.file}
                    let:item={file}
                    class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white"
            >
                <div slot="header" class="p-2 flex justify-between bg-slate-200">
                    <p class="font-extrabold uppercase">Browse</p>

                    <button
                            class="text-2xl"
                            on:click={() => {
							showImages = true;
						}}
                    >
                        <Icon icon="mdi:search"/>
                    </button>
                </div>
                <div class="p-2 flex justify-between">
                    <p class="font-extrabold flex gap-2"><span class="text-2xl"><Icon icon="mdi:image"/></span>{file.name}</p>

                    <button
                            class="text-2xl"
                            on:click={() => {
							const blob = downloadUrl(file.filename);
							downloadBlob(blob, file.name);
						}}
                    >
                        <Icon icon="mdi:download"/>
                    </button>
                </div>
            </QuickList>
        </div>
    </div>
    <div>
        <A href="/test">&lt; Zurück</A>
    </div>
</div>

<Modal title="Bilder" bind:open={showImages}>
    {#if loaded}
        <Tabs style="underline" divider={false} contentClass='p-2 bg-gray-50 rounded-lg dark:bg-gray-800'>
            {#each files as file, index}
                <TabItem open title={file.name} defaultClass="max-w-[12rem] truncate inline-block text-sm font-medium text-center disabled:cursor-not-allowed">
                    <div class="text-sm text-slate-700 uppercase font-semibold">
                        <div class="flex-1">
                            {#if file.type === 'image'}
                                {#await downloadUrl(file.filename)}
                                    <Spinner size="sm" color="primary"/>
                                {:then blob}
                                    <div class="flex-1">
                                        <div class="flex justify-between dark:text-white">
                                            <p class="font-extrabold">{file.name}</p>
                                            <button
                                                    class="text-2xl"
                                                    on:click={() => {
											downloadBlob(blob, file.name);
										}}
                                            >
                                                <Icon icon="mdi:download"/>
                                            </button>
                                        </div>
                                        <div class="flex-1 flex items-center justify-center">
                                            <img class="max-w-2xl max-w-2xl rounded border-2 border-black"
                                                 src={URL.createObjectURL(blob)} alt={file.name}/>
                                        </div>
                                    </div>
                                {:catch error}
                                    <p>{error.message}</p>
                                {/await}

                            {:else}
                                <div class="flex justify-between dark:text-white">
                                    <p class="font-extrabold">{file.name}</p>
                                    <button
                                            class="text-2xl"
                                            on:click={async () => {
                                            const blob = await downloadUrl(file.filename);
											downloadBlob(blob, file.name);
										}}
                                    >
                                        <Icon icon="mdi:download"/>
                                    </button>
                                </div>
                            {/if}
                        </div>
                    </div>
                </TabItem>
            {/each}
        </Tabs>
    {/if}
</Modal>
