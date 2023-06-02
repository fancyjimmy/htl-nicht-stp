<script lang="ts">
import User from "$lib/supabase/User.svelte";
</script>

<User let:user>
	<div class="dark:text-slate-100">
		<p>Name {user.user_metadata.name}</p>
		<p>Email: {user.email}</p>

	</div>
	<div slot="signedOut">
		<p>Du musst eingeloggt sein um deinen Account anzuschauen</p>
		<a href="/login">Log In</a>
		<a href="/register">Registrieren</a>
	</div>
</User>
