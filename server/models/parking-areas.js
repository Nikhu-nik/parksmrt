const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  desc: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", imageSchema, "parking-areas");
