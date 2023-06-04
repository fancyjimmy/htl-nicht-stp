<script lang="ts">
    import {supabase} from '$lib/supabase';
    import {Alert, Button, Input, Label, Spinner} from 'flowbite-svelte';
    import {emailEnd} from '$lib/utils';
    import {PUBLIC_BASEURL} from '$env/static/public';
    import User from '$lib/supabase/User.svelte';
    import {createEventDispatcher} from 'svelte';
    import TogglePasswordInput from '../register/TogglePasswordInput.svelte';
    import {goto} from '$app/navigation';

    let resetting = false;

    async function resetPassword(email: string) {
        resetting = true;
        emailSent = false;
        const result = await $supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${PUBLIC_BASEURL}/reset-password`
        });

        emailSent = true;
    }

    let password = '';
    let passwordRepeat = '';

    let passwordDirty = false;
    let passwordRepeatDirty = false;
    let passwordTouched = false;

    let errors = [];
    $: if (showError) {
        errors = [];
        if (passwordTouched && password !== passwordRepeat) {
            errors = [...errors, {message: 'Passwörter stimmen nicht überein'}];
        }

        if (passwordDirty) {
            if (password.length < 8) {
                errors = [
                    ...errors,
                    {
                        message: 'Passwort muss mindestens 8 Zeichen lang sein'
                    }
                ];
            }

            if (!password.match('.*\\d.*')) {
                errors = [
                    ...errors,
                    {
                        message: 'Passwort muss eine Zahl enthalten'
                    }
                ];
            }

            if (!password.match('.*[a-z].*')) {
                errors = [
                    ...errors,
                    {
                        message: 'Passwort muss einen Kleinbuchstaben enthalten'
                    }
                ];
            }
            if (!password.match('.*[A-Z].*')) {
                errors = [
                    ...errors,
                    {
                        message: 'Passwort muss einen Großbuchstaben enthalten'
                    }
                ];
            }
        }
    }

    let showError = true;

    let emailSent = false;
    const dispatch = createEventDispatcher();
    let email = '';
</script>


<div class="w-full h-full flex  justify-center items-center">
    <div class="flex-1 h-full md:display-none">
        <img src="/images/höchti.jpg" alt="höchti" class="w-full h-full">
    </div>
    <User let:user>
        <div class="max-w-lg flex flex-col gap-3 px-6 w-full">
            <h2 class="text-3xl font-extrabold">Passwort Zurücksetzen</h2>
            <form
                    on:submit|preventDefault={async () => {
				const result = await $supabase.auth.updateUser({
					password: password
				});

				if (result.error) {
					console.log(result.error);
                    goto(`/error?message=${encodeURIComponent(result.error.message)}`);

				} else {
					console.log('password changed');
					goto('/account');
				}
			}}
            >
                <div>
                    <Label for="input-group-1" class="block mb-2">Passwort</Label>
                    <TogglePasswordInput
                            required
                            bind:value={password}
                            bind:touched={passwordTouched}
                            placeholder="Passwort"
                            bind:dirty={passwordDirty}
                    />
                </div>
                <div>
                    <Label for="input-group-1" class="block mb-2">Passwort Wiederholen</Label>
                    <TogglePasswordInput
                            required
                            bind:value={passwordRepeat}
                            placeholder="Passwort Wiederholen"
                            bind:dirty={passwordRepeatDirty}
                    />
                </div>

                {#if errors.length >= 1}
                    <Alert color="red" class="border-2 my-3 dark:bg-red-900/70" border>
					<span slot="icon"
                    ><svg
                            aria-hidden="true"
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                    ><path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"
                    /></svg
                    >
					</span>
                        <span class="sr-only">Info</span>
                        <span class="font-medium">Passwort muss folgende Voraussetzungen treffen:</span>
                        <ul slot="extra" class="mt-0 ml-8 list-disc list-inside">
                            {#each errors as error}
                                <li>{error.message}</li>
                            {/each}
                        </ul>
                    </Alert>
                {/if}

                <Button type="submit" class="mt-3">Passwort Zurücksetzen</Button>
            </form>
        </div>

        <div slot="signedOut" class="max-w-lg px-8 w-full">
            {#if !resetting}
                <h2 class="text-3xl font-extrabold">Passwort Zurücksetzen</h2>
                <form
                        on:submit|preventDefault={() => {
					resetPassword(email.endsWith(emailEnd) ? email : `${email}${emailEnd}`);
				}}
                >
                    <div class="mb-2">
                        <Label for="input-group-1" class="block mb-2">E-Mail</Label>
                        <Input id="email" type="text" placeholder="v.nachname" required bind:value={email}>
                            <svg
                                    slot="left"
                                    aria-hidden="true"
                                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>

                            <div slot="right" class="text-sm font-bold">{emailEnd}</div>
                        </Input>
                    </div>
                    <Button type="submit">Password zurücksetzen</Button>
                </form>
            {:else if emailSent}
                <p>E-Mail wurde gesendet 😘</p>
            {:else}
                <Spinner/>
            {/if}
        </div>
    </User>

</div>
