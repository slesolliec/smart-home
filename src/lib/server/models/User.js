
const defineUser = function(sequelize, DataTypes) {
  return sequelize.define('User',
    {
      user_id:    { type: DataTypes.SMALLINT, primaryKey: true},
      name:       { type: DataTypes.STRING(10), allowNull: false },
      pwd:        { type: DataTypes.STRING(50) }
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
    }
  )
}

export { defineUser }

