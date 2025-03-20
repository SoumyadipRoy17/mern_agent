const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();

// Login route
router.post("/login", loginUser);

//Logout
router.post("/logout", logoutUser);

// Sign up route
router.post("/register", registerUser);

module.exports = router;
