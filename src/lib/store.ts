import {derived} from "svelte/store";
import {user} from "./supabase";

export const links = derived(user, ($user) => {
    const standardLinks = [
        {href: "/", name: "Home"},
        {href: "/about", name: "About"},
    ];
    if ($user === null) {
        return [...standardLinks, {href: "/login", name: "Login"}, {href: "/register", name: "Registrieren"}];
    }

    return [
        ...standardLinks,
        {href: "/test", name: "Tests 📄"},
        {href: "/teacher", name: "Lehrer 🧑‍🏫"},
        {href: "/subject", name: "Fächer 📚"},
        {href: "/quote", name: "Zitate 🤫"}
    ];
});