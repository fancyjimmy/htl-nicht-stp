<script lang="ts">
	import {
		Button,
		P

	} from 'flowbite-svelte';

    import User from "$lib/supabase/User.svelte";
    import ProtectedScreen from "$lib/components/ProtectedScreen.svelte";
</script>

<User let:user>
    <svelte:fragment>
        <slot/>
    </svelte:fragment>


    <ProtectedScreen slot="signedOut"/>
</User>
