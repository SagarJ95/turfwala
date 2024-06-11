const express = require("express");
const app = express();
const loginroute = require("./route/api");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParse = require("body-parser");

// app.use(bodyParse.json());
// app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", loginroute);

app.listen(PORT, () => {
  console.log("connect", PORT);
});
