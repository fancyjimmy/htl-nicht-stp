<script lang="ts">
    import {Blockquote, Button, Tooltip} from 'flowbite-svelte';
    import {goto, invalidateAll} from '$app/navigation';
    import Icon from '@iconify/svelte';
    import {supabase} from '$lib/supabase';

    export let data;
    $: quote = data.quote;
</script>

{#if quote}
    <div class="p-3 extruded bg-white border-2 border-black m-2 relative pt-4">
        <svg
                aria-hidden="true"
                class="w-10 h-10 text-black left-3 dark:text-gray-600 absolute top-[-1rem]"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
        >
            <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
            />
        </svg>
        <blockquote class="text-lg">
            {quote.quote}
        </blockquote>
        {#if quote.context}
            <div class="absolute bottom-2 left-2 text-xl text-gray-500 w-min">
                <Icon icon="mdi:information"/>
            </div>
            <Tooltip>
				<span>
					{quote.context}
				</span>
            </Tooltip>
        {/if}

        <p class="text-right">
            <a href="/teacher/{quote.teacher.id}" class="text-sm font-bold">
                - {quote.teacher.name} | {new Date(quote.created_at).toLocaleDateString()}
            </a>
        </p>
        {#if quote.profile}
            <a
                    href="/admin/user/{quote.profile?.id}"
                    class="absolute top-[-1rem] right-1 border-2 border-black p-1 rounded-md text-sm hover:brightness-125 duration-200 hover:scale-110 font-bold custom-bg"
                    style:--bgc={quote.profile?.color}
            >{quote.profile?.fullname}#{quote.profile?.grade <= 0
                ? 'ABSOLVENT'
                : `${quote.profile?.grade}${quote.profile?.className}`}</a
            >
        {/if}
    </div>

    <Button
            on:click={async () => {
			const result = await $supabase.from('quote').delete().eq('id', quote.id);
            console.log(result);
			if (result.error) {
				alert(result.error.message);
				return;
			}
			history.back();

		}}>Löschen
    </Button
    >
{:else}
    <p>Zitat nicht gefunden.</p>
{/if}
