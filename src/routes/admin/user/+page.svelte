<script lang="ts">
    import {Heading} from "flowbite-svelte";
    import QuickList from "$lib/components/QuickList.svelte";

    export let data;
</script>

<Heading tag="h2">Lehrer 🧑‍🏫</Heading>

<QuickList
        items={data.profiles}
        let:item={profile}
        class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white"
>
    <a class="p-2 block" href="/admin/user/{profile.id}">
        <p class="font-extrabold">{profile.fullname}</p>
        <p class="text-sm italic text-slate-700 uppercase font-semibold">
            {profile.icon}
            {profile.color}
        </p>
    </a>
</QuickList>