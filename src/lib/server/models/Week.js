
const defineWeek = function(sequelize, DataTypes) {
  return sequelize.define('Week',
    {
      user_id:    { type: DataTypes.SMALLINT, primaryKey: true},
      weekday:    { type: DataTypes.SMALLINT, primaryKey: true },
      mode_id:    { type: DataTypes.SMALLINT }
    },
    {
      sequelize,
      tableName: 'weeks',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
}

export { defineWeek }

