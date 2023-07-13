const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { companyName, firstName, lastName, email, phoneNumber, baseURL } =
      req.body;

    const newUser = await User.create({
      companyName,
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

module.exports = {
  registerUser,
};
