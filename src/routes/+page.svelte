<script>

import Modal, { getModal } from "$lib/components/Modal.svelte"
import Room                from "$lib/components/Room.svelte"


/** @type {import('./$types').PageLoad} */
export let data

let rooms  = data.rooms
let people = data.people
let modes  = data.modes

// console.log(people)

let chooseUser = 1
let chooseDay  = 0

let currentDay = new Date().getDay()

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

function totalPower() {
  let power = 0
  for (const room of rooms) {
    power += Number(room.power)
  }
  return power
}

function choose(user_id, day) {
  chooseUser = user_id
  chooseDay  = day
  getModal('modal-choose-mode').open()
  console.log(user_id, day)
}

async function chooseMode(mode_id) {
  await fetch(`/api/mode/?user_id=${chooseUser}&day=${chooseDay}&mode=${mode_id}`)
  getModal('modal-choose-mode').close()
//  document.location.reload()
}



</script>

<div class="room">
  Puissance totale : <strong>{totalPower()}W</strong>
</div>


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
      <div on:click={() => choose(person.user_id, day)}
          class={'activity ' + person.Weeks.find(e => e.weekday == day)?.Mode.name.toLowerCase() || '' + (currentDay == day ? ' today' : '')}>
        {person.Weeks.find(e => e.weekday == day)?.Mode.name || ''}
      </div>
    {/each}
  {/each}
</div>

<div class="room">
  <a href="/program">Program</a>
</div>



<Modal id="modal-choose-mode">
  <div class="modal-choose">
    <div style="margin-bottom: 8px; text-align: center; font-weight: bold;">{people.filter((p) => p.user_id == chooseUser)[0].name} - {days[chooseDay]}</div>

    <form method="post" action="/api/mode">
      <input type="hidden" name="user_id" value={chooseUser}/>
      <input type="hidden" name="weekday" value={chooseDay}/>
      {#each modes as mode}
        <button name="mode_id" value={mode.mode_id}
            class={mode.name.toLowerCase()}>
          {mode.name}
        </button><br>
      {/each}
    </form>
  </div>
</Modal>

<style>

div.activity {
  @apply hover:cursor-pointer;
}

div.modal-choose button {
  @apply pt-2 pb-1.5;
  width: 100px;
}

</style>