const express = require("express");
const app = express();
const loginroute = require("./route/api");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", loginroute);

app.listen(PORT, () => {
  console.log("connect", PORT);
});
