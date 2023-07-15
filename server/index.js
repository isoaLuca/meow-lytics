require("./config/auth");
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
const User = require("./models/User");
const Event = require("./models/Event");

User.hasMany(Event, {
  foreignKey: "userId",
});

Event.belongsTo(User, {
  foreignKey: "userId",
});

const userRoutes = require("./routes/userRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

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

  const data = {
    visitorsCount,
    pageViewsCount,
    eventsCount,
    latestEvents,
  };

  res.json(data);
});

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});

app.use("/analytics", analyticsRoutes);
app.use(express.static("public"));

module.exports = app;
