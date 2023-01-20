// rfxcom will receive the room state object from hook.server.js

import rfxcom, { Lighting2 } from 'rfxcom'
import log                   from '$lib/server/log'
import { minString }         from '$lib/utils'
import { Room, Thermo }      from './db'

const rfxtrx = new rfxcom.RfxCom("/dev/tty.usbserial-A1QBWMO", {debug: false})
const telecommande = new Lighting2(rfxtrx, rfxcom.lighting2.AC)
// 0x25072F is the prefix of my DIO remote control
const remotePrefix = "0x25072F/"

// const velux = new rfxcom.Rfy(rfxtrx, rfxcom.rfy.RFY)


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



function start() {

  console.log('RFXcom initialization')

  rfxtrx.initialise(function () {
    console.log("RFXcom initialized")
  })
}


rfxtrx.on('receive', function(evt) {
  if ((evt[0] != 10) || (evt[1] != 82)) {
    console.log(evt)
  }
})

rfxtrx.on('temperaturehumidity1', receiveTemp)


async function receiveTemp(evt) {

  const room = await Room.findOne({ where: { sensor: evt.id}})

  if (! room) {
    if (evt.id == '0xC00E') {
      log.info('Temp outside is ' + evt.temperature + '°')
      return
    }

    log.warning('Could not find room with sensor ' + evt.id)
    console.log(evt)
    return
  }

  Thermo.create({
    room_id: room.room_id,
    temp:    evt.temperature * 10,
    hydro:   evt.humidity
  })

  log.debug(minString(room.name, 8) + ' updated to ' + minString(evt.temperature, 4, false) + '°')
}


/**
 * 
 * @param {Room} room 
 */
function switchHeaterOn(room) {
  log.debug(`🟢 We switch on  ${room.name}`)
  if (room.dio_is_inverted) {
    telecommande.switchOff(remotePrefix + room.dio_heater)
  } else {
    telecommande.switchOn(remotePrefix + room.dio_heater)
  }
}

function switchHeaterOff(room) {
  log.debug(`🔴 We switch off ${room.name}`)
  if (room.dio_is_inverted) {
    telecommande.switchOn(remotePrefix + room.dio_heater)
  } else {
    telecommande.switchOff(remotePrefix + room.dio_heater)
  }
}


function switchVentilation(switchOn = false) {
  if (switchOn) {
    telecommande.switchOn(remotePrefix + "13")
  } else {
    telecommande.switchOff(remotePrefix + "13")
  }
}


export { start, switchVentilation, switchHeaterOn, switchHeaterOff }
