const fs = require("fs");
const xlsx = require("xlsx");
const List = require("../models/List"); // Your Mongoose model
const Agent = require("../models/Agent"); // Assuming you have an agent model

const uploadList = async (req, res) => {
  console.log("Received file:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Read Excel file
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

  console.log("Extracted Data from Excel:", data);

  // Validate data structure
  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: "Invalid or empty file" });
  }

  // Fetch agents for distribution
  const agents = await Agent.find({});
  const agentCount = agents.length;
  let currentAgentIndex = 0;

  // Process each row
  for (const row of data) {
    const firstName = row["Name"] || row["firstName"];
    const phone = row["Contact"] || row["phone"];
    const notes = row["Notes"] || row["notes"];

    if (!firstName || !phone) {
      console.warn("Skipping row due to missing fields:", row);
      continue;
    }

    const agent = agents[currentAgentIndex % agentCount];

    // Add the task to the agent's tasks array

    const task = await List.create({
      firstName,
      phone,
      notes,
      agent: agent._id,
    });
    agent.tasks.push(task._id);
    await agent.save();

    currentAgentIndex++;
  }

  fs.unlinkSync(req.file.path);

  res.status(200).json({ message: "List uploaded and processed successfully" });
};

// Fetch tasks by agent
const getTasksByAgent = async (req, res) => {
  const agents = await Agent.find({}).populate({
    path: "tasks", // Populate the tasks field
    select: "firstName phone notes", // Select the fields to include
  });

  const tasksByAgent = agents.map((agent) => ({
    agent: agent.name,
    tasks: agent.tasks, // Include the populated tasks
  }));

  res.status(200).json(tasksByAgent);
};

module.exports = { uploadList, getTasksByAgent };
