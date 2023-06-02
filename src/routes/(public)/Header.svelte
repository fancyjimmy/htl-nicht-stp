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

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <span class="text-4xl">📃</span>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">testy</span>
    </NavBrand>
    <div class="flex items-center md:order-2 gap-3">
        <Avatar id="avatar" src={$user ? "https://www.w3schools.com/howto/img_avatar.png" :  "" }/>
        <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>

    <AccountDropdown triggeredBy="#avatar" placement="bottom"/>


    <NavUl {hidden} color="primary">
        {#each $links as link}
            <NavLi href={link.href} active={$page.route.id.endsWith(link.href)}>{link.name}</NavLi>
        {/each}
    </NavUl>
</Navbar>
