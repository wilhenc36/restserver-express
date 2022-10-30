const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Email or Password are incorrect.",
      });
    }

    // Verify if user is still active
    if (!user.isActive) {
      return res.status(400).json({
        msg: "Email or Password are incorrect.",
      });
    }

    // Verify password
    const validOassword = bcrypt.compareSync(password, user.password);
    if (!validOassword) {
      return res.status(400).json({
        msg: "Email or Password are incorrect.",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Talk with the admin.",
    });
  }
};

module.exports = {
  login,
};
