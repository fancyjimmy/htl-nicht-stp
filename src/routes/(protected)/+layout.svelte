<script lang="ts">
	import {
		Avatar,
		Button,
		P

	} from 'flowbite-svelte';

    import Side from "./Side.svelte";
    import AccountDropdown from "$lib/components/AccountDropdown.svelte";
    import User from "$lib/supabase/User.svelte";

	let spanClass = 'flex-1 ml-3 whitespace-nowrap';

	let site = {
		name: 'Flowbite-Svelte',
		href: '/',
		img: '/images/flowbite-svelte-icon-logo.svg'
	};
</script>

<User let:user>
    <svelte:fragment>
        <slot/>
    </svelte:fragment>

	<div slot="signedOut">
		<P>Du musst eingeloggt sein um diese Seite zu sehen.</P>

		<Button href="/login">Log In</Button>
		<Button href="/register">Registrieren</Button>
	</div>
</User>
