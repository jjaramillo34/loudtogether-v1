const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  youtubeUrl: { type: String, required: true },
  adminName: { type: String, required: true },
  participants: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", SessionSchema);
