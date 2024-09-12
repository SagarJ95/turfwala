const jwt = require("jsonwebtoken");
require("dotenv").config();

//Generate Token
module.exports.generateToken = (user_id) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "20h" });
};

//Verify Token
module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(201).json({ message: "No token Provide" });
    } else {
      const payload = jwt.verify(token, process.env.SECRET);
      if (payload) {
        req.user_id = payload.id;
        return res.status(200).json({ message: req.user_id });
      } else {
        return res.status(201).json({ message: "Unauthoried access" });
      }
    }
  } catch (e) {
    return res.status(201).json({ error: e.message });
  }
};
