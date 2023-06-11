<script lang="ts">
    import {Heading, Select, Spinner} from 'flowbite-svelte';
    import QuickList from '$lib/components/QuickList.svelte';
    import {ROLES_LIST} from '$lib/type';
    import {profile} from '$lib/supabase';
    import Icon from '@iconify/svelte';
    import {supabase} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';

    export let data;

    $: profiles = data.profiles.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
</script>

<div class="w-full p-6">
    <Heading tag="h2">Users 🧑‍🏫</Heading>

    <div class="w-full border-2 border-black rounded-xl overflow-hidden">
        <table class="w-full h-full table-auto divide-y-2 divide-black scrollbar-hidden bg-white">
            <thead>
            <tr class="w-full p-3 divide-x-2 divide-black bg-slate-400">
                <th>Name</th>
                <th>Icon</th>
                <th>Color</th>
                <th>Role</th>
                <th>Klasse</th>
                <th>Aktiviert</th>
                <th/>
            </tr>
            </thead>

            <tbody class="divide-y-2 divide-black">
            {#each profiles as userProfile}
                <tr class="odd:bg-slate-100 divide-x-2 divide-black">
                    <td>{userProfile.fullname ?? 'keine Angabe'}</td>
                    <td>{userProfile.icon}</td>
                    <td>{userProfile.color}</td>
                    <td>
                        {#if $profile.role === 'ABTEILUNGSSPRECHER'}
                            {#if userProfile.updating}
                                <Spinner/>
                            {:else}
                                <Select
                                        class="border-none focus:ring-0 bg-transparent"
                                        items={ROLES_LIST.map((item) => {
											return { value: item, name: item };
										})}
                                        bind:value={userProfile.role}
                                        on:change={async () => {
											userProfile.updating = true;
											const { data, error } = await $supabase
												.from('profile')
												.update({ role: userProfile.role })
												.eq('id', userProfile.id);
											if (error) {
												console.log(error);
											}
											await invalidateAll();
										}}
                                />
                            {/if}
                        {:else}
                            {userProfile.role}
                        {/if}
                    </td>
                    <td
                    >{userProfile.grade !== -1
                        ? `${userProfile.grade}${userProfile.className}`
                        : 'Absolvent'}</td
                    >
                    <td>{userProfile.enabled}</td>
                    <td class="w-min"
                    ><a href="/admin/user/{userProfile.id}" class="text-4xl w-min">
                        <Icon icon="majesticons:open"/>
                    </a></td
                    >
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
