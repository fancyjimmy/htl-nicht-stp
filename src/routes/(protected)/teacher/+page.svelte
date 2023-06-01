<script lang="ts">

    import {onMount} from "svelte";
    import {firestore} from "../../../lib/firebase";
    import {collection, query, where, getDocs} from "firebase/firestore";

    onMount(async () => {

        const q = query(collection(firestore, "subject"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
</script>
<p>Teacher</p>