<script lang="ts">

    import Icon from "@iconify/svelte";

    const navItems = [
        {name: "Fächer", href: "/subject", icon: "mdi:text-subject"},
        {name: "Tests", href: "/test", icon: "grommet-icons:test"},
        {name: "Lehrer", href: "/teacher", icon: "mdi:teacher"},
    ]
</script>

<nav class="h-screen w-60 dark:bg-slate-900 bg-slate-100 dark:text-slate-100 text-slate-800 flex flex-col divide-y-2 divide-slate-300 dark:divide-slate-800">
<div class="p-2">
    <span class="text-5xl">📃</span> <span class="font-bold text-3xl">testy</span>
</div>
    <div class="flex flex-col">
        {#each navItems as navItem}
            <div class="p-2">
                <a href={navItem.href} class="flex items-center space-x-2 text-2xl">

                    <Icon icon={navItem.icon}/>
                    <span class="text-lg font-semibold">{navItem.name}</span>
                </a>
            </div>
        {/each}
    </div>
</nav>