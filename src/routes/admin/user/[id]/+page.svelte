<script lang="ts">
    import ProfileView from '../../../(protected)/account/ProfileView.svelte';

    export let data;
    $: profile = data.profile;
</script>

{#if !profile}
    <p>Profil wurde nicht gefunden.</p>
{:else}
    <ProfileView {profile}/>
{/if}
