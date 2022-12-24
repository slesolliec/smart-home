import log  from "$lib/server/log"

import { switchPlug }        from "$lib/server/tuya"
import { RoomCurrent }       from "$lib/server/db"
import { getState }          from "$lib/server/state"
import { switchVentilation } from "$lib/server/rfxcom"



async function switcher() {
  log.debug('switcher() called')

  let rooms = await getState()

  // we loop on rooms
  for (const i in rooms) {
    let room = rooms[i]

    if (room.smart_plug) {
      const dbRoom = await RoomCurrent.findOne({where: {room_id: room.room_id}})

      log.debug(room.name +' : '+ (dbRoom.temp / 10) +' => '+ room.target.temp)

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


async function switchVent() {
  const SdBain = await RoomCurrent.findOne({where: {room_id: 7}})

  console.log('Hydro SdBain =', SdBain.hydro)

  if (SdBain.hydro > 75) {
    switchVentilation(true)
  } else {
    switchVentilation(false)
  }
}


export { switcher, switchVent }
