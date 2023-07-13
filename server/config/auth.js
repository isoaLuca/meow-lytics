const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "appID",
      passwordField: "appID",
      session: false,
    },
    async (appID, done) => {
      try {
        const user = await User.findOne({ where: { appID } });
        if (!user) {
          return done(null, false, { message: "Code invalide." });
        }
        if (!user.isVerified) {
          return done(null, false, { message: "Compte non vérifié." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
