const { request, response } = require("express");

const isAdmin = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Wants verify the role without validating the token.",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not admin.`,
    });
  }

  next();
};

const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Wants verify the role without validating the token.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of those roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdmin,
  haveRole,
};
