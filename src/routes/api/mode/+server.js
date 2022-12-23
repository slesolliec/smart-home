
import { Week } from '$lib/server/db'
import log from '$lib/server/log'
import { redirect } from '@sveltejs/kit'



/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {

  const data = await request.formData()
  // console.log(data)
  log.debug(`set mode ${data.get('mode_id')} for user ${data.get('user_id')} on weekday ${data.get('weekday')}`)

  // get user/day
  const userDay = await Week.findOne({where: {
    user_id: data.get('user_id'),
    weekday: data.get('weekday')
  }})

  if (userDay) {
    userDay.mode_id = data.get('mode_id')
    userDay.save()
    throw redirect(302, '/')
  }

  Week.create({
    user_id: data.get('user_id'),
    weekday: data.get('weekday'),
    mode_id: data.get('mode_id')
  })
  throw redirect(302, '/')
}
