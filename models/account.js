const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Account = sequelize.define('Account', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  accountId: { type: DataTypes.STRING, unique: true },
  accountName: { type: DataTypes.STRING, allowNull: false },
  appSecretToken: { type: DataTypes.STRING, unique: true },
  website: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Account;
