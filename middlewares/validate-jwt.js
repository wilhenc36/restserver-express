const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: `There isn't token in the request.`,
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token invalid.",
      });
    }

    // Verify if uid is active
    if (!user.isActive) {
      return res.status(401).json({
        msg: "Token invalid.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token invalid.",
    });
  }
};

module.exports = {
  validateJWT,
};
