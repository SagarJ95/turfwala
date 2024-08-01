const { check } = require("express-validator");

saveTurf = [
  check("turf_name").not().isEmpty().withMessage("Please Enter the Turf Name"),
  check("turf_size").not().isEmpty().withMessage("Please Enter the Turf Size"),
];

module.exports = {
  saveTurf,
};
