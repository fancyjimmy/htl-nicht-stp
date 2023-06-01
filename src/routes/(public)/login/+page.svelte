<script lang="ts">
    import LoginForm from './LoginForm.svelte';
    import {login} from '$lib/firebase.js';
    import {User} from 'sveltefire';
    import {A, Alert} from 'flowbite-svelte';
    import {goto} from "$app/navigation";

    let error;
</script>

<div>
    <User let:user>
        <div>
            <p>Du bist schon eingeloggt {user.displayName}.</p>
            <p>Log dich zuerst aus.</p>
        </div>
        <div slot="signedOut">
            <LoginForm
                    on:submit={async (event) => {
					const { email, password } = event.detail;
					try {
						const user = await login(email, password);
                        goto('/account');
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
                {#if error.code === ''}
                    Help
                {/if}
            </p>
        </Alert>
    {/if}
</div>
