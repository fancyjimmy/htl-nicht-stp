<script lang="ts">
    import IconAvatar from '$lib/components/IconAvatar.svelte';
    import {user} from '$lib/supabase';
    import AvatarSelect from '$lib/components/AvatarSelect.svelte';
    import {Button, Helper, Input, Select} from 'flowbite-svelte';
    import Icon from '@iconify/svelte';
    import {range} from '$lib/utils';
    import {onMount} from 'svelte';
    import {supabase} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';

    export let profile;
    let form = {};

    onMount(() => {
        form = {...profile};
    });
    $: equals = JSON.stringify({...profile}) === JSON.stringify({...form});
    let updating = false;
</script>

<div class="w-full h-full">
    <div style="background-color: {profile.color};" class="w-full h-48 border-b-4 border-black"/>
    <div class="mt-[-10.5rem] ml-[1.5rem] sm:mt-[-1.5rem] sm:ml-8 mb-12 sm:mb-3 flex gap-3">
        <IconAvatar icon={profile.icon} size="xl" loggedIn/>
        <div class="pt-6 pl-3">
            <p class="font-extrabold text-3xl">{profile.fullname}</p>
            <p class="text-slate-600 text-lg font-semibold">{$user.email}</p>
            <p class="text-slate-800">
                {#if profile.grade === -1}
                    Absolvent
                {:else}
                    {profile.grade}{profile.className ?? 'XHIF'}
                {/if}
            </p>
        </div>
    </div>

    <form
            on:submit|preventDefault={async () => {
			updating = true;
			form.fullname = form.fullname.trim();

			if (form.fullname === '') {
				form.fullname = undefined;
			}

			const profile = { ...form, id: user.id };
			const {data, error} = await $supabase.from('profile').update(profile).eq('id', $user.id);
            if (error){
                console.error(error);
            }
            updating = false;
			await invalidateAll();
		}}
    >
        <div class="px-6 md:px-12">
            <div class="flex flex-col gap-2 max-w-2xl">
                <div class="mb-1">
                    <h3 class="mb-1 font-semibold text-lg">Echter Name</h3>
                    <Input type="text" placeholder="Echter Name" class="mb-1" bind:value={form.fullname}>
                        <div slot="left" class="text-xl">
                            <Icon icon="mdi:user"/>
                        </div>
                    </Input>
                </div>
                <div class="mb-1">
                    <h3 class="mb-1 font-semibold text-lg">Klasse</h3>

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
        </div>
        {#if !equals}
            <button
                    class="absolute top-3 right-3 gap-2 disabled:text-white text-black"
                    disabled={updating}
                    type="submit"
            ><span class="text-4xl"><Icon icon="mdi:refresh"/></span>
            </button>
        {/if}
    </form>
</div>
