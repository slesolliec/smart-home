import rooms  from "$lib/server/rooms"
import people from "$lib/server/people"
import week   from "$lib/server/week"

/** @type {import('./$types').PageServerLoad} */
export async function load() {

  return { rooms, people, week }
}

