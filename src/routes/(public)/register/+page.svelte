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

<div>
    <User let:user>
        <AlreadyLoggedInComponent {user} />

        <div slot="signedOut">
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
                        <Icon icon="mdi:close" />
                    </button>
                </div>
            </Toast>
        </div>
    </User>
</div>
