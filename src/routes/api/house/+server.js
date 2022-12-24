
// import people from "$lib/server/people"
import { Mode, User, Week } from "$lib/server/db"
import { getState }   from "$lib/server/state"
import { json }       from "@sveltejs/kit"


/** @type {import('./$types').RequestHandler} */
export async function GET() {

  const data = {}

  data.modes  = JSON.parse(JSON.stringify(await Mode.findAll()))
  data.people = JSON.parse(JSON.stringify(await User.findAll({
    include: {
      model: Week,
      include: Mode
    },
    order: ['user_id']
  })))
  data.rooms  = await getState()

  return json(data)
}

