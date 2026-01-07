'use strict';

module.exports = async ({ sequelize, Sequelize, Model, DataTypes }) => {
  class Module extends Model {
    static associate(models) {
      Module.hasMany(models.Submodule, {
        foreignKey: 'module_id',
        as: 'Submodule'
      });
    }
  }

  await Module.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: true
  });

  return Module;
};
