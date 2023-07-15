require("./config/auth");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Event = require("./models/Event");
const userRoutes = require("./routes/userRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const passport = require("passport");

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

User.hasMany(Event, {
  foreignKey: "userId",
});

Event.belongsTo(User, {
  foreignKey: "userId",
});

app.use(express.json());

app.use(passport.initialize());
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Miaou World!");
});

app.get("/analytics/data", async (req, res) => {
  const visitorsCount = await Event.countNewVisitors();
  const pageViewsCount = await Event.countPageViews();
  const eventsCount = await Event.countEvents();

  const latestEvents = await Event.getLatestEvents();
  const tagsCount = await Event.count({
    where: { eventType: "tag" },
    group: ["eventData->tagId"],
    attributes: [
      "eventData->tagId",
      [sequelize.fn("COUNT", "eventData->tagId"), "count"],
    ],
  });
  const data = {
    visitorsCount,
    pageViewsCount,
    eventsCount,
    latestEvents,
    tagsCount,
  };

  res.json(data);
});

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});

app.use("/analytics", analyticsRoutes);
app.use(express.static("public"));

module.exports = app;
