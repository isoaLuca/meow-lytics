const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const {
      companyName,
      KBIS,
      firstName,
      lastName,
      email,
      phoneNumber,
      baseURL,
    } = req.body;

    const newUser = await User.create({
      companyName,
      KBIS,
      firstName,
      lastName,
      email,
      phoneNumber,
      baseURL,
    });

    res.json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, APP_SECRET } = req.body;

    const user = await User.findOne({ where: { email, APP_SECRET } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "L'Email ou l'APP_SECRET est faux." });
    }

    res.json({
      message: "Your IN ! Got'cha bro !",
      user: {
        APP_ID: user.APP_ID,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Aïe.. That's called a fail man..." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
