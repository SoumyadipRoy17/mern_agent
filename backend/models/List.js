const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    phone: { type: Number, required: true },
    notes: { type: String },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
