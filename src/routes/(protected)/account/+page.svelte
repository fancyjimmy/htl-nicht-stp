<script lang="ts">
    import User from "$lib/supabase/User.svelte";
    import {Button, P} from "flowbite-svelte";
    import {logout} from "$lib/supabase";
    import ProtectedScreen from "$lib/components/ProtectedScreen.svelte";
    import InitializeProfilePage from "./InitializeProfilePage.svelte";
    import {supabase} from "$lib/supabase";
    import {invalidateAll} from "$app/navigation";
    import ProfileView from "./ProfileView.svelte";


    export let data;
</script>

<User let:user>
    <div class="dark:text-slate-100">
        {#if !data.profile}
            <InitializeProfilePage on:created={async (event) => {
                event.detail.fullname = event.detail.fullname.trim();

                if (event.detail.fullname === ""){
                    event.detail.fullname = undefined;
                }

                console.log(event.detail);
                const profile = {...event.detail, "id": user.id};
                await $supabase.from("profile").insert(profile);
                await invalidateAll();
            }}/>
        {:else}
            <ProfileView profile={data.profile}/>
        {/if}
    </div>

    <ProtectedScreen slot="signedOut"/>
</User>
