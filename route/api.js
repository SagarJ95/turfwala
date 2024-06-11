const router = require("express").Router();
const loginRegister = require("../Controller/user_Controller");
const homeController = require("../Controller/home_Controller");
const {
  registerValidation,
  loginVaidation,
} = require("../Middleware/validation");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/storage/Review" });

const uploadFile = router.post(
  "/register",
  registerValidation,
  loginRegister.register
);
router.post("/login", loginVaidation, loginRegister.login);

router.get("/get_near_by_turf", homeController.getnearbyturf);
router.get("/getleastturf", homeController.getleastturf);
router.get("/getTopturf", homeController.getTopTurf);
router.post("/getTurfInfo", homeController.getTurfInfoDetails);

//review
router.post("/getReview", homeController.getReviewDetails);
router.post("/storereview", upload.none(), homeController.store_review);

module.exports = router;
