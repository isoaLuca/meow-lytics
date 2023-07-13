const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  companyName: DataTypes.STRING,
  KBIS: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  phoneNumber: DataTypes.STRING,
  baseURL: DataTypes.STRING,
  APP_ID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
});

module.exports = User;
