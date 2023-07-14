const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(
  "/secure-endpoint",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send("Bienvenue, utilisateur authentifié !");
  }
);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
