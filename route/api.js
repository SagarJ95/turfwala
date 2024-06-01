const router = require("express").Router();
const loginRegister = require("../Controller/user_Controller");
const { registerValidation } = require("../Middleware/validation");

router.post("/register", registerValidation, loginRegister.register);
router.post("/login", loginRegister.login);

module.exports = router;
