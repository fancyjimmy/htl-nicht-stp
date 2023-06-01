<script lang="ts">
    import RegisterForm from './RegisterForm.svelte';
    import {register} from '$lib/firebase.js';
    import {goto} from '$app/navigation';
    import {User} from 'sveltefire';
    import {A, Alert} from "flowbite-svelte";

    let error;
</script>

<div>
    <User let:user>
        <div>
            <p>Du bist schon eingeloggt {user.displayName}.</p>
            <p>Log dich zuerst aus.</p>
        </div>
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


            {#if error}
                <Alert color="red">
                    <p>
                        {#if error.code === "auth/email-already-exists"}
                            Die angegebene E-Mail-Adresse wird bereits von einem bestehenden Benutzer verwendet.
                        {:else if error.code === "auth/user-not-found" }
                            Der Benutzer wurde nicht gefunden.
                        {:else if error.code === "auth/wrong-password"}
                            Passwort ist falsch
                        {:else }
                            {error.code}
                        {/if}
                    </p>
                </Alert>
            {/if}
        </div>
    </User>
</div>
