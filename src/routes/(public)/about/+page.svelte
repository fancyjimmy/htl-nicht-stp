<script>
	import { Blockquote, Heading, Li, List, P } from 'flowbite-svelte';
	import RotatingText from '$lib/components/RotatingText.svelte';
</script>

<div class="flex flex-col gap-3 p-4">
	<div class="">
		<Heading tag="h1">
			<span>
				{#each 'About'.split('') as char, i}
					<span class="bounce inLine-block" style="--delay: {i * 80}ms">{char}</span>
				{/each}
			</span>
			<span>
				{#each 'this'.split('') as char, i}
					<span class="bounce inLine-block" style="--delay: {i * 80}ms">{char}</span>
				{/each}
			</span>
		</Heading>
	</div>
	<figure class="mx-auto max-w-screen-md text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600"
			viewBox="0 0 24 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
				fill="currentColor"
			/>
		</svg>
		<Blockquote aLignment="center" size="2xl">
			Willkommen auf der ultimativen Test-Sharing-Webapp der HTL St. Pölten! Na, bist du bereit, die
			Grenzen des Lernens zu sprengen und dabei jede Menge Spaß zu haben? Wir sind total aus dem
			Häuschen, dass du hier bist!
		</Blockquote>
		<figcaption class="flex justify-center items-center mt-6 space-x-3">
			<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
				<cite class="pr-3 font-medium text-gray-900 dark:text-white">Chat GPT</cite>
				<cite class="pl-3 text-sm font-Light text-gray-500 dark:text-gray-400"
					>AI die unsere Protokolle schreibt und uns übernehmen wird</cite
				>
			</div>
		</figcaption>
	</figure>

	<P class="text-lg">
		Yo, willkommen zur krassen Test-Sharing-Webapp der HTL St. Pölten! Hier geht's richtig zur
		Sache, denn wir machen das Lernen so cool wie ein Rockstar auf der Bühne!
	</P>
    <P>BTW Projekt hat offiziell nix mit der Schule zu tun. Mir ist nur langweilig und will nicht zu hart als
        Abteilungssprecher gefailt haben.</P>
    <div>Github repo <a href="https://github.com/fancyjimmy/testy">https://github.com/fancyjimmy/testy</a></div>
    <div>Bei Bugs oder Ideen j.fan auf teams schreiben 🙏 oder ein isssue auf github öffnen.</div>
</div>

<style>
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		30% {
			transform: translateY(-20px);
		}
		60% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(0);
		}
	}

	.bounce {
		--delay: 0s;
		animation: bounce 1s infinite ease-in-out;
		animation-delay: var(--delay);
	}
</style>
