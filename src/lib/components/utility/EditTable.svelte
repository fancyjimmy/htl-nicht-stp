<script lang="ts">
    import {Tooltip} from 'flowbite-svelte';
    import Icon from '@iconify/svelte';
    import LinkCell from "$lib/components/utility/LinkCell.svelte";

    export let values: any[] = [];

    export let excludeColumns: string[] = [];

    type EditType = {
        columnName: string;
        type: 'string' | 'boolean' | 'select';
        options?: string[];
        onChange: (value: string | boolean) => Promise<void>;
    };
    export let editableTypeColumns: EditType[] = [];

    type LinkType = {
        columnName: string;
        substitute?: string;
        link: string;
    };
    export let linkColumn: LinkType[] = [];
    $: attributes = Object.keys(values[0] || {});

    $: shownAttributes = attributes.filter(
        (attribute: string) => !excludeColumns.includes(attribute)
    );

    function isEditable(columnName: string): boolean {
        return editableTypeColumns.some(
            (editableTypeColumn: EditType) => editableTypeColumn.columnName === columnName
        );
    }

    function isLink(columnName: string): boolean {
        return linkColumn.some(
            (linkTypeColumn: LinkType) => linkTypeColumn.columnName === columnName
        );
    }

    function getLink(columnName: string, element: any): string {
        const linkTypeColumn = linkColumn.find(
            (linkTypeColumn: LinkType) => linkTypeColumn.columnName === columnName
        );

        return linkTypeColumn.link.replace(`{${columnName}}`, element[columnName]);
    }

    function getSubstitute(key) {
        const linkTypeColumn = linkColumn.find(
            (linkTypeColumn: LinkType) => linkTypeColumn.columnName === key
        );

        return linkTypeColumn.substitute;
    }
</script>

<div class="w-full border-2 border-black rounded-xl overflow-hidden">


    <table class="border-collapse {$$props.class ?? 'w-full h-full table-auto divide-y-2 divide-black scrollbar-hidden bg-white '}">
        <thead class="bg-main-700">
        <tr class="w-full p-3 divide-x-2 divide-black bg-slate-400">
            <slot name="header" {attributes}>
                {#each shownAttributes as key}
                    <th class="p-2 text-left">{key}</th>
                {/each}
                <slot name="header-extra"/>
            </slot>
        </tr>
        </thead>
        <tbody class="divide-y-2 divide-black">
        {#each values as obj, i}
            <slot name="row" element={obj} index={i}>
                <tr class="odd:bg-slate-100 divide-x-2 divide-black">
                    {#each shownAttributes as key}
                        <td class="p-2">

                            {#if isLink(key)}
                                <LinkCell name={key} value={obj[key]} link={getLink(key, obj)}
                                          substitute={getSubstitute(key)}/>
                            {:else if isEditable(key)}
                                Hello
                            {:else}

                                {#if typeof obj[key] === 'object'}
                                    {#if obj[key] === null}
                                        -
                                    {:else}
                                        <p>
                                            <Icon icon="mdi:box-outline"/>
                                        </p>
                                        <Tooltip placement="top">
                                            {JSON.stringify(obj[key], null, 2)}
                                        </Tooltip>
                                    {/if}
                                {:else}
                                    {obj[key]}
                                {/if}
                            {/if}

                        </td>
                    {/each}

                    <slot name="row-extra"/>
                </tr>
            </slot>
        {/each}
        </tbody>
    </table>
</div>
