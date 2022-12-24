
import { Mode, Room, SmartPlug, Thermo, User, Week, Program } from "./src/lib/server/db.js"

async function dbSync() {

  await Mode   .sync({force: true})
  await Week   .sync({force: true})
  await Program.sync({force: true})

  Mode.bulkCreate([
    {mode_id: 0, name: 'Base'},
    {mode_id: 1, name: 'Repos'},
    {mode_id: 2, name: 'TeleWork'},
    {mode_id: 3, name: 'Ecole'},
    {mode_id: 4, name: 'Away'},
  ])

  return

  await User  .sync({force: true})
  await Room  .sync({force: true})
  await Thermo.sync({force: true})
  await SmartPlug.sync({force: true})


  // standing data


  Room.bulkCreate([
    {room_id:  1, name: 'Matys',   sensor: '0xFF01', smart_plug: 'bfb7fd9135eb2dd73egztw'},
    {room_id:  2, name: 'Palier',  sensor: '0x7801', },
    {room_id:  3, name: 'SdBainH', sensor: '0xE001', smart_plug: 'bf127e02e7ea1f91bcjehc' },
    {room_id:  4, name: 'Lili',    sensor: '0x3D01', },
    {room_id:  5, name: 'Cuisine', sensor: '0xD101', smart_plug: 'bf7d504a06f0e24223ezr3' },
    {room_id:  6, name: 'Salon',   sensor: '0xB002', },
    {room_id:  7, name: 'SdBain',  sensor: '0xFE01', smart_plug: 'bf14500a4d6f71a2b0l8zr' },
    {room_id:  8, name: 'Chambre', sensor: '0xA00E', },  // smart_plug: 'bf07ef88e08e910889gv2l'
    {room_id:  9, name: 'Mag',     sensor: '0x200E', },  // 'bf62c42f1b30f7540boel6'
    {room_id: 10, name: 'Stef',    sensor: '0x9101', },
  ])

  User.bulkCreate([
    {user_id: 1, name: 'Maison'},
    {user_id: 2, name: 'Stef',  pwd: 'Serafin'},
    {user_id: 3, name: 'Mag',   pwd: 'Okinawa'},
    {user_id: 4, name: 'Matys', pwd: 'Zendikar'},
    {user_id: 5, name: 'Lili',  pwd: 'HollowK'},
  ])
}

dbSync()

