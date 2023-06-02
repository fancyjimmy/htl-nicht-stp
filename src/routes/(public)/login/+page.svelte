<script lang="ts">
    import LoginForm from './LoginForm.svelte';
    import {A, Alert} from 'flowbite-svelte';
    import {goto} from "$app/navigation";
    import User from "$lib/supabase/User.svelte";
    import {login} from "$lib/supabase.js";
    import AlreadyLoggedInComponent from "../AlreadyLoggedInComponent.svelte";

    let error;

    function sleep(milis: number){
        return new Promise((resolve) => setTimeout(resolve, milis));
    }
</script>

<div>
    <User let:user>
        <AlreadyLoggedInComponent {user} />
        <div slot="signedOut">
            <LoginForm
                    on:submit={async (event) => {
					const { email, password } = event.detail;
					try {
						const user = await login(email, password);
                        await sleep(1000);
                        await goto('/account');
						console.log(user);
					} catch (e) {
						error = e;
						console.error(error);
					}
				}}
            />
        </div>
    </User>

    {#if error}
        <Alert color="red">
            <p>
                {JSON.stringify(error)}
                {#if error.code === ''}
                    Help
                {/if}
            </p>
        </Alert>
    {/if}
</div>
