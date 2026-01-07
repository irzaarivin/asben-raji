'use strict';

module.exports = async ({ sequelize, Sequelize, Model, DataTypes }) => {
  class Attendance extends Model {
    static associate(models) {
      // Associate here
    }
  }
  await Attendance.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nim: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
    },
    matkul: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('hadir', 'alpha', 'sakit', 'izin'),
      defaultValue: 'hadir',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances',
    timestamps: true
  });

  return Attendance;
};