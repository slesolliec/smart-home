<script>

import Room from "$lib/components/Room.svelte"


/** @type {import('./$types').PageLoad} */
export let data

let rooms  = data.rooms
let people = data.people
let week   = data.week

let currentDay = new Date().getDay()

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

</script>

<div class="house">
  {#each rooms as room}
    <Room room={room}></Room>
  {/each}
</div>

<div class="people">
  <div></div>
  {#each [1, 2, 3, 4, 5, 6, 0] as day}
    <div class={currentDay == day ? ' today' : ''}>
      <span class="small-day">{days[day].slice(0, 3)}.</span><span class="long-day">{days[day]}</span>
    </div>
  {/each}

  {#each people as person}
    <div class="bold">{person.name}</div>
    {#each [1, 2, 3, 4, 5, 6, 0] as day}
      <div class={'activity ' + week[day][person.name.toLowerCase()] + (currentDay == day ? ' today' : '')}>
        {week[day][person.name.toLowerCase()]}
      </div>
    {/each}
  {/each}
</div>
