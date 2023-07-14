const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  eventType: DataTypes.STRING,
  eventData: DataTypes.JSON,
  userId: DataTypes.STRING,
});

module.exports = Event;
