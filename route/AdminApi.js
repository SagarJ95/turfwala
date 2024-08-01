const router = require("express").Router();
const AdminApi = require("../Controller/AdminApiController");

router.post("/save_turf", AdminApi.save_turf);

module.exports = router;
