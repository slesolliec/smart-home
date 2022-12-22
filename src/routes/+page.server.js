
import people from "$lib/server/people"
import week   from "$lib/server/week"
import { RoomCurrent } from "$lib/server/db"

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const rooms = JSON.parse(JSON.stringify(await RoomCurrent.findAll()))

  return { rooms, people, week }
}

