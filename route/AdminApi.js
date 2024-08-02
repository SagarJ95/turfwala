const router = require("express").Router();
const AdminApi = require("../Controller/AdminApiController");
const { saveTurf } = require("../Middleware/AdminValidation");
const { uploadImage } = require("../Middleware/FileUpload");

router.post("/save_turf", [saveTurf, uploadImage], AdminApi.save_turf);

module.exports = router;
