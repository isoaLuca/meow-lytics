const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");
const Tag = require("../models/Tag");

router.get(
  "/secure-endpoint",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send("Bienvenue, utilisateur authentifié !");
  }
);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.post("/dashboard/new-tag", async (req, res) => {
  const { comment } = req.body;
  if (!comment || comment.trim() === "") {
    return res.status(400).json({ error: "Le commentaire est obligatoire!" });
  }

  try {
    const newTag = await Tag.create({ comment });
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur pendant la création du tag" });
  }
});

module.exports = router;
