<script lang="ts">
	import { User } from 'sveltefire';
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		P,
		Sidebar,
		SidebarBrand,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { sdk } from 'sveltefire/stores';
	import { goto } from '$app/navigation';
    import Side from "./Side.svelte";
    import AccountDropdown from "$lib/components/AccountDropdown.svelte";

	let spanClass = 'flex-1 ml-3 whitespace-nowrap';

	let site = {
		name: 'Flowbite-Svelte',
		href: '/',
		img: '/images/flowbite-svelte-icon-logo.svg'
	};
</script>

<User let:user>
	{#if user.emailVerified}
		<div class="flex w-screen h-screen">
            <Side/>

			<div class="flex-1 relative">
				<div class="absolute inset-0">
					<main class="w-full h-full relative">
						<div class="absolute top-3 right-3">
							<Avatar id="avatar-menu" />
						</div>
						<slot />
					</main>
				</div>
			</div>
		</div>

        <AccountDropdown triggeredBy="#avatar-menu" placement="bottom"/>
	{:else}
		<div>
			<P>Verifiziere deine E-Mail um diese Seite zu sehen.</P>
			<Button href="/account">Account</Button>
		</div>
	{/if}
	<div slot="signedOut">
		<P>Du musst eingeloggt sein um diese Seite zu sehen.</P>

		<Button href="/login">Log In</Button>
		<Button href="/register">Registrieren</Button>
	</div>
</User>
