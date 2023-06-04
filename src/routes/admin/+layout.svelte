<script lang="ts">
    import GuardAuthenticated from "$lib/supabase/GuardAuthenticated.svelte";
    import {MINIMUM_ROLE} from "$lib/type";
</script>

<GuardAuthenticated role={MINIMUM_ROLE.KLASSENSPRECHER}>
    <div slot="unauthorized">
        <p>🔫👮 unauth</p>
    </div>
    <div slot="noProfile">
        <p>🔫👮 nopro</p>
    </div>

    <div slot="disabled">
        <p>🔫👮 dis</p>
    </div>
    <slot/>

    <div slot="signedOut">
        <p>Du bist nicht eingeloggt...</p>
    </div>
</GuardAuthenticated>