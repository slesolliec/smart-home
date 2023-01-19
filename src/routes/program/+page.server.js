
// import people from "$lib/server/people"
import { Mode, RoomCurrent, User, Week, Program } from "$lib/server/db"
import { Op } from "sequelize"

/** @type {import('./$types').PageServerLoad} */
export async function load({url}) {

  // forward search params to view
  // console.log(url.searchParams)
  const search = url.searchParams
  const selected = {}
  if (search.get('user')) selected.user = search.get('user')
  if (search.get('mode')) selected.mode = search.get('mode')
  if (search.get('room')) selected.room = search.get('room')


  const rooms  = JSON.parse(JSON.stringify(await RoomCurrent.findAll()))
  const modes  = JSON.parse(JSON.stringify(await Mode.findAll()))

  const people = JSON.parse(JSON.stringify(await User.findAll({
    include: {
      model: Program,
      order: ['mode_id', 'room_id', 'hour']
    },
    order: ['user_id']
  })))


  return { modes, rooms, people, selected }
}

