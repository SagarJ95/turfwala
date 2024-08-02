const multer = require("multer");

const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "exterior") {
      cb(null, "storage/exterior");
    } else if (file.fieldname === "branding") {
      cb(null, "storage/branding");
    } else if (file.fieldname === "interior") {
      cb(null, "storage/interior");
    } else if (file.fieldname === "pamphlet") {
      cb(null, "storage/pamphlet");
    } else {
      cb(null, "Unexcpted Fields");
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "exterior") {
      cb(null, Date.now() + "-" + file.originalname);
    } else if (file.fieldname === "branding") {
      cb(null, Date.now() + "-" + file.originalname);
    } else if (file.fieldname === "interior") {
      cb(null, Date.now() + "-" + file.originalname);
    } else if (file.fieldname === "pamphlet") {
      cb(null, Date.now() + "-" + file.originalname);
    }
  },
});

const uploadImage = multer({ storage: upload }).fields([
  { name: "exterior" },
  { name: "branding" },
  { name: "interior" },
  { name: "pamphlet" },
]);

module.exports = {
  uploadImage,
};
