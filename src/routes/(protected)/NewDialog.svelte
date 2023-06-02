<script>
	import { Button, Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	const dispatch = createEventDispatcher();
	export let form = {};
	export let title = 'Erstellen';
</script>

<Button on:click={() => (open = true)} autoclose>
	<slot name="button">
		<Icon icon="mdi:plus" inline="true" class="mr-2" />
	</slot>
</Button>

<Modal {title} bind:open>
	<form
		on:submit|preventDefault={() => {
			dispatch('create', {...form}), (open = false);
		}}
	>
		<slot name="form" {form} />

        <div class="flex justify-between">
            <Button type="submit">Erstellen</Button>
            <Button color="alternative" on:click={() => (open = false)}>Abbrechen</Button>
        </div>
	</form>


</Modal>
