<script lang="ts">
    import {Select} from "flowbite-svelte";
    import IconAvatar from "$lib/components/IconAvatar.svelte";
    import {avatars} from "$lib/utils";

    export let value = "kein Avatar";
    export let required = false;
</script>
<div class="mb-2">
    <h3 class="mb-2 font-semibold text-lg">Avatar</h3>
    <div class="flex gap-3 ">
        <div class="flex-1 flex items-center">
            <Select
                    items={Object.keys(avatars).map((name) => {
							return { name, value: name };
						})}
                    placeholder="Avatar"
                    bind:value
                    required={required}
            />
        </div>
    </div>
</div>