<script>
    import {A} from "flowbite-svelte";

    export let data;
</script>

<A href="\login">Login</A>

<p>{JSON.stringify(data.profile)}</p>