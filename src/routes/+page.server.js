
// import people from "$lib/server/people"
import { Op } from "sequelize"
import { Mode, RoomCurrent, User, Week, Program } from "$lib/server/db"
import log from "$lib/server/log"

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const now = new Date()
  let nowTime = 0

  if (now.getMinutes() < 10) {
    nowTime = Number(now.getHours().toString() + '0' + now.getMinutes().toString())
  } else {
    nowTime = Number(now.getHours().toString() + now.getMinutes().toString())
  }

  const rooms  = JSON.parse(JSON.stringify(await RoomCurrent.findAll()))

  const people = JSON.parse(JSON.stringify(await User.findAll({
    include: {
      model: Week,
      include: Mode
    },
    order: ['user_id']
  })))

  const allTargets = []

  for (const room of rooms) {
    let targetTemp = {
      temp: 0,
      user_id: -1
    }

    for (const person of people) {

      const userMode = await Week.findOne({
        where: {
          user_id: person.user_id,
          weekday: now.getDay()
        }
      })

      if (userMode) {

        let userTarget = (await Program.findOne({
          where: {
            user_id: person.user_id,
            room_id: room.room_id,
            mode_id: userMode.mode_id,
            hour: {
              [Op.lt]: nowTime
            }
          },
          order: [['hour', 'DESC']],
          limit: 1,
        }))

        if (userTarget) {

          if (userTarget.temp > targetTemp.temp) {
            targetTemp.temp = userTarget.temp
            targetTemp.user_id = userTarget.user_id
          }
        }
      }
    }
    
    log.debug('Target for room ' + room.name + ' is ' + targetTemp.temp + ' by ' + targetTemp.user_id)

    room.target = targetTemp
  }


  const modes  = JSON.parse(JSON.stringify(await Mode.findAll()))



  return { modes, rooms, people }
}

