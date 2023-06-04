<script lang="ts">
    import NewDialog from '../NewDialog.svelte';
    import Icon from '@iconify/svelte';
    import {
        Blockquote,
        Button,
        Checkbox,
        Heading,
        Input,
        Label,
        Listgroup,
        P,
        Select,
        Textarea,
        Timeline,
        TimelineItem,
        Tooltip
    } from 'flowbite-svelte';
    import {supabase} from '$lib/supabase';
    import {onMount} from 'svelte';
    import {invalidateAll} from '$app/navigation';
    import QuickList from '$lib/components/QuickList.svelte';
    import {user} from '$lib/supabase.js';
    import QuoteList from "$lib/components/QuoteList.svelte";

    let form = {
        color: '#13096e'
    };

    export let data;

    $: quotes = data.quotes.sort((quote1, quote2) => {
        return new Date(quote2.created_at).getTime() - new Date(quote1.created_at).getTime();
    });
    let context = false;
</script>

<div class="p-4 w-full flex flex-col gap-3 h-full">
    <div class="flex justify-between">
        <Heading tag="h2">Zitate 😱</Heading>
        <Button href="/random/quote">Zufällig</Button>
    </div>

    <div class="flex-1 relative">
        <div class="absolute inset-0 overflow-y-auto scrollbar-hidden p-3">
            <QuoteList quotes={quotes}/>
        </div>
    </div>

    <NewDialog
            title="Neues Zitat Erstellen"
            {form}
            on:create={async (event) => {
			const { quote, context, teacherId } = event.detail;

			const { data, error } = await $supabase
				.from('quote')
				.insert({ quote, context, teacherId, creatorId: $user.id });

			if (error) {
				console.error(error);
			}
			await invalidateAll();
		}}
    >
        <p slot="button" class="flex">
            <span>Neues Zitat Erstellen</span> <span class="text-xl"><Icon icon="mdi:add"/></span>
        </p>
        <div slot="form">
            <div class="mb-2">
                <Label class="block mb-2">Zitat</Label>
                <Textarea placeholder="Zitat" required bind:value={form.quote} rows="3"/>
            </div>

            {#if context}
                <div class="mb-2">
                    <Label class="block mb-2">Context</Label>
                    <Textarea placeholder="Context" bind:value={form.context} rows="6"/>
                </div>
            {/if}
            <div class="mb-2">
                <Label class="block mb-2">Lehrer</Label>
                <Select
                        items={data.teachers.map((value) => {
						return { value: value.id, name: value.name };
					})}
                        bind:value={form.teacherId}
                        placeholder="Lehrer"
                />
            </div>
            <Checkbox class="mb-2" bind:checked={context}>Context Gebraucht?</Checkbox>
        </div>
    </NewDialog>
</div>
