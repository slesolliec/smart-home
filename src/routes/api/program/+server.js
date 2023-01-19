
import { Program, Week }     from '$lib/server/db'
import log          from '$lib/server/log'
import { redirect } from '@sveltejs/kit'



/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {

  const data = await request.formData()
  // console.log(data)

  if (data.get('action') == 'add') {
    await addTemp(data)
  } else {
    const [action, hour] = data.get('action').split('-')

    if (action == 'change') await changeTemp(data, hour)
    if (action == 'delete') await deleteTemp(data, hour)
  }

  // handle redirect to proper page
  let url = []
  if (data.get('selected_user') > -1) url.push('user=' + data.get('selected_user')) 
  if (data.get('selected_mode') > -1) url.push('mode=' + data.get('selected_mode')) 
  if (data.get('selected_room') > -1) url.push('room=' + data.get('selected_room'))

  if (url) throw redirect(302, '/program?' + url.join('&'))

  throw redirect(302, '/program')
}


async function addTemp(data) {
  // get user/day
  const program = await Program.findOne({where: {
    user_id: data.get('user_id'),
    mode_id: data.get('mode_id'),
    room_id: data.get('room_id'),
    hour:    Number(data.get('hour').split(':').join(''))
  }})

  if (program) {
    program.temp = data.get('temp')
    await program.save()
  } else {
    await Program.create({
      user_id: data.get('user_id'),
      room_id: data.get('room_id'),
      mode_id: data.get('mode_id'),
      hour: Number(data.get('hour').split(':').join('')),
      temp:  data.get('temp')
    })
  }

  log.program(`target temp set ${data.get('hour')}=>${data.get('temp')}° for mode=${data.get('mode_id')} user=${data.get('user_id')} room=${data.get('room_id')}`)
}

async function changeTemp(data, hour) {
  // get user/day
  const program = await Program.findOne({where: {
    user_id: data.get('user_id'),
    mode_id: data.get('mode_id'),
    room_id: data.get('room_id'),
    hour:  hour
  }})

  if (program) {
    program.temp = data.get('temp-' + hour)
    await program.save()
  } else {
    await Program.create({
      user_id: data.get('user_id'),
      room_id: data.get('room_id'),
      mode_id: data.get('mode_id'),
      hour: hour,
      temp:  data.get('temp-' + hour)
    })
  }
  log.program(`target temp set ${data.get('hour')}=>${data.get('temp')}° for mode=${data.get('mode_id')} user=${data.get('user_id')} room=${data.get('room_id')}`)
}


async function deleteTemp(data, hour) {
  await Program.destroy({where: {
    user_id: data.get('user_id'),
    mode_id: data.get('mode_id'),
    room_id: data.get('room_id'),
    hour:  hour
  }})
  log.program(`target temp deleted ${data.get('hour')}=>☠️ for mode=${data.get('mode_id')} user=${data.get('user_id')} room=${data.get('room_id')}`)
}
