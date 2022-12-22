
const defineRoom = function(sequelize, DataTypes) {
  return sequelize.define('Room',
    {
      room_id:    { type: DataTypes.SMALLINT, primaryKey: true },
      name:       { type: DataTypes.STRING(10) },
      sensor:     { type: DataTypes.CHAR(6)},
      smart_plug: { type: DataTypes.CHAR(22)}
    },
    {
      sequelize,
      tableName: 'rooms',
      timestamps: false,
    }
  )
}

export { defineRoom }

