<script>
    import {DarkMode, Dropdown, DropdownDivider, DropdownHeader, DropdownItem} from "flowbite-svelte";
    import {User} from "sveltefire";
    import {sdk} from "sveltefire/stores";
    import {goto} from "$app/navigation";

    export let placement = "bottom";
    export let triggeredBy = "#avatar-menu";
</script>

<Dropdown {placement} {triggeredBy}>
    <User let:user>
        <DropdownHeader>
            <span class="block text-sm">{user.displayName}</span>
            <span class="block truncate text-sm font-medium">{user.email}</span>
        </DropdownHeader>

        <DropdownItem href="/account">Account</DropdownItem>
        <DropdownItem href="/dashboard">Dashboard</DropdownItem>
        <DropdownItem>Einstellungen</DropdownItem>
        <DropdownDivider />
        <DropdownItem class="p-0">
            <DarkMode class="p-2 w-full rounded flex items-center justify-center"/>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
                on:click={() => {
						$sdk.auth.signOut();
						goto('/login');
					}}
        >Ausloggen
        </DropdownItem>

        <div slot="signedOut">
            <DropdownItem href="/login">Log In</DropdownItem>
            <DropdownItem href="/register">Registrieren</DropdownItem>
            <DropdownDivider />
            <DropdownItem class="p-0">
                <DarkMode class="p-2 w-full rounded flex items-center justify-center"/>
            </DropdownItem>
        </div>
    </User>

</Dropdown>
