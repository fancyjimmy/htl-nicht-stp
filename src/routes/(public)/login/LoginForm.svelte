<script lang="ts">
    import {A, Alert, Button, Input, Label} from 'flowbite-svelte';
    import {createEventDispatcher} from 'svelte';
    import TogglePasswordInput from "../register/TogglePasswordInput.svelte";
    import {emailEnd} from "$lib/utils";

    let email = '';
    let password = '';

    let passwordDirty = false;
    let passwordTouched = false;

    let showError = true;

    const dispatch = createEventDispatcher();
</script>

<form
        on:submit|preventDefault={() => {
		dispatch('submit', {
			email: email.endsWith(emailEnd) ? email : `${email}${emailEnd}`,
			password
		});
	}}
        class="p-4 w-full max-w-lg mx-8"
>
    <div class="mb-4">
        <h3 class="text-3xl dark:text-slate-100 mb-2 font-semibold">Login</h3>

        <div class="mb-2">
            <Label for="input-group-1" class="block mb-2">Schul-Mail</Label>
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

        <div class="mb-4">
            <Label for="input-group-1" class="block mb-2">Passwort</Label>
            <TogglePasswordInput required bind:value={password} placeholder="Passwort"/>
        </div>

        <Button class="w-full" type="submit">Login</Button>

        <div class="mt-2 text-sm font-bold flex justify-between">
            <A href="/register" color="text-primary-500 dark:text-white">Du hast noch kein Konto?
                <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"></path>
                </svg>
            </A>

            <A href="/reset-password" color="text-primary-500 dark:text-white">Password vergessen?
            </A>
        </div>
    </div>
</form>
