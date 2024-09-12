const router = require("express").Router();
const AdminApi = require("../Controller/AdminApiController");
const { saveTurf } = require("../Middleware/AdminValidation");
const { uploadImage } = require("../Middleware/FileUpload");

//saveTurf,
router.post("/save_turf", [uploadImage, saveTurf], AdminApi.save_turf);

module.exports = router;
