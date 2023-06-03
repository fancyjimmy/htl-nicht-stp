<script lang="ts">
import User from "$lib/supabase/User.svelte";
import {Button} from "flowbite-svelte";
import {logout} from "$lib/supabase";
</script>

<User let:user>
	<div class="dark:text-slate-100 text-3xl">
		<p>Name {user.user_metadata.name}</p>
		<p>Email: {user.email}</p>
        <Button on:click={logout}>Ausloggen 😽</Button>

    </div>

</User>
