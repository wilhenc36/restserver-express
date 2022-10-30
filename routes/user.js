const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validateFields");
const {
  isRoleValidate,
  emailExists,
  existUserById,
} = require("../helpers/db-validators");

const {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/", getUser);

router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "The value in email is not valid.").isEmail(),
    check("email").custom(emailExists),
    check(
      "password",
      "Password is required and it should have 6 or more characters."
    ).isLength({ min: 6 }),
    //check('role', 'Role is not valid.').isIn(['ADMI_ROLE', 'USER_ROLE']),
    check("role").custom(isRoleValidate),
    validateFields,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "It is not a ID valid").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isRoleValidate),
    validateFields,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "It is not a ID valid").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
