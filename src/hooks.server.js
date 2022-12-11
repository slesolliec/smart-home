// we get the room state object and pass it to rfxcom

import { setTargetTemperatures } from "$lib/server/regulator"
import { start } from "$lib/server/rfxcom"
import { getAllData } from "$lib/server/tuya"

console.log('app server starting')

// RFXcom
start()

/*
// Tuya
getAllData()

let tuyaInterval
if (! tuyaInterval) {
  setInterval(getAllData, 300 * 1000)
}
*/

setTargetTemperatures()