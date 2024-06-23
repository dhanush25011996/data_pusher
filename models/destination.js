const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Account = require('./account');

const Destination = sequelize.define('Destination', {
  url: { type: DataTypes.STRING, allowNull: false },
  httpMethod: { type: DataTypes.STRING, allowNull: false },
  headers: { type: DataTypes.JSON, allowNull: false },
});

Destination.belongsTo(Account);
Account.hasMany(Destination);

module.exports = Destination;
