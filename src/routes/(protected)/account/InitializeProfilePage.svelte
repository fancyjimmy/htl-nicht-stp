<script lang="ts">
    import {Button, Helper, Input, Label, Select} from 'flowbite-svelte';
    import {createEventDispatcher} from 'svelte';
    import Icon from '@iconify/svelte';
    import AvatarSelect from '$lib/components/AvatarSelect.svelte';
    import IconAvatar from '$lib/components/IconAvatar.svelte';
    import {range} from "$lib/utils";

    export let form = {icon: 'mausi', color: '#ffb9b9'};

    const dispatch = createEventDispatcher();
    let disabled = false;
</script>

<form
        on:submit|preventDefault={() => {
		dispatch('created', { ...form });
		disabled = true;
	}}
        class="p-6 w-full h-full max-w-xl mb"
>
    <div class="flex justify-between">
        <p class="font-extrabold text-4xl">Erstelle dein Profil</p>
        <IconAvatar icon={form.icon} loggedIn={true} size="lg"/>
    </div>

    <div class="flex flex-col gap-2">
        <div class="mb-1">
            <h3 class="mb-1 font-semibold text-lg">Echter Name</h3>
            <Input type="text" placeholder="Echter Name" class="mb-1" bind:value={form.fullname}>
                <div slot="left" class="text-xl">
                    <Icon icon="mdi:user"/>
                </div>
            </Input>
            <Helper>Optional</Helper>
        </div>
        <div class="mb-1">
            <h3 class="mb-1 font-semibold text-lg">In welcher Klasse bist du?</h3>

            <div
                    class="flex rounded-lg border border-gray-200 border overflow-hidden divide-x divide-gray-200 dark:divide-gray-600 dark:border-gray-600"
            >
                <Select
                        class="rounded-none border-0 focus:ring-0 focus:bg-gray-100"
                        items={[
						...range(1, 5).map((value) => {
							return { value, name: value };
						}),
						{ value: -1, name: 'Absolvent' }
					]}
                        bind:value={form.grade}
                        required
                        placeholder="Jahrgang"
                />
                {#if form.grade !== -1}
                    <div class="w-24">
                        <Select
                                class="rounded-none border-0 focus:ring-0 focus:bg-gray-100"
                                required
                                items={['AHIF', 'BHIF', 'CHIF'].map((value) => {
								return { value, name: value };
							})}
                                placeholder="XHIF"
                                bind:value={form.className}
                        />
                    </div>
                {/if}
            </div>
        </div>

        <div class="mb-1">
            <h3 class="mb-1 font-semibold text-lg">Farbe</h3>
            <Input
                    type="color"
                    placeholder="Farbe"
                    class="h-16 border focus:ring-1"
                    required
                    bind:value={form.color}
            >
                <div slot="left" class="text-xl">
                    <Icon icon="mdi:color"/>
                </div>
            </Input>
        </div>

        <AvatarSelect bind:value={form.icon} required/>
    </div>

    <Button type="submit">Erstellen</Button>
</form>
