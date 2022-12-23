<script>

  import Modal, { getModal } from "$lib/components/Modal.svelte"
  import Room                from "$lib/components/Room.svelte"
  
  
  /** @type {import('./$types').PageLoad} */
  export let data
  
  let rooms  = data.rooms
  let people = data.people
  let modes  = data.modes
  
  // console.log(people)

  let selectedPerson = data.selected.user || -1
  let selectedRoom   = data.selected.room || -1
  let selectedMode   = data.selected.mode || -1


  
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
  
//  setInterval(() => console.log(selectedPerson), 2000)
  
  
  </script>
  
  <div class="room">
    Program
  </div>

  <form method="post" action="/api/program">
  
    <div class="selector">
      <select name="user_id" bind:value={selectedPerson}>
        <option value="-1" selected>Person</option>
        {#each people as person}
          <option value={person.user_id}>{person.name}</option>
        {/each}
      </select>
  
      <select name="mode_id" bind:value={selectedMode}>
        <option value="-1" selected>Mode</option>
        {#each modes as mode}
          <option value={mode.mode_id}>{mode.name}</option>
        {/each}
      </select>
  
      <select name="room_id" bind:value={selectedRoom}>
        <option value="-1" selected>Room</option>
        {#each rooms as room}
          <option value={room.room_id}>{room.name}</option>
        {/each}
      </select>
  
    </div>
  
    {#each people.filter((e) => (selectedPerson < 0) || e.user_id == selectedPerson) as person}

      {#each modes.filter((e) => (selectedMode < 0) || e.mode_id == selectedMode) as mode}

        {#each rooms.filter((e) => (selectedRoom < 0) || e.room_id == selectedRoom) as room}

          <div class="room">{person.name} - {mode.name} - {room.name}</div>

          <form class="hours" method="post" action="/api/program">
            <input type="hidden" name="selected_user" value={selectedPerson}/>
            <input type="hidden" name="selected_mode" value={selectedMode}/>
            <input type="hidden" name="selected_room" value={selectedRoom}/>
            <input type="hidden" name="user_id" value={person.user_id} />
            <input type="hidden" name="mode_id" value={mode.mode_id} />
            <input type="hidden" name="room_id" value={room.room_id} />

            <div class="hour"><input type="time" name="hour" value="06:00"/></div>
            <div class="temp"><input type="integer" name="temp" value="15" size="2"/>°C</div>
            <div class="action"><button>Add</button></div>
          </form>

        {/each}
      {/each}
    {/each}
  
  </form>
  
  
  
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
  
.selector {
  @apply mx-1 my-2 grid grid-cols-3 gap-4;
}
  
.selector select {
  @apply text-lg rounded-md bg-slate-200;
}

.hours {
  @apply mx-auto my-2 grid grid-cols-3 gap-4 w-fit;
}

.hours div {
  @apply text-center;
}
</style>