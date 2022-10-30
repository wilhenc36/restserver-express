const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getUser = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { isActive: true };

  if (isNaN(limit)) {
    return res.status(400).json({
      msg: "Limit must be a number",
    });
  }

  if (isNaN(since)) {
    return res.status(400).json({
      msg: "Since must be a number",
    });
  }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(since).limit(limit),
  ]);

  res.json({
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, {
    isActive: false,
  });

  res.json({
    user,
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
