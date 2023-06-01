<script lang="ts">
	import '../app.css';
	import Header from './(public)/Header.svelte';
	import { FirebaseApp } from 'sveltefire';
	import { auth } from '$lib/firebase';

</script>

<FirebaseApp {auth}>
    <slot/>
</FirebaseApp>

<style>
</style>
