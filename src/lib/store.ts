import {derived, get} from "svelte/store";
import {profile, user} from "./supabase";

export const links = derived(user, ($user) => {
    const standardLinks = [
        {href: "/", name: "Home"},
        {href: "/about", name: "About"},
    ];

    const $profile = get(profile);
    if ($user === null) {
        return [...standardLinks, {href: "/login", name: "Login"}, {href: "/register", name: "Registrieren"}];
    }

    if ($profile === null || !$profile.enabled) {
        return [...standardLinks, {href: "/account", name: "Account"}];
    }

    return [
        ...standardLinks,
        {href: "/test", name: "Tests 📄"},
        {href: "/teacher", name: "Lehrer 🧑‍🏫"},
        {href: "/subject", name: "Fächer 📚"},
        {href: "/quote", name: "Zitate 🤫"}
    ];
});