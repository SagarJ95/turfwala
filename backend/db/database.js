const pool = require("pg").Pool;
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const dbConnect = new pool(dbConfig);

module.exports = dbConnect;
