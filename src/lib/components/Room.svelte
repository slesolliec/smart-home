<script>

export let room = {
  name: "my room",
  power: 0,
  tempTarget: 15,
  tempCurrent: 10
}

</script>




<div class="room">
  <div class="power">{room.power}W</div>
  <div class="temp-target">{room.tempTarget}°</div>
  <div class="temp-current">{room.tempCurrent}°</div>
  <div class="name">{room.name}</div>
</div>

