
const defineProgram = function(sequelize, DataTypes) {
  return sequelize.define('Program',
    {
      user_id:    { type: DataTypes.SMALLINT, primaryKey: true },
      mode_id:    { type: DataTypes.SMALLINT, primaryKey: true },
      room_id:    { type: DataTypes.SMALLINT, primaryKey: true },
      hour:       { type: DataTypes.SMALLINT, primaryKey: true },
      temp:       { type: DataTypes.SMALLINT }
    },
    {
      sequelize,
      tableName: 'programs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
}

export { defineProgram }

