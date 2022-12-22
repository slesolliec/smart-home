
const defineThermo = function(sequelize, DataTypes) {
  return sequelize.define('Thermo',
    {
      room_id:    { type: DataTypes.SMALLINT },
      temp:       { type: DataTypes.SMALLINT },
      hydro:      { type: DataTypes.SMALLINT }
    },
    {
      sequelize,
      tableName: 'thermos',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    }
  )
}

export { defineThermo }

