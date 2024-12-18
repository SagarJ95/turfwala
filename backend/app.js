const express = require("express");
const app = express();
const Defineroute = require("./route/api");
const DefineAdminroute = require("./route/AdminApi");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// To parse JSON bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use("/vendors", express.static(path.join(__dirname, "vendors")));
app.use(express.json());
app.use(cors());
app.use("/api", Defineroute);
app.use("/admin", DefineAdminroute);

app.listen(PORT, () => {
  console.log("connect", PORT);
});
