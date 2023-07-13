require("./config/auth");

const express = require("express");
const passport = require("passport");
const port = process.env.PORT || 5000;
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use(passport.initialize());
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Miaou World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
