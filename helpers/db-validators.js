const User = require("../models/user");
const Role = require("../models/role");

const isRoleValidate = async (role = "") => {
  const existedRole = await Role.findOne({ role });

  if (!existedRole) {
    throw new Error(`Role ${role} isn't registered on the DB.`);
  }
};

const emailExists = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`Email ${email} has been already registered`);
  }
};

const existUserById = async (id) => {
  const exists = await User.findById(id);
  if (!exists) {
    throw new Error(`ID ${id} doesn't exist.`);
  }
};

module.exports = {
  isRoleValidate,
  emailExists,
  existUserById,
};
