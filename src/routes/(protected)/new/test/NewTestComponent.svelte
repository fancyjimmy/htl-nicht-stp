<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {
        Button,
        Dropzone, Heading,
        Label,
        Listgroup,
        ListgroupItem,
        Select,
        Textarea
    } from 'flowbite-svelte';

    const dispatch = createEventDispatcher();

    function range(from: number, to: number, step = 1) {
        let arr = [];
        for (let i = from; i <= to; i += step) {
            arr.push(i);
        }
        return arr;
    }

    export let form = {files: [], testType: "TST", year: new Date().getFullYear()};

    export let teachers = [];
    export let subjects = [];


    const testType = [
        {name: "Test", value: "TST"},
        {name: "Hausübung", value: "HAU"},
        {name: "Wiederholung", value: "WDH"},
        {name: "Prüfung", value: "PRF"},
    ]

    let disabled = false;
</script>

<form on:submit|preventDefault={() => {dispatch("created", {...form}); disabled = true;}} class="p-6 w-full h-full">
    <div class="flex flex-1 flex-col md:flex-row gap-2 md:gap-6 w-full h-full mb-3 items-center">
        <div class="flex flex-col gap-2 max-w-xl w-full mb-3">
            <Heading tag="h2" class="mb-3">Neuer Test</Heading>

            <div>
                <Label class="block mb-2">Jahr</Label>
                <Select
                        items={range(2017, new Date().getFullYear()).map((value) => {
				return { value, name: value };
			})}
                        bind:value={form.year}
                        placeholder="Jahr"
                />
            </div>
            <div>
                <Label class="block mb-2">Wievielter Test?</Label>
                <Select
                        items={range(1, 10).map((value) => {
				return { value, name: value };
			})}
                        bind:value={form.count}
                        placeholder="#"
                />
            </div>
            <div>
                <Label class="block mb-2">Art</Label>
                <Select
                        items={testType}
                        bind:value={form.testType}
                        placeholder="Art"
                />
            </div>

            <div class="flex gap-3">
                <div class="flex-1">
                    <Label class="block mb-2">Lehrer</Label>
                    <Select
                            items={teachers.map((value) => {
					return { value: value.id, name: value.name };
				})}
                            bind:value={form.teacherId}
                            required
                            placeholder="Lehrer"
                    />
                </div>
                <div class="flex-1">
                    <Label class="block mb-2">Fach</Label>
                    <Select
                            items={subjects.map((value) => {
					return { value: value.id, name: value.name };
				})}
                            bind:value={form.subjectId}
                            required
                            placeholder="Fach"
                    />
                </div>
            </div>
            <div>
                <Label class="block mb-2">Klasse</Label>
                <div
                        class="flex rounded-lg border border-gray-200 border overflow-hidden divide-x divide-gray-200 dark:divide-gray-600 dark:border-gray-600"
                >
                    <Select
                            class="rounded-none border-0 focus:ring-0 focus:bg-gray-100"
                            items={range(1, 5).map((value) => {
					return { value, name: value };
				})}
                            bind:value={form.grade}
                            required
                            placeholder="Wähle eine Klasse"
                    />
                    <div class="w-24">
                        <Select
                                class="rounded-none border-0 focus:ring-0 focus:bg-gray-100"
                                required
                                items={['CHIF', 'BHIF', 'AHIF'].map((value) => {
						return { value, name: value };
					})}
                                placeholder="XHIF"
                                bind:value={form.className}
                        />
                    </div>
                </div>
            </div>

            <div>
                <Label class="block mb-2">Beschreibung</Label>
                <Textarea
                        type="text"
                        placeholder="Beschreibng"
                        bind:value={form.description}
                        rows="5"
                />
            </div>
        </div>


        <div class="flex flex-col gap-3 flex-1 w-full">
            <div class="flex-1">
                <Label class="block text-xl font-semibold mb-3">Dateien</Label>
                <Dropzone id="dropzone" multiple bind:files={form.files} accept=".png, .jpg, .jpeg, .pdf, .txt"
                          class="p-4 w-full">
                    <svg
                            aria-hidden="true"
                            class="mb-3 w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Klick zum Uploaden</span>
                        oder Drag and Drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">.png, .jpg, .pdf, .txt</p>
                </Dropzone>
            </div>

            <div class="flex-1 max-h-64 overflow-y-auto scrollbar-hidden">
                <Listgroup items={form.files} let:item>
                    {#if item}
                        {item.name}
                    {:else}
                        <ListgroupItem>Keine Files</ListgroupItem>
                    {/if}
                </Listgroup>
            </div>
        </div>
    </div>
    {#if disabled}
        <Button disabled type="submit">Erstellen</Button>
    {:else}
        <Button type="submit">Erstellen</Button>
    {/if}

</form>

<style>

</style>
