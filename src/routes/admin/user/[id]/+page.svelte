<script lang="ts">
    import ProfileView from '../../../(protected)/account/ProfileView.svelte';
    import QuickList from "$lib/components/QuickList.svelte";
    import QuoteList from "$lib/components/QuoteList.svelte";
    import IconAvatar from "$lib/components/IconAvatar.svelte";

    export let data;
    $: profile = data.profile;
</script>

{#if !profile}
    <p>Profil wurde nicht gefunden.</p>
{:else}

    <div class="flex gap-3">
        <IconAvatar icon={profile.icon} size="xl" loggedIn/>
        <div class="pt-6 pl-3">
            <p class="font-extrabold text-3xl">{profile.fullname ?? "keine Angabe"}</p>
            <p class="text-slate-600 text-lg font-semibold">{profile.email}</p>
            <p class="text-slate-800 font-semibold text-sm">
                {profile.role}
            </p>
            <p class="text-slate-800">
                {#if profile.grade === -1}
                    Absolvent
                {:else}
                    {profile.grade}{profile.className ?? 'XHIF'}
                {/if}
            </p>
        </div>
    </div>
    <QuickList items={profile.test} let:item={test}
               class="rounded-xl border-2 border-black divide-y-2 divide-black overflow-y-auto overflow-x-hidden scrollbar-hidden bg-white">
        <a href="/test/{test.id}" class="p-2 flex justify-between" style="background-color: #{test.subject?.color };">
            <div>
                <p class="font-extrabold uppercase">{test.grade}. {test.subject?.name}-Test {test.year}</p>
                <p class="text-sm italic text-slate-700 uppercase font-semibold">{test.teacher?.name}</p>
            </div>
            <div class="relative w-10 h-10">
                <span class="absolute text-4xl inset-0">📄</span>
            </div>
        </a>
    </QuickList>
    <QuoteList quotes={profile.quote}/>
{/if}
