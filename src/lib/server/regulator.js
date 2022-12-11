
import rooms from "$lib/server/rooms"

import mag from "$lib/server/people/mag"

const people = [mag]


function setTargetTemperatures() {
  const now = new Date()
  const hour = now.getHours() + 'h' + now.getMinutes()
  console.log('hour=' + hour)

  for (const i in rooms) {
    let room = rooms[i]

    for (const person of people) {
      for (const r of person.teletravail.rooms) {
        if (r.name == room.name) {
          console.log(r.name)
          let temptempTarget
          for (const h in r.hours) {
            console.log(h + ' ' + hour)
            if (h < hour) {
              temptempTarget = r.hours[h]
            }
          }
          if (temptempTarget > room.tempTarget) {
            room.tempTarget = temptempTarget
          }
        }
      }
    }
  }
}

export { setTargetTemperatures }

