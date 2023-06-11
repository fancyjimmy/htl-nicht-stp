<script lang="ts">
    import {supabase} from '$lib/supabase';
    import {onMount} from 'svelte';
    import {A, Button, Modal, Spinner, TabItem, Tabs} from 'flowbite-svelte';
    import QuickList from '$lib/components/QuickList.svelte';
    import Icon from '@iconify/svelte';
    import {profile} from '$lib/supabase.js';
    import {MINIMUM_ROLE} from '$lib/type.js';

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

    let test;
    $: test = data.test;

    let showImages = false;
</script>

{#if test}
    <div class="p-4 h-full pb-12">
        <div
                class="relative p-4 justify-between border-2 border-black rounded-xl flex-1 flex flex-col md:flex-row gap-3 h-full"
                style="background-color: #{test.subject.color};"
        >
            <div class="flex-1 flex flex-col">
                <h1 class="font-extrabold text-3xl uppercase">
                    {test.count + '.' ?? ''}{test.subject.name}
                    {enumConverter(data.test.test_type)}
                </h1>

                <p class="font-semibold text-lg">
                    {test.grade}{test.className}
                    {test.year}
                </p>

                <p class="text-sm text-slate-700 uppercase text-sm font-extrabold mb-4">
                    LEHRER: {test.teacher.name}
                </p>

                <p class="font-bold text-xl">Beschreibung</p>
                <p class="text-gray-700 p-2">{test.description ?? ''}</p>

                {#if test.profile && MINIMUM_ROLE.KLASSENSPRECHER.includes($profile.role)}
                    <a
                            href="/admin/user/{test.profile?.id}"
                            class="absolute top-[-1rem] right-1 border-2 border-black p-1 rounded-md text-sm hover:brightness-125 duration-200 hover:scale-110 font-bold custom-bg"
                            style:--bgc={test.profile?.color}
                    >{test.profile?.fullname}#{test.profile?.grade <= 0
                        ? 'ABSOLVENT'
                        : `${test.profile.grade}${test.profile.className}`}</a
                    >
                {/if}
            </div>

            <div class="flex-1">
                <div
                        class="relative rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white h-full max-h-96 md:max-h-full"
                >
                    <div class="p-2 flex justify-between sticky top-0 border-b-2 border-black bg-slate-200">
                        <p class="font-extrabold uppercase">Browse Files ({test.file.length})</p>

                        <button
                                class="text-2xl"
                                on:click={() => {
								showImages = true;
							}}
                        >
                            <Icon icon="humbleicons:expand"/>
                        </button>
                    </div>
                    {#if test.file.length === 0}
                        <p class="p-3 font-bold text-gray-600 ">Keine Files</p>
                    {:else}
                        {#each test.file as file}
                            <div class="p-2 flex justify-between first:border-t-0">
                                <p class="font-extrabold flex gap-2">
                                    <span class="text-2xl"><Icon icon="mdi:image"/></span>{file.name}
                                </p>

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
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
        <div class="absolute bottom-4 font-semibold left-4">
            <A href="/test">&lt; Zurück</A>
        </div>
    </div>

    <Modal
            title="Datei"
            defaultClass="rounded-xl relative flex flex-col mx-auto"
            bind:open={showImages}
    >
        {#if loaded}
            <Tabs
                    style="underline"
                    divider={false}
                    contentClass="p-2 bg-gray-50 rounded-lg dark:bg-gray-800"
            >
                {#each files as file, index}
                    <TabItem
                            open
                            title={file.name}
                            defaultClass="max-w-[12rem] truncate inline-block text-sm font-medium text-center disabled:cursor-not-allowed"
                    >
                        <div class="text-sm text-slate-700 uppercase font-semibold">
                            <div class="flex-1">
                                {#if file.type === 'image'}
                                    {#await downloadUrl(file.filename)}
                                        <Spinner size="sm" color="primary"/>
                                    {:then blob}
                                        <div class="flex-1">
                                            <div class="flex justify-between dark:text-white items-center pb-2">
                                                <p class="font-extrabold">{file.name}</p>
                                                <button
                                                        class="text-2xl p-2"
                                                        on:click={() => {
														downloadBlob(blob, file.name);
													}}
                                                >
                                                    <Icon icon="mdi:download"/>
                                                </button>
                                            </div>
                                            <div class="flex-1 flex items-center justify-center">
                                                <img
                                                        class="max-w-2xl max-w-2xl rounded border-2 border-black"
                                                        src={URL.createObjectURL(blob)}
                                                        alt={file.name}
                                                />
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
{:else}
    <p>Test nicht gefunden</p>
{/if}
