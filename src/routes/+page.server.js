
// import people from "$lib/server/people"
import { Mode }          from "$lib/server/db"
import { people, rooms } from "$lib/server/state"

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  const modes  = JSON.parse(JSON.stringify(await Mode.findAll()))

  return { modes, rooms, people }
}

