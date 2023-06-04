<script lang="ts">
    import User from '$lib/supabase/User.svelte';
    import {Alert, Button, P} from 'flowbite-svelte';
    import {logout} from '$lib/supabase';
    import ProtectedScreen from '$lib/components/ProtectedScreen.svelte';
    import InitializeProfilePage from './InitializeProfilePage.svelte';
    import {supabase} from '$lib/supabase';
    import {invalidateAll} from '$app/navigation';
    import ProfileView from './ProfileView.svelte';
    import GuardAuthenticated from '$lib/supabase/GuardAuthenticated.svelte';
    import IconAvatar from '$lib/components/IconAvatar.svelte';

    export let data;
</script>

<GuardAuthenticated let:user let:profile>
    <InitializeProfilePage
            slot="noProfile"
            on:created={async (event) => {
			event.detail.fullname = event.detail.fullname.trim();

			if (event.detail.fullname === '') {
				event.detail.fullname = undefined;
			}

			console.log(event.detail);
			const profile = { ...event.detail, id: user.id, role: 'USER' };
			const result = await $supabase.from('profile').insert(profile);
			console.log(result);
			await invalidateAll();
		}}
    />
    <ProfileView profile={data.profile}/>
    <div slot="disabled" class="p-6 flex flex-col gap-6">
        <div class="flex gap-3">
            <IconAvatar icon={profile.icon} size="xl" loggedIn/>
            <div class="pt-6 pl-3">
                <p class="font-extrabold text-3xl">{profile.fullname}</p>
                <p class="text-slate-600 text-lg font-semibold">{user.email}</p>
                <p class="text-slate-800">
                    {#if profile.grade === -1}
                        Absolvent
                    {:else}
                        {profile.grade}{profile.className ?? 'XHIF'}
                    {/if}
                </p>
            </div>
        </div>

        <Alert color="red" border>Dein Konto ist gesperrt.</Alert>
    </div>
    <ProtectedScreen slot="signedOut"/>
</GuardAuthenticated>
