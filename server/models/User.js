const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
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
  APP_SECRET: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    unique: true,
  },
  isAdminApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = User;
