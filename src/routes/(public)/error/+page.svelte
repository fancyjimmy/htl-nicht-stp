<script lang="ts">
    import {A, Alert} from 'flowbite-svelte';

    export let data;
</script>

<div class="w-full h-full flex items-center justify-center relative">
    <img src="/images/weber.jpg" alt="Weber" class="w-full h-full"/>
    <div class="absolute inset-0 w-min m-auto h-min">
        <Alert color="red" class="p-5 w-full">
  <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                                  clip-rule="evenodd"></path></svg>
  </span>
            <h1 class="text-3xl font-extrabold">Fehler</h1>
            <div slot="extra">
                <p>
                    {data.message ?? 'Ein Fehler ist aufgetreten.'}
                </p>
                <A href="/">Home</A>
            </div>
        </Alert>
    </div>
</div>
