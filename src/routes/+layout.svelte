<script lang="ts">
	import '../app.css';

    import {invalidate} from '$app/navigation';
    import {onMount} from 'svelte';
    import {supabase, session, profile} from '$lib/supabase';
    import {user} from "../lib/supabase";
    import Header from "./(public)/Header.svelte";

    export let data;

    $: $supabase = data.supabase;
    $: $session = data.session;
    $: $profile = data.profile;
    $: $user = $session?.user ?? null;

    onMount(() => {
        const {
            data: {subscription}
        } = $supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== $session?.expires_at) {
                invalidate('supabase:auth');
            }

            $session = _session;
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="flex flex-col h-screen w-full">
    <Header/>

    <main class="flex-1 relative">
        <div class="absolute inset-0">
            <slot/>
        </div>
    </main>
</div>

<style>
</style>
