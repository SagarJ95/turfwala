const { check } = require("express-validator");

saveTurf = [
  check("turf_name").not().isEmpty().withMessage("Please Enter the Turf Name"),
  check("turf_size").not().isEmpty().withMessage("Please Enter the Turf Size"),
  check("contact_no_1")
    .not()
    .isEmpty()
    .withMessage("Please Enter the Contact No 1."),
  check("contact_no_2")
    .not()
    .isEmpty()
    .withMessage("Please Enter the Contact No 2."),
  check("opening_time")
    .not()
    .isEmpty()
    .withMessage("Please Enter The opening Time"),
  check("closing_time")
    .not()
    .isEmpty()
    .withMessage("Please Enter the closeing time"),
];

module.exports = {
  saveTurf,
};
