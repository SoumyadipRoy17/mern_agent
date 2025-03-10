const fs = require("fs");
const csv = require("csv-parser");
const asyncHandler = require("express-async-handler");
const Agent = require("../models/Agent");
const List = require("../models/List");

const uploadList = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("Received file:", req.file.path);

  const agents = await Agent.find({});
  const agentCount = agents.length;
  let currentAgentIndex = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", async (row) => {
      const { firstName, phone, notes } = row;
      const agent = agents[currentAgentIndex % agentCount];
      await List.create({ firstName, phone, notes, agent: agent._id });
      currentAgentIndex++;
    })
    .on("end", () => {
      res
        .status(200)
        .json({ message: "List uploaded and distributed successfully" });
    });
});

module.exports = { uploadList };
