<script lang="ts">
    import {Blockquote, Timeline, TimelineItem, Tooltip} from "flowbite-svelte";
    import QuickList from "$lib/components/QuickList.svelte";

    export let quotes;
</script>

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
                                {quote.profile?.fullname ?? ""}
                                {quote.profile?.color ?? ""}
                                {quote.profile?.icon ?? ""}
                            </p>
                        {/if}
                    </div>
                </figcaption>
            </figure>
        </TimelineItem>
    </QuickList>
</Timeline>
