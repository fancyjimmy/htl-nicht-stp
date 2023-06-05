<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import { A, Alert, Toast } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import User from '$lib/supabase/User.svelte';
	import { login } from '$lib/supabase.js';
	import AlreadyLoggedInComponent from '../AlreadyLoggedInComponent.svelte';
	import Icon from '@iconify/svelte';

	let error;

	function sleep(milis: number) {
		return new Promise((resolve) => setTimeout(resolve, milis));
	}

	let toast = false;
</script>

<div class="w-full h-full relative">
	<User let:user>
        <AlreadyLoggedInComponent {user}/>
        <div slot="signedOut" class="flex-col md:flex-row flex h-full w-full gap-3 items-center justify-center">
            <div class="hidden md:block flex-1 h-full">
                <img src="/images/riesi.jpg" alt="Riesi" class="h-full w-full">
            </div>

            <LoginForm
                    on:submit={async (event) => {
					const { email, password } = event.detail;
					try {
						const user = await login(email, password);
						//await sleep(1000);
						await goto('/account');
						console.log(user);
					} catch (e) {
						error = e;
						toast = true;
						console.error(error);
					}
				}}
			/>
		</div>
	</User>

	<Toast color="red" simple position="top-right" class="duration-200 dark:bg-red-900/70" bind:open={toast}>
		<div class="flex justify-between">
			<div>
				{error.message}
			</div>
			<button
				on:click={() => {
					toast = false;
				}}
			>
				<Icon icon="mdi:close" />
			</button>
		</div>
	</Toast>
</div>
