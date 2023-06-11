<script lang="ts">
    import GuardAuthenticated from '$lib/supabase/GuardAuthenticated.svelte';
    import {MINIMUM_ROLE} from '$lib/type';
    import {Breadcrumb, BreadcrumbItem} from 'flowbite-svelte';
    import {page} from '$app/stores';

    $: paths = $page.url.pathname.split('/').filter((p) => p !== '');
</script>

<GuardAuthenticated role={MINIMUM_ROLE.KLASSENSPRECHER}>
    <div slot="unauthorized">
        <p>🔫👮 Nicht authorisiert</p>
    </div>
    <div slot="noProfile">
        <p>🔫👮 Du hast noch kein Profil</p>
    </div>

    <div slot="disabled">
        <p>🔫👮 dein Account wurde disabled</p>
    </div>

    <div class="w-full h-full pt-10 relative">
        <Breadcrumb class="absolute top-2 left-5" aria-label="breadcrumb menu">
            <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
            {#each paths as path, index}
                <BreadcrumbItem href="/{paths.slice(0, index + 1).join('/')}">{path}</BreadcrumbItem>
            {/each}
        </Breadcrumb>

        <slot/>
    </div>

    <div slot="signedOut">
        <p>Du bist nicht eingeloggt...</p>
    </div>
</GuardAuthenticated>
