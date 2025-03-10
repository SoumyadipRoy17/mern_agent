const express = require("express");
const {
  uploadList,
  getTasksByAgent,
} = require("../controllers/listController");
const upload = require("../middleware/uploadMiddleware"); // Import multer middleware

const router = express.Router();

router.post("/upload", upload.single("file"), uploadList); // "file" key must match frontend

// Fetch tasks by agent route
router.get("/tasks-by-agent", getTasksByAgent);

module.exports = router;
