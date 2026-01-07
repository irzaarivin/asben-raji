'use strict';

module.exports = ({ sequelize, Sequelize, Model, DataTypes }) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      Report.belongsTo(models.Module, {
        foreignKey: 'module_id',
        as: 'module'
      });

      Report.belongsTo(models.Submodule, {
        foreignKey: 'submodule_id',
        as: 'submodule'
      });
    }
  }
  Report.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
    },
    module_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Module',
        key: 'id'
      },
    },
    submodule_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Submodule',
        key: 'id'
      },
    },
    content_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};