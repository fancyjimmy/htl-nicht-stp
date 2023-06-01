<script>
import NewDialog from "../NewDialog.svelte";
import Icon from "@iconify/svelte";
import {Input, Label, Textarea} from "flowbite-svelte";
import {Collection, Doc} from "sveltefire";
let form = {
    color: "#13096e",
};
</script>

<p>Subject</p>

<Collection ref="/subject" let:data let:ref={ref}>
    {JSON.stringify(data)}
</Collection>


<NewDialog title="Neues Fach Erstellen" {form} on:create={(event) => {
    console.log(form);

}}>
    <p slot="button" class="flex">
        <span>Neues Fach Erstellen</span> <span class="text-xl"><Icon icon="mdi:add"/></span>
    </p>
    <div slot="form">
        <div class="mb-2">
            <Label class="block mb-2">Name</Label>
            <Input type="text" placeholder="Name" required bind:value={form.name}>
                <div slot="left" class="text-xl">
                    <Icon icon="mdi:user"></Icon>
                </div>
            </Input>
        </div>

        <div class="mb-2">
            <Label class="block mb-2">Beschreibung</Label>
            <Textarea placeholder="Beschreibung" required bind:value={form.description} rows="4">
            </Textarea>
        </div>
        <div class="mb-2">
            <Label class="block mb-2">Farbe</Label>
            <Input type="color" placeholder="Farbe" class="h-12" required bind:value={form.color}>
                <div slot="left" class="text-xl">
                    <Icon icon="mdi:color"></Icon>
                </div>
            </Input>
        </div>
    </div>
</NewDialog>