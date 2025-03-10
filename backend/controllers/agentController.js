const asyncHandler = require("express-async-handler");
const Agent = require("../models/Agent");

const addAgent = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const agentExists = await Agent.findOne({ email });

  if (agentExists) {
    res.status(400);
    throw new Error("Agent already exists");
  }

  const agent = await Agent.create({ name, email, mobile, password });

  if (agent) {
    res.status(201).json(agent);
  } else {
    res.status(400);
    throw new Error("Invalid agent data");
  }
});

module.exports = { addAgent };
