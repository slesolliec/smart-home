

import log  from "$lib/server/log"

import { switchPlug }  from "$lib/server/tuya"
import { RoomCurrent } from "$lib/server/db"
import { rooms }       from "$lib/server/state"



async function switcher() {
  log.debug('switcher() called')

  // we loop on rooms
  for (const i in rooms) {
    let room = rooms[i]

    if (room.isSwitch) {
      const dbRoom = await RoomCurrent.findOne({where: {room_id: room.room_id}})

      log.debug(room.name +' : '+ (dbRoom.temp / 10) +' => '+ room.tempTarget)

      if ( (dbRoom.temp / 10) < room.target.temp) {
        // too cold
        if ( ! dbRoom.is_on) {
          log.info(`We switch ${room.name} On`)
          switchPlug(true, dbRoom.smart_plug)
        }
      } else {
        // too hot
        if (dbRoom.is_on) {
          log.info(`we switch ${room.name} Off`)
          switchPlug(false, dbRoom.smart_plug)
        }
      }
    }
  }
}


function setTargetTemperatures(doSwitch = true) {

  if (doSwitch)  switcher()
}

export { setTargetTemperatures }

