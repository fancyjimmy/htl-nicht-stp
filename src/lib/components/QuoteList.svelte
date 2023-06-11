<script lang="ts">
    import {Blockquote, Timeline, TimelineItem, Tooltip} from 'flowbite-svelte';
    import QuickList from '$lib/components/QuickList.svelte';
    import {MINIMUM_ROLE} from '$lib/type.js';
    import {profile} from '$lib/supabase.js';
    import Icon from '@iconify/svelte';

    export let quotes;

    export let showTeacher = true;

    $: sortedQuotes = quotes.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
</script>

<QuickList
        items={sortedQuotes}
        let:item={quote}
        let:index
        class="overflow-y-auto overflow-x-hidden scrollbar-hidden flex flex-col gap-3 py-3"
>
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
            <div
                    class:absolute={showTeacher}
                    class:ml-auto={!showTeacher}
                    class="bottom-2 left-2 text-xl text-gray-500 w-min"
            >
                <Icon icon="mdi:information"/>
            </div>
            <Tooltip>
				<span>
					{quote.context}
				</span>
            </Tooltip>
        {/if}

        <p class="text-right text-sm font-bold">
            {#if showTeacher}
                <a href="/teacher/{quote.teacher.id}">
                    - {quote.teacher.name} | {new Date(quote.created_at).toLocaleDateString()}
                </a>
            {:else}
                {new Date(quote.created_at).toLocaleDateString()}
            {/if}
        </p>

        {#if MINIMUM_ROLE.KLASSENSPRECHER.includes($profile.role) && quote.profile}
            <div class="absolute top-[-1rem] right-3">
                <a
                        href="/admin/user/{quote.profile?.id}"
                        class="border-2 border-black p-1 rounded-md text-sm  hover:brightness-125 duration-200 hover:scale-110 font-bold custom-bg"
                        style:--bgc={quote.profile?.color}
                >{quote.profile?.fullname}#{quote.profile?.grade <= 0
                    ? 'ABSOLVENT'
                    : `${quote.profile.grade}${quote.profile.className}`}</a
                >

                <a href="/admin/quote/{quote.id}"
                   class="border-2 text-sm border-black hover:bg-sky-200 bg-sky-500 duration-200 p-1 rounded-md">
                    🔗
                </a>
            </div>
        {/if}
    </div>
</QuickList>
