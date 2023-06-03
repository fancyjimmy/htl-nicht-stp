<script lang="ts">
    import {DarkMode, Dropdown, DropdownDivider, DropdownHeader, DropdownItem} from "flowbite-svelte";
    import {goto} from "$app/navigation";
    import User from "$lib/supabase/User.svelte";
    import {logout} from "$lib/supabase";

    export let placement = "bottom";
    export let triggeredBy = ".avatar";
</script>

<Dropdown {placement} {triggeredBy} frameClass="z-10 " ulClass="w-60 rounded overflow-hidden">
    <User let:user>
        <DropdownHeader>
            <span class="block text-sm">{user.user_metadata.name}</span>
            <span class="block truncate text-sm font-medium">{user.email}</span>
        </DropdownHeader>

        <DropdownItem href="/account">Account</DropdownItem>
        <DropdownItem>Einstellungen</DropdownItem>
        <DropdownDivider />
        <DropdownItem class="p-0">
            <DarkMode class="p-2 w-full rounded flex items-center justify-center" initialTheme="light"/>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
                class="pb-4"
                on:click={() => {
						logout();
						goto('/login');
					}}
        >Ausloggen
        </DropdownItem>

        <div slot="signedOut">
            <DropdownItem href="/login">Login</DropdownItem>
            <DropdownItem href="/register">Registrieren</DropdownItem>
            <DropdownDivider />
            <DropdownItem class="p-0">
                <DarkMode class="p-2 w-full rounded flex items-center justify-center" initialTheme="light"/>
            </DropdownItem>
        </div>
    </User>

</Dropdown>
