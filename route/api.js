const router = require("express").Router();
const loginRegister = require("../Controller/user_Controller");
const homeController = require("../Controller/home_Controller");
const {
  registerValidation,
  loginVaidation,
} = require("../Middleware/validation");

router.post("/register", registerValidation, loginRegister.register);
router.post("/login", loginVaidation, loginRegister.login);

router.get("/get_near_by_turf", homeController.getnearbyturf);
router.get("/getleastturf", homeController.getleastturf);
router.get("/getTopturf", homeController.getTopTurf);
router.post("/getTurfInfo", homeController.getTurfInfoDetails);

//review
router.post("/getReview", homeController.getReviewDetails);

module.exports = router;
