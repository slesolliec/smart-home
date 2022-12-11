<script>

import Room from "$lib/components/Room.svelte"


/** @type {import('./$types').PageLoad} */
export let data

let rooms = data.rooms


</script>



<div class="house">
  {#each rooms as room}
    <Room room={room}></Room>
  {/each}
</div>


