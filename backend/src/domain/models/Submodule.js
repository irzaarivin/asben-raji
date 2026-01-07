'use strict';

module.exports = async ({ sequelize, Sequelize, Model, DataTypes }) => {
  class Submodule extends Model {
    static associate(models) {
      Submodule.belongsTo(models.Module, {
        foreignKey: 'module_id',
        as: 'Module'
      });
    }
  }

  await Submodule.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modules',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Submodule',
    tableName: 'submodules',
    timestamps: true
  });

  return Submodule;
};
