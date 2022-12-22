
const defineSmartPlug = function(sequelize, DataTypes) {
  return sequelize.define('SmartPlug',
    {
      room_id:    { type: DataTypes.SMALLINT },
      is_on:      { type: DataTypes.BOOLEAN },
      power:      { type: DataTypes.SMALLINT },
      dps_22:     { type: DataTypes.SMALLINT },
      dps_23:     { type: DataTypes.SMALLINT },
      dps_24:     { type: DataTypes.SMALLINT },
      dps_25:     { type: DataTypes.SMALLINT },
    },
    {
      sequelize,
      tableName: 'smart_plugs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    }
  )
}

export { defineSmartPlug }

