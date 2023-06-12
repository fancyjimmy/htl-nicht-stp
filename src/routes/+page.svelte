<script lang="ts">
    import Board from '$lib/components/kanban/Board.svelte';
    import {MINIMUM_ROLE, type Role} from '../lib/type';
    import {Button, Tooltip} from 'flowbite-svelte';

    //export let data;
    function getAuthMap(role: Role | null): { id: number; editable: boolean; insertable: boolean }[] {
        // USER can insert into ideas and insert into bug
        // KLASSENSPRECHER und ABTEILUNGSSPRECHER can edit and insert everything
        /*
        states are as follows
id,name
1,TODO
2,CURRENT
3,FINISHING-TOUCHES
4,IDEAS
5,DONE
6,BUG */
        if (role === 'USER') {
            return [
                {id: 1, editable: false, insertable: false},
                {id: 2, editable: false, insertable: false},
                {id: 3, editable: false, insertable: false},
                {id: 5, editable: false, insertable: false},
                {id: 4, editable: true, insertable: true},
                {id: 6, editable: true, insertable: true}
            ];
        } else if (MINIMUM_ROLE.KLASSENSPRECHER.includes(role!)) {
            return [
                {id: 1, editable: true, insertable: true},
                {id: 2, editable: true, insertable: true},
                {id: 3, editable: true, insertable: true},
                {id: 5, editable: true, insertable: true},
                {id: 4, editable: true, insertable: true},
                {id: 6, editable: true, insertable: true}
            ];
        } else {
            return [
                {id: 1, editable: false, insertable: false},
                {id: 2, editable: false, insertable: false},
                {id: 3, editable: false, insertable: false},
                {id: 5, editable: false, insertable: false},
                {id: 4, editable: false, insertable: false},
                {id: 6, editable: false, insertable: false}
            ];
        }
    }

    /*
    function getAuth(role, state) {
        const auth = getAuthMap(role);
        return auth.find((a) => a.id === state.id);
    }

    $: kanbanBoard = data.states.map((state) => {
        const auth = getAuth($profile?.role ?? null, state);
        return {
            ...state,
            ...auth,
            cards: data.kanban.filter((card) => card.state === state.id)
        };
    });

    $: console.log(kanbanBoard);
    */
</script>

<section class="text-2xl flex gap-2 flex-col p-4 py-12  relative overflow-hidden">
    <h1 class="text-5xl font-semibold max-w-xl mx-auto py-5 text-center">
        Unoffizielle App <br/>für HTL-Nicht-St.Pölten
    </h1>

    <div class="absolute font-extrabold text-lime-400 m-auto inset-0 bg-lime-500 z-[-1]">
        <div class="w-full h-full flex items-center justify-center">
            <p style="font-size: 500px;" class="line-through">
                HTL

            </p>

        </div>
    </div>

    <p class="max-w-xl mx-auto py-5 text-center">
        Die Idee ist grundsätzlich eine Plattform zu haben, wo man Sachen wie <b>Tests, Aufgaben</b> und
        <b>andere nützliche Sachen</b>
        bezüglich der Schule machen kann um das <b>Schulleben zu erleichtern</b>.
    </p>

    <div class="mx-auto">
        <Button size="xl" color="alternative" class="w-40" href="/login">Login</Button>
        <Button size="xl" color="primary" class="w-40" href="/register">Registrieren</Button>
    </div>
</section>

<section class="p-4 relative overflow-hidden">
    <h2 class="pb-5 text-5xl">Fortschritt</h2>

    <div class="debug"/>

    <h3>DEV🏗️🚧</h3>
    <p class="max-w-2xl pb-3">
        Gerade ist die Seite noch unter Entwicklung. Die Datenbank ist noch unter Bearbeitung und es
        könnte zu Änderungen und Löschung von Daten kommen. BTW, bitte keine Spam/Fake-Daten erstellen
        🙏, es wird gespeichert wer was erstellt hat 🔫😄.
    </p>
    <p class="max-w-2xl pb-10">
        Die UI ist auch noch bedarfswürdig und wird sich auch noch ändern und ein paar Kleinigkeiten
        müssen noch gefixt/schöner gemacht werden (z. B. Passwort zurücksetzen, Code refactorieren und
        Admin Dashboard, Filter Funktionen usw.)
    </p>

    <h3 class="pb-3">Zukünftige Pläne?</h3>

    <ol class="list-decimal pl-6 text-xl">
        <li>Voting System</li>
        <li>Nachhilfe Nachfrage System</li>
        <li>Message Boards für Schulische Hilfe</li>
    </ol>

    <p class="max-w-2xl py-6">
        Das sind grad nur ein paar Ideen, die herum schwirren, also es ist alles noch WIP. Wenn du noch
        weitere Ideen hast oder Bugs findest ☠️☠️☠️ schreib mir auf <span
            class="text-purple-800 font-bold">Discord.</span
    >
        <Tooltip>deadgoose#0636</Tooltip>
    </p>
</section>

<section class="p-4 bg-orange-500 py-12 text-white">
    <h2 class="mx-auto pb-4">Funktionen</h2>

    <div class="flex flex-col gap-3 max-w-2xl">
        <h3 class="text-orange-300">Anmeldung/Registrieren</h3>
        <p>
            Das <b>Anmelden und Registrieren</b>, funktioniert nur per <b>Schulmail</b> (mit
            <b>@htlstp.at</b>). Die Anmeldung soll nur per Schulmail gehen, damit Fremde keinen Zugriff
            darauf bekommen. Es könnte sein, das die E-Mail zur Authentifizierung im <b>Spam-Ordner</b>
            landet, also dort
            <b>checken</b>.
        </p>

        <h3 class="text-orange-300">Rollenverteilung</h3>
        <p>
            Es gibt auf der Website <b>Rollen</b>, die man bekommen kann, wenn man angemeldet ist und ein
            <b>Profil</b>
            hat. Die Rollen haben <b>spezielle Rechte</b>, und sind dazu da
            <b>Spam und Shitposter zu löschen ♥️</b>.
        </p>

        <h3 class="text-orange-300">Test</h3>
        <p>
            Man kann Fotos von Test hochladen und alte Test anschauen. Es wird nicht gezeigt wer die Tests
            erstellt hat, damit niemand (Lehrer) sich bei den Schülern beschweren kann. Die Accounts
            werden aber gespeichert und angezeigt, wenn man eine Maintainer Rolle hat, damit man
            unpassende Nutzung löschen kann.
        </p>
        <h3 class="text-orange-300">Zitate</h3>
        <p>
            Man kann auch Zitate von Lehrern aufschreiben. Auch da gilt es das nicht angezeigt wird, wer
            was schreibt. Nur Maintainer können es sehen, also keine Angst davor geleaked zu werden 😽.
        </p>
    </div>
</section>

<section class="bg-lime-500 p-4">
    <p>Falls es euch interessiert seid, wie es gemacht wurde:</p>

    <h2 class="mb-3 mx-auto text-center">Benutzter Techstack:</h2>
    <div class="flex gap-3 flex-col lg:flex-row">
        <ul class="stack">
            <li>
                <h3>TailwindCSS</h3>
                <p>anstatt normales CSS, weil normales CSS ekelhaft zum schreiben ist.</p>
            </li>
            <li>
                <h3>SvelteKit &lt;3</h3>
                <p>
                    Als Fullstack Framework. Dazu wurde noch Flowbite als UI-Component-Library verwendet, wird
                    aber vielleicht später verworfen. Wurde mainly verwendet um ne schnelle Anfangs-Velocity
                    zu haben um mal einen Prototypen rauszuhauen.
                </p>
            </li>
            <li>
                <h3>Typescript</h3>
                <p>Anstatt Javascript, weil typsichere Sprachen einfach besser sind.</p>
            </li>
            <li>
                <h3>Supabase</h3>
                <p>Als Datenbank, weils gut ist i guess. 🤷</p>
            </li>
        </ul>
        <div>
            <p>
                Der src-code ist frei auf github.com zu finden, falls es euch juckt. (oder ihr mir nicht mit
                der Security glaubt) <a
                    target="_blank"
                    class="text-sky-500 underline"
                    href="https://github.com/fancyjimmy/htl-nicht-stp"
            >🔗</a
            >
                (Sry für den chaotischen Code und die fehlende Dokumentation )
            </p>
        </div>
    </div>
</section>

<footer class="p-6 relative">
    <div class="text-transparent absolute bottom-0 right-0">send nudes 👀. easter egg 🤫</div>
    <div class="text-sm font-semibold">
        <div>
            Schreibt mir auf <span class="text-purple-800 font-bold">Discord</span>
            <Tooltip>deadgoose#0636</Tooltip>
            , wenn ihr Ideen habt, auf Bugs stößt oder gute Lehrer Memes
            habt, die ich einbauen kann.
        </div>
        <div>love y'all 🌈😽</div>
    </div>
</footer>

<!--
{#if kanbanBoard && false}
	<Board columns={kanbanBoard} />
{/if}
-->

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

    h3 {
        @apply text-3xl font-bold;
    }

    h2 {
        @apply text-5xl font-bold;
    }

    h1,
    h2,
    h3 {
        font-family: 'DotGothic16', sans-serif;
        font-family: 'Space Mono', monospace;
    }

    p {
        @apply text-xl;
    }

    .debug {
        @apply absolute top-0 right-0 w-40 h-40 shadow;
        clip-path: polygon(100% 100%, 0 0, 100% 0);
        background: repeating-linear-gradient(45deg, #ffc731, #ffc731 18px, #000000 18px, #000000 36px);
    }

    .stack {
        @apply flex flex-col gap-3 max-w-lg w-full;
    }

    .stack li {
        @apply bg-lime-200 rounded-lg  p-2;
    }


</style>
