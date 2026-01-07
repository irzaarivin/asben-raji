'use strict';

module.exports = async ({ sequelize, Sequelize, Model, DataTypes }) => {
  class User extends Model {
    static associate(models) {
      // Associate here
    }
  }
  await User.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('administrator', 'instructor', 'trainee'),
      defaultValue: 'trainee',
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });
  return User;
};