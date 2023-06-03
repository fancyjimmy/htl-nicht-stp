<script lang="ts">
    import RegisterForm from './RegisterForm.svelte';
    import {goto} from '$app/navigation';
    import {A, Alert, Toast} from "flowbite-svelte";
    import {register} from "$lib/supabase.js";
    import User from "$lib/supabase/User.svelte";
    import AlreadyLoggedInComponent from "../AlreadyLoggedInComponent.svelte";
    import Icon from "@iconify/svelte";

    let error;
    let toast = false;
</script>

<div class="flex  h-full w-full">
    <User let:user>
        <AlreadyLoggedInComponent {user}/>


        <div slot="signedOut" class="flex-col md:flex-row flex h-full w-full gap-3 items-center justify-center">
            <RegisterForm
                    on:submit={async (event) => {
					const { email, password, name } = event.detail;
					try {
						const user = await register(name, email, password);
						console.log(user);
						await goto('/login');
					} catch (e) {
                        error = e;
					}
				}}
            />

            <div class="hidden md:block flex-1 h-full">
                <img src="/images/mausi.png" alt="Mausi" class="h-full w-full">
            </div>

        </div>
    </User>
</div>

<Toast color="red" simple position="top-right" class="dark:bg-red-900/70" bind:open={toast}>
    <div class="flex justify-between">
        <div>
            {error.message}
        </div>
        <button
                on:click={() => {
					toast = false;
				}}
        >
            <Icon icon="mdi:close"/>
        </button>
    </div>
</Toast>