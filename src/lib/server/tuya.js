
import rooms      from "$lib/server/rooms"
import TuyAPI     from 'tuyapi'
import getTuyaKey from "$lib/server/tuya-keys"


async function getAllData() {
  for (const i in rooms) {
    let room = rooms[i]
    if (room.tuyaId) {
      const device = new TuyAPI({id: room.tuyaId, key: getTuyaKey(room.tuyaId)})
      await device.find()
      await device.connect()
      const {dps} = await device.get({schema: true})
      room.power = Math.floor(dps['19'] / 10)
      room.switchOn = dps['1']
      
      let msg = room.name
      while (msg.length < 10) msg += ' '
      msg += dps['1'] ? 'On  ' : 'Off '
      msg += dps['17'] + '  '
      msg += dps['18'] + ' mA  '
      msg += Math.floor(dps['19'] / 10) + ' W  '
      msg += Math.floor(dps['20'] / 10) + ' V  '
      msg += dps['22'] + '  '
      msg += dps['23'] + '  '
      msg += dps['24'] + '  '
      msg += dps['25'] + '  '

      console.log(msg)
      await device.disconnect()
    }

    /*
    if (room.tuyaSensor) {
      console.log('getting temp from ' + room.name)
      const device = new TuyAPI({id: room.tuyaSensor, key: getTuyaKey(room.tuyaSensor)})
      await device.find()
      await device.connect()
      const {dps} = await device.get({schema: true})
      console.log(dps)
      await device.disconnect()
    }
    */
  }


}

async function switchPlug(switchOn = true, tuyaId = '') {
  const device = new TuyAPI({id: tuyaId, key: getTuyaKey(tuyaId)})
  await device.find()
  await device.connect()
//  const status = await device.get()
  if (switchOn) {
    await device.set({set: true})
  } else {
    await device.set({set: false})
  }
  await device.disconnect()
}


export { getAllData, switchPlug }



/* smart plugs

Data from device: {
  dps: {
    '1': true,   // status: = on
    '9': 0,
    '17': 6,
    '18': 312,   // intensite: 312  mA
    '19': 126,   // puissance:  12.6 W
    '20': 2276,  // tension::  227.6 V
    '21': 1,
    '22': 564,
    '23': 29285,
    '24': 15695,
    '25': 2650,
    '26': 0,
    '41': '',
    '42': ''
  }
}

*/