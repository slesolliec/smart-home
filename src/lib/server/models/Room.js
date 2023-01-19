
const defineRoom = function(sequelize, DataTypes) {
  return sequelize.define('Room',
    {
      room_id:    { type: DataTypes.SMALLINT, primaryKey: true },
      name:       { type: DataTypes.STRING(10) },
      sensor:     { type: DataTypes.CHAR(6)},
      smart_plug: { type: DataTypes.CHAR(22)},
      dio_heater: { type: DataTypes.SMALLINT},
      // when the DIO relay switch is wired on the pilot wire,
      // then ON = OFF and OFF = ON
      dio_is_inverted: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      tableName: 'rooms',
      timestamps: false,
    }
  )
}

export { defineRoom }

