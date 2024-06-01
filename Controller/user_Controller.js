const { password } = require("pg/lib/defaults");
const db = require("../db/database");
const bcryptjs = require("bcryptjs");
const jwt = require("../utilites/jwt");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
  try {
    const { name, email, mobile_number, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(409).json({ errors: errors.array() });
    } else {
      const checkEmailId = await db.query(
        "select * from users where email = $1",
        [email]
      );

      if (checkEmailId.rows.length > 0) {
        res.status(403).json({
          error: "Email already register. Please Enter Different email Id",
        });
      } else {
        bcryptjs.hash(password, 10, async (err, hashPassword) => {
          if (err) {
            res.status(403).json({ error: err.message });
          } else {
            const registerUser = await db.query(
              "Insert into users(name,email,mobile_no,password) values ($1,$2,$3,$4)  RETURNING *",
              [name, email, mobile_number, hashPassword]
            );

            if (registerUser.rowCount > 0) {
              // Generate JWT Token
              const AccessToken = jwt.generateToken(registerUser.rows[0].id);
              res.status(200).json({
                message: "User Register Successfully",
                access_token: AccessToken,
              });
            } else {
              res.status(403).json({ error: "Something went wrong" });
            }
          }
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(409).json({ errors: errors.array() });
    } else {
      const checkEmailId = await db.query(
        "select * from users where email = $1",
        [email]
      );

      if (checkEmailId.rows.length == 0) {
        res.status(403).json({
          error: "Email Not register. Please First register",
        });
      } else {
        bcryptjs.compare(
          password,
          checkEmailId.rows[0].password,
          async (err, hashPassword) => {
            if (err) {
              res.status(403).json({ error: err.message });
            } else {
              // Generate JWT Token
              const AccessToken = jwt.generateToken(checkEmailId.rows[0].id);
              res.status(200).json({
                message: "User Login Successfully",
                access_token: AccessToken,
              });
            }
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
