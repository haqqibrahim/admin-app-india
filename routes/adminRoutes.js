const { Router } = require("express");
const router = Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

const adminController = require("../controllers/adminController");

router.get("/admin", adminController.admin_upload_get);
router.post(
  "/admin",
  upload.single("image"),
  adminController.admin_upload_post
);

module.exports = router;
