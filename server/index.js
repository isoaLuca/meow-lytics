require("./config/auth");

const express = require("express");
const passport = require("passport");
const port = process.env.PORT || 5000;
const app = express();

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/analytics", analyticsRoutes);
app.use(express.static("public"));

module.exports = app;
