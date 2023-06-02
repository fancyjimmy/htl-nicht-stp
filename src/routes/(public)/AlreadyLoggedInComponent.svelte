<script lang="ts">
    import {logout} from "$lib/supabase";
    import {Button, P} from "flowbite-svelte";

    export let user;
</script>

<div>
    <P class="text-4xl">Du bist schon eingeloggt {user.user_metadata.name}.</P>
    <Button on:click={logout}>Ausloggen 😽</Button>
</div>