<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Avatar,
        Dropdown,
        DropdownItem,
        DropdownHeader,
        DropdownDivider,
        DarkMode
    } from 'flowbite-svelte';
    import {User} from 'sveltefire';
    import {goto} from '$app/navigation';
    import {sdk} from 'sveltefire/stores';
    import AccountDropdown from "$lib/components/AccountDropdown.svelte";
</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <span class="text-4xl">📃</span>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">testy</span>
    </NavBrand>
    <div class="flex items-center md:order-2 gap-3">
        <Avatar id="avatar-menu" src={$sdk.auth.currentUser ? "https://www.w3schools.com/howto/img_avatar.png" :  "" }/>
        <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>

    <AccountDropdown triggeredBy="#avatar-menu" placement="bottom"/>


    <NavUl {hidden} color="primary">
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/about">About</NavLi>
    </NavUl>
</Navbar>
