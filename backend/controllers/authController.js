// const asyncHandler = require("express-async-handler");
// const User = require("../models/User");
// const generateToken = require("../utils/generateToken");

// // Login controller
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// // Sign up controller
// const registerUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Here");

//   // Check if user already exists
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   // Create new user
//   const user = await User.create({ email, password });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// module.exports = { loginUser, registerUser }; // Export registerUser

const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Login controller (Only allows admin)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied. Only admins can log in.");
  }

  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Sign up controller (Registers new users with default role: "user")
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Removed role from request

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user with default role "user"
  const user = await User.create({ email, password, role: "user" });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role, // Include role in response
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log("Logging out");
  res.cookie("adminData", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.send("Logged out");
});

module.exports = { loginUser, registerUser, logoutUser };
