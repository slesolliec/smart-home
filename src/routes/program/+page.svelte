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

  
  </script>
  
  <div class="room">
    <a href="/">Accueil</a>
    - Program
  </div>

  <div class="selector">
    <select name="user_id" bind:value={selectedPerson}>
      <option value="-1">Person</option>
      {#each people as person}
        <option value={person.user_id}>{person.name}</option>
      {/each}
    </select>

    <select name="mode_id" bind:value={selectedMode}>
      <option value="-1">Mode</option>
      {#each modes as mode}
        <option value={mode.mode_id}>{mode.name}</option>
      {/each}
    </select>

    <select name="room_id" bind:value={selectedRoom}>
      <option value="-1">Room</option>
      {#each rooms as room}
        <option value={room.room_id}>{room.name}</option>
      {/each}
    </select>

    <!-- div>
      {#if selectedPerson > -1}
        {people.find((e) => e.user_id == selectedPerson).name}
      {/if}
    </div -->

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

          {#each person.Programs
              .filter((e) => e.mode_id == mode.mode_id)
              .filter((e) => e.room_id == room.room_id)
              .sort((a, b) => a.hour - b.hour) as program}
            <div class="hour">
              {((program.hour < 1000) ? '0' : '') + program.hour.toString().slice(0, -2) + ':' + program.hour.toString().slice(-2)}
            </div>
            <div class="temp"><input type="number" class="number" name={'temp-' + program.hour} value={program.temp}/>°C</div>
            <div class="action">
              <button name="action" value={'change-' + program.hour}>Change</button>
              <button name="action" value={'delete-' + program.hour}>Delete</button>
            </div>            
          {/each}

          <div class="hour"><input type="time" name="hour" value="06:00"/></div>
          <div class="temp"><input type="number" class="number" name="temp" value="15"/>°C</div>
          <div class="action"><button name="action" value="add">Add</button></div>
        </form>

      {/each}
    {/each}
  {/each}
  
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

input.number {
  width: 35px;
}

</style>