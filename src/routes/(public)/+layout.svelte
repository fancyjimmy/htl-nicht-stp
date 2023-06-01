<script>
    import Header from "./Header.svelte";
</script>

<div class="flex flex-col">
    <Header />

    <main class="flex-1 relative">
        <div class="absolute inset-0">
            <slot />
        </div>
    </main>
</div>