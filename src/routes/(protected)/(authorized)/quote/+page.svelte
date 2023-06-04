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
            <Timeline>
                <QuickList
                        items={quotes}
                        let:item={quote}
                        let:index
                        class="max-w-lg overflow-y-auto overflow-x-hidden scrollbar-hidden "
                >
                    <TimelineItem class="p-2" date={new Date(quote.created_at).toLocaleString()}>
                        <figure>
                            <Blockquote id="quote-{index}">
                                <svg
                                        aria-hidden="true"
                                        class="w-10 h-10 text-gray-400 dark:text-gray-600"
                                        viewBox="0 0 24 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                            fill="currentColor"
                                    />
                                </svg>
                                {quote.quote}
                            </Blockquote>

                            {#if quote.context}
                                <Tooltip triggeredBy="#quote-{index}" placement="bottom">
                                    {quote.context}
                                </Tooltip>
                            {/if}

                            <figcaption class="flex items-center mt-2 space-x-3">
                                <div class="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                                    <cite class="pr-3 font-medium text-gray-900 dark:text-white"
                                    >-{quote.teacher.name}</cite
                                    >
                                    {#if quote.profile !== null}
                                        <p>
                                            {quote.profile.fullname}
                                            {quote.profile.color}
                                            {quote.profile.icon}
                                        </p>
                                    {/if}
                                </div>
                            </figcaption>
                        </figure>
                    </TimelineItem>
                </QuickList>
            </Timeline>
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
