
const defineMode = function(sequelize, DataTypes) {
  return sequelize.define('Mode',
    {
      mode_id:    { type: DataTypes.SMALLINT, primaryKey: true},
      name:       { type: DataTypes.STRING(10), allowNull: false },
    },
    {
      sequelize,
      tableName: 'modes',
      timestamps: false,
    }
  )
}

export { defineMode }

