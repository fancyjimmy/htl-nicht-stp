<script lang="ts">
    import GuardAuthenticated from "$lib/supabase/GuardAuthenticated.svelte";

</script>

<GuardAuthenticated>
    <slot/>
</GuardAuthenticated>
