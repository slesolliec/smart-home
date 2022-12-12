<script>

export let room = {
  name: "my room",
  power: 0,
  switchOn: false,
  tempTarget: 15,
  tempCurrent: 10
}

</script>




<div class="room">
  <div class={room.switchOn ? 'power on' : 'power off' }>{room.power}W</div>
  <div class="temp-target">{room.tempTarget}°</div>
  <div class="temp-current">{room.tempCurrent}°</div>
  <div class="name">{room.name}</div>
</div>

