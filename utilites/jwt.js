const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken = (user_id) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "20h" });
};
