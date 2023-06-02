<script lang="ts">
    import NewDialog from '../NewDialog.svelte';
    import Icon from '@iconify/svelte';
    import {Heading, Input, Label, Listgroup, P, Textarea} from 'flowbite-svelte';
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import {invalidateAll} from "$app/navigation";

    let form = {
    };

    export let data;
</script>

<div class="p-4 flex flex-col gap-3">
    <Heading tag="h2">Lehrer</Heading>
    <div class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-hidden bg-white">
        {#each data.teachers as teacher}
            <div class="p-2">
                <p class="font-extrabold">{teacher.name}</p>
                <p class="text-sm italic text-slate-700 uppercase font-semibold">{teacher.abbreviation ?? "Keine Abkürzung"}</p>
            </div>
        {/each}
    </div>

    <NewDialog
            title="Lehrer Einfügen"
            {form}
            on:create={async (event) => {
			const {  abbreviation, name } = event.detail;

			const { data, error } = await $supabase
				.from('teacher')
				.insert([{name, abbreviation}]);
            invalidateAll();
		}}
    >
        <p slot="button" class="flex">
            <span>Lehrer Einfügen</span> <span class="text-xl"><Icon icon="mdi:add" /></span>
        </p>
        <div slot="form">
            <div class="mb-2">
                <Label class="block mb-2">Name</Label>
                <Input type="text" placeholder="Name" required bind:value={form.name}>
                    <div slot="left" class="text-xl">
                        <Icon icon="mdi:user" />
                    </div>
                </Input>
            </div>

            <div class="mb-2">
                <Label class="block mb-2">Abkürzung</Label>
                <Input placeholder="Abkürzung" required bind:value={form.abbreviation} rows="4" />
            </div>
        </div>
    </NewDialog>
</div>
