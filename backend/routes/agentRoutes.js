const express = require("express");
const { addAgent } = require("../controllers/agentController");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Agent = require("../models/Agent");
const router = express.Router();

router.post("/", addAgent);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Email", email);
  console.log("Password", password);

  try {
    const agent = await Agent.findOne({ email }).populate("tasks"); // Fetch tasks along with agent data
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    console.log("Agent", agent);

    const isMatch = password === agent.password;
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: agent._id, role: "agent" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, agent });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  console.log("Agent Logging out");
  res.cookie("agentData", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.send("Agent Logged out");
});

module.exports = router;
