<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Avatar,

    } from 'flowbite-svelte';

    import AccountDropdown from "$lib/components/AccountDropdown.svelte";
    import {user} from "$lib/supabase.js";
    import {page} from "$app/stores";
    import {links} from "$lib/store";

</script>
<div class="p-2">
    <Navbar let:hidden let:toggle navClass=" bg-transparent dark:bg-transparent mx-0 flex justify-center" navDivClass=" border-black border-2  dark:border-slate-200 mx-0 rounded-xl flex flex-wrap justify-between items-center">
        <NavBrand href="/">
            <span class="text-4xl">📃</span>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">testy</span>
        </NavBrand>
        <div class="flex items-center md:order-2 gap-1 px-2">
            <div class="avatar py-2 md:p-0">
                {#if $user}
                    <Avatar><span class="uppercase">{($user?.email ?? "A").substring(0, 1)}</span></Avatar>
                {:else}
                    <Avatar/>
                {/if}
            </div>
            <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
        </div>

        <AccountDropdown triggeredBy=".avatar" placement="bottom"/>


        <NavUl {hidden} color="primary" class="border-x border-black dark:border-slate-200">
            {#each $links as link}
                <NavLi href={link.href} active={$page.route.id.endsWith(link.href)}>{link.name}</NavLi>
            {/each}
        </NavUl>
    </Navbar>
</div>

