const { check } = require("express-validator");

adminlogin = [
  check("email").not().isEmpty().withMessage("Please Enter the email id"),
  check("password").not().isEmpty().withMessage("Please Enter the password"),
];

module.exports = {
  adminlogin,
};
