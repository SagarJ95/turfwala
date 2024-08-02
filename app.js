const express = require("express");
const app = express();
const Defineroute = require("./route/api");
const DefineAdminroute = require("./route/AdminApi");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// To parse JSON bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", Defineroute);
app.use("/admin", DefineAdminroute);

app.listen(PORT, () => {
  console.log("connect", PORT);
});
