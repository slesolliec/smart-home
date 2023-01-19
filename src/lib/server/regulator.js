import log  from "$lib/server/log"

import { switchPlug }        from "$lib/server/tuya"
import { RoomCurrent }       from "$lib/server/db"
import { getState }          from "$lib/server/state"
import { switchHeaterOff, switchHeaterOn, switchVentilation } from "$lib/server/rfxcom"


async function switcher() {
  log.debug('switcher() called')

  let rooms = await getState()

  // console.log(rooms)

  // we loop on rooms
  for (const i in rooms) {
    let room = rooms[i]

    // palier
    if (room.dio_heater) {
      if ((room.temp / 10) < room.target.temp) {
        // too cold
        switchHeaterOn(room)
      } else {
        // too hot
        switchHeaterOff(room)
      }

    } else if (room.smart_plug) {
      // in case that room does not have a DIO switch
      // we will use the available Smart Plugs to power
      // the heaters

      // log.debug(room.name +' : '+ (room.temp / 10) +' => '+ room.target.temp)
      if ( (room.temp / 10) < room.target.temp) {
        // too cold
        if ( ! room.is_on) {
          log.info(`🟢 We switch ${room.name} On`)
          switchPlug(true, room.smart_plug)
        }
      } else {
        // too hot
        if (room.is_on) {
          log.info(`🔴 We switch ${room.name} Off`)
          switchPlug(false, room.smart_plug)
        }
      }
    }
  }
}


// switching VMC in bathroom in case hydrometry is above threshold
async function switchVent() {
  const SdBain = await RoomCurrent.findOne({where: {room_id: 7}})

  if (SdBain.hydro > 70) {
    log.debug(`😰 Hydro SdBain = ${SdBain.hydro}%`)
    switchVentilation(true)
  } else {
    log.debug(`🙂 Hydro SdBain = ${SdBain.hydro}%`)
    switchVentilation(false)
  }
}


export { switcher, switchVent }
