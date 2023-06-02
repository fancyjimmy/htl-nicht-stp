<script lang="ts">
    import NewDialog from '../NewDialog.svelte';
    import Icon from '@iconify/svelte';
    import {Heading, Input, Label, Listgroup, P, Textarea} from 'flowbite-svelte';
    import {supabase} from '$lib/supabase';
    import {onMount} from 'svelte';
    import {invalidateAll} from "$app/navigation";
    import QuickList from "$lib/components/QuickList.svelte";
    import {user} from "$lib/supabase.js";

    let form = {
        color: '#13096e'
    };

    export let data;
</script>

<div class="p-4 w-full flex flex-col gap-3 h-full">
    <Heading tag="h2">Fächer</Heading>

    <QuickList items={data.subjects} let:item={subject}
               class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white">
        <div class="p-2" style="background-color: #{subject.color};">
            <p class="font-extrabold">{subject.name}</p>
            <p class="text-sm font-semibold">{subject.description}</p>
        </div>
    </QuickList>

    {#if $user.email === "j.fan@htlstp.at"}

        <NewDialog
                title="Neues Fach Erstellen"
                {form}
                on:create={async (event) => {
			const { color, description, name } = event.detail;

			const { data, error } = await $supabase
				.from('subject')
				.insert([{ color: color.substring(1), description, name}]);
            await invalidateAll();
		}}
        >
            <p slot="button" class="flex">
                <span>Neues Fach Erstellen</span> <span class="text-xl"><Icon icon="mdi:add"/></span>
            </p>
            <div slot="form">
                <div class="mb-2">
                    <Label class="block mb-2">Name</Label>
                    <Input type="text" placeholder="Name" required bind:value={form.name}>
                        <div slot="left" class="text-xl">
                            <Icon icon="mdi:user"/>
                        </div>
                    </Input>
                </div>

                <div class="mb-2">
                    <Label class="block mb-2">Beschreibung</Label>
                    <Textarea placeholder="Beschreibung" required bind:value={form.description} rows="4"/>
                </div>
                <div class="mb-2">
                    <Label class="block mb-2">Farbe</Label>
                    <Input type="color" placeholder="Farbe" class="h-12" required bind:value={form.color}>
                        <div slot="left" class="text-xl">
                            <Icon icon="mdi:color"/>
                        </div>
                    </Input>
                </div>
            </div>
        </NewDialog>
    {/if}
</div>
