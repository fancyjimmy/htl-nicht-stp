<script lang="ts">

    import {ButtonGroup, Input, InputAddon} from "flowbite-svelte";
    import Icon from "@iconify/svelte";

    let hidden = true;
    export let dirty = false;
    export let touched = false;
    export let value = "";
</script>

<ButtonGroup class="w-full">
    <Input {...$$props} type="{hidden ? 'password' : 'text'}" on:change={() => {dirty = true}} on:input={() => {touched = true;}} bind:value>
    </Input>
    <InputAddon>
        <button class="text-xl w-5 h-5 select-none" on:click|preventDefault={() => hidden = !hidden} tabindex="-1">
            {#if hidden}
                <Icon icon="mdi:hide"/>
            {:else}
                <Icon icon="mdi:show"/>
            {/if}
        </button>
    </InputAddon>
</ButtonGroup>