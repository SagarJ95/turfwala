const router = require("express").Router();
const loginRegister = require("../Controller/user_Controller");
const {
  registerValidation,
  loginVaidation,
} = require("../Middleware/validation");

router.post("/register", registerValidation, loginRegister.register);
router.post("/login", loginVaidation, loginRegister.login);

module.exports = router;
