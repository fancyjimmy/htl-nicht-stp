<script lang="ts">
    import {A, Alert, Button, Helper, Input, Label} from 'flowbite-svelte';
    import TogglePasswordInput from './TogglePasswordInput.svelte';
    import {createEventDispatcher} from "svelte";
    import Icon from "@iconify/svelte";
    import {emailEnd} from "$lib/utils";

    let email = '';
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

    const dispatch = createEventDispatcher();
    let name = "";
</script>

<form
        on:submit|preventDefault={() => {
            if (errors.length > 0){
                return;
            }


            dispatch('submit', {
                name,
                email: email.endsWith(emailEnd) ? email : `${email}${emailEnd}`,
                password
            });

        }}
        class="p-4 w-full max-w-lg mx-8"
>
    <div class="mb-4">
        <h3 class="text-3xl dark:text-slate-100 mb-2 font-semibold">Registrieren</h3>
        <div class="mb-2">
            <Label class="block mb-2">Username</Label>
            <Input type="text" placeholder="Name" required bind:value={name}>
                <div slot="left" class="text-xl">
                    <Icon icon="mdi:user"></Icon>
                </div>
            </Input>
            <Helper>Kann nicht geändert werden.</Helper>
        </div>

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

        <div class="mb-2">
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
    </div>

    <Button class="w-full" type="submit">Erstellen</Button>

    <div class="mt-2 text-sm font-bold">
        <A href="/login" color="text-primary-500 dark:text-white">Du hast schon ein Konto?
            <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </A>
    </div>
</form>
