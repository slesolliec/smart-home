// this is a view

const defineRoomCurrent = function(sequelize, DataTypes) {
    return sequelize.define('RoomCurrent',
      {
        room_id:    { type: DataTypes.SMALLINT, primaryKey: true },
        name:       { type: DataTypes.STRING(10) },
        sensor:     { type: DataTypes.CHAR(6)},
        smart_plug: { type: DataTypes.CHAR(22)},
        dio_heater: { type: DataTypes.SMALLINT},
        dio_is_inverted: { type: DataTypes.BOOLEAN},
        temp:       { type: DataTypes.SMALLINT},
        hydro:      { type: DataTypes.SMALLINT},
        is_on:      { type: DataTypes.BOOLEAN},
        power:      { type: DataTypes.SMALLINT},
        created_at: { type: DataTypes.DATE},
      },
      {
        sequelize,
        tableName: 'rooms_current',
        timestamps: false,
      }
    )
  }
  
  export { defineRoomCurrent }
  
  