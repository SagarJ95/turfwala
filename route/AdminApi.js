const router = require("express").Router();
const AdminApi = require("../Controller/Admin_apiController");

router.post("/save_turf", AdminApi.save_turf);

module.exports = router;
