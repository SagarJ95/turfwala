const { check } = require("express-validator");

registerValidation = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Please Enter the Name")
    .isLength({ min: 3, max: 15 })
    .withMessage("First name must be 3-15 character long"),
  check("email").not().isEmpty().withMessage("Please Enter Email"),
  check("mobile_number")
    .not()
    .isEmpty()
    .withMessage("Please Enter the Mobile Number")
    .isLength({ max: 10 })
    .withMessage("mobile number must be 10 digit"),
  check("password").not().isEmpty().withMessage("Please Enter the Passowrd"),
];

module.exports = {
  registerValidation,
};
