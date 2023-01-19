// we get the room state object and pass it to rfxcom

import { switcher, switchVent }  from "$lib/server/regulator"
import { start }                 from "$lib/server/rfxcom"
import { getAllData }            from "$lib/server/tuya"

console.log('app server starting')

// RFXcom
start()


// Tuya
getAllData()

let tuyaInterval
if (! tuyaInterval) {
  setInterval(getAllData, 360 * 1000)
}


switcher(false)

setInterval(switcher,   150 * 1000)
setInterval(switchVent, 300 * 1000)
