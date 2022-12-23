<script>

export let room = {
  name:        "my room",
  power:       0,
  switchOn:    false,
  tempTarget:  15,
  tempCurrent: 10,
  tuyaId:      ''
}

</script>




<div class="room">
  {#if room.smart_plug}
    <div class={room.is_on ? 'power on' : 'power off' }>{room.power}W</div>
  {/if}
  {#if room.smart_plug}
  <div class="temp-target">{room.tempTarget}°</div>
  {/if}
  <div class="temp-current">
    {#if room.temp}
      {String(room.temp).slice(0, -1)}<small>.{String(room.temp).slice(-1)}</small>°
    {:else}
      ??°
    {/if}
  </div>
  <div class="name">{room.name}</div>
</div>

