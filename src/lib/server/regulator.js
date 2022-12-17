
import rooms  from "$lib/server/rooms"
import people from "$lib/server/people"
import week   from "$lib/server/week"

import log    from "$lib/server/log"

import { switchPlug } from "$lib/server/tuya"


function myCompare(hm1, hm2) {
  let [h1, m1] = hm1.split('h')
  let [h2, m2] = hm2.split('h')

  h1 = Number(h1)
  h2 = Number(h2)

  if (h1 < h2) return true
  if (h1 > h2) return false

  m1 = Number(m1)
  m2 = Number(m2)

  if (m1 < m2) return true

  return false
}


async function switcher() {
  log.debug('switcher() called')

  // we loop on rooms
  for (const i in rooms) {
    let room = rooms[i]

    if (room.isSwitch) {
      log.debug(room.name +' : '+ room.tempCurrent +' => '+ room.tempTarget)

      if (room.tempCurrent < room.tempTarget) {
        // too cold
        if ( ! room.switchOn) {
          log.info(`we switch ${room.name} On`)
          switchPlug(true, room.tuyaId)
          room.switchOn = true

        }
      } else {
        // too hot
        if (room.switchOn) {
          log.info(`we switch ${room.name} Off`)
          switchPlug(false, room.tuyaId)
          room.switchOn = false

        }
      }
    }
  }

}


function setTargetTemperatures(doSwitch = true) {
  const now = new Date()
  const hour = now.getHours() + 'h' + now.getMinutes()
  console.log('hour=' + hour)

  // we loop on rooms
  for (const i in rooms) {
    let room = rooms[i]
    room.tempTarget = 0

    // we loop on people
    for (const person of people) {

      // we get the mode of the person
      const day  = new Date().getDay()
      const mode = week[day][person.name.toLowerCase()]

      // loop on rooms of the person
      for (const r of person[mode].rooms) {

        // filter on room
        if (r.name == room.name) {

          // temporary temperature target = temp target for the person
          let temptempTarget = 0
          for (const h in r.hours) {
            // console.log(h + ' ' + hour)
            if (myCompare(h, hour)) {
              // console.log(h, hour)
              // console.log('temp temp target set to ' + r.hours[h])
              temptempTarget = r.hours[h]
            }
          }

          room.tempTarget = Math.max(room.tempTarget, temptempTarget)
        }
      }
    }
  }

  if (doSwitch)  switcher()
}

export { setTargetTemperatures }

