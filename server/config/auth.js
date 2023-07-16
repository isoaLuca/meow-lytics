const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "APP_SECRET",
      session: false,
    },
    async (email, APP_SECRET, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Email non reconnu." });
        }
        if (!user.isVerified) {
          return done(null, false, { message: "Compte non vérifié." });
        }
        const isValid = await bcrypt.compare(APP_SECRET, user.APP_SECRET);
        if (!isValid) {
          return done(null, false, { message: "APP_SECRET invalide." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
