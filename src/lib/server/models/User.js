
const defineUser = function(sequelize, DataTypes) {
  return sequelize.define('User',
    {
      name:       { type: DataTypes.STRING(10), allowNull: false, primaryKey: true },
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

