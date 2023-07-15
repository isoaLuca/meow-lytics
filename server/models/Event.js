const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  eventType: DataTypes.STRING,
  eventData: DataTypes.JSON,
  userId: DataTypes.STRING,
});

// nombre de visiteru

Event.countNewVisitors = function () {
  return this.count({ where: { eventType: "new_visitor" } });
};

// nombre de pages vues
Event.countPageViews = function () {
  return this.count({ where: { eventType: "pageview" } });
};

// Compter le nombre total d'événements
Event.countEvents = function () {
  return this.count();
};

// les derniers événements
Event.getLatestEvents = function () {
  return this.findAll({ order: [["createdAt", "DESC"]], limit: 10 });
};

module.exports = Event;
