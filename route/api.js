const router = require("express").Router();
const FrontApi = require("../Controller/Api_controller");
const {
  registerValidation,
  loginVaidation,
} = require("../Middleware/validation");
const multer = require("multer");
const upload = multer();

const uploadMultipleFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "storage/Review");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).array("images", 3);

const uploadFile = router.post(
  "/register",
  registerValidation,
  FrontApi.register
);

//Front APi
router.post("/login", loginVaidation, FrontApi.login);
router.post("/get_turfs", FrontApi.getturfs);
router.get("/get_near_by_turf", FrontApi.getnearbyturf);
router.get("/getleastturf", FrontApi.getleastturf);
router.get("/getTopturf", FrontApi.getTopTurf);
router.post("/getTurfInfo", FrontApi.getTurfInfoDetails);
//review
router.post("/getReview", FrontApi.getReviewDetails);
//router.post("/storereview", upload.none(), FrontApi.store_review);
router.post("/storereview", uploadMultipleFile, FrontApi.store_review);
router.post("/check_availability", FrontApi.check_availibality);

module.exports = router;
