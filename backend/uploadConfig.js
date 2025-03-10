const multer = require("multer");
const fs = require("fs");

// Ensure the uploads folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// File filter (optional - restrict to CSV, Excel files)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.mimetype.includes("excel")) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV or Excel files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
