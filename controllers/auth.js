const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Talk with the admin.",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.isActive) {
      return res.status(401).json({
        msg: "Talk with the admin. User blocked.",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      msg: `Token couldn't verify`,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
