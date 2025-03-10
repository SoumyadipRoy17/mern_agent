const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController"); // Import registerUser
const router = express.Router();

// Login route
router.post("/login", loginUser);

// Sign up route
router.post("/register", registerUser);

module.exports = router;
