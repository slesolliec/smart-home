
// import people from "$lib/server/people"
import { Mode, RoomCurrent, User, Week } from "$lib/server/db"

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const rooms  = JSON.parse(JSON.stringify(await RoomCurrent.findAll()))
  const modes  = JSON.parse(JSON.stringify(await Mode.findAll()))

  const people = JSON.parse(JSON.stringify(await User.findAll({
    include: {
      model: Week,
      include: Mode
    },
    order: ['user_id']
  })))


  return { modes, rooms, people }
}

