const express = require("express");
const router = express.Router();
const upload = require("../uploadConfig"); // Import multer config
const { uploadList } = require("../controllers/uploadController"); // Import the controller

router.post("/upload", upload.single("file"), uploadList);

module.exports = router;
