const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const User = require("../models/User");
const sendEmail = require("../services/mailService");

const router = express.Router();

router.get(
  "/secure-endpoint",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send("Bienvenue, utilisateur authentifié !");
  }
);

router.post("/register", userController.registerUser);

router.post("/send-email", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  await sendEmail({ firstName, lastName, email });

  res.json({ message: "E-mail envoyé avec succès." });
});

router.get("/admin/approve/:userId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  if (!user) {
    return res.status(404).send("Utilisateur non trouvé");
  }

  user.isAdminApproved = true;
  await user.save();

  await sendUserApprovalEmail(user);

  res.send("Utilisateur approuvé avec succès");
});

module.exports = router;
