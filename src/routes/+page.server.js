import rooms from "$lib/server/rooms"


/** @type {import('./$types').PageServerLoad} */
export async function load() {

  return { rooms }
}

