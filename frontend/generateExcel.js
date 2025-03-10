import xlsx from "xlsx";
import fs from "fs";

// Define data based on your Mongoose schema
const data = [
  {
    firstName: "John",
    phone: 1234567890,
    notes: "Test note",
    agent: "60c72b2f5f1b2c6d88f5d123",
  },
  {
    firstName: "Jane",
    phone: 9876543210,
    notes: "Another note",
    agent: "60c72b2f5f1b2c6d88f5d456",
  },
];

// Create a new workbook and worksheet
const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(data);

// Append the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, "List");

// Write the file to disk
xlsx.writeFile(workbook, "List.xlsx");

console.log("Excel file created: List.xlsx");
