const multer = require("multer");

const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "exterior") {
      cb(null, "storage/branding");
    } else if (file.fieldname === "branding") {
      cb(null, "storage/branding");
    } else if (file.fieldname === "interior") {
      cb(null, "storage/interior");
    } else {
      cb(null, "Unexcpted Fields");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ Storage: upload }).fields([
  { name: "exterior" },
  { name: "branding" },
  { name: "interior" },
]);

module.exports = {
  uploadImage,
};
