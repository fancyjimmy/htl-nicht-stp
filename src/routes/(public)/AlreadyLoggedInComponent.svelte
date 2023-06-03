<script lang="ts">
    import {logout} from "$lib/supabase";
    import {Button, P} from "flowbite-svelte";

    export let user;
</script>

<div class="w-full h-full relative">
    <img src="/images/weber.jpg" alt="Weber" class="w-full h-full">
    <div class="absolute inset-0 m-auto w-96 h-48 rounded-xl bg-white border-2 border-black p-4 flex flex-col justify-between">
        <P class="text-4xl uppercase font-semibold">Du bist schon eingeloggt {user.user_metadata.name}.</P>
        <Button on:click={logout}>Ausloggen 😽</Button>
    </div>
</div>