// rfxcom will receive the room state object from hook.server.js

import rfxcom from 'rfxcom'
import log    from '$lib/server/log'
import { Room, Thermo } from './db'

const rfxtrx = new rfxcom.RfxCom("/dev/tty.usbserial-A1QBWMO", {debug: false})

// const velux = new rfxcom.Rfy(rfxtrx, rfxcom.rfy.RFY)

// const contact = new rfxcom.Lighting2(rfxtrx, rfxcom.lighting2.AC)



/*
setInterval(function() {
  velux.program("0x66000/1", function(err, res, seqNum) {
    console.log('err=', err)
    console.log('res=', res)
    console.log('seqNum=', seqNum)
  })
//  velux.down("0x10203/1", function(err, res, sequenceNumber) {
//    if (!err) console.log('complete');
//})
}, 60 * 1000)
*/


/*
setInterval(function() {
  contact.switchOn("0x11/1", function(err, res, seqNum) {
    console.log('err=', err)
    console.log('res=', res)
    console.log('seqNum=', seqNum)
  })
}, 30 * 1000)
*/

// this will hold the reference to the room.js module

function start() {

  // at start, we set the rooms to the reference of the room object
  console.log('starting sensor')

  rfxtrx.initialise(function () {
    console.log("Device initialised")
  })
}


rfxtrx.on('receive', function(evt) {
  if ((evt[0] != 10) || (evt[1] != 82)) {
    console.log(evt)
  }
})

rfxtrx.on('temperaturehumidity1', receiveTemp)


async function receiveTemp(evt) {

  const room = await Room.findOne({sensor: evt.id})

  if (! room) {
    log.warning('Could not find room with sensor ' + evt.id)
    console.log(evt)
    return
  }

  Thermo.Create({
    room_id: room.room_id,
    temp:    evt.temperature * 10,
    hydro:   evt.humidity
  })

  log.debug(room.name + ' updated to ' + evt.temperature + '°')
}

export { start }
