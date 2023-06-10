const { body } = require("express-validator");
const BaseValidatorRun = require("../base/validators/BaseValidatorRun");
const UserValidators = require("./UserValidators");
const UserServiceCreateJWT = require("./services/UserServiceCreateJWT");
const UserServiceRegister = require("./services/UserServiceRegister");

const router = require("express").Router();

router.post(
  "/login",
  [
    UserValidators.email(body, false),
    UserValidators.password(body, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const token = await UserServiceCreateJWT(req.body.email);
    return res.status(200).json(token);
  }
);
router.post(
  "/register",
  [
    UserValidators.email(),
    UserValidators.password(),
    UserValidators.firstName(),
    UserValidators.lastName(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const user = await UserServiceRegister(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password
    );

    return res.status(200).json(user);
  }
);

module.exports = router;
