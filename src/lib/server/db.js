import { Sequelize, DataTypes } from 'sequelize'

import { defineMode }           from './models/Mode.js'
import { defineRoom }           from './models/Room.js'
import { defineRoomCurrent }    from './models/RoomCurrent.js'
import { defineSmartPlug }      from './models/SmartPlug.js'
import { defineThermo }         from './models/Thermo.js'
import { defineUser }           from './models/User.js'
import { defineWeek }           from './models/Week.js'

const dbCnx = 'postgres://postgres:example@localhost:5435/house'

// we create the db cnx
const sequelize = new Sequelize(dbCnx, {
	logging: false,
	pool: { max: 10, min: 5, idle: 30000, acquire: 60000 }
})

// we instantiate our models
const Mode        = defineMode(        sequelize, DataTypes)
const User        = defineUser(        sequelize, DataTypes)
const Room        = defineRoom(        sequelize, DataTypes)
const RoomCurrent = defineRoomCurrent( sequelize, DataTypes)  // view
const Thermo      = defineThermo(      sequelize, DataTypes)
const SmartPlug   = defineSmartPlug(   sequelize, DataTypes)
const Week        = defineWeek(        sequelize, DataTypes)

export { sequelize, Mode, User, Room, RoomCurrent, SmartPlug, Thermo, Week }
