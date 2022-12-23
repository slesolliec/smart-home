
// import people from "$lib/server/people"
import week   from "$lib/server/week"
import { Mode, RoomCurrent, User } from "$lib/server/db"

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const rooms  = JSON.parse(JSON.stringify(await RoomCurrent.findAll()))
  const people = JSON.parse(JSON.stringify(await User.findAll()))
  const modes  = JSON.parse(JSON.stringify(await Mode.findAll()))

  return { modes, rooms, people, week }
}

