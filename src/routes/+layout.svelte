<script lang="ts">
	import '../app.css';
	import Header from './(public)/Header.svelte';
	import { FirebaseApp } from 'sveltefire';
	import { auth} from '$lib/firebase';
    import {browser} from "$app/environment";
    import {getFirestore} from "firebase/firestore";
    import {app} from "../lib/firebase";

    let firestore;
    if (browser){
        firestore = getFirestore(app);
    }

</script>

<FirebaseApp {auth} {firestore}>
    <slot/>
</FirebaseApp>

<style>
</style>
