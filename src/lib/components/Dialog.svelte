<script>
    let dialog;

    let className;

    export {className as class};

    export function openDialog() {
        dialog.showModal();
    }

    export function closeDialog() {
        dialog.close();
    }
</script>

<dialog bind:this={dialog} class="{className || ''}">
    <slot></slot>
</dialog>


<style>

    dialog::backdrop {
        @apply bg-black bg-opacity-50 backdrop-blur;
    }

</style>